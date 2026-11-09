import { useState } from "react";
import Marcas from "../components/Marcas";
import Modelos from "../components/ModelosConVers";

const Buscador = () => {
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);


  return (
    <>
      {!marcaSeleccionada && (
        <Marcas seleccionarMarca={setMarcaSeleccionada} />
      )}

      {marcaSeleccionada &&  (
        <Modelos 
          idMarca={marcaSeleccionada} 
          volverAtras={() => setMarcaSeleccionada(null)} 
        />
      )}

    </>
  );
};

export default Buscador;