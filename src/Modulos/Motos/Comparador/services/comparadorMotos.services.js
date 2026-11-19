const URLBASE = import.meta.env.VITE_API_URL_BACK || "http://localhost:3000/";

export const traerMarcasMoto = async () => {
  try {
    const respuesta = await fetch(`${URLBASE}api/marcas/paginacion?page=1&limit=100`);
    if (!respuesta.ok) {
      throw new Error(`Algo salió mal en la petición, mira ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Ocurrió algo en el catch al traer marcas de motos:", error);
    throw error;
  }
};

export const traerModelosYVersionesMoto = async (idMarca) => {
  try {
    const respuesta = await fetch(`${URLBASE}api/tabla/${idMarca}`);
    if (!respuesta.ok) {
      throw new Error(`Algo salió mal en la petición, mira ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Ocurrió algo en el catch al traer modelos y versiones de motos:", error);
    throw error;
  }
};

export const obtenerComparativaMotos = async (arrayIds) => {
  try {
    const idsQuery = arrayIds.join(",");
    const respuesta = await fetch(`${URLBASE}api/comparador?ids=${idsQuery}`);
    if (!respuesta.ok) {
      throw new Error(`Algo salió mal en la petición, mira ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Ocurrió algo en el catch al obtener la comparativa de motos:", error);
    throw error;
  }
};