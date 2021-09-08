/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { Icon } from '@iconify/react';
import windowsFilled from '@iconify/icons-ant-design/windows-filled';
import Filter3Icon from '@material-ui/icons/Filter3';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
import React, { useState, useEffect } from 'react';
import ElevageServices from '../../../services/ElevageServices';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 1723315;

export default function AppItemOrders() {


  const [nb, setNb] = useState('');
  
    useEffect(() => {
      retrievePoulette();
    }, []);
  
    const retrievePoulette = () => {
      ElevageServices.getPondeuseII()
        .then(response => {
          setNb(response.data.quantité);
        })
        .catch(e => {
          console.log(e);
        });
    };
    
  return (
    <RootStyle>
      <IconWrapperStyle>
      <Filter3Icon/>
      </IconWrapperStyle>
      <Typography variant="h3">{fNumber(nb)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
      Stock nourriture pondeuse II
      </Typography>
    </RootStyle>
  );
}
