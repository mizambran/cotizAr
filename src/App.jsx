import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Inicio from './pages/Inicio'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Buscador from './Modulos/Motos/Buscador/pages/Buscador'
import NavBar from './shared/NavBar'
import Footer from './shared/Footer'
import Error404 from './pages/Error404'
import Comparador from './Modulos/Motos/Comparador/pages/Comparador'


function App() {

  return (
    <>
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element={<Inicio />} /> 
      <Route path='/login' element={<Login />} /> 
      <Route path='/registro' element={<Register />} />
      <Route path='/buscador' element={<Buscador />} /> 
      <Route path='/comparador' element={<Comparador />} />
      <Route path='*' element={<Error404 />} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
