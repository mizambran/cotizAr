import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Badge,
  Spinner,
  Pagination,
  InputGroup,
} from "react-bootstrap";
import { FaSearch, FaTimes, FaListUl } from "react-icons/fa";
import { traerMarcasPaginado } from "../services/buscador.services"; // En Autos importá de buscadorAuto.services
import { useNavigate } from "react-router-dom";

const Marcas = ({ seleccionarMarca }) => {
  const navegacion = useNavigate();

  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [marcas, setMarcas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [cargando, setCargando] = useState(false);

  const cargarMarcas = async (pagina = 1, busqueda = terminoBusqueda) => {
    setCargando(true);
    try {
      const datos = await traerMarcasPaginado(pagina, 20, busqueda);
      if (datos && datos.results) {
        setMarcas(datos.results);
        setPaginaActual(datos.paginaActual || 1);
        setTotalPaginas(datos.totalPaginas || 1);
        setTotalRegistros(datos.totalRegistros || 0);
      }
    } catch (error) {
      setMarcas([]);
    } finally {
      setCargando(false);
    }
  };

  // Búsqueda con debounce para no disparar una petición por cada letra tipeada
  useEffect(() => {
    const timer = setTimeout(() => {
      cargarMarcas(1, terminoBusqueda);
    }, 350);

    return () => clearTimeout(timer);
  }, [terminoBusqueda]);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      cargarMarcas(nuevaPagina, terminoBusqueda);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Container className="py-4">
      <Button variant="outline-secondary" className="mb-4" onClick={() => navegacion(-1)}>
        ← Volver a Inicio
      </Button>

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="text-secondary mb-1">Buscador de Cotizaciones</h2>
          <p className="text-muted mb-0">Seleccioná una marca para explorar sus modelos y versiones.</p>
        </div>
        <Badge bg="secondary" className="fs-6 px-3 py-2 text-white">
          {totalRegistros} marcas disponibles
        </Badge>
      </div>

      {/* BARRA DE BÚSQUEDA */}
      <Row className="mb-4">
        <Col xs={12} md={8} lg={6}>
          <InputGroup size="lg" className="shadow-sm">
            <InputGroup.Text className="bg-white text-muted">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Ej: Honda, Yamaha, Benelli..."
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
            />
            {terminoBusqueda && (
              <Button
                variant="outline-secondary"
                onClick={() => setTerminoBusqueda("")}
                title="Limpiar búsqueda"
              >
                <FaTimes />
              </Button>
            )}
          </InputGroup>
        </Col>
      </Row>

      {/* TABLA DE MARCAS */}
      <div className="table-responsive shadow-sm rounded mb-4 bg-white">
        <Table hover className="align-middle mb-0">
          <thead className="bg-light text-primary">
            <tr>
              <th className="py-3 px-4">Marca</th>
              <th className="py-3 px-3 text-center">Modelos</th>
              <th className="py-3 px-4 text-end">Acción</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr>
                <td colSpan="3" className="text-center py-5">
                  <Spinner animation="border" variant="info" />
                  <p className="text-muted mt-2 mb-0">Cargando listado de marcas...</p>
                </td>
              </tr>
            ) : marcas.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-5 text-muted">
                  No se encontraron marcas que coincidan con "{terminoBusqueda}".
                </td>
              </tr>
            ) : (
              marcas.map((marca) => (
                <tr
                  key={marca._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => seleccionarMarca(marca._id)}
                >
                  <td className="fw-bold text-dark fs-6 px-4">{marca.nombre}</td>
                  <td className="text-center px-3">
                    <Badge bg="light" text="dark" className="border px-3 py-2">
                      {marca.cantidadModelos ?? 0}{" "}
                      {marca.cantidadModelos === 1 ? "modelo" : "modelos"}
                    </Badge>
                  </td>
                  <td className="text-end px-4">
                    <Button
                      variant="primary"
                      size="sm"
                      className="fw-bold px-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        seleccionarMarca(marca._id);
                      }}
                    >
                      <FaListUl className="me-1" /> Ver modelos
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* PAGINACIÓN (20 POR PÁGINA) */}
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
    </Container>
  );
};

export default Marcas;