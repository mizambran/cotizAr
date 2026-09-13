import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const manejarIngresoManual = (evento) => {
    evento.preventDefault();
    // Lógica para enviar email y contraseña a tu backend
    console.log("Iniciando sesión manualmente...");
  };

  const manejarExitoGoogle = (respuestaCredencial) => {
    // Aquí recibís el token de Google para mandarlo a tu backend
    console.log("Token de Google recibido:", respuestaCredencial);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-5">
              <h3 className="text-center text-primary mb-4 fw-bold">Iniciar Sesión</h3>
              
              <Form onSubmit={manejarIngresoManual}>
                <Form.Group className="mb-3" controlId="correo">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control type="email" placeholder="ejemplo@correo.com" required />
                </Form.Group>

                <Form.Group className="mb-4" controlId="contrasenia">
                  <div className="d-flex justify-content-between">
                    <Form.Label>Contraseña</Form.Label>
                    <Link to="/recuperar" className="text-decoration-none small text-info">¿Olvidaste tu contraseña?</Link>
                  </div>
                  <Form.Control type="password" placeholder="********" required />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 fw-bold mb-3">
                  Ingresar
                </Button>
              </Form>

              <div className="d-flex align-items-center my-3">
                <hr className="flex-grow-1" />
                <span className="mx-3 text-muted small">O ingresá con</span>
                <hr className="flex-grow-1" />
              </div>

              <div className="d-flex justify-content-center mb-4">
                <GoogleLogin
                  onSuccess={manejarExitoGoogle}
                  onError={() => console.log('Falló el inicio de sesión con Google')}
                  text="signin_with"
                  shape="rectangular"
                />
              </div>

              <div className="text-center mt-3">
                <span className="text-muted">¿No tenés cuenta? </span>
                <Link to="/registro" className="text-info text-decoration-none fw-bold">Registrate acá</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;