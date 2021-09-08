/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import { Icon } from '@iconify/react';
import androidFilled from '@iconify/icons-ant-design/android-filled';
import Filter1Icon from '@material-ui/icons/Filter1';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import React, { useState, useEffect } from 'react';
import ElevageServices from '../../../services/ElevageServices';
import { fNumber } from '../../../utils/formatNumber';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------



export default function AppWeeklySales() {
  
const [nb , setNb] = useState("")

  useEffect(() => {
    retrievePoulette();
    console.log(localStorage.getItem("poulette"))
  }, []);

  const retrievePoulette = () => {
    ElevageServices.getPoulette()
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
       <Filter1Icon/>
      </IconWrapperStyle>
      <Typography variant="h3">{fNumber(nb)} g</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Stock nourriture poulette
      </Typography>
    </RootStyle>
  );
}
