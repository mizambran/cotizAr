import { createContext, useState } from "react";


export const UsuarioContexto = createContext()

export const UsuarioProvider = ({children}) => {
    
    const [usuario, setUsuario] = useState([])

    const [logueado, setLogueado] = useState(true)
    
    return(
        <UsuarioContexto.Provider value={{
            usuario,
            setUsuario,
            logueado,
            setLogueado
        }} >
            {children}
        </UsuarioContexto.Provider>
    )
}