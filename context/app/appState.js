import React, { useReducer, useState } from 'react';
import AppReducer from './appReducer';
import AppContext from './appContext';

// Componente AppState que gestiona el estado global de la aplicación
const AppState = (props) => {
    // Estados locales para gestionar diferentes partes del estado global
    const [tarjetas, setTarjetas] = useState([]);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastVisible2, setToastVisible2] = useState(false);
    const [logeado, setLogeado] = useState(false);
    const [usuarioActual, setUsuarioActual] = useState({
        id: "",
        correo: "",
        username: "",
        contraseña: ""
    });

    const [orden, setOrden] = useState([]);
    const [ordenConfirmada, setOrdenConfirmada] = useState({
        orden: [],
        total: ""
    });

    const [pantallaActual, setPantallaActual] = useState("");
    const [ordenActual, setOrdenActual] = useState([]);

    // Proporciona el contexto y los valores del estado global a los componentes hijos
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
                setTarjetas,
                ordenConfirmada,
                setOrdenConfirmada,
                ordenActual,
                setOrdenActual,
                setToastVisible2,
                toastVisible2
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppState;
