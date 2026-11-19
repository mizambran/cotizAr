import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCarSide, FaEnvelope, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { useContext } from "react";
import { UsuarioContexto } from "../Context/UsuarioContext";

const Footer = () => {
  const {logueado} = useContext(UsuarioContexto)

  return (
    <footer
      className="text-white pt-5 pb-4 mt-auto border-top border-info border-opacity-25"
      style={{ backgroundColor: "#0A2530" }}
    >
      <Container>
        <Row className="gy-4 justify-content-between align-items-start">
          {/* COLUMNA 1: MARCA Y DESCRIPCIÓN */}
          <Col xs={12} md={5} className="text-center text-md-start">
            <div className="d-inline-flex align-items-center gap-2 mb-2">
              <span className="fw-bold fs-4 text-primary tracking-wide">
                CotizAr
              </span>
            </div>
            <p className="text-light opacity-75 small mb-0" style={{ maxWidth: "360px" }}>
              Plataforma de valuación, análisis de depreciación y gestión de cotizaciones para autos, camionetas y motos.
            </p>
          </Col>

          {/* COLUMNA 2: ACCESOS RÁPIDOS */}
          {/* <Col xs={12} sm={6} md={3} className="text-center text-md-start">
            <h6 className="text-uppercase fw-bold text-primary small mb-3">Acceso rápido</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small mb-0">
              <li>
                <Link to="/" className="text-light text-decoration-none opacity-75">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to={logueado ? "/autos/buscador" : "/login"} className="text-light text-decoration-none opacity-75">
                  Cotizador de Autos
                </Link>
              </li>
              <li>
                <Link to={logueado ? "/motos/buscador" : "/login"} className="text-light text-decoration-none opacity-75">
                  Cotizador de Motos
                </Link>
              </li>
              <li>
                <Link to={logueado ? "/autos/comparador" : "login"} className="text-light text-decoration-none opacity-75">
                  Comparador de Evolución
                </Link>
              </li>
            </ul>
          </Col>
 */}
          {/* COLUMNA 3: CONTACTO Y REDES */}
          <Col xs={12} sm={6} md={3} className="text-center text-md-end">
            <h6 className="text-uppercase fw-bold text-primary small mb-3">Contacto</h6>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mb-3">
              <a
                href="mailto:tuemail@gmail.com"
                className="btn btn-outline-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: "36px", height: "36px" }}
                title="Enviar correo"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: "36px", height: "36px" }}
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: "36px", height: "36px" }}
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: "36px", height: "36px" }}
                title="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
            <p className="text-light opacity-50 small mb-0">
              Tucumán, Argentina
            </p>
          </Col>
        </Row>

        <hr className="border-secondary opacity-25 my-4" />

        {/* BARRA INFERIOR DE COPYRIGHT */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center small text-light opacity-75 gap-2">
          <span>&copy; 2026 CotizAr. Todos los derechos reservados.</span>
          <span>
            Desarrollado por <strong className="text-white">Miguel Angel Zambrano</strong>
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;