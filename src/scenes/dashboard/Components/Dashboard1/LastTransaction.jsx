import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow, Chip, Avatar, Box, useTheme } from '@mui/material';

const transactions = [
    {
        logo: 'https://demos.pixinvent.com/vuexy-nextjs-admin-template/demo-1/images/logos/visa.png',
        cardType: 'Credit Card',
        cardLastFourDigits: '4230',
        date: '17 Mar 2024',
        status: 'Verified',
        trend: '+$1,678', // Assuming success is the color for 'Verified'
      },
];

const LastTransactionCard = () => {
    const theme = useTheme();
    return (
        <Paper sx={{ 
            borderRadius: '16px', 
            overflow: 'hidden', 
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            backgroundColor: theme.palette.background.paper, }}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6">Last Transaction</Typography>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>CARD</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell align="right">TREND</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={transaction.logo} 
                      alt={transaction.cardType}
                      sx={{ width: 30, height: 10, borderRadius: '4px', marginRight: '10px' }} // Adjust size and borderRadius as needed
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body2" component="span" sx={{ lineHeight: '1' }}>{'*' + transaction.cardLastFourDigits}</Typography>
                      <Typography variant="body2" color="text.secondary" component="span" sx={{ lineHeight: '1' }}>{transaction.cardType}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Chip 
                      label={transaction.status} 
                      color={transaction.status === 'Verified' ? 'success' : transaction.status === 'Rejected' ? 'error' : 'default'}
                      size="small" 
                      sx={{ height: '24px' }} // Adjust the height of the chip if needed
                    />
                  </TableCell>
                  <TableCell align="right">{transaction.trend}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    };

export default LastTransactionCard;
