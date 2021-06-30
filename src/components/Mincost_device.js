import React , { useState, useRef, useImperativeHandle }from 'react';
import ReactDragListView from 'react-drag-listview';
import { useDrop, useDrag ,useDynamicList, useEventListener } from 'ahooks';
import classNames from "classnames";
import { Form, Button, Input, Icon, Table } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Typography from '@material-ui/core/Typography';
import Nexus6 from "../assets/images/device/Nexus6.jpg";
import Mate10 from "../assets/images/device/Mate10.jpg";
import Pixel2 from "../assets/images/device/Pixel2.jpg";
import p30 from "../assets/images/device/p30.jpg";

const useStyles = makeStyles((theme) =>({
    root: {
        flexGrow: 1,
      },
    boxcon:{
        border: '1px dashed #745', 
        padding: 16, 
        textAlign: 'center'
    },
    box:{
        marginLeft:'85px',
        width:'15%',
        marginBottom:'20px'
    },
    boxn:{
    borderRadius: "6px",
    color: "rgba(" + "0,0,0" + ", 0.87)",
    background: 'white',
    width: "55%",
    boxShadow: "0 1px 4px 0 rgba(" + "0,0,0" + ", 0.14)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    fontSize: ".875rem",
    },
    img:{
        width:'80px',
        height:'60px',
    },
    btn:{
       marginTop: 16,
       backgroundColor:'#00acc1',
       boxShadow:
        "0 2px 2px 0 rgba(0, 188, 212, 0.14), 0 3px 1px -2px rgba(0, 188, 212, 0.2), 0 1px 5px 0 rgba(0, 188, 212, 0.12)",
        "&:hover,&:focus": {
       backgroundColor:'#00acc1',
       boxShadow:
        "0 14px 26px -12px rgba(0, 188, 212, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 188, 212, 0.2)"
        }
    },
    po:{
        float:'right',
    }
}));

const box=[
  { name: 'Nexus 6', img: Nexus6, k: '1',b:'- 1.3',tip:"SOC:Snapdragon 805 CPU:4x2.7GHz big.LITTLE:no" },
  { name: 'Mate10', img: Mate10, k: '1.5',b:'- 7' ,tip:"SOC:Kirin 970 CPU:4x2.36/1.8GHz big.LITTLE:yes"},
  { name: 'Pixel2', img: Pixel2, k: '0.46',b:'0.82' ,tip:"SOC:Snapdragon 835 CPU:4x2.35/1.9GHz big.LITTLE:yes"},
  { name: 'p30', img: p30, k: '0.46',b:'0.82' ,tip:"SOC:Kirin 980 CPU:4x1.8GHz big.LITTLE:yes"}
];

