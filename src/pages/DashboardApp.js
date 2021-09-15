// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

import ElevageServices from '../services/ElevageServices';
// components
import Page from '../components/Page';
import {
  AppNewUsers,
  AppItemOrders,
  AppWeeklySales,
  AppCurrentVisits,
  AppWebsiteVisits
} from '../components/_dashboard/app';

import CSRFToken from './CSRFToken';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="KAIROS | Elevage">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Bienvenue</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppItemOrders />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
