import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = () => {
  const manejarRegistro = (evento) => {
    evento.preventDefault();
    // Lógica para registrar usuario en el backend
    console.log("Enviando datos de registro...");
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow border-0">
            <Card.Body className="p-5">
              <h3 className="text-center text-primary mb-4 fw-bold">Crear Cuenta</h3>
              
              <Form onSubmit={manejarRegistro}>
                <Form.Group className="mb-3" controlId="nombreCompleto">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control type="text" placeholder="Juan Pérez" minLength={3} maxLength={50} required />
                  <Form.Text className="text-muted">
                    Debe tener entre 3 y 50 caracteres.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="correoRegistro">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control type="email" placeholder="ejemplo@correo.com" required />
                </Form.Group>

                <Form.Group className="mb-4" controlId="contraseniaRegistro">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="********" required />
                  <Form.Text className="text-muted">
                    Mínimo 8 caracteres, incluyendo una mayúscula, una minúscula y un número.
                  </Form.Text>
                </Form.Group>

                <Button variant="info" type="submit" className="w-100 fw-bold text-white mb-3">
                  Registrarme
                </Button>
              </Form>

              <div className="text-center mt-3">
                <span className="text-muted">¿Ya tenés cuenta? </span>
                <Link to="/login" className="text-primary text-decoration-none fw-bold">Iniciá sesión</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;