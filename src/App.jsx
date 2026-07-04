import React from 'react'
import { AppRouter } from './routers'
import { useRoutes } from 'react-router-dom'

export default function App() {

  const AppRouterRoutes = ()=> {
    const router = useRoutes(AppRouter)
    return router
  }

  return (
   <AppRouterRoutes />
  )
}
