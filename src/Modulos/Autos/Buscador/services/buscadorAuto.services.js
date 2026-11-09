
const URLBASE = import.meta.env.VITE_API_URL_BACK

export const traerMarcasPaginado = async() => {
    let page = 1
    let limit = 100    
    
    try {
    const respuesta = await fetch(`${URLBASE}api/autos/marcas/paginacion?page=${page}&limit=${limit}`)      
    if(!respuesta.ok){
        throw new Error(`Algo salió mal en la petición, mira ${respuesta.status}`)
    }
    const datos = await respuesta.json()    
    console.log(datos);
    return datos
    } catch (error) {
    console.error("Algo salió mal en el catch")
    throw error
    }
}

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
        throw error
    }
}

export const traerValuacionesPorId = async() => {

}