import React, { useReducer, useState } from 'react';
import AppReducer from './appReducer';
import AppContext from './appContext';

const AppState = props => {

    const [ logeado, setLogeado ] = useState(false);
    const [usuarioActual, setUsuarioActual] = useState({
        id: "",
        correo: "",
        username: "",
        contraseña: ""
    });

    const [pantallaActual, setPantallaActual] = useState("");

    return (
        <AppContext.Provider
            value={{
                logeado,
                setLogeado,
                pantallaActual,
                setPantallaActual,
                usuarioActual,
                setUsuarioActual
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState;