import React, { useReducer, useState } from 'react';
import AppReducer from './appReducer';
import AppContext from './appContext';

const AppState = props => {

    const [tarjetas, setTarjetas] = useState([]);
    const [toastVisible, setToastVisible] = useState(false);
    const [ logeado, setLogeado ] = useState(false);
    const [usuarioActual, setUsuarioActual] = useState({
        id: "",
        correo: "",
        username: "",
        contraseña: ""
    });

    const [orden, setOrden] = useState([]);

    const [pantallaActual, setPantallaActual] = useState("");

    return (
        <AppContext.Provider
            value={{
                logeado,
                setLogeado,
                pantallaActual,
                setPantallaActual,
                usuarioActual,
                setUsuarioActual,
                orden,
                setOrden,
                toastVisible, 
                setToastVisible,
                tarjetas,
                setTarjetas
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState;