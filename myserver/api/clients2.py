import numpy as np
import torch
import gzip
import os
import platform
import pickle
from api import models
from torch.utils.data import TensorDataset
from torch.utils.data import DataLoader

class GetDataSet(object):
    def __init__(self, dataSetName, isIID):
        self.name = dataSetName
        self.train_data = None
        self.train_label = None
        self.train_data_size = None
        self.test_data = None
        self.test_label = None
        self.test_data_size = None

        self._index_in_train_epoch = 0

        if self.name == 'MNIST':
            self.mnistDataSetConstruct(isIID)
        else:
            pass


    def mnistDataSetConstruct(self, isIID):
        # data_dir = r'..\data\MNIST'
        data_dir = r'./data/MNIST'
        train_images_path = os.path.join(data_dir, 'train-images-idx3-ubyte.gz')
        train_labels_path = os.path.join(data_dir, 'train-labels-idx1-ubyte.gz')
        test_images_path = os.path.join(data_dir, 't10k-images-idx3-ubyte.gz')
        test_labels_path = os.path.join(data_dir, 't10k-labels-idx1-ubyte.gz')
        train_images = extract_images(train_images_path)
        train_labels = extract_labels(train_labels_path)
        test_images = extract_images(test_images_path)
        test_labels = extract_labels(test_labels_path)

        assert train_images.shape[0] == train_labels.shape[0]
        assert test_images.shape[0] == test_labels.shape[0]

        self.train_data_size = train_images.shape[0]
        self.test_data_size = test_images.shape[0]

        assert train_images.shape[3] == 1
        assert test_images.shape[3] == 1
        train_images = train_images.reshape(train_images.shape[0], train_images.shape[1] * train_images.shape[2])
        test_images = test_images.reshape(test_images.shape[0], test_images.shape[1] * test_images.shape[2])

        train_images = train_images.astype(np.float32)
        train_images = np.multiply(train_images, 1.0 / 255.0)
        test_images = test_images.astype(np.float32)
        test_images = np.multiply(test_images, 1.0 / 255.0)

        if isIID:
            order = np.arange(self.train_data_size)
            np.random.shuffle(order)
            self.train_data = train_images[order]
            self.train_label = train_labels[order]
        else:
            labels = np.argmax(train_labels, axis=1)
            order = np.argsort(labels)
            self.train_data = train_images[order]
            self.train_label = train_labels[order]



        self.test_data = test_images
        self.test_label = test_labels


def _read32(bytestream):
    dt = np.dtype(np.uint32).newbyteorder('>')
    return np.frombuffer(bytestream.read(4), dtype=dt)[0]


def extract_images(filename):
    """Extract the images into a 4D uint8 numpy array [index, y, x, depth]."""
    print('Extracting', filename)
    with gzip.open(filename) as bytestream:
        magic = _read32(bytestream)
        if magic != 2051:
            raise ValueError(
                    'Invalid magic number %d in MNIST image file: %s' %
                    (magic, filename))
        num_images = _read32(bytestream)
        rows = _read32(bytestream)
        cols = _read32(bytestream)
        buf = bytestream.read(rows * cols * num_images)
        data = np.frombuffer(buf, dtype=np.uint8)
        data = data.reshape(num_images, rows, cols, 1)
        return data


def dense_to_one_hot(labels_dense, num_classes=10):
    """Convert class labels from scalars to one-hot vectors."""
    num_labels = labels_dense.shape[0]
    index_offset = np.arange(num_labels) * num_classes
    labels_one_hot = np.zeros((num_labels, num_classes))
    labels_one_hot.flat[index_offset + labels_dense.ravel()] = 1
    return labels_one_hot


