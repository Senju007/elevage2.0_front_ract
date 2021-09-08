import { Icon } from '@iconify/react';
import bugFilled from '@iconify/icons-ant-design/bug-filled';
import Filter4Icon from '@material-ui/icons/Filter4';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import React, { useState, useEffect } from 'react';
import { fNumber } from '../../../utils/formatNumber';
import ElevageServices from '../../../services/ElevageServices';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
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
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    theme.palette.error.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppBugReports() {
  const [nb, setNb] = useState('');

  useEffect(() => {
    retrievePoulette();
  }, []);

  const retrievePoulette = () => {
    ElevageServices.getPondeuseIII()
      .then((response) => {
        setNb(response.data.quantité);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Filter4Icon />
      </IconWrapperStyle>
      <Typography variant="h3">{fNumber(nb)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Stock nourriture pondeuse III
      </Typography>
    </RootStyle>
  );
}
