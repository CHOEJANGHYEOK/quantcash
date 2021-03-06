import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import React, { useState } from 'react';

export const RowByDateWithLogTable = ({ transaction_log, daily_profit, mode }) => {
  const [rowExpanded, setRowExpanded] = useState(false);

  return (
    <>
      <TableRow key={mode === 'f' ? transaction_log.date : daily_profit.date}>
        <TableCell component="th" scope="row">
          <IconButton
            className="toggle-expand"
            size="small"
            onClick={() => {
              setRowExpanded(!rowExpanded);
            }}
          >
            {rowExpanded ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
          </IconButton>
        </TableCell>
        {/*  Date	Profit(%)	Bought Sold*/}
        <TableCell component="th" scope="row">
          {mode === 'f' ? transaction_log.date : daily_profit.date}
        </TableCell>
        <TableCell align="right">{mode === 'f' ? daily_profit : daily_profit.profit}</TableCell>
        <TableCell align="right">{transaction_log.buy.length}</TableCell>
        <TableCell align="right">{transaction_log.sell.length}</TableCell>
      </TableRow>
      <TableRow key={(mode === 'f' ? transaction_log.date : daily_profit.date) + '_expanded'}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={rowExpanded} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Buy
              </Typography>
              <Table size="small" style={{ width: '80%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Company</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transaction_log.buy.map((e, i) => (
                    <TableRow key={i}>
                      <TableCell>{e.name}</TableCell>
                      <TableCell>{e.amount}</TableCell>
                      <TableCell>{e.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                style={{ marginTop: 16 }}
              >
                Sell
              </Typography>
              <Table size="small" style={{ width: '80%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Company</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transaction_log.sell.map((e, i) => (
                    <TableRow key={i}>
                      <TableCell>{e.name}</TableCell>
                      <TableCell>{e.amount}</TableCell>
                      <TableCell>{e.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
