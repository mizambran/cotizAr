import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Comparador = () => {
  // Datos simulados para el gráfico
  const datosHistoricos = [
    { anio: '2021', wave: 150000, crypton: 165000 },
    { anio: '2022', wave: 300000, crypton: 320000 },
    { anio: '2023', wave: 650000, crypton: 700000 },
    { anio: '2024', wave: 1200000, crypton: 1250000 },
    { anio: '2025', wave: 2100000, crypton: 2200000 },
    { anio: '2026', wave: 2800000, crypton: 2950000 },
  ];

  // Simulamos algunas comparativas ya guardadas
  const comparativasGuardadas = [
    'Honda Wave 110 vs Yamaha Crypton 110',
    'Bajaj Rouser NS 200 vs KTM Duke 200'
  ];

  return (
    <Container className="py-4">
      <h2 className="text-secondary mb-4">Comparativa de Precios</h2>

      {/* SECCIÓN 1: Comparativas Guardadas */}
      <Row className="mb-5">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title className="text-primary mb-3">Tus Comparativas Frecuentes</Card.Title>
              {comparativasGuardadas.length > 0 ? (
                <ListGroup variant="flush">
                  {comparativasGuardadas.map((comp, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center px-0">
                      <span className="fw-medium">{comp}</span>
                      <Button variant="outline-info" size="sm">Ver Gráfico</Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="text-muted mb-0">No tenés comparativas guardadas aún.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* SECCIÓN 2: Buscador de Vehículos */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm border-info">
            <Card.Body className="p-4">
              <Card.Title className="text-center mb-4">Seleccioná los vehículos a comparar</Card.Title>
              <Form className="d-flex gap-3 flex-wrap justify-content-center align-items-center">
                <Form.Group style={{ flex: '1 1 250px' }}>
                  <Form.Select size="lg">
                    <option>Honda Wave 110</option>
                    {/* Opciones que vendrán de tu BD */}
                  </Form.Select>
                </Form.Group>
                
                <span className="fw-bold text-muted fs-5">VS</span>
                
                <Form.Group style={{ flex: '1 1 250px' }}>
                  <Form.Select size="lg">
                    <option>Yamaha Crypton 110</option>
                    {/* Opciones que vendrán de tu BD */}
                  </Form.Select>
                </Form.Group>
                
                <Button variant="primary" size="lg" className="px-4">Generar Gráfico</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* SECCIÓN 3: Gráfico y Botón de Guardar */}
      <Row>
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <h4 className="text-center text-secondary mb-5">Evolución de Precios (2021 - 2026)</h4>
              
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <LineChart
                    data={datosHistoricos}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="anio" stroke="#1A5F7A" />
                    <YAxis 
                      stroke="#1A5F7A" 
                      tickFormatter={(value) => `$${value / 1000}k`} 
                    />
                    <Tooltip 
                      formatter={(value) => `$ ${value.toLocaleString('es-AR')}`} 
                      labelStyle={{ color: '#1A5F7A', fontWeight: 'bold' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Line type="monotone" dataKey="wave" name="Honda Wave 110" stroke="#00C4FF" strokeWidth={3} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="crypton" name="Yamaha Crypton 110" stroke="#1A5F7A" strokeWidth={3} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="text-end mt-4 pt-3 border-top">
                <Button variant="info" className="text-white fw-bold px-4">
                  🤍 Guardar Comparativa
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Comparador;