const Settable = props =>{
    const { getFieldDecorator, getFieldsValue } = props.form;

    const classes = useStyles();
    const { list, remove, getKey, move, push } = useDynamicList([
      ]);
      useImperativeHandle(props.cRef, () => ({
        pushcontent(content){
            push({ name: `${content}`, num: '0' });
        }
  	}));
    function submit(){
        var result=getFieldsValue().params;
        props.handlenadata(props.another);
        props.handlealldata(result);
    };
    const columns = [
        {
            title: '设备',
            dataIndex: 'name',
            key: 'name',
            render: (text, row, index) => (<>
          <Icon style={{ cursor: 'move', marginRight: 8 }} type="drag"/>
          {getFieldDecorator(`params[${getKey(index)}].name`, { initialValue: text })(<Input style={{ width: 120, marginRight: 16 }} />)}
        </>),
        },
        {
            key: 'num0',
            title: '类别0',
            dataIndex: 'num0',
          render: (text, row, index) => (<>
        {getFieldDecorator(`params[${getKey(index)}].num0`,{ initialValue: text || false })(<FormControlLabel
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
            label="0"/>
        )}
      </>),
      },
      {
            key: 'num1',
            title: '类别1',
            dataIndex: 'num1',
          render: (text, row, index) => (<>
        {getFieldDecorator(`params[${getKey(index)}].num1`,{ initialValue: text || false })(<FormControlLabel
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
            label="1"/>
        )}
      </>),
      },
      {
            key: 'num2',
            title: '类别2',
            dataIndex: 'num2',
          render: (text, row, index) => (<>
        {getFieldDecorator(`params[${getKey(index)}].num2`,{ initialValue: text || false })(<FormControlLabel
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
            label="2"/>
        )}
      </>),
      },
      {
            key: 'num3',
            title: '类别3',
            dataIndex: 'num3',
          render: (text, row, index) => (<>
        {getFieldDecorator(`params[${getKey(index)}].num3`,{ initialValue: text || false })(<FormControlLabel
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
            label="3"/>
        )}
      </>),
      },
      {
            key: 'num4',
            title: '类别4',
            dataIndex: 'num4',
          render: (text, row, index) => (<>
        {getFieldDecorator(`params[${getKey(index)}].num4`,{ initialValue: text || false })(<FormControlLabel
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
            label="4"/>
        )}
      </>),
      },
      {
            key: 'num5',
            title: '类别5',
            dataIndex: 'num5',
          render: (text, row, index) => (<>
        {getFieldDecorator(`params[${getKey(index)}].num5`,{ initialValue: text || false })(<FormControlLabel
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
            label="5"/>
        )}
      </>),
      },
      {
            key: 'num6',
            title: '类别6',
            dataIndex: 'num6',
          render: (text, row, index) => (<>
        {getFieldDecorator(`params[${getKey(index)}].num6`,{ initialValue: text || false })(<FormControlLabel
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
            label="6"/>
        )}
      </>),
      },
      {
            key: 'num7',
            title: '类别7',
            dataIndex: 'num7',
          render: (text, row, index) => (<>
        {getFieldDecorator(`params[${getKey(index)}].num7`,{ initialValue: text || false })(<FormControlLabel
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
            label="7"/>
        )}
      </>),
      },
      {
            key: 'num8',
            title: '类别8',
            dataIndex: 'num8',
          render: (text, row, index) => (<>
        {getFieldDecorator(`params[${getKey(index)}].num8`,{ initialValue: text || false })(<FormControlLabel
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
            label="8"/>
        )}
      </>),
      },
        {
            key: 'num9',
            title: '类别9',
            dataIndex: 'num9',
            render: (text, row, index) => (<>
          {getFieldDecorator(`params[${getKey(index)}].num9`,{ initialValue: text || false })(<FormControlLabel
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
            label="9"/>
        )}
          <Button.Group>
            <Button type="danger" onClick={() => remove(index)}>
              Delete
            </Button>
          </Button.Group>
        </>),
        },
    ];
    return (<>
      <ReactDragListView onDragEnd={(oldIndex, newIndex) => move(oldIndex, newIndex)} handleSelector={'i[aria-label="icon: drag"]'}>
        <Table columns={columns} dataSource={list} rowKey={(r, index) => getKey(index).toString()} pagination={false} className={classes.table11}/>
      </ReactDragListView>
      {/* <Button className={classes.btn} onClick={submit}>
        最佳分配
      </Button> */}
      <Button className={classNames(classes.btn,classes.po)} onClick={submit}>
        提交
      </Button>
      {/* <div style={{ whiteSpace: 'pre' }}>{result && `content: ${result}`}</div> */}
    </>);
};

const SettableList = Form.create()(Settable);

export default function Mincost_device(propsdata){
  const classes = useStyles();
  const childRef = useRef();
  const [dragging, setDragging] = useState([]);
  const [datasize, setdatasize] = useState(propsdata.checkedvalue === 1 ? 60000:50000)
//   const { list, remove, getKey, move, push } = useDynamicList([
//     { name: 'my bro', num: '23' },
//     { name: 'my sis', num: '21'},
//   ]);
  const getDragProps = useDrag({
      onDragStart: (data) => {
          console.log(dragging);
      },
    //   onDragEnd: () => {
    //       setDragging(null);
    //   },
  });

  const [props, { isHovering }] = useDrop({
      onDom: (content, e) => {
        dragging.push(content);
        setDragging(dragging);
        console.log(dragging);
        childRef.current.pushcontent(content);
        // push({ name: `${content}`, num: '0' });
        alert(`设备： ${content} 已经添加`);
      },
  });
  return (
      
  <div>
      <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
            <div  className={classes.boxcon} {...props}>
                {isHovering ? '松开添加' : (<AddIcon/>)}
            </div>
        </Grid>
        <Grid item xs={1} />
        {box.map((device,key) => (
            <div className={classes.box} key={key}>
            <div style={{marginLeft:'15px'}}>
                {device.name}
            </div>
            <div>
                {device.tip}
            </div>
                <div {...getDragProps(device.name)} className={classes.boxn}>
                <img src={device.img} className={classes.img} />
                </div>
        </div>))}
      </Grid>
    </div>
    <Grid container spacing={1}>
      <Grid item xs={1} md={1}></Grid>
        <Grid item xs={10} md={10}>
        <Typography variant="h6" gutterBottom>
        数据分片分配：
        </Typography>
        <Alert severity="warning">
            数据大小为<strong>{propsdata.checkedvalue === 1 ? 60:50}K</strong>,数据分组为<strong>{propsdata.another.group}</strong>,
            每个分片大小为<strong>{propsdata.another.group === '' ? 'None':datasize/propsdata.another.group}</strong>
        </Alert>        
        </Grid>
        <Grid item xs={12} md={12}>
            <SettableList cRef={childRef} {...propsdata}/>
        </Grid>
      </Grid>
  </div>);
};
