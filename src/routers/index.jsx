import { lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

const Dashboard = lazy(() => import('../pages/dashboard/FormBuilder'))

const routes = [
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    //procted routes
    // {
    //    <proctedRoutes />>
    // }
]

export default function AppRoutes() {
    return useRoutes(routes)
}
