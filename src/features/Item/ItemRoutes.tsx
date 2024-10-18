import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import CoreLayout from '../../layouts/CoreLayout';

const ItemPage = lazy(() => import('./pages/ItemDescription'));

const ItemRoutes = () => {
  const routes = [
    {
      path: ':id',
      element: (
        <CoreLayout>
          <ItemPage />
        </CoreLayout>
      ),
    },
  ];

  const element = useRoutes(routes);

  return <>{element}</>;
};

export default ItemRoutes;