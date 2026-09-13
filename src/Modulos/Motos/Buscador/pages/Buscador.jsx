import { useState } from 'react';
import { Container, Row, Col, Form, Button, ButtonGroup, Table, Card } from 'react-bootstrap';

const Buscador = () => {
  const [vistaActiva, setVistaActiva] = useState('tabla'); // 'tabla' o 'grilla'
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // Datos simulados hasta que conectemos el backend
  const resultadosSimulados = [
    { id: 1, marca: 'Yamaha', modelo: 'FZ', version: '3.0 FI ABS', precio: '$ 3.500.000' },
    { id: 2, marca: 'Honda', modelo: 'Titan', version: 'CG 150', precio: '$ 2.800.000' },
    { id: 3, marca: 'BMW', modelo: 'GS', version: 'R 1250 Adventure', precio: '$ 35.000.000' },
    { id: 3, marca: 'BMW', modelo: 'GS', version: 'R 1250 Adventure', precio: '$ 35.000.000' },
    { id: 3, marca: 'BMW', modelo: 'GS', version: 'R 1250 Adventure', precio: '$ 35.000.000' },
    { id: 3, marca: 'BMW', modelo: 'GS', version: 'R 1250 Adventure', precio: '$ 35.000.000' },
    { id: 3, marca: 'BMW', modelo: 'GS', version: 'R 1250 Adventure', precio: '$ 35.000.000' },
    { id: 3, marca: 'BMW', modelo: 'GS', version: 'R 1250 Adventure', precio: '$ 35.000.000' },
    { id: 3, marca: 'BMW', modelo: 'GS', version: 'R 1250 Adventure', precio: '$ 35.000.000' },
    { id: 3, marca: 'BMW', modelo: 'GS', version: 'R 1250 Adventure', precio: '$ 35.000.000' }
  ];

  const pruebaConexionBack = async() => {
    const urlBase = import.meta.VITE_API_URL_BACK
    try {
        const respuesta = await fetch(urlBase)
        if(!respuesta.ok){
            throw new Error(`Algo salió mal en la petición, mira ${respuesta.status}`)
        }
        const datos = await respuesta.json()
        console.log(datos);
    } catch (error) {
        console.error(error)
        return []
    }
  }

  return (
    <Container className="py-4">
      <h2 className="text-secondary mb-4">Buscador de Cotizaciones</h2>
      
      {/* Barra de Búsqueda y Controles de Vista */}
      <Row className="mb-4 align-items-center g-3">
        <Col md={8}>
          <Form.Control 
            type="text" 
            placeholder="Buscar por marca o modelo..." 
            size="lg"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
          />
        </Col>
        <Col md={4} className="d-flex justify-content-md-end">
          <ButtonGroup>
            <Button 
              variant={vistaActiva === 'tabla' ? 'primary' : 'outline-primary'}
              onClick={() => setVistaActiva('tabla')}
            >
              Tabla
            </Button>
            <Button 
              variant={vistaActiva === 'grilla' ? 'info' : 'outline-info'}
              onClick={() => setVistaActiva('grilla')}
              className={vistaActiva === 'grilla' ? 'text-white' : ''}
            >
              Grilla
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <div>
        <Button type='button' onClick={pruebaConexionBack} >Probar conexión</Button>
      </div>

      {/* Renderizado Condicional según la Vista Activa */}
      {vistaActiva === 'tabla' ? (
        <div className="table-responsive shadow-sm rounded mb-5">
          <Table hover className="align-middle bg-white mb-0">
            <thead className="bg-light text-primary">
              <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Versión</th>
                <th className="text-end">Precio Actual</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {resultadosSimulados.map((moto) => (
                <tr key={moto.id}>
                  <td className="fw-bold">{moto.marca}</td>
                  <td>{moto.modelo}</td>
                  <td className="text-muted">{moto.version}</td>
                  <td className="text-end fw-bold text-info">{moto.precio}</td>
                  <td className="text-center">
                    <Button variant="outline-secondary" size="sm">Ver Detalles</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Row className="g-4 mb-5">
          {resultadosSimulados.map((moto) => (
            <Col xs={12} md={6} lg={4} key={moto.id}>
              <Card className="h-100 shadow-sm border-0 border-top border-4 border-info">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Subtitle className="text-muted">{moto.marca}</Card.Subtitle>
                    <Button variant="link" className="p-0 text-secondary" title="Agregar a Favoritos">
                      🤍
                    </Button>
                  </div>
                  <Card.Title className="fs-4 text-primary">{moto.modelo}</Card.Title>
                  <Card.Text className="text-muted small mb-4">{moto.version}</Card.Text>
                  <div className="d-flex justify-content-between align-items-end">
                    <div>
                      <span className="d-block small text-muted">Cotización</span>
                      <span className="fs-5 fw-bold text-info">{moto.precio}</span>
                    </div>
                    <Button variant="primary" size="sm">Detalles</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Buscador;