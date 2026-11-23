import { useEffect, useState } from "react";
import { traerValuacionesPorId } from "../services/buscador.services";
import { Modal, Button, Row, Col, Spinner, Table } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { guardarNuevoFavorito } from "../../Favoritos/services/favoritos.services";
import Swal from "sweetalert2";

const DetalleCotizacion = ({ mostrarModal, cerrarModal, versionSeleccionada }) => {
  const [valuaciones, setValuaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (mostrarModal && versionSeleccionada) {
      const cargarCotizacion = async () => {
        setCargando(true);
        const datos = await traerValuacionesPorId(versionSeleccionada);
        
        const arrayValuaciones = Array.isArray(datos) ? datos : (datos.results || []);
        const valuacionesValidas = arrayValuaciones?.filter(v => v.price > 0)
        const valuacionesOrdenadas = [...valuacionesValidas].sort((a, b) => b.year - a.year);
        
        setValuaciones(valuacionesOrdenadas);
        setCargando(false);
      };
      cargarCotizacion();
    } else {
      setValuaciones([]);
    }
  }, [mostrarModal, versionSeleccionada]);

  // Para agregar en favoritos 
  const handleAgregarFavorito = async () => {
    try {
      // Tomamos la valuación más reciente (la primera del array ordenado) para el subtítulo
      const masReciente = valuaciones[0];
      const precioFormateado = masReciente
        ? Number(masReciente.precioFinal).toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })
        : "";

      // Armamos el título con los datos que tengas disponibles en la modal
      const tituloVehiculo =
        masReciente?.marcaNombre && masReciente?.modeloNombre
          ? `${masReciente.marcaNombre} ${masReciente.modeloNombre} ${masReciente.versionNombre || ""}`.trim()
          : "Cotización guardada";

      const payloadFavorito = {
        categoria: "moto", 
        tipo: "cotizacion",
        titulo: tituloVehiculo,
        subtitulo: masReciente ? `Año ${masReciente.year} - ${precioFormateado}` : "",
        versiones_ids: [versionSeleccionada],
      };

      await guardarNuevoFavorito(payloadFavorito);

      Swal.fire({
        icon: "success",
        title: "¡Añadido a Favoritos!",
        text: "Podés consultarlo cuando quieras desde la sección Favoritos.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", "No se pudo guardar la cotización en favoritos.", "error");
    }
  };

  return (
    <Modal 
      show={mostrarModal} 
      onHide={cerrarModal} 
      size="md" 
      centered 
      scrollable 
      style={{ zIndex: 1060 }}
    >
      <Modal.Header closeButton className="border-0 pb-1">
        <Modal.Title className="w-100 text-center text-uppercase text-muted fs-5 fw-bold ps-4">
          Cotización
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-1 px-3 px-md-4 text-center">
        {cargando ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="info" />
            <p className="text-muted mt-3">Calculando cotización...</p>
          </div>
        ) : valuaciones.length === 0 ? (
          <h5 className="text-center text-muted my-5">No se encontraron cotizaciones para esta versión.</h5>
        ) : (
          <>
            <p className="text-muted small mb-3">
              Recordá que las cotizaciones son aproximadas, pueden variar según el estado del vehículo, km, etc.
            </p>

            {/* VALUACIÓN PRINCIPAL (El año más reciente del array) */}
            <div className="bg-light p-3 rounded-3 mb-3 border border-info">
              <span className="d-block text-muted small mb-1">
                Año más reciente {valuaciones[0].year}
              </span>
              <span className="fs-2 fw-bold text-success">
                {(valuaciones[0].price * valuaciones[0].exchange_rate).toLocaleString('es-AR', { style: "currency", currency: "ARS" })}
              </span>
            </div>

            {/* HISTÓRICO POR AÑO */}
            <div className="table-responsive border rounded">
              <Table size="sm" hover className="align-middle text-start mb-0">
                <thead className="bg-light text-muted sticky-top">
                  <tr>
                    <th className="py-2 px-3">Año</th>
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
                          {precioCalculado.toLocaleString('es-AR', { style: "currency", currency: "ARS" })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </Modal.Body>

      {/* PIE FIJO SIEMPRE VISIBLE */}
      {!cargando && valuaciones.length > 0 && (
        <Modal.Footer className="border-0 pt-2 pb-3 px-3 px-md-4">
          <Row className="g-2 w-100 m-0">
            <Col xs={6} className="ps-0">
              <Button variant="warning" className="w-100 fw-bold" onClick={handleAgregarFavorito} >
                <FaStar /> Añadir a favoritos
              </Button>
            </Col>
            <Col xs={6} className="pe-0">
              <Button variant="danger" className="w-100 fw-bold" onClick={cerrarModal}>
                Cerrar
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default DetalleCotizacion;