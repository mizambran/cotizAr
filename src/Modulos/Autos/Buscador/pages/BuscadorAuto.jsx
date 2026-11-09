import { useState } from "react";
import MarcasAuto from "../components/MarcasAuto";
import ModelosConVersAuto from "../components/ModelosConVersAuto";

const BuscadorAuto = () => {
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);

  return (
    <>
      {!marcaSeleccionada && (
        <MarcasAuto seleccionarMarca={setMarcaSeleccionada} />
      )}

      {marcaSeleccionada && (
        <ModelosConVersAuto 
          idMarca={marcaSeleccionada} 
          volverAtras={() => setMarcaSeleccionada(null)} 
        />
      )}
    </>
  );
};

export default BuscadorAuto;