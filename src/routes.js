import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import CSRFToken from './pages/CSRFToken';
import Elevage from './pages/elevage/ElevageList';
import Nourriture from './pages/nourriture/NourritureList';
import Prevaccin from './pages/pre-vaccination/PrevaccinList';
import DetailsNourriture from './pages/nourriture/DetailsNourriture';
import DetailsPrevaccin from './pages/pre-vaccination/DetailsPrevaccin';
import FormElevage from './pages/elevage/FormElevage';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'elevageList', element: <Elevage /> },
        { path: 'nourritureList', element: <Nourriture /> },
        { path: 'prevaccinList', element: <Prevaccin /> },
        { path: 'formElevage', element: <FormElevage /> },
        { path: 'DetailsNourriture/:id', element: <DetailsNourriture /> },
        { path: 'DetailsPrevaccin/:id', element: <DetailsPrevaccin /> },
        { path: 'csrf', element: <CSRFToken /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
