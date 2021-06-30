import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default function BasicTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><strong>设备名称</strong></TableCell>
            <TableCell align="center"><strong>{props.lable === 'FLAP'?'节点数量':'类别设置'}</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.parametervalue ===undefined ? (<div />):   
          (props.parametervalue.map((row) => (
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