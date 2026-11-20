import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Inicio from './pages/Inicio'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import BuscadorMoto from './Modulos/Motos/Buscador/pages/BuscadorMoto'
import NavBar from './shared/NavBar'
import Footer from './shared/Footer'
import Error404 from './pages/Error404'
import ComparadorMoto from './Modulos/Motos/Comparador/pages/ComparadorMoto'
import BuscadorAuto from './Modulos/Autos/Buscador/pages/BuscadorAuto'
import PresupuestoAuto from './Modulos/Autos/Presupuesto/pages/PresupuestoAuto'
import ComparadorAuto from './Modulos/Autos/Comparador/components/ComparadorAuto'
import PresupuestoMoto from './Modulos/Motos/Presupuesto/pages/PresupuestoMoto'


function App() {

  return (
    <>
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element={<Inicio />} /> 
      <Route path='/login' element={<Login />} /> 
      <Route path='/registro' element={<Register />} />
      <Route path='motos/buscador/' element={<BuscadorMoto />} /> 
      <Route path='autos/buscador/' element={<BuscadorAuto />} />
      <Route path='motos/presupuesto/' element={<PresupuestoMoto />} /> 
      <Route path='autos/presupuesto/' element={<PresupuestoAuto />} /> 
      <Route path='motos/comparador/' element={<ComparadorMoto />} />
      <Route path='autos/comparador/' element={<ComparadorAuto />} />
      <Route path='*' element={<Error404 />} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
