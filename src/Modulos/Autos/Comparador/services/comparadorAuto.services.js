const URLBASE = import.meta.env.VITE_API_URL_BACK || "http://localhost:3000/";

export const traerMarcasAuto = async () => {
  try {
    const respuesta = await fetch(`${URLBASE}api/autos/marcas/paginacion?page=1&limit=100`);
    if (!respuesta.ok) {
      throw new Error(`Algo salió mal en la petición, mira ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Ocurrió algo en el catch al traer marcas:", error);
    throw error;
  }
};

export const traerModelosYVersionesAuto = async (idMarca) => {
  try {
    const respuesta = await fetch(`${URLBASE}api/autos/tabla/${idMarca}`);
    if (!respuesta.ok) {
      throw new Error(`Algo salió mal en la petición, mira ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Ocurrió algo en el catch al traer modelos y versiones:", error);
    throw error;
  }
};

export const obtenerComparativaAutos = async (arrayIds) => {
  try {
    const idsQuery = arrayIds.join(",");
    const respuesta = await fetch(`${URLBASE}api/autos/comparador?ids=${idsQuery}`);
    if (!respuesta.ok) {
      throw new Error(`Algo salió mal en la petición, mira ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Ocurrió algo en el catch al obtener la comparativa:", error);
    throw error;
  }
};