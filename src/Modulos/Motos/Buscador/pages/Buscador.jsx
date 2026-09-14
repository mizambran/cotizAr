import { useState } from "react";
import Marcas from "../components/Marcas";
import Modelos from "../components/Modelos";
import Versiones from "../components/Versiones";
import DetalleCotizacion from "../components/DetalleCotizacion";

const Buscador = () => {
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);
  const [modeloSeleccionado, setModeloSeleccionado] = useState(null);
  const [versionSeleccionada, setVersionSeleccionada] = useState(null);

  const reiniciarBuscador = () => {
    setMarcaSeleccionada(null);
    setModeloSeleccionado(null);
    setVersionSeleccionada(null);
  };

  return (
    <>
      {!marcaSeleccionada && (
        <Marcas onSeleccionar={setMarcaSeleccionada} />
      )}

      {marcaSeleccionada && !modeloSeleccionado && (
        <Modelos 
          idMarca={marcaSeleccionada} 
          onSeleccionar={setModeloSeleccionado}
          volverAtras={() => setMarcaSeleccionada(null)} 
        />
      )}

      {modeloSeleccionado && !versionSeleccionada && (
        <Versiones 
          idModelo={modeloSeleccionado}
          onSeleccionar={setVersionSeleccionada}
          volverAtras={() => setModeloSeleccionado(null)}
        />
      )}

      {versionSeleccionada && (
        <DetalleCotizacion 
          idVersion={versionSeleccionada}
          reiniciar={reiniciarBuscador}
          volverAtras={() => setVersionSeleccionada(null)}
        />
      )}
    </>
  );
};

export default Buscador;