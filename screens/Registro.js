// Importaciones de módulos y componentes de React y React Native
import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, Image, View, Alert } from 'react-native';
import { Input, Text, Button } from '@rneui/themed';
import Platillos from '../components/Platillos';
import BtnPrincipal from '../components/BtnPrincipal';
import Alerta from '../components/Alerta';
import firebase from '../database/firebase';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../context/app/appContext';

// Componente funcional Registro
const Registro = (props) => {
    // Desestructuración de variables del contexto AppContext
    const { setLogeado, pantallaActual } = useContext(AppContext);
    // Hook de navegación para acceder a la navegación
    const navigation = useNavigation();

    // Efecto para redireccionar a Categorias si ya hay una sesión activa
    useEffect(() => {
        if (pantallaActual) {
            navigation.navigate("Categorias");
        }
    }, [navigation.navigate]);

    // Efecto para verificar si ya hay un usuario registrado al cargar el componente
    useEffect(() => {
        const verificarUsuario = async () => {
            try {
                // Obtener el valor de idUser desde AsyncStorage
                const idUser = await AsyncStorage.getItem('id');

                if (idUser) {
                    setLogeado(true);
                    navigation.navigate('Categorias');
                }
            } catch (error) {
                console.error('Error al verificar usuario:', error.message);
            }
        };

        verificarUsuario();
    }, []);

    // Estado local para controlar la visibilidad de la contraseña
    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    // Estado local para controlar la visibilidad de la contraseña repetida
    const [mostrarContraseñaRepetida, setMostrarContraseñaRepetida] = useState(false);

    // Función para alternar la visibilidad de la contraseña
    const toggleMostrarContraseña = () => {
        setMostrarContraseña(!mostrarContraseña);
    };

    // Función para alternar la visibilidad de la contraseña repetida
    const toggleMostrarContraseñaRepetida = () => {
        setMostrarContraseñaRepetida(!mostrarContraseñaRepetida);
    };

    // Estado local para gestionar las alertas en el registro
    const [alerta, setAlerta] = useState({
        visible: false,
        mensaje: "",
        tipo: ""
    });

    // Estado local para gestionar los datos del formulario de registro
    const [state, setState] = useState({
        correo: "",
        username: "",
        contraseña: "",
        contraseñaRepetida: ""
    });

    // Función para manejar cambios en el texto de los campos de formulario
    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value });
    };

    // Función para limpiar las alertas después de un tiempo
    const limpiarAlerta = () => {
        setTimeout(() => {
            setAlerta({
                visible: false,
                mensaje: "",
                tipo: ""
            });
        }, 3000);
    };

    // Función para verificar si el correo ya está registrado en la base de datos
    const checkEmailExistence = async (email) => {
        try {
            const usersCollection = firebase.db.collection('users');
            const querySnapshot = await usersCollection.where('correo', '==', email).get();

            return !querySnapshot.empty; // Devuelve true si hay resultados (correo ya en uso), false si no hay resultados
        } catch (error) {
            console.error('Error al verificar el correo electrónico:', error);
            throw error;
        }
    };

    // Función para validar el formato del correo electrónico
    const validarCorreo = () => {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexCorreo.test(state.correo)) {
            setAlerta({
                visible: true,
                mensaje: 'Por favor, ingresa un correo electrónico válido.',
                tipo: 'error',
            });

            limpiarAlerta();

            return false;
        }

        return true;
    };

    // Función para validar el formato del nombre de usuario
    const validarUsername = () => {
        const regexCaracteresEspeciales = /^[a-zA-Z0-9]+$/;

        if (state.username.length < 6) {
            setAlerta({
                visible: true,
                mensaje: 'El nombre de usuario debe tener al menos 6 caracteres.',
                tipo: 'error',
            });

            limpiarAlerta();

            return false;
        } else if (!regexCaracteresEspeciales.test(state.username)) {
            setAlerta({
                visible: true,
                mensaje: 'El nombre de usuario no debe contener caracteres especiales ni espacios.',
                tipo: 'error',
            });

            limpiarAlerta();

            return false;
        }

        return true;
    };

    // Función principal para registrar al usuario
    const registrarUsuario = async () => {
        // Validación de campos obligatorios
        if (Object.values(state).includes('')) {
            setAlerta({
                visible: true,
                mensaje: "Todos los campos son obligatorios",
                tipo: "error"
            });

            limpiarAlerta();

            return;
        }

        // Validación de longitud de contraseña
        if (state.contraseña.length < 6) {
            setAlerta({
                visible: true,
                mensaje: "La contraseña debe contener al menos 6 caracteres",
                tipo: "error"
            });

            limpiarAlerta();

            return;
        }

        // Validación de coincidencia de contraseñas
        if (state.contraseña !== state.contraseñaRepetida) {
            setAlerta({
                visible: true,
                mensaje: "Las contraseñas deben ser las mismas",
                tipo: "error"
            });

            limpiarAlerta();

            return;
        }

        // Validación de formato de correo electrónico
        if (!validarCorreo()) {
            return;
        }

        // Validación de formato de nombre de usuario
        if (!validarUsername()) {
            return;
        }

        // Verificación de existencia del correo en la base de datos
        try {
            const emailExists = await checkEmailExistence(state.correo.toLowerCase());

            if (emailExists) {
                console.log('Correo electrónico ya registrado');
                setAlerta({
                    visible: true,
                    mensaje: "El correo ya está registrado",
                    tipo: "error"
                });

                limpiarAlerta();

                return;
            } else {
                console.log('Correo electrónico disponible');
            }
        } catch (error) {
            console.error('Error al verificar el correo electrónico:', error);
        }

        // Verificación de existencia del nombre de usuario en la base de datos
        try {
            const lowerCaseInputUsername = state.username.toLowerCase();

            const usersCollection = firebase.db.collection('users');
            const querySnapshot = await usersCollection.get();

            const userExists = querySnapshot.docs.some(doc => {
                const lowerCaseDBUsername = doc.data().username.toLowerCase();
                return lowerCaseDBUsername === lowerCaseInputUsername;
            });

            if (userExists) {
                console.log('Nombre de usuario no disponible');
                setAlerta({
                    visible: true,
                    mensaje: "El nombre de usuario no está disponible",
                    tipo: "error"
                });

                limpiarAlerta();

                return;
            } else {
                console.log('Nombre de usuario disponible');
            }

        } catch (error) {
            console.error('Error al verificar el usuario:', error);
        }

        // Registro exitoso: Agregar el usuario a la base de datos
        try {
            await firebase.db.collection("users").add({
                correo: state.correo,
                contraseña: state.contraseña,
                username: state.username
            });

            console.log("Usuario almacenado");
        } catch (error) {
            console.log(error);
        }

        // Mostrar alerta de registro exitoso
        setAlerta({
            visible: true,
            mensaje: "Registro exitoso",
            tipo: "exito"
        });

        // Limpiar el estado del formulario
        setState({
            correo: "",
            username: "",
            contraseña: "",
            contraseñaRepetida: ""
        });

        // Limpiar la alerta después de un tiempo
        limpiarAlerta();

        // Redireccionar a la pantalla de Inicio de Sesión después de 2 segundos
        setTimeout(() => {
            props.navigation.navigate("InicioSesion");
        }, 2000);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Sección de la imagen del logo */}
            <Image style={styles.logo} source={require("../img/LogotipoWhite.png")} />

            {/* Mostrar la alerta si está activa */}
            {alerta.visible && <Alerta mensaje={alerta.mensaje} tipo={alerta.tipo} />}

            {/* Campo de entrada para el correo electrónico */}
            <Input
                label="Correo"
                style={{ paddingHorizontal: 10 }}
                placeholder='Ingresa tu correo'
                labelStyle={{ color: "black", fontWeight: "600" }}
                inputContainerStyle={{ border: "1.5px solid black", borderRadius: 5 }}
                containerStyle={{ paddingHorizontal: 0 }}
                value={state.correo}
                onChangeText={(value) => handleChangeText("correo", value)}
            />

            {/* Campo de entrada para el nombre de usuario */}
            <Input
                label="Username"
                style={{ paddingHorizontal: 10 }}
                value={state.username}
                placeholder='Ingresa tu nombre de usuario'
                labelStyle={{ color: "black", fontWeight: "600" }}
                inputContainerStyle={{ border: "1.5px solid black", borderRadius: 5 }}
                containerStyle={{ paddingHorizontal: 0 }}
                onChangeText={(value) => handleChangeText("username", value)}
            />

            {/* Campo de entrada para la contraseña */}
            <Input
                placeholder='Ingresa tu contraseña'
                label="Contraseña"
                value={state.contraseña}
                style={styles.inputPsw}
                labelStyle={styles.labelPsw}
                inputContainerStyle={styles.inputContainerPsw}
                containerStyle={styles.inputContainerPsw}
                onChangeText={(value) => handleChangeText("contraseña", value)}
                secureTextEntry={!mostrarContraseña}
                rightIcon={
                    <Icon
                        type="material"
                        name={mostrarContraseña ? "visibility" : "visibility-off"}
                        onPress={toggleMostrarContraseña}
                    />
                }
            />

            {/* Campo de entrada para repetir la contraseña */}
            <Input
                placeholder='Confirma tu contraseña'
                label="Repite tu contraseña"
                value={state.contraseñaRepetida}
                style={styles.inputPsw}
                labelStyle={styles.labelPsw}
                inputContainerStyle={styles.inputContainerPsw}
                containerStyle={styles.inputContainerPsw}
                onChangeText={(value) => handleChangeText("contraseñaRepetida", value)}
                secureTextEntry={!mostrarContraseñaRepetida}
                rightIcon={
                    <Icon
                        type="material"
                        name={mostrarContraseñaRepetida ? "visibility" : "visibility-off"}
                        onPress={toggleMostrarContraseñaRepetida}
                    />
                }
            />

            {/* Sección de botones */}
            <View style={styles.buttons}>
                {/* Botón para registrar al usuario */}
                <Button color="#35253A" onPress={() => registrarUsuario()}>¡Regístrate!</Button>

                {/* Botón para redirigir a la pantalla de Inicio de Sesión */}
                <Button color="#486673" onPress={() => props.navigation.navigate("InicioSesion")}>¿Ya tienes una cuenta? Inicia Sesión</Button>
            </View>
        </ScrollView>
    );
};

// Estilos del componente
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        display: "flex",
        flexDirection: "column"
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        display: "flex",
        alignSelf: "center"
    },
    buttons: {
        marginTop: 15,
        display: "flex",
        gap: 15

    },
    inputText: {
        padding: 0,
        paddingHorizontal: 10
    },
    inputPsw: {
        paddingHorizontal: 10
    },
    labelPsw: {
        color: "black",
        fontWeight: "600"
    },
    inputContainerPsw: {
        border: "1.5px solid black",
        borderRadius: 5,
        paddingHorizontal: 0
    },
  });

export default Registro

