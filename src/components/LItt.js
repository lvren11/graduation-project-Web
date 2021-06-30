import React,{ useEffect, useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default function BasicTable(props) {
    const [data,setdata] = useState([]);
    useEffect(() => {
        var a=[];
        for (var i of props.parametervalue) {
            var b=[];
            for (var k in i) {
                if(i[k] === true){
                    b.push(k.substr(k.length-1,1));
                }
            }
            a.push({'name':i['name'],'num':b});
            console.log(a)
            setdata([...a]);
          }
        // for (var cl = 0; cl <props.parametervalue.length ; cl ++ ){
        //     var b=[];
        //     for ( var i = 0; i < 10; i++) {
        //         var c = 'num'+String(i);
        //         if(props.parametervalue[cl].get(c) === true){
        //             b.append(String(i));
        //         }
        //     } 
        //     b.push({'name':props.parametervalue[cl].name,'num':b});
        //     setdata([...a]);
        // }
    },[])
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><strong>设备名称</strong></TableCell>
            <TableCell align="center"><strong>类别设置</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data ===undefined ? (<div />):   
          (data.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="center" component="th" scope="row" >
              <strong>{row.name}</strong>
              </TableCell>
              <TableCell align="center"><strong >{row.num}</strong></TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}