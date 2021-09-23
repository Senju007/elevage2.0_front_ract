import { Icon } from '@iconify/react';
import farmIcon from '@iconify/icons-maki/farm';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import bxFoodTag from '@iconify/icons-bx/bx-food-tag';
import waterIcon from '@iconify/icons-maki/water';
import shieldFill from '@iconify/icons-eva/shield-fill';
import costEstimateSolid from '@iconify/icons-teenyicons/cost-estimate-solid';
import chartDeathRateStableNegative from '@iconify/icons-healthicons/chart-death-rate-stable-negative';
import stockIcon from '@iconify/icons-vaadin/stock';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'elevage',
    path: '/dashboard/elevageList',
    icon: getIcon(farmIcon)
  },
  {
    title: 'nourriture',
    path: '/dashboard/nourritureList',
    icon: getIcon(bxFoodTag)
  },
  {
    title: 'eau',
    path: '/dashboard/nourritureList',
    icon: getIcon(waterIcon)
  },
  {
    title: 'Soins et prevention',
    path: '/dashboard/prevaccinList',
    icon: getIcon(shieldFill)
  },
  {
    title: 'estimations',
    path: '/dashboard/nourritureList',
    icon: getIcon(costEstimateSolid)
  },
  {
    title: 'taux de mortalité',
    path: '/dashboard/nourritureList',
    icon: getIcon(chartDeathRateStableNegative)
  },
  {
    title: 'stock',
    path: '/dashboard/stock',
    icon: getIcon(stockIcon)
  }
];

export default sidebarConfig;
