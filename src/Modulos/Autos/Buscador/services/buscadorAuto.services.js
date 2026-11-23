
const URLBASE = import.meta.env.VITE_API_URL_BACK



export const traerMarcasPaginado = async (page = 1, limit = 20, search = "") => {
  try {
    const params = new URLSearchParams({
      page,
      limit,
    });
    if (search.trim() !== "") {
      params.append("search", search.trim());
    }
    
    const respuesta = await fetch(`${URLBASE}api/autos/marcas/paginacion?${params.toString()}`);
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

export const traerModelosYVersiones = async(id) => {
    try {
        const respuesta = await fetch(`${URLBASE}api/autos/tabla/${id}`)
        if(!respuesta.ok){
            throw new Error(`Algo salió mal en la petición, mira ${respuesta.status}`)
        }
        const datos = await respuesta.json()
        console.log(datos)
        return datos
    } catch (error) {
        console.error("Ocurrió algo en el catch", error)
        return []
    }
}

export const traerValuacionesPorId = async(id) => {
    try {
        const respuesta = await fetch(`${URLBASE}api/autos/valuaciones/${id}`)
        if(!respuesta.ok){
            throw new Error(`Algo salió mal en la petición. ${respuesta.status}`)
        }
        const datos = await respuesta.json()
        console.log(datos);
        return datos        
    } catch (error) {
        console.error("Ocurrió algo en el catch", error)
        return []
    }
}