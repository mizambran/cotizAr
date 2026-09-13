import { useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { UsuarioContexto } from '../Context/UsuarioContext';

const NavBar = () => {

    const {logueado, setLogueado} = useContext(UsuarioContexto)

    const navegacion = useNavigate()
    const salir = () => {
        setLogueado(false)
        navegacion('/')
    }

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3" style={{position:"sticky", top:0, zIndex:9999}} >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-primary">
          CotizAr
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-publico" />
        <Navbar.Collapse id="navbar-publico" className="justify-content-end">
          {logueado ? (
            <Nav className="gap-3">
            <NavLink className='nav-link' to={'/'} >
                Inicio
            </NavLink>
            <NavLink className='nav-link' to={'/buscador'} >
                Buscar
            </NavLink>
            <NavLink className='nav-link' to={'/comparador'} >
                Comparativa
            </NavLink>
            <NavLink className='nav-link' to={'/presupuesto'} >
                Presupuesto
            </NavLink>
            <NavLink className='nav-link' to={'/favoritos'} >
                Favoritos
            </NavLink>
            <Button variant="danger" className="px-4" onClick={salir} >
              Salir
            </Button>
          </Nav>
          ) : (
            <Nav className="gap-3">
            <Button  className="nav-link px-4" href='#contacto' >
              Contacto
            </Button>
            <Button as={Link} to="/login" variant="primary" className="px-4">
              Ingresar
            </Button>
          </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;