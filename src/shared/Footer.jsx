import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="text-white py-4 mt-auto" style={{ backgroundColor: '#0A2530' }} >
      <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="mb-3 mb-md-0 text-center text-md-start">
          <span className="fw-bold fs-5 text-primary">CotizAr</span>
          <p className="mb-0 small">
            &copy; 2026 Todos los derechos reservados. <br />
            Dev Miguel Angel
          </p>
        </div>
        
        <div className="d-flex gap-4">
          <a href="mailto:tuemail@gmail.com" className="text-info text-decoration-none">
            Gmail
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-info text-decoration-none">
            LinkedIn
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-info text-decoration-none">
            Instagram
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;