import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import CoreLayout from '../../layouts/CoreLayout';

const DashboardPage = lazy(() => import('./pages/Dashboard'));

const DashboardRoutes = () => {
  const routes = [
    {
      path: '/',
      element: (
        <CoreLayout>
          <DashboardPage />
        </CoreLayout>
      ),
    },
  ];

  const element = useRoutes(routes);

  return <>{element}</>;
};

export default DashboardRoutes;