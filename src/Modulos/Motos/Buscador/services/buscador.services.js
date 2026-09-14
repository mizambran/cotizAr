


const urlBase = import.meta.env.VITE_API_URL_BACK


export const traerMarcasPaginado = async() => {
    let page = 1
    let limit = 100

    try {
        const respuesta = await fetch(`${urlBase}api/marcas/paginacion?page=${page}&limit=${limit}`)
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