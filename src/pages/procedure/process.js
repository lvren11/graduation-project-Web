import React from "react";
import ProBLAP from './blap';
import FedIID from './FedIID';
import FedNONIID from './FedNONIID';
import FedMin from './FedMin';

export default function Process(props) {


  return (
    <div>
      {
        props.location.type === 2 ? (props.location.datac === 'Non-IID' ? <FedNONIID {...props} />:<FedIID {...props} />):(props.location.datac === 'Non-IID' ? <FedMin {...props} />:<ProBLAP {...props}/>)
      }
    </div>
  );
}