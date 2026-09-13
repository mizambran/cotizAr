import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: '80vh' }}>
      <h1 className="display-1 fw-bold text-primary" style={{ fontSize: '8rem' }}>404</h1>
      <h2 className="text-secondary mb-4">Página no encontrada</h2>
      <p className="text-muted mb-5 fs-5">
        La ruta que estás buscando no existe o fue movida a otra parte.
      </p>
      <Button as={Link} to="/" variant="info" className="text-white px-5 py-3 fw-bold shadow-sm">
        Volver al Inicio
      </Button>
    </Container>
  );
};

export default Error404;