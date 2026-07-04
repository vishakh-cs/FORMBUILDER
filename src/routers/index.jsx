import React from 'react'
import { Navigate } from 'react-router-dom'

const Dashboard = React.lazy(() => import('../pages/dashboard/FormBuilder'))

export const AppRouter = [
     {
        path: '/',
          element: <Navigate to="/dashboard" replace />,

     }
    ,{
        path: '/dashboard',
        element: <Dashboard />,
    }

]