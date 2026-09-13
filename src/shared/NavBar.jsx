import { useContext } from 'react';
import { Navbar, Container, Nav, Button, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UsuarioContexto } from '../Context/UsuarioContext';

const NavBar = () => {

    const {logueado, setLogueado} = useContext(UsuarioContexto)

    const salir = () => {
        setLogueado(false)
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
            <NavLink className='nav-link' to="/">
                Inicio
            </NavLink>
            <NavLink className='nav-link' to="" >
                Buscar
            </NavLink>
            <NavLink className='nav-link' >
                Comparativa
            </NavLink>
            <NavLink className='nav-link' >
                Presupuesto
            </NavLink>
            <NavLink className='nav-link' >
                Favoritos
            </NavLink>
            <Button as={Link} to="/login" variant="danger" className="px-4">
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