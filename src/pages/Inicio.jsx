import { useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMotorcycle, FaCarSide, FaTruckPickup } from 'react-icons/fa';
import { UsuarioContexto } from '../Context/UsuarioContext';
import BrandCarousel from '../shared/BrandCarousel';
import Footer from '../shared/Footer';
import NavBar from '../shared/NavBar';

const Inicio = () => {
  const { usuario, logueado, setLogueado } = useContext(UsuarioContexto);
  
  // Estado para controlar qué módulo de dashboard se muestra
  const [categoria, setCategoria] = useState('motos');

  const cambiarModo = () => {
    setLogueado(!logueado);
  };

  return (
    <div className="inicio-container">
      {/* Botón de testeo reubicado para no romper el layout móvil */}
      <Container className="d-flex justify-content-end pt-3">
        <Button variant={logueado ? "outline-danger" : "outline-primary"} size="sm" onClick={cambiarModo}> 
          {logueado ? "Simular Salir" : "Simular Entrar"} 
        </Button>
      </Container>

      {/* HEADER / HERO SECTION */}
      {!logueado && (
        <div className="hero-section text-center text-white py-5 mb-5" style={{ backgroundColor: '#1A5F7A' }}>
          <Container>
            <h1 className="display-4 fw-bold mb-3">
              ¿Querés cambiar de vehículo? <br /> Esto es lo que tenés que saber... <hr />
            </h1>
            <p className="lead mb-4">
              Datos actualizados del mercado automotor para que tomes la mejor decisión.
            </p>
            <div>
              <Button as={Link} to="/registro" variant="primary" size="lg" className="me-3 fw-bold text-white shadow">
                Registrarse
              </Button>
              <Button as={Link} to="/login" variant="outline-light" size="lg">
                Iniciar Sesión
              </Button>
            </div>
          </Container>
        </div>
      )}

      <Container>
        {logueado ? (
          /* ==========================================
             VISTA USUARIO LOGUEADO (Dashboard Rápido)
             ========================================== */
          <>
            <h3 className="text-center text-secondary mt-2 mb-4">¿Qué estás buscando hoy?</h3>
            
            {/* SELECTOR CENTRAL DE CATEGORÍAS */}
            <Row className="justify-content-center mb-5">
              <Col xs={12} md={8} lg={6} className="d-flex justify-content-center gap-3">
                <Button 
                  variant={categoria === 'motos' ? "primary" : "outline-secondary"} 
                  className="w-50 d-flex flex-column align-items-center justify-content-center py-3 shadow-sm transition"
                  onClick={() => setCategoria('motos')}
                >
                  <FaMotorcycle size={40} className="mb-2" />
                  <span className="fw-bold fs-5">Motos</span>
                </Button>
                
                <Button 
                  variant={categoria === 'autos' ? "primary" : "outline-secondary"} 
                  className="w-50 d-flex flex-column align-items-center justify-content-center py-3 shadow-sm transition"
                  onClick={() => setCategoria('autos')}
                >
                  <div>
                    <FaCarSide size={40} className="mb-2 me-2" />
                    <FaTruckPickup size={38} className="mb-2" />
                  </div>
                  <span className="fw-bold fs-5">Otros</span>
                </Button>
              </Col>
            </Row>

            {/* SECCIÓN 1: Tarjetas de Acción Dinámicas */}
            <Row className="mb-5 g-4 justify-content-center">
              <Col md={5} lg={4}>
                <Card className="h-100 shadow-sm border-0 border-bottom border-4 border-info">
                  <Card.Body className="text-center d-flex flex-column">
                    <Card.Title className="fw-bold">Buscar {categoria === 'motos' ? 'Moto' : 'Auto'}</Card.Title>
                    <Card.Text className="text-muted flex-grow-1">Navegá por nuestro catálogo completo.</Card.Text>
                    {/* El Link cambia dinámicamente según la categoría elegida */}
                    <Button variant="info" className="text-white fw-bold w-100" as={Link} to={`/${categoria}/buscador`}>
                      Buscar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={5} lg={4}>
                <Card className="h-100 shadow-sm border-0 border-bottom border-4 border-danger">
                  <Card.Body className="text-center d-flex flex-column">
                    <Card.Title className="fw-bold">Comparativa</Card.Title>
                    <Card.Text className="text-muted flex-grow-1">Enfrentá precios de distintos modelos.</Card.Text>
                    <Button variant="outline-danger" className="w-100" as={Link} to={`/${categoria}/comparador`}>
                      Comparar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={5} lg={4}>
                <Card className="h-100 shadow-sm border-0 border-bottom border-4 border-secondary">
                  <Card.Body className="text-center d-flex flex-column">
                    <Card.Title className="fw-bold">¿Qué compro con $?</Card.Title>
                    <Card.Text className="text-muted flex-grow-1">Ajustá tu presupuesto y mirá opciones.</Card.Text>
                    <Button variant="outline-secondary" className="w-100">
                      Calcular
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={5} lg={4}>
                <Card className="h-100 shadow-sm border-0 border-bottom border-4 border-warning">
                  <Card.Body className="text-center d-flex flex-column">
                    <Card.Title className="fw-bold">Mis Favoritos</Card.Title>
                    <Card.Text className="text-muted flex-grow-1">Tus cotizaciones guardadas.</Card.Text>
                    <Button variant="outline-warning" className="w-100 fw-bold">
                      Ver lista
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* SECCIÓN 2: Grilla de Marcas Dinámica */}
            <h4 className="m-4 text-secondary text-center">Marcas Destacadas de {categoria === 'motos' ? 'Motos' : 'Autos'}</h4>
            <Row className="g-3 mb-5 justify-content-center">
              {(categoria === 'motos' 
                ? ['Honda', 'Yamaha', 'Zanella', 'Motomel', 'Gilera', 'Corven'] 
                : ['Chevrolet', 'Volkswagen', 'Toyota', 'Ford', 'Renault', 'Fiat']
              ).map((marca) => (
                <Col xs={6} md={4} lg={2} key={marca}>
                  <Card className="text-center shadow-sm border-0 bg-light">
                    <Card.Body>
                      <h6 className="mb-0 text-dark">{marca}</h6>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        ) : (
          /* ==========================================
             VISTA PÚBLICA (Landing y Convencimiento)
             ========================================== */
          <>
            <Row className="mb-5 g-4 justify-content-center">
              <Col md={12}>
                <BrandCarousel />
              </Col>
              <Col md={5}>
                <Card className="h-100 shadow border-0 bg-light">
                  <Card.Body className="text-center p-4">
                    <h4 className="text-primary fw-bold">Explorar por Marca</h4>
                    <p className="text-muted">Conocé el catálogo completo de las principales marcas del país.</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={5}>
                <Card className="h-100 shadow border-0 bg-light">
                  <Card.Body className="text-center p-4">
                    <h4 className="text-primary fw-bold">Explorar por Modelo</h4>
                    <p className="text-muted">Buscá un vehículo específico y mirá su evolución de precio.</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="mb-5 align-items-center">
              <Col md={6}>
                <h3 className="text-secondary fw-bold">Comparativas claras y precisas</h3>
                <p className="text-muted">Analizamos el histórico de precios para mostrarte si una unidad está subiendo de valor o depreciándose, protegiendo así tu inversión.</p>
              </Col>
              <Col md={6}>
                <Card className="border-0 shadow-sm bg-light" style={{ height: '250px' }}>
                  <Card.Body className="d-flex align-items-center justify-content-center">
                    <span className="text-muted">[Espacio para el gráfico Recharts]</span>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="justify-content-center mb-5" id='contacto'>
              <Col md={6}>
                <Card className="border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <h4 className="text-center text-secondary mb-4 fw-bold">Dejanos tu comentario</h4>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Tu nombre" className="bg-light border-0" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Tu email" className="bg-light border-0" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Control as="textarea" rows={3} placeholder="¿Qué funcionalidad te gustaría ver?" className="bg-light border-0" />
                      </Form.Group>
                      <Button variant="primary" className="w-100 fw-bold">Enviar Mensaje</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Inicio;