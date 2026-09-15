import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { traerMarcasPaginado } from "../services/buscador.services";


const Marcas = ({seleccionarMarca}) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [marcas, setMarcas] = useState([]);

  
  useEffect(() => {
      const cargarMarcas = async () => {
          const marcasEncontradas = await traerMarcasPaginado();
          if (marcasEncontradas && marcasEncontradas.results) {
              setMarcas(marcasEncontradas.results);
            }
        };
        
        cargarMarcas();
    }, []);
    
    const marcasFiltradas = marcas.filter((m) => {
        return m.nombre?.toLowerCase().includes(terminoBusqueda.toLowerCase())
    })
  

  return (
    <Container className="py-4">
      <h2 className="text-secondary mb-4">Buscador de Cotizaciones</h2>

      {/* Barra de Búsqueda y Controles de Vista */}
      <Row className="mb-4 align-items-center g-3">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Buscar marca..."
            size="lg"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
          />
        </Col>
      </Row>
      {/* Renderizado Condicional según la Vista Activa */}
      <Row className="g-4 mb-5">
        {marcasFiltradas?.map((marca) => (
          <Col xs={12} md={6} lg={4} key={marca._id}>
            <Card className="h-100 shadow-sm border-0 border-top border-4 border-info">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Subtitle className="text-muted">
                    
                  </Card.Subtitle>
                  <Button
                    variant="link"
                    className="p-0 text-secondary"
                    title="Agregar a Favoritos"
                  >
                    ⭐
                  </Button>
                </div>
                <Card.Title className="fs-4 text-primary">
                  {marca.nombre}
                </Card.Title>
                <Card.Text className="text-muted small mb-4"></Card.Text>
                <div className="d-flex justify-content-between align-items-end">
                  <Button variant="primary" size="sm" onClick={() => seleccionarMarca(marca._id)} >
                    Ver modelos
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Marcas;
