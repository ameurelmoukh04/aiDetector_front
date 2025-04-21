import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/homePage/Home'
import Login from './components/login/Login'
import Register from './components/login/Register'
import CheckText from './components/checkText/CheckText'
import AdminDashboard from './components/AdminDashboard'
import AdminRoute from './components/AdminrRoute'
import ScanPdf from './components/scanPdf/ScanPdf'
import Split from './components/checkText/Split'
import GoogleAuthCallback from './components/login/GoogleAuthCallback'
import Pricing from './components/Pricing'
import ThankYouPage from './components/ThankYouPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/check' element={<CheckText/>}/>
        <Route path='/scanpdf' element={<ScanPdf/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/split' element={<Split/>}/>
        <Route path='/admin' element={<AdminRoute><AdminDashboard /></AdminRoute>}/>
        <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/success" element={<ThankYouPage />} />
      </Routes>
    
    </BrowserRouter>
    
  </StrictMode>,
)
