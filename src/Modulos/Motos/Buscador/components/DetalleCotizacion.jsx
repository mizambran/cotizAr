import { useEffect, useState } from "react";
import { traerValuacionesPorId } from "../services/buscador.services";
import { Container, Card, Button, Row, Col, Spinner, Table } from "react-bootstrap";

const DetalleCotizacion = ({ idVersion, reiniciar, volverAtras }) => {
  const [valuaciones, setValuaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarCotizacion = async () => {
      setCargando(true);
      const datos = await traerValuacionesPorId(idVersion);
      
      // La consola muestra que los datos vienen directo en un array (o dentro de results)
      const arrayValuaciones = Array.isArray(datos) ? datos : (datos.results || []);
      
      // Ordenamos las valuaciones de mayor a menor año para tener la más actual primero
      const valuacionesOrdenadas = arrayValuaciones.sort((a, b) => b.year - a.year);
      
      setValuaciones(valuacionesOrdenadas);
      setCargando(false);
    };
    cargarCotizacion();
  }, [idVersion]);

  return (
    <Container className="py-5 d-flex flex-column align-items-center">
      <div className="w-100 d-flex justify-content-between mb-4" style={{ maxWidth: "600px" }}>
        <Button variant="outline-secondary" onClick={volverAtras}>
          ← Cambiar Versión
        </Button>
        <Button variant="outline-primary" onClick={reiniciar}>
          Nueva Búsqueda 🔍
        </Button>
      </div>

      {cargando ? (
        <Spinner animation="border" variant="info" />
      ) : valuaciones.length === 0 ? (
        <h4 className="text-muted mt-4">No se encontraron cotizaciones para esta versión.</h4>
      ) : (
        <Card className="shadow-lg border-0 border-top border-5 border-info w-100" style={{ maxWidth: "600px" }}>
          <Card.Body className="p-4 p-md-5 text-center">
            <h6 className="text-uppercase text-muted mb-4 fw-bold">Cotización Oficial</h6>
            
            {/* VALUACIÓN PRINCIPAL (El año más reciente del array) */}
            <div className="bg-light p-4 rounded-3 mb-4 border">
              <span className="d-block text-muted mb-2">
                Valor de Referencia - Año {valuaciones[0].year}
              </span>
              <span className="display-4 fw-bold text-success">
                $ {(valuaciones[0].price * valuaciones[0].exchange_rate).toLocaleString('es-AR', { maximumFractionDigits: 0 })}
              </span>
            </div>

            {/* HISTÓRICO POR AÑO */}
            <h6 className="text-secondary mb-3 text-start mt-4">Valuaciones por Año</h6>
            <div className="table-responsive mb-4">
              <Table size="sm" hover className="align-middle text-start border mb-0">
                <thead className="bg-light text-muted">
                  <tr>
                    <th className="py-2 px-3">Año de Fabricación</th>
                    <th className="py-2 px-3 text-end">Valor de Mercado</th>
                  </tr>
                </thead>
                <tbody>
                  {valuaciones.map((val) => {
                    const precioCalculado = val.price * val.exchange_rate;
                    return (
                      <tr key={val._id}>
                        <td className="fw-medium px-3">{val.year}</td>
                        <td className="text-end fw-bold text-secondary px-3">
                          $ {precioCalculado.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>

            <Row className="g-3 mt-2">
              <Col xs={6}>
                <Button variant="outline-info" className="w-100 fw-bold">
                  ⭐ Guardar Favorito
                </Button>
              </Col>
              <Col xs={6}>
                <Button variant="primary" className="w-100 fw-bold">
                  Comparar
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default DetalleCotizacion;