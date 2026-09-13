import { useContext } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UsuarioContexto } from '../Context/UsuarioContext';
import BrandCarousel from '../shared/BrandCarousel';
import Footer from '../shared/Footer';
import NavBar from '../shared/NavBar';

const Inicio = () => {

  const {usuario, logueado, setLogueado} = useContext(UsuarioContexto)

  const cambiarModo = () => {
    setLogueado(!logueado)
  }


  return (
    <div className="inicio-container">
      <div>
          <Button variant='danger' onClick={cambiarModo} style={{position:'sticky'}} >Cambio Sesión</Button>
      </div>
      <NavBar />
      {/* HEADER / HERO SECTION */}
      {!logueado && (
        <div className="hero-section text-center text-white py-5 mb-5" style={{ backgroundColor: '#1A5F7A' }}>
        <Container>
          <h1 className="display-4 fw-bold mb-3">
            ¿Querés cambiar tu moto? <br /> Esto es lo que tenés que saber... <hr />
          </h1>
          <p className="lead mb-4">
            Datos actualizados del mercado automotor para que tomes la mejor decisión.
          </p>
          
          {!logueado && (
            <div>
              <Button as={Link} to="/registro" variant="info" size="lg" className="me-3 fw-bold text-white">
                Registrarse
              </Button>
              <Button as={Link} to="/login" variant="outline-light" size="lg">
                Iniciar Sesión
              </Button>
            </div>
          )}
        </Container>
      </div>
      )}

      <Container>
        {logueado ? (
          /* ==========================================
             VISTA USUARIO LOGUEADO (Dashboard Rápido)
             ========================================== */
          <>
            {/* SECCIÓN 1: 4 Tarjetas de Acción */}
            <h3 className="m-4 text-secondary">¿Qué necesitas hacer hoy?</h3>
            <Row className="mb-5 g-4">
              <Col md={5}>
                <Card className="h-100 shadow-sm border-info">
                  <Card.Body className="text-center">
                    <Card.Title>Buscar Moto</Card.Title>
                    <Card.Text>Navegá por nuestro catálogo completo.</Card.Text>
                    <Button variant="outline-info">Buscar</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={5}>
                <Card className="h-100 shadow-sm border-danger">
                  <Card.Body className="text-center">
                    <Card.Title>Comparativa</Card.Title>
                    <Card.Text>Enfrentá precios de distintos modelos.</Card.Text>
                    <Button variant="outline-danger">Comparar</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={5}>
                <Card className="h-100 shadow-sm border-secondary">
                  <Card.Body className="text-center">
                    <Card.Title>¿Qué compro con $?</Card.Title>
                    <Card.Text>Ajustá tu presupuesto y mirá opciones.</Card.Text>
                    <Button variant="outline-secondary">Calcular</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={5}>
                <Card className="h-100 shadow-sm border-warning">
                  <Card.Body className="text-center">
                    <Card.Title>Mis Favoritos</Card.Title>
                    <Card.Text>Tus cotizaciones guardadas.</Card.Text>
                    <Button variant="outline-warning">Ver lista</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* SECCIÓN 2: Grilla de Marcas */}
            <h3 className="m-4 text-secondary">Marcas Disponibles</h3>
            <Row className="g-3 mb-5">
              {/* Aquí irá un map() con paginación real. Mockup visual: */}
              {['Honda', 'Yamaha', 'Zanella', 'Motomel', 'Gilera', 'Corven'].map((marca) => (
                <Col xs={6} md={4} lg={2} key={marca}>
                  <Card className="text-center shadow-sm">
                    <Card.Body>
                      <h6 className="mb-0">{marca}</h6>
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
            {/* SECCIÓN 1: Tarjetas Marca / Modelo */}
            <Row className="mb-5 g-4 justify-content-center">
              <Col md={12} >
              <BrandCarousel />
              </Col>
              <Col md={5}>
                <Card className="h-100 shadow border-0 bg-light">
                  <Card.Body className="text-center p-4">
                    <h4 className="text-primary">Explorar por Marca</h4>
                    <p>Conocé el catálogo completo de las principales marcas del país.</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={5}>
                <Card className="h-100 shadow border-0 bg-light">
                  <Card.Body className="text-center p-4">
                    <h4 className="text-primary">Explorar por Modelo</h4>
                    <p>Buscá una moto específica y mirá su evolución de precio.</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* SECCIÓN 2: Gráfico Visual Mockup */}
            <Row className="mb-5 align-items-center">
              <Col md={6}>
                <h3 className="text-secondary">Comparativas claras y precisas</h3>
                <p>Analizamos el histórico de precios para mostrarte si una moto está subiendo de valor o depreciándose, protegiendo así tu inversión.</p>
              </Col>
              <Col md={6}>
                <Card className="border-0 shadow-sm bg-light" style={{ height: '250px' }}>
                  <Card.Body className="d-flex align-items-center justify-content-center">
                    <span className="text-muted">[Espacio para el gráfico Recharts]</span>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* SECCIÓN 3: Filtro Rápido (Presupuesto) */}
            <Row className="mb-5 justify-content-center">
              <Col md={8}>
                <Card className="shadow-sm border-info">
                  <Card.Body className="p-4">
                    <h4 className="text-center mb-4">¿Cuánto pensás invertir?</h4>
                    <Form className="d-flex gap-3">
                      <Form.Control type="number" placeholder="Ej: 2000000" />
                      <Form.Select>
                        <option>Marca Preferida (Opcional)</option>
                        <option>Honda</option>
                        <option>Yamaha</option>
                      </Form.Select>
                      <Button variant="info" className="text-white px-4">Buscar</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* SECCIÓN 4: Contacto */}
            <Row className="justify-content-center mb-5" id='contacto'>
              <Col md={6}>
                <Card className="border-0 shadow">
                  <Card.Body className="p-4">
                    <h4 className="text-center text-secondary mb-4">Dejanos tu comentario</h4>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Tu nombre" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Tu email" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Control as="textarea" rows={3} placeholder="¿Qué funcionalidad te gustaría ver?" />
                      </Form.Group>
                      <Button variant="primary" className="w-100">Enviar Mensaje</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
        <Footer />
    </div>
  );
};

export default Inicio;