import { Icon } from '@iconify/react';
import farmIcon from '@iconify/icons-maki/farm';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import homeFill from '@iconify/icons-eva/home-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import bxFoodTag from '@iconify/icons-bx/bx-food-tag';
import configIcon from '@iconify/icons-file-icons/config';
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
    title: 'Pre-vaccination',
    path: '/dashboard/prevaccinList',
    icon: getIcon(configIcon)
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon(lockFill)
  },
  {
    title: 'csrf',
    path: '/dashboard/csrf',
    icon: getIcon(lockFill)
  }
];

export default sidebarConfig;
