import React, { useEffect, useState } from 'react';
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
        var b=[];
        for ( var i = 0; i < parseInt(props.select_nodes); i++) {
            b.push({'name':'client'+String(i+1),'num':parseInt(props.group)/parseInt(props.nodes),'smsize':parseInt(props.size)/parseInt(props.group)});
            setdata([...b]);
          } 
    },[])
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><strong>用户名称</strong></TableCell>
            <TableCell align="center"><strong>参与方NON—IID数据分片</strong></TableCell>
            <TableCell align="center"><strong>数据分片大小</strong></TableCell>
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
              <TableCell align="center"><strong >{row.smsize}</strong></TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}