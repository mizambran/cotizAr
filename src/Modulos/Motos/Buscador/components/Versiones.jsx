import { useEffect, useState } from "react";
import { traerVersionesPorId } from "../services/buscador.services";
import { Container, Button, Table } from "react-bootstrap";

const Versiones = ({ idModelo, onSeleccionar, volverAtras }) => {
  const [versiones, setVersiones] = useState([]);

  useEffect(() => {
    const cargarVersiones = async () => {
      const versionesEncontradas = await traerVersionesPorId(idModelo);
      setVersiones(versionesEncontradas.results || versionesEncontradas);
    };
    cargarVersiones();
  }, [idModelo]);

  return (
    <Container className="py-4">
      <Button variant="outline-secondary" className="mb-4" onClick={volverAtras}>
        ← Volver a Modelos
      </Button>
      
      <h3 className="text-secondary mb-4">Seleccioná la Versión</h3>
      
      <div className="table-responsive shadow-sm rounded mb-5">
        <Table hover className="align-middle bg-white mb-0">
          <thead className="bg-light text-primary">
            <tr>
              <th>Nombre de la Versión</th>
              <th>Año/Detalle</th>
              <th className="text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {versiones?.map((ver) => (
              <tr key={ver._id}>
                <td className="fw-bold text-secondary">{ver.nombre}</td>
                <td className="text-muted">{ver.anio || "N/A"}</td>
                <td className="text-center">
                  <Button 
                    variant="info" 
                    size="sm" 
                    className="text-white"
                    onClick={() => onSeleccionar(ver._id)}
                  >
                    Ver Cotización
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Versiones;