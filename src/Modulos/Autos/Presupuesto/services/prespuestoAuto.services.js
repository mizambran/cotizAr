const URLBASE = import.meta.env.VITE_API_URL_BACK

export const traerAutosPorPresupuesto = async ({
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

    const respuesta = await fetch(`${URLBASE}api/autos/presupuesto?${params.toString()}`);
    if (!respuesta.ok) {
      throw new Error(`Error en la petición: ${respuesta.status}`);
    }
    return await respuesta.json();
  } catch (error) {
    console.error("Error al traer autos por presupuesto:", error);
    throw error;
  }
};