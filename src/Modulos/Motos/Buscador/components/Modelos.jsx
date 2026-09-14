import { useEffect, useState } from "react";
import { traerModelosPorId } from "../services/buscador.services";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

// Recibimos el idMarca y la función para volver desde el padre
const Modelos = ({ idMarca, volverAtras, onSeleccionar }) => {
  const [modelos, setModelos] = useState([]);

  useEffect(() => {
    const cargarModelos = async () => {
      // Usamos el idMarca que nos llega por props
      const modelosEncontrados = await traerModelosPorId(idMarca);
      setModelos(modelosEncontrados.results || modelosEncontrados);
    };
    cargarModelos();
  }, [idMarca]); // Agregamos idMarca como dependencia

  return (
    <Container className="py-4">
      <Button variant="outline-secondary" className="mb-4" onClick={volverAtras}>
        ← Volver a Marcas
      </Button>
      
      <h3 className="text-secondary mb-4">Modelos Disponibles</h3>
      
      <Row className="g-4 mb-5">
        {/* CORRECCIÓN ACÁ: Usamos paréntesis () para el retorno implícito del map */}
        {modelos?.map((mod) => (
          <Col xs={12} md={6} lg={4} key={mod._id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="fs-4 text-primary"> {mod.nombre} </Card.Title>
                <div className="mt-3 text-end">
                   {/* Próximo paso: Agregar el onClick para ir a Versiones */}
                   <Button variant="primary" size="sm" className="text-white" onClick={() => onSeleccionar(mod._id)} >Ver Versiones</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Modelos;