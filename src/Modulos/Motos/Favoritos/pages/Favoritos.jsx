import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, Spinner, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaStar,
  FaTrash,
  FaCar,
  FaMotorcycle,
  FaTag,
  FaWallet,
  FaChartLine,
  FaExternalLinkAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { traerFavoritos, borrarFavoritoPorId } from "../services/favoritos.services";
import DetalleCotizacionAuto from "../../../Autos/Buscador/components/DetalleCotizacionAuto";
import DetalleCotizacion from "../../../Motos/Buscador/components/DetalleCotizacion";

const Favoritos = () => {
  const navigate = useNavigate();

  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Filtros visuales
  const [filtroCategoria, setFiltroCategoria] = useState("todas"); // "todas" | "auto" | "moto"
  const [filtroTipo, setFiltroTipo] = useState("todos"); // "todos" | "cotizacion" | "presupuesto" | "comparativa"

  // Estados para abrir la modal si el favorito es una cotización puntual
  const [mostrarModalAuto, setMostrarModalAuto] = useState(false);
  const [mostrarModalMoto, setMostrarModalMoto] = useState(false);
  const [versionSeleccionada, setVersionSeleccionada] = useState(null);

  const cargarListaFavoritos = async () => {
    setCargando(true);
    try {
      const datos = await traerFavoritos();
      setFavoritos(Array.isArray(datos) ? datos : []);
    } catch (error) {
      setFavoritos([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarListaFavoritos();
  }, []);

  const handleEliminar = async (id) => {
    const confirmacion = await Swal.fire({
      title: "¿Eliminar de favoritos?",
      text: "Esta acción quitará el elemento guardado de tu lista.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmacion.isConfirmed) return;

    try {
      await borrarFavoritoPorId(id);
      setFavoritos((prev) => prev.filter((item) => item._id !== id));
      Swal.fire({
        icon: "success",
        title: "Eliminado",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el favorito.", "error");
    }
  };

  // Acción al hacer clic en "Ver / Abrir" según el tipo de favorito
  const handleAbrirFavorito = (fav) => {
    if (fav.tipo === "cotizacion") {
      const idVer = fav.versiones_ids?.[0];
      if (!idVer) return;
      setVersionSeleccionada(idVer);
      if (fav.categoria === "auto") {
        setMostrarModalAuto(true);
      } else {
        setMostrarModalMoto(true);
      }
      return;
    }

    if (fav.tipo === "comparativa") {
      const ruta = fav.categoria === "auto" ? "/autos/comparador" : "/motos/comparador";
      // Pasamos los IDs por estado de navegación para que el comparador los cargue automáticamente
      navigate(ruta, { state: { idsPrecargados: fav.versiones_ids } });
      return;
    }

    if (fav.tipo === "presupuesto") {
      const ruta = fav.categoria === "auto" ? "/autos/presupuesto" : "/motos/presupuesto";
      navigate(ruta, { state: { filtrosPrecargados: fav.filtro_presupuesto } });
    }
  };

  // Filtrado en memoria
  const favoritosFiltrados = favoritos.filter((fav) => {
    const coincideCat = filtroCategoria === "todas" || fav.categoria === filtroCategoria;
    const coincideTipo = filtroTipo === "todos" || fav.tipo === filtroTipo;
    return coincideCat && coincideTipo;
  });

  const renderBadgeTipo = (tipo) => {
    switch (tipo) {
      case "cotizacion":
        return (
          <Badge bg="info" className="text-dark">
            <FaTag className="me-1" /> Cotización
          </Badge>
        );
      case "presupuesto":
        return (
          <Badge bg="success">
            <FaWallet className="me-1" /> Presupuesto
          </Badge>
        );
      case "comparativa":
        return (
          <Badge bg="primary">
            <FaChartLine className="me-1" /> Comparativa
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Container className="py-4">
      <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>
        ← Volver
      </Button>

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="text-secondary mb-1 d-flex align-items-center gap-2">
            <FaStar className="text-warning" /> Mis Favoritos
          </h2>
          <p className="text-muted mb-0">
            Accedé rápido a tus cotizaciones, búsquedas por presupuesto y comparativas guardadas.
          </p>
        </div>
        <Badge bg="secondary" className="fs-6 px-3 py-2">
          {favoritosFiltrados.length} guardados
        </Badge>
      </div>

      {/* BARRA DE FILTROS */}
      <div className="bg-light p-3 rounded-3 border mb-4 d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div>
          <span className="small fw-bold text-muted d-block mb-1">Vehículo:</span>
          <ButtonGroup size="sm">
            <Button
              variant={filtroCategoria === "todas" ? "dark" : "outline-secondary"}
              onClick={() => setFiltroCategoria("todas")}
            >
              Todos
            </Button>
            <Button
              variant={filtroCategoria === "auto" ? "dark" : "outline-secondary"}
              onClick={() => setFiltroCategoria("auto")}
            >
              <FaCar className="me-1" /> Autos
            </Button>
            <Button
              variant={filtroCategoria === "moto" ? "dark" : "outline-secondary"}
              onClick={() => setFiltroCategoria("moto")}
            >
              <FaMotorcycle className="me-1" /> Motos
            </Button>
          </ButtonGroup>
        </div>

        <div>
          <span className="small fw-bold text-muted d-block mb-1">Tipo de guardado:</span>
          <ButtonGroup size="sm">
            <Button
              variant={filtroTipo === "todos" ? "primary" : "outline-primary"}
              onClick={() => setFiltroTipo("todos")}
            >
              Todos
            </Button>
            <Button
              variant={filtroTipo === "cotizacion" ? "primary" : "outline-primary"}
              onClick={() => setFiltroTipo("cotizacion")}
            >
              Cotizaciones
            </Button>
            <Button
              variant={filtroTipo === "presupuesto" ? "primary" : "outline-primary"}
              onClick={() => setFiltroTipo("presupuesto")}
            >
              Presupuestos
            </Button>
            <Button
              variant={filtroTipo === "comparativa" ? "primary" : "outline-primary"}
              onClick={() => setFiltroTipo("comparativa")}
            >
              Comparativas
            </Button>
          </ButtonGroup>
        </div>
      </div>

      {/* LISTADO DE TARJETAS */}
      {cargando ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="warning" />
          <p className="text-muted mt-2">Cargando tus favoritos...</p>
        </div>
      ) : favoritosFiltrados.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-3 border">
          <FaStar size={40} className="text-muted opacity-50 mb-3" />
          <h5 className="text-secondary">No tenés favoritos en esta categoría</h5>
          <p className="text-muted small mb-0">
            Usá el botón <strong>"⭐ Favorito"</strong> dentro de Cotizaciones, Presupuesto o Comparador para guardarlos acá.
          </p>
        </div>
      ) : (
        <Row className="g-4 mb-5">
          {favoritosFiltrados.map((fav) => (
            <Col xs={12} md={6} lg={4} key={fav._id}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Header className="bg-white border-bottom d-flex justify-content-between align-items-center pt-3">
                  {renderBadgeTipo(fav.tipo)}
                  <Badge bg="light" text="dark" className="border text-uppercase">
                    {fav.categoria === "auto" ? (
                      <>
                        <FaCar className="me-1 text-primary" /> Auto
                      </>
                    ) : (
                      <>
                        <FaMotorcycle className="me-1 text-danger" /> Moto
                      </>
                    )}
                  </Badge>
                </Card.Header>

                <Card.Body>
                  <h5 className="fw-bold text-dark mb-2">{fav.titulo}</h5>
                  {fav.subtitulo && <p className="text-muted small mb-2">{fav.subtitulo}</p>}

                  {/* Si es presupuesto, mostramos resumen de los filtros guardados */}
                  {fav.tipo === "presupuesto" && fav.filtro_presupuesto && (
                    <div className="bg-light p-2 rounded small text-secondary border mt-2">
                      {fav.filtro_presupuesto.presupuesto && (
                        <div>
                          <strong>Tope:</strong> $
                          {Number(fav.filtro_presupuesto.presupuesto).toLocaleString("es-AR")}
                        </div>
                      )}
                      {fav.filtro_presupuesto.marca && (
                        <div>
                          <strong>Marca:</strong> {fav.filtro_presupuesto.marca}
                        </div>
                      )}
                      {fav.filtro_presupuesto.modelo && (
                        <div>
                          <strong>Modelo:</strong> {fav.filtro_presupuesto.modelo}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="text-muted mt-3" style={{ fontSize: "0.75rem" }}>
                    Guardado el {new Date(fav.createdAt).toLocaleDateString("es-AR")}
                  </div>
                </Card.Body>

                <Card.Footer className="bg-white border-top-0 pb-3 pt-0 d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="w-100 fw-bold"
                    onClick={() => handleAbrirFavorito(fav)}
                  >
                    <FaExternalLinkAlt className="me-1" /> Abrir
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleEliminar(fav._id)}
                    title="Eliminar favorito"
                  >
                    <FaTrash />
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* MODALES PARA ABRIR COTIZACIONES PUNTUALES */}
      <DetalleCotizacionAuto
        mostrarModal={mostrarModalAuto}
        cerrarModal={() => setMostrarModalAuto(false)}
        versionSeleccionada={versionSeleccionada}
      />

      <DetalleCotizacion
        mostrarModal={mostrarModalMoto}
        cerrarModal={() => setMostrarModalMoto(false)}
        versionSeleccionada={versionSeleccionada}
      />
    </Container>
  );
};

export default Favoritos;