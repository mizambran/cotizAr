import { useEffect, useState } from "react";
import { traerModelosYVersiones } from "../services/buscador.services";
import { Container, Table, Button, Form, Row, Col, Modal } from "react-bootstrap";
import DetalleCotizacion from "./DetalleCotizacion";

const ModelosConVers = ({ idMarca, volverAtras }) => {
  const [modYVers, setModYVers] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  
  // Estados para controlar la Modal
  const [mostrarModal, setMostrarModal] = useState(false);
  const [versionSeleccionada, setVersionSeleccionada] = useState(null);

  useEffect(() => {
    const cargarTabla = async () => {
      const datosEncontrados = await traerModelosYVersiones(idMarca);
      // Nota: según el backend que armamos, la propiedad era "resultados"
      setModYVers(datosEncontrados.resultados || datosEncontrados.results || []);
    };
    cargarTabla();
  }, [idMarca]);

  // Aplano el array pero sin perder al padre Modelo
  const filasFiltradas = [];
  modYVers.forEach((modelo) => {
    modelo.versiones?.forEach((version) => {
      if (version.nombre?.toLowerCase().includes(terminoBusqueda.toLowerCase())) {
        filasFiltradas.push({
          idModelo: modelo._id,
          nombreModelo: modelo.nombre,
          idVersion: version._id,
          nombreVersion: version.nombre,
        });
      }
    });
  });

  const abrirModal = (idVersion) => {
    setVersionSeleccionada(idVersion);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setVersionSeleccionada(null);
  };

  return (
    <Container className="py-4">
      <Button variant="outline-secondary" className="mb-4" onClick={volverAtras}>
        ← Volver a Marcas
      </Button>

      <h3 className="text-secondary mb-4">Nuestro catálogo</h3>

      {/* Buscador de Versiones */}
      <Row className="mb-4">
        <Col md={8} lg={6}>
          <Form.Control
            type="text"
            placeholder="Buscar por versión..."
            size="lg"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
          />
        </Col>
      </Row>

      {/* Tabla de Resultados */}
      <div className="table-responsive shadow-sm rounded mb-5">
        <Table hover className="align-middle bg-white mb-0">
          <thead className="bg-light text-primary">
            <tr>
              <th className="py-3 px-4">Modelo</th>
              <th className="py-3 px-4">Versión</th>
              <th className="py-3 px-4 text-center">Cotización</th>
            </tr>
          </thead>
          <tbody>
            {filasFiltradas.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-muted">
                  No se encontraron versiones que coincidan con tu búsqueda.
                </td>
              </tr>
            ) : (
              filasFiltradas.map((fila) => (
                <tr key={fila.idVersion}>
                  <td className="fw-bold text-secondary px-4">{fila.nombreModelo}</td>
                  <td className="text-muted px-4">{fila.nombreVersion}</td>
                  <td className="text-center px-4">
                    <Button
                      variant="info"
                      size="sm"
                      className="text-white fw-bold px-3"
                      onClick={() => abrirModal(fila.idVersion)}
                    >
                      Ver Precio
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
      <DetalleCotizacion mostrarModal={mostrarModal} cerrarModal={cerrarModal} versionSeleccionada={versionSeleccionada} />
    </Container>
  );
};

export default ModelosConVers;