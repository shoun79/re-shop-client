
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './routes/Routes'
import AuthProvider from './providers/AuthProvider'

function App() {


  return (
    <div className='max-w-screen-xl	 mx-auto'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  )
}

export default App




