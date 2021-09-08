/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { Icon } from '@iconify/react';
import appleFilled from '@iconify/icons-ant-design/apple-filled';
import Filter2Icon from '@material-ui/icons/Filter2';
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
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
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
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------



export default function AppNewUsers() {

  const [nb , setNb] = useState("")
  
    useEffect(() => {
      retrievePoulette();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const retrievePoulette = () => {
      ElevageServices.getPondeuseI()
        .then(response => {
          setNb(response.data.quantité);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

  return (
    <RootStyle>
      <IconWrapperStyle>
      <Filter2Icon/>
      </IconWrapperStyle>
      <Typography variant="h3">{fNumber(nb)} g</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
      Stock nourriture pondeuse I
      </Typography>
    </RootStyle>
  );
}
