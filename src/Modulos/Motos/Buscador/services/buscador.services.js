


const urlBase = import.meta.env.VITE_API_URL_BACK


export const traerMarcasPaginado = async (page = 1, limit = 20, search = "") => {
  try {
    const params = new URLSearchParams({
      page,
      limit,
    });
    if (search.trim() !== "") {
      params.append("search", search.trim());
    }
    
    const respuesta = await fetch(`${urlBase}api/marcas/paginacion?${params.toString()}`);
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

export const traerModelosPorId = async(id) => {
    try {
        const respuesta = await fetch(`${urlBase}api/modelos/${id}`)
        if(!respuesta.ok){
            throw new Error(`Algo salió mal en la petición de modelos por id, mira ${respuesta.status}`)
        }

        const datos = await respuesta.json()
        console.log(datos)
        return datos
    } catch (error) {
        console.error(error)
        return []
    }
}

export const traerVersionesPorId = async(id) => {
    try {
        const respuesta = await fetch(`${urlBase}api/versiones/${id}`)
        if(!respuesta.ok){
            throw new Error(`Algo salió mal en la petición de modelos por id, mira ${respuesta.status}`)
        }
        const datos = await respuesta.json()
        console.log(datos)
        return datos
    } catch (error) {
        console.error(error)
        return []
    }
}

export const traerValuacionesPorId = async(id) => {
    try {
        const respuesta = await fetch(`${urlBase}api/valuaciones/${id}`)
        if(!respuesta.ok){
            throw new Error(`Algo salió mal en la petición de modelos por id, mira ${respuesta.status}`)
        }
        const datos = await respuesta.json()
        console.log(datos)
        return datos
    } catch (error) {
        console.error(error)
        return []
    }
}

export const traerModelosYVersiones = async(id) => {
    try {
        const respuesta = await fetch(`${urlBase}api/tabla/${id}`)
        if(!respuesta.ok){
            throw new Error(`Algo salió mal en la petición, mira ${respuesta.status}`)
        }
        const datos = await respuesta.json()
        console.log(datos);
        return datos
    } catch (error) {
        console.error(error)
        return []
    }
}
