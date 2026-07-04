import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import AppRoutes from './routers'
import Loader from './components/loader/Loader'

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          //radius
          style: {
            borderRadius: '8px',
            fontSize: '14px',
          },
        }}
      />
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </>
  )
}
