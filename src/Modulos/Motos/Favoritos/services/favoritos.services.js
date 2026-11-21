const URLBASE = import.meta.env.VITE_API_URL_BACK || "http://localhost:3000/";

export const traerFavoritos = async (usuarioId = "") => {
  try {
    const query = usuarioId ? `?usuario_id=${usuarioId}` : "";
    const respuesta = await fetch(`${URLBASE}api/favoritos${query}`);
    if (!respuesta.ok) {
      throw new Error(`Algo salió mal en la petición, mira ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Ocurrió algo en el catch al traer favoritos:", error);
    throw error;
  }
};

export const guardarNuevoFavorito = async (payloadFavorito) => {
  try {
    const respuesta = await fetch(`${URLBASE}api/favoritos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadFavorito),
    });
    if (!respuesta.ok) {
      throw new Error(`Algo salió mal al guardar, mira ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Ocurrió algo en el catch al guardar favorito:", error);
    throw error;
  }
};

export const borrarFavoritoPorId = async (id) => {
  try {
    const respuesta = await fetch(`${URLBASE}api/favoritos/${id}`, {
      method: "DELETE",
    });
    if (!respuesta.ok) {
      throw new Error(`Algo salió mal al eliminar, mira ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Ocurrió algo en el catch al eliminar favorito:", error);
    throw error;
  }
};