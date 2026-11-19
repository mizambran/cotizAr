import { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Form, Button, Card, Badge, Alert, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaTrophy, FaStar, FaChartLine } from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Swal from "sweetalert2";
import {
  traerMarcasAuto,
  traerModelosYVersionesAuto,
  obtenerComparativaAutos,
} from "../services/comparadorAuto.services";

// Paleta de 4 colores bien diferenciados para las líneas del gráfico y las tarjetas
const COLORES_VEHICULOS = ["#0d6efd", "#dc3545", "#198754", "#fd7e14"];

const ComparadorAuto = () => {
  const navigate = useNavigate();

  // Estados para los selectores en cascada
  const [marcas, setMarcas] = useState([]);
  const [modelosConVersiones, setModelosConVersiones] = useState([]);
  const [marcaSel, setMarcaSel] = useState("");
  const [modeloSel, setModeloSel] = useState("");
  const [versionSel, setVersionSel] = useState("");
  const [cargandoSelects, setCargandoSelects] = useState(false);

  // Lista de hasta 4 vehículos elegidos para comparar: [{ id, etiqueta }]
  const [seleccionados, setSeleccionados] = useState([]);

  // Resultados del backend
  const [datosComparativa, setDatosComparativa] = useState(null);
  const [cargandoComparativa, setCargandoComparativa] = useState(false);

  // Cargar marcas al iniciar
  useEffect(() => {
    traerMarcasAuto()
      .then((data) => setMarcas(data.results || []))
      .catch((err) => console.error(err));
  }, []);

  // Cuando cambia la marca, cargamos sus modelos y versiones
  const handleCambioMarca = async (e) => {
    const idMarca = e.target.value;
    setMarcaSel(idMarca);
    setModeloSel("");
    setVersionSel("");
    setModelosConVersiones([]);

    if (!idMarca) return;

    setCargandoSelects(true);
    try {
      const data = await traerModelosYVersionesAuto(idMarca);
      setModelosConVersiones(data.results || data.resultados || []);
    } catch (error) {
      console.error(error);
    } finally {
      setCargandoSelects(false);
    }
  };

  // Versiones disponibles según el modelo seleccionado
  const versionesDisponibles = useMemo(() => {
    const mod = modelosConVersiones.find((m) => m._id === modeloSel);
    return mod ? mod.versiones || [] : [];
  }, [modelosConVersiones, modeloSel]);

  // Agregar vehículo a la lista de comparación (máximo 4)
  const agregarVehiculo = () => {
    if (!versionSel) return;

    if (seleccionados.length >= 4) {
      Swal.fire("Límite alcanzado", "Podés comparar hasta 4 autos en simultáneo.", "warning");
      return;
    }

    if (seleccionados.some((item) => item.id === versionSel)) {
      Swal.fire("Ya agregado", "Este vehículo ya está en la lista de comparación.", "info");
      return;
    }

    const marcaObj = marcas.find((m) => m._id === marcaSel);
    const modeloObj = modelosConVersiones.find((m) => m._id === modeloSel);
    const versionObj = versionesDisponibles.find((v) => v._id === versionSel);

    const etiqueta = `${marcaObj?.nombre} ${modeloObj?.nombre} ${versionObj?.nombre}`;

    setSeleccionados([...seleccionados, { id: versionSel, etiqueta }]);
    setVersionSel("");
  };

  const quitarVehiculo = (idQuitar) => {
    const nuevaLista = seleccionados.filter((item) => item.id !== idQuitar);
    setSeleccionados(nuevaLista);
    if (nuevaLista.length === 0) {
      setDatosComparativa(null);
    }
  };

  // Disparar cálculo cuando cambian los seleccionados
  useEffect(() => {
    if (seleccionados.length === 0) return;

    const calcular = async () => {
      setCargandoComparativa(true);
      try {
        const ids = seleccionados.map((s) => s.id);
        const res = await obtenerComparativaAutos(ids);
        setDatosComparativa(res);
      } catch (error) {
        console.error(error);
      } finally {
        setCargandoComparativa(false);
      }
    };

    calcular();
  }, [seleccionados]);

  // Transformamos los datos para el formato que pide Recharts:
  // [{ year: 2020, "CHEVROLET ONIX LTZ": 10500000, "FIAT CRONOS DRIVE": 10200000 }, ...]
  const datosGraficoRecharts = useMemo(() => {
    if (!datosComparativa?.vehiculos) return [];

    const mapaPorAnio = {};

    datosComparativa.vehiculos.forEach((v) => {
      v.detalleAnual.forEach((d) => {
        if (!mapaPorAnio[d.year]) {
          mapaPorAnio[d.year] = { year: d.year };
        }
        mapaPorAnio[d.year][v.etiquetaCompleta] = d.precio;
      });
    });

    // Ordenamos de menor año a mayor año para que la línea avance de izquierda a derecha en el tiempo
    return Object.values(mapaPorAnio).sort((a, b) => a.year - b.year);
  }, [datosComparativa]);

  // Placeholder listo para conectar con el endpoint de Favoritos más adelante
  const handleGuardarFavorito = () => {
    const payloadFavorito = {
      categoria: "auto",
      tipo: "comparativa",
      titulo: `Comparativa: ${seleccionados.map((s) => s.etiqueta).join(" vs ")}`,
      versiones_ids: seleccionados.map((s) => s.id),
    };

    console.log("Objeto listo para enviar a POST /api/favoritos:", payloadFavorito);
    Swal.fire({
      icon: "success",
      title: "Comparativa lista para Favoritos",
      text: "La estructura ya quedó armada en consola para conectarla al módulo de Favoritos.",
      timer: 2500,
      showConfirmButton: false,
    });
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          ← Volver a Inicio
        </Button>

        {seleccionados.length >= 2 && (
          <Button variant="warning" className="fw-bold shadow-sm" onClick={handleGuardarFavorito}>
            <FaStar className="me-1" /> Guardar Comparativa en Favoritos
          </Button>
        )}
      </div>

      <h2 className="text-secondary mb-1">Comparador de Evolución y Devaluación</h2>
      <p className="text-muted mb-4">
        Seleccioná hasta <strong>4 vehículos</strong> para analizar cómo mantienen su valor a lo largo de los años.
      </p>

      {/* SELECTOR DE VEHÍCULOS */}
      <Card className="bg-light border shadow-sm mb-4">
        <Card.Body>
          <Row className="g-2 align-items-end">
            <Col xs={12} md={3}>
              <Form.Label className="small fw-bold text-secondary">1. Marca</Form.Label>
              <Form.Select value={marcaSel} onChange={handleCambioMarca}>
                <option value="">Seleccionar marca...</option>
                {marcas.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.nombre}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col xs={12} md={3}>
              <Form.Label className="small fw-bold text-secondary">2. Modelo</Form.Label>
              <Form.Select
                value={modeloSel}
                onChange={(e) => {
                  setModeloSel(e.target.value);
                  setVersionSel("");
                }}
                disabled={!marcaSel || cargandoSelects}
              >
                <option value="">{cargandoSelects ? "Cargando..." : "Seleccionar modelo..."}</option>
                {modelosConVersiones.map((mod) => (
                  <option key={mod._id} value={mod._id}>
                    {mod.nombre}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col xs={12} md={4}>
              <Form.Label className="small fw-bold text-secondary">3. Versión</Form.Label>
              <Form.Select
                value={versionSel}
                onChange={(e) => setVersionSel(e.target.value)}
                disabled={!modeloSel}
              >
                <option value="">Seleccionar versión...</option>
                {versionesDisponibles.map((ver) => (
                  <option key={ver._id} value={ver._id}>
                    {ver.nombre}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col xs={12} md={2}>
              <Button
                variant="primary"
                className="w-100 fw-bold"
                onClick={agregarVehiculo}
                disabled={!versionSel || seleccionados.length >= 4}
              >
                <FaPlus className="me-1" /> Agregar ({seleccionados.length}/4)
              </Button>
            </Col>
          </Row>

          {/* CHIPS DE VEHÍCULOS SELECCIONADOS */}
          {seleccionados.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mt-3 pt-3 border-top">
              {seleccionados.map((item, idx) => (
                <Badge
                  key={item.id}
                  pill
                  bg="white"
                  text="dark"
                  className="border px-3 py-2 d-flex align-items-center gap-2 shadow-sm"
                  style={{ borderLeft: `5px solid ${COLORES_VEHICULOS[idx]}` }}
                >
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: COLORES_VEHICULOS[idx],
                      display: "inline-block",
                    }}
                  />
                  <span className="fw-bold">{item.etiqueta}</span>
                  <FaTrash
                    className="text-danger ms-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => quitarVehiculo(item.id)}
                    title="Quitar de la comparativa"
                  />
                </Badge>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* CONTENIDO DE RESULTADOS */}
      {cargandoComparativa ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="text-muted mt-2">Analizando curvas de precios y depreciación...</p>
        </div>
      ) : datosComparativa && datosComparativa.vehiculos.length > 0 ? (
        <>
          {/* SUGERENCIA DE COMPRA INTELIGENTE (Se muestra si hay al menos 2 autos) */}
          {datosComparativa.vehiculos.length >= 2 && datosComparativa.sugerencia && (
            <Alert variant="success" className="shadow-sm border-success d-flex align-items-center gap-3 mb-4">
              <FaTrophy size={36} className="text-warning flex-shrink-0" />
              <div>
                <h5 className="alert-heading fw-bold mb-1">
                  Sugerencia de Compra: {datosComparativa.sugerencia.etiquetaCompleta}
                </h5>
                <p className="mb-0 small">
                  Es el vehículo que <strong>mejor conserva su valor de reventa</strong> en esta comparativa, con una
                  variación promedio anual de{" "}
                  <strong>{datosComparativa.sugerencia.devaluacionPromedioAnual}%</strong>.
                </p>
              </div>
            </Alert>
          )}

          {/* GRÁFICO DE LÍNEAS (EVOLUCIÓN HISTÓRICA) */}
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body className="p-3 p-md-4">
              <h5 className="text-secondary fw-bold mb-3 d-flex align-items-center">
                <FaChartLine className="me-2 text-primary" /> Curva de Cotización por Año de Fabricación
              </h5>
              <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer>
                  <LineChart data={datosGraficoRecharts} margin={{ top: 10, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                    <XAxis dataKey="year" />
                    <YAxis
                      tickFormatter={(valor) => `$${(valor / 1000000).toFixed(1)}M`}
                      width={70}
                    />
                    <Tooltip
                      formatter={(value) =>
                        Number(value).toLocaleString("es-AR", { style: "currency", currency: "ARS" })
                      }
                    />
                    <Legend />
                    {datosComparativa.vehiculos.map((v, idx) => (
                      <Line
                        key={v.versionId}
                        type="monotone"
                        dataKey={v.etiquetaCompleta}
                        stroke={COLORES_VEHICULOS[idx]}
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 7 }}
                        connectNulls
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>

          {/* TARJETAS DE DEVALUACIÓN AÑO A AÑO Y PROMEDIO */}
          <h5 className="text-secondary fw-bold mb-3">Análisis de Devaluación Interanual</h5>
          <Row className="g-4 mb-5">
            {datosComparativa.vehiculos.map((vehiculo, idx) => {
              const esElSugerido =
                datosComparativa.vehiculos.length >= 2 &&
                datosComparativa.sugerencia?.versionId === vehiculo.versionId;

              return (
                <Col xs={12} md={6} lg={datosComparativa.vehiculos.length === 4 ? 3 : 4} key={vehiculo.versionId}>
                  <Card
                    className={`h-100 shadow-sm ${esElSugerido ? "border-success border-2" : "border-0"}`}
                    style={{ borderTop: `5px solid ${COLORES_VEHICULOS[idx]}` }}
                  >
                    <Card.Header className="bg-white border-bottom pt-3">
                      <div className="d-flex justify-content-between align-items-start gap-2">
                        <h6 className="fw-bold text-dark mb-1">{vehiculo.etiquetaCompleta}</h6>
                        {esElSugerido && (
                          <Badge bg="success" className="flex-shrink-0">
                            Mejor Retención
                          </Badge>
                        )}
                      </div>
                      <div className="small text-muted">
                        Último valor ({vehiculo.anioMasReciente}):{" "}
                        <strong className="text-dark">
                          {Number(vehiculo.precioMasReciente).toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          })}
                        </strong>
                      </div>
                    </Card.Header>

                    <Card.Body className="p-0">
                      {/* Devaluación Promedio */}
                      <div className="bg-light p-3 text-center border-bottom">
                        <span className="d-block small text-muted">Devaluación Promedio Anual</span>
                        <span
                          className={`fs-4 fw-bold ${
                            vehiculo.devaluacionPromedioAnual >= -7 ? "text-success" : "text-danger"
                          }`}
                        >
                          {vehiculo.devaluacionPromedioAnual}%
                        </span>
                      </div>

                      {/* Tabla Año a Año */}
                      <div style={{ maxHeight: "230px", overflowY: "auto" }}>
                        <Table size="sm" hover className="mb-0 small">
                          <thead className="bg-light text-muted sticky-top">
                            <tr>
                              <th className="px-3">Año</th>
                              <th className="text-end">Valor</th>
                              <th className="text-end px-3">Var.</th>
                            </tr>
                          </thead>
                          <tbody>
                            {vehiculo.detalleAnual.map((fila) => (
                              <tr key={fila.year}>
                                <td className="px-3 fw-medium">{fila.year}</td>
                                <td className="text-end text-secondary">
                                  ${(fila.precio / 1000000).toFixed(2)}M
                                </td>
                                <td className="text-end px-3 fw-bold">
                                  {fila.variacionRespectoAlAnterior === null ? (
                                    <span className="text-muted">Base</span>
                                  ) : (
                                    <span
                                      className={
                                        fila.variacionRespectoAlAnterior < 0 ? "text-danger" : "text-success"
                                      }
                                    >
                                      {fila.variacionRespectoAlAnterior}%
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </>
      ) : (
        <div className="text-center py-5 bg-light rounded-3 border border-dashed text-muted">
          <p className="mb-0">Elegí al menos un vehículo arriba para visualizar su curva de precios y depreciación.</p>
        </div>
      )}
    </Container>
  );
};

export default ComparadorAuto;