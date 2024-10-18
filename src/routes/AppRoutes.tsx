// src/routes/AppRoutes.tsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardRoutes } from '../features/dashboard';
import { ItemRoutes } from '../features/Item';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/*" element={<DashboardRoutes />} />
          <Route path="/pokemon/*" element={<ItemRoutes />} />
          {/* Redirigir al Dashboard si la ruta no existe */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;