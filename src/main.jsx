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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/check' element={<CheckText/>}/>
        <Route path='/scanpdf' element={<ScanPdf/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin' element={<AdminRoute><AdminDashboard /></AdminRoute>}/>
      </Routes>
    
    </BrowserRouter>
    
  </StrictMode>,
)