def extract_labels(filename):
    """Extract the labels into a 1D uint8 numpy array [index]."""
    print('Extracting', filename)
    with gzip.open(filename) as bytestream:
        magic = _read32(bytestream)
        if magic != 2049:
            raise ValueError(
                    'Invalid magic number %d in MNIST label file: %s' %
                    (magic, filename))
        num_items = _read32(bytestream)
        buf = bytestream.read(num_items)
        labels = np.frombuffer(buf, dtype=np.uint8)
        return dense_to_one_hot(labels)

class client2(object):
    def __init__(self, trainDataSet, dev):
        self.train_ds = trainDataSet
        self.dev = dev
        self.train_dl = None
        self.local_parameters = None
        self.train_loss = 0

    def localUpdate(self, localEpoch, localBatchSize, Net, lossFun, opti, global_parameters,cl,c,fe,i):
        Net.load_state_dict(global_parameters, strict=True)
        self.train_dl = DataLoader(self.train_ds, batch_size=localBatchSize, shuffle=True)
        for epoch in range(localEpoch):
            self.train_loss = 0
            for data, label in self.train_dl:
                data, label = data.to(self.dev), label.to(self.dev)
                preds = Net(data)
                loss = lossFun(preds, label)
                loss.backward()
                opti.step()
                opti.zero_grad()
                self.train_loss += loss.item()
            
            print('{}用户本地第{}轮:loss为{}'.format(c,epoch,(self.train_loss / len(self.train_dl))))
            models.result_MinCost.objects.create(MinCostid=fe,Globalid=i,clinet=c,iter=epoch,loss=(self.train_loss / len(self.train_dl)))
            cl.send(str('{}用户本地第{}轮:loss为{}'.format(c,epoch,(self.train_loss / len(self.train_dl)))).encode('utf-8'))
        return Net.state_dict()

    def local_val(self):
        pass


class ClientsGroup2(object):
    def __init__(self, dataSetName, isIID, A,group, dev):
        self.data_set_name = dataSetName
        self.is_iid = isIID
        self.group = group
        self.A = A
        self.dev = dev
        self.clients_set = {}
        
        self.test_data_loader = None

        self.dataSetBalanceAllocation()

    def dataSetBalanceAllocation(self):
        mnistDataSet = GetDataSet(self.data_set_name, self.is_iid)
        print(self.data_set_name)
        print(self.is_iid)
        print(self.group)
        print(self.A)
        print(self.dev)
        test_data = torch.tensor(mnistDataSet.test_data)
        test_label = torch.argmax(torch.tensor(mnistDataSet.test_label), dim=1)
        self.test_data_loader = DataLoader(TensorDataset( test_data, test_label), batch_size=100, shuffle=False)

        train_data = mnistDataSet.train_data
        train_label = mnistDataSet.train_label

        shard_size = mnistDataSet.train_data_size // self.group
        shards_id = np.random.permutation(mnistDataSet.train_data_size // shard_size)
        b=0
        for i in range(len(self.A)):
            localdata = []
            locallabel = []
            a=self.A[i]
            for j in range(0,a):
                shards_id1 = shards_id[b+j]
                # print(b+j)
                # shards_id2 = shards_id[i * 2 + 1]
                data_shards1 = train_data[shards_id1 * shard_size: shards_id1 * shard_size + shard_size]
                # data_shards2 = train_data[shards_id2 * shard_size: shards_id2 * shard_size + shard_size]
                label_shards1 = train_label[shards_id1 * shard_size: shards_id1 * shard_size + shard_size]
                # label_shards2 = train_label[shards_id2 * shard_size: shards_id2 * shard_size + shard_size]
                localdata.append(data_shards1) 
                locallabel.append(label_shards1)
            b=b+a
            # print(b)
            local_data, local_label = np.vstack((localdata)), np.vstack((locallabel))
            local_label = np.argmax(local_label, axis=1)
            someone = client2(TensorDataset(torch.tensor(local_data), torch.tensor(local_label)), self.dev)
            self.clients_set['client{}'.format(i)] = someone

if __name__=="__main__":
    MyClients = ClientsGroup2('MNIST', True, [227, 188,  85],500, 1)


