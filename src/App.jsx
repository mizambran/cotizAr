import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Inicio from './pages/Inicio'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Inicio />} /> 
      <Route path='/login' element={<Login />} /> 
      
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
