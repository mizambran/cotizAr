import { useEffect, useState } from "react";
import { traerValuacionesPorId } from "../services/buscador.services";
import { Modal, Card, Button, Row, Col, Spinner, Table } from "react-bootstrap";

const DetalleCotizacion = ({ mostrarModal, cerrarModal, versionSeleccionada }) => {
  const [valuaciones, setValuaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    if (mostrarModal && versionSeleccionada) {
      const cargarCotizacion = async () => {
        setCargando(true);
        const datos = await traerValuacionesPorId(versionSeleccionada);
        
        const arrayValuaciones = Array.isArray(datos) ? datos : (datos.results || []);
        const valuacionesOrdenadas = [...arrayValuaciones].sort((a, b) => b.year - a.year);
        
        setValuaciones(valuacionesOrdenadas);
        setCargando(false);
      };
      cargarCotizacion();
    } else {
      // Limpiamos los datos cuando se cierra la modal para que no muestre info vieja la próxima vez
      setValuaciones([]);
    }
  }, [mostrarModal, versionSeleccionada]);

  return (
    <Modal show={mostrarModal} onHide={cerrarModal} size="lg" centered  >
      <Modal.Header closeButton className="border-0 pb-0"></Modal.Header>
      <Modal.Body className="pt-0 px-md-4 pb-4">
        
        {cargando ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="info" />
            <p className="text-muted mt-3">Calculando cotización oficial...</p>
          </div>
        ) : valuaciones.length === 0 ? (
          <h4 className="text-center text-muted my-5">No se encontraron cotizaciones para esta versión.</h4>
        ) : (
          <Card className="shadow-none border-0 w-100 mx-auto" style={{ maxWidth: "600px" }}>
            <Card.Body className="p-2 p-md-4 text-center">
              <h6 className="text-uppercase text-muted mb-4 fw-bold">Cotización Oficial</h6>
              
              {/* VALUACIÓN PRINCIPAL (El año más reciente del array) */}
              <div className="bg-light p-4 rounded-3 mb-4 border border-info">
                <span className="d-block text-muted mb-2">
                  Valor de Referencia - Año {valuaciones[0].year}
                </span>
                <span className="display-4 fw-bold text-success">
                   {(valuaciones[0].price * valuaciones[0].exchange_rate).toLocaleString('es-AR', { style:"currency", currency:"ARS" })}
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
                             {precioCalculado.toLocaleString('es-AR', { style:"currency", currency:"ARS" })}
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
                    ⭐ Favorito
                  </Button>
                </Col>
                <Col xs={6}>
                  <Button variant="danger" className="w-100 fw-bold" onClick={cerrarModal}>
                    Cerrar
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DetalleCotizacion;