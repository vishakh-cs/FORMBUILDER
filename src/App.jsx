import { Suspense } from 'react'
import AppRoutes from './routers'
import Loader from './components/loader/Loader'

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <AppRoutes />
    </Suspense>
  )
}
