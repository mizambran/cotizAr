import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table, InputGroup, Spinner, Pagination, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaDollarSign, FaEraser, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { traerMotosPorPresupuesto } from "../services/presupuestoMoto.services";
import DetalleCotizacion from "../../Buscador/components/DetalleCotizacion";

const PresupuestoMoto = () => {
  const navigate = useNavigate();

  // Estados de filtros (presupuesto guarda solo dígitos puros: "3000000")
  const [presupuesto, setPresupuesto] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [version, setVersion] = useState("");

  // Estados de ordenamiento
  const [sortBy, setSortBy] = useState("precioFinal");
  const [sortOrder, setSortOrder] = useState("desc");

  // Estados de datos y paginación
  const [motos, setMotos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [cargando, setCargando] = useState(false);

  // Modal de detalle
  const [mostrarModal, setMostrarModal] = useState(false);
  const [versionSeleccionada, setVersionSeleccionada] = useState(null);

  const cargarResultados = async (
    pagina = 1,
    campoOrden = sortBy,
    dirOrden = sortOrder,
    filtroPresupuesto = presupuesto
  ) => {
    setCargando(true);
    try {
      const datos = await traerMotosPorPresupuesto({
        presupuesto: filtroPresupuesto,
        marca,
        modelo,
        version,
        page: pagina,
        limit: 20,
        sortBy: campoOrden,
        sortOrder: dirOrden,
      });
      setMotos(datos.results || []);
      setPaginaActual(datos.paginaActual || 1);
      setTotalPaginas(datos.totalPaginas || 1);
      setTotalRegistros(datos.totalRegistros || 0);
    } catch (error) {
      setMotos([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarResultados(1);
  }, []);

  // Formateo visual del input de dinero (limpia caracteres no numéricos)
  const handlePresupuestoChange = (e) => {
    const soloNumeros = e.target.value.replace(/\D/g, "");
    setPresupuesto(soloNumeros);
  };

  const presupuestoFormateado = presupuesto ? Number(presupuesto).toLocaleString("es-AR") : "";

  // Ordenar al hacer clic en una columna
  const handleOrdenar = (columna) => {
    const nuevaDireccion = sortBy === columna && sortOrder === "desc" ? "asc" : "desc";
    setSortBy(columna);
    setSortOrder(nuevaDireccion);
    cargarResultados(1, columna, nuevaDireccion);
  };

  const renderIconoOrden = (columna) => {
    if (sortBy !== columna) return <FaSort className="text-muted ms-1 opacity-50" />;
    return sortOrder === "asc" ? (
      <FaSortUp className="text-primary ms-1" />
    ) : (
      <FaSortDown className="text-primary ms-1" />
    );
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    cargarResultados(1);
  };

  const handleLimpiar = async () => {
    setPresupuesto("");
    setMarca("");
    setModelo("");
    setVersion("");
    setSortBy("precioFinal");
    setSortOrder("desc");

    setCargando(true);
    try {
      const datos = await traerMotosPorPresupuesto({
        page: 1,
        limit: 20,
        sortBy: "precioFinal",
        sortOrder: "desc",
      });
      setMotos(datos.results || []);
      setPaginaActual(1);
      setTotalPaginas(datos.totalPaginas || 1);
      setTotalRegistros(datos.totalRegistros || 0);
    } catch (error) {
      setMotos([]);
    } finally {
      setCargando(false);
    }
  };

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      cargarResultados(nuevaPagina);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Container className="py-4">
      <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>
        ← Volver a Inicio
      </Button>

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="text-secondary mb-1">¿Qué moto compro con mi presupuesto?</h2>
          <p className="text-muted mb-0">Ingresá tu monto máximo disponible y filtrá las opciones.</p>
        </div>
        <Badge bg="info" className="fs-6 px-3 py-2 text-white">
          {totalRegistros.toLocaleString("es-AR")} opciones encontradas
        </Badge>
      </div>

      {/* PANEL DE FILTROS */}
      <Form onSubmit={handleBuscar} className="bg-light p-3 p-md-4 rounded-3 shadow-sm mb-4 border">
        <Row className="g-3">
          <Col xs={12} md={6} lg={3}>
            <Form.Label className="fw-bold text-success small">Presupuesto Máximo (ARS)</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-success text-white border-success fw-bold">
                <FaDollarSign />
              </InputGroup.Text>
              <Form.Control
                type="text"
                inputMode="numeric"
                placeholder="Ej: 4.500.000"
                value={presupuestoFormateado}
                onChange={handlePresupuestoChange}
                className="border-success fw-bold text-dark"
              />
            </InputGroup>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <Form.Label className="fw-bold text-secondary small">Marca</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Honda, Yamaha..."
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            />
          </Col>

          <Col xs={12} md={6} lg={3}>
            <Form.Label className="fw-bold text-secondary small">Modelo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: CALLE DESDE 1 A 300, SCOOTER..."
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
            />
          </Col>

          <Col xs={12} md={6} lg={3}>
            <Form.Label className="fw-bold text-secondary small">Versión</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Twister, Tornado, Dominar, Rouser..."
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2 mt-3 pt-3 border-top">
          <Button variant="outline-secondary" type="button" onClick={handleLimpiar}>
            <FaEraser className="me-1" /> Limpiar
          </Button>
          <Button variant="primary" type="submit" className="fw-bold px-4">
            <FaSearch className="me-1" /> Buscar Opciones
          </Button>
        </div>
      </Form>

      {/* TABLA DE RESULTADOS CON COLUMNAS ORDENABLES */}
      <div className="table-responsive shadow-sm rounded mb-4 bg-white">
        <Table hover className="align-middle mb-0">
          <thead className="bg-light text-primary" style={{ userSelect: "none" }}>
            <tr>
              <th className="py-3 px-3" style={{ cursor: "pointer" }} onClick={() => handleOrdenar("marca")}>
                Marca {renderIconoOrden("marca")}
              </th>
              <th className="py-3 px-3" style={{ cursor: "pointer" }} onClick={() => handleOrdenar("modelo")}>
                Modelo {renderIconoOrden("modelo")}
              </th>
              <th className="py-3 px-3" style={{ cursor: "pointer" }} onClick={() => handleOrdenar("version")}>
                Versión {renderIconoOrden("version")}
              </th>
              <th className="py-3 px-3 text-center" style={{ cursor: "pointer" }} onClick={() => handleOrdenar("year")}>
                Año {renderIconoOrden("year")}
              </th>
              <th
                className="py-3 px-3 text-end"
                style={{ cursor: "pointer" }}
                onClick={() => handleOrdenar("precioFinal")}
              >
                Precio {renderIconoOrden("precioFinal")}
              </th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr>
                <td colSpan="5" className="text-center py-5">
                  <Spinner animation="border" variant="info" />
                  <p className="text-muted mt-2 mb-0">Ordenando y buscando motos...</p>
                </td>
              </tr>
            ) : motos.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-5 text-muted">
                  No se encontraron motos que coincidan con esos filtros. Probá aumentando el presupuesto.
                </td>
              </tr>
            ) : (
              motos.map((item) => (
                <tr
                  key={item._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setVersionSeleccionada(item.versionId);
                    setMostrarModal(true);
                  }}
                  title="Clic para ver histórico de precios"
                >
                  <td className="fw-bold text-dark px-3">{item.marcaNombre}</td>
                  <td className="fw-bold text-secondary px-3">{item.modeloNombre}</td>
                  <td className="text-muted px-3">{item.versionNombre}</td>
                  <td className="text-center px-3">
                    <Badge bg="secondary">{item.year}</Badge>
                  </td>
                  <td className="text-end fw-bold text-success fs-6 px-3">
                    {Number(item.precioFinal).toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* PAGINACIÓN */}
      {!cargando && totalPaginas > 1 && (
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-5">
          <span className="text-muted small">
            Mostrando página <strong>{paginaActual}</strong> de <strong>{totalPaginas}</strong>
          </span>
          <Pagination className="mb-0">
            <Pagination.First onClick={() => cambiarPagina(1)} disabled={paginaActual === 1} />
            <Pagination.Prev onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1} />

            <Pagination.Item active>{paginaActual}</Pagination.Item>

            <Pagination.Next onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas} />
            <Pagination.Last onClick={() => cambiarPagina(totalPaginas)} disabled={paginaActual === totalPaginas} />
          </Pagination>
        </div>
      )}

      {/* MODAL REUTILIZADA DE COTIZACIÓN DE MOTOS */}
      <DetalleCotizacion
        mostrarModal={mostrarModal}
        cerrarModal={() => setMostrarModal(false)}
        versionSeleccionada={versionSeleccionada}
      />
    </Container>
  );
};

export default PresupuestoMoto;