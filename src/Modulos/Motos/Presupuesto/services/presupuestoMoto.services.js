const URLBASE = import.meta.env.VITE_API_URL_BACK || "http://localhost:3000/";

export const traerMotosPorPresupuesto = async ({
  presupuesto,
  marca,
  modelo,
  version,
  page = 1,
  limit = 20,
  sortBy = "precioFinal",
  sortOrder = "desc",
}) => {
  try {
    const params = new URLSearchParams({
      page,
      limit,
      sortBy,
      sortOrder,
    });

    if (presupuesto) params.append("presupuesto", presupuesto);
    if (marca) params.append("marca", marca);
    if (modelo) params.append("modelo", modelo);
    if (version) params.append("version", version);

    const respuesta = await fetch(`${URLBASE}api/presupuesto?${params.toString()}`);
    if (!respuesta.ok) {
      throw new Error(`Algo salió mal en la petición, mira ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Ocurrió algo en el catch al traer motos por presupuesto:", error);
    throw error;
  }
};