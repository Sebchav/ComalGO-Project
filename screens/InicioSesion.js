// Importaciones de React y Hooks para gestionar el estado y efectos secundarios
import React, { useContext, useState } from 'react';

// Importaciones de componentes de React Native para la interfaz de usuario
import { ScrollView, StyleSheet, Image, View } from 'react-native';

// Importaciones de componentes de React Native Elements
import { Input, Text, Button } from '@rneui/themed';
import { Icon } from 'react-native-elements';

// Importación del contexto de la aplicación desde la ubicación especificada
import AppContext from '../context/app/appContext';

// Importación de la instancia de Firebase desde la ubicación especificada
import firebase from '../database/firebase';

// Importación del componente Alerta desde la ubicación especificada
import Alerta from '../components/Alerta';

// Importación de AsyncStorage desde la librería '@react-native-async-storage/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage';

const InicioSesion = (props) => {
    // Contexto para manejar el estado global de la aplicación
    const { setLogeado, usuarioActual, setUsuarioActual } = useContext(AppContext);

    // Estados locales para manejar la visibilidad de las contraseñas
    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    const [mostrarContraseñaRepetida, setMostrarContraseñaRepetida] = useState(false);

    // Función para alternar la visibilidad de la contraseña
    const toggleMostrarContraseña = () => {
        setMostrarContraseña(!mostrarContraseña);
    };

    // Función para alternar la visibilidad de la contraseña repetida
    const toggleMostrarContraseñaRepetida = () => {
        setMostrarContraseñaRepetida(!mostrarContraseñaRepetida);
    };

    // Estado local para gestionar la visualización de alertas
    const [alerta, setAlerta] = useState({
        visible: false,
        mensaje: "",
        tipo: ""
    });

    // Estado local para gestionar el formulario de inicio de sesión
    const [state, setState] = useState({
        correo: "",
        contraseña: "",
    });

    // Función para manejar cambios en el texto de los campos controlados
    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value });
    };

    // Función para limpiar la alerta después de cierto tiempo
    const limpiarAlerta = () => {
        setTimeout(() => {
            setAlerta({
                visible: false,
                mensaje: "",
                tipo: ""
            });
        }, 3000);
    };

    // Función para manejar el inicio de sesión
    const handleInicioSesion = async () => {
        try {
            const usersCollection = firebase.db.collection('users');
            const userQuery = usersCollection.where('correo', '==', state.correo.toLowerCase());
            const userSnapshot = await userQuery.get();

            if (!userSnapshot.empty) {
                // Iterar sobre los documentos en la colección
                userSnapshot.forEach(async (doc) => {
                    // Acceder al ID del documento
                    const userId = doc.id;

                    // Acceder a los datos de cada documento
                    const userData = doc.data();

                    const username = userData.username;

                    // Verificar si la contraseña coincide
                    if (userData.contraseña === state.contraseña) {

                        // Almacenar información en AsyncStorage
                        await AsyncStorage.setItem('id', userId);
                        await AsyncStorage.setItem('correo', state.correo);
                        await AsyncStorage.setItem('username', username);
                        await AsyncStorage.setItem('contraseña', state.contraseña);

                        // Actualizar el estado global del usuario
                        setUsuarioActual({
                            id: userId,
                            correo: state.correo,
                            username: username,
                            contraseña: state.contraseña
                        });

                        // Establecer que el usuario ha iniciado sesión
                        setLogeado(true);
                        props.navigation.navigate('Categorias');
                    } else {
                        // Mostrar alerta en caso de contraseña incorrecta
                        setAlerta({
                            visible: true,
                            mensaje: 'Contraseña Incorrecta',
                            tipo: 'error',
                        });

                        limpiarAlerta();
                    }
                });
            } else {
                // Mostrar alerta en caso de usuario no encontrado
                setAlerta({
                    visible: true,
                    mensaje: 'Usuario no encontrado',
                    tipo: 'error',
                });

                limpiarAlerta();
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Logo de la aplicación */}
            <Image style={styles.logo} source={require("../img/LogotipoWhite.png")} />

            {/* Mostrar alerta si es visible */}
            {alerta.visible && <Alerta mensaje={alerta.mensaje} tipo={alerta.tipo} />}

            {/* Input para el correo electrónico */}
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

            {/* Input para la contraseña */}
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

            {/* Contenedor de botones */}
            <View style={styles.buttons}>
                {/* Botón para iniciar sesión */}
                <Button color="#35253A" onPress={() => handleInicioSesion()}>¡Inicia Sesión!</Button>

                {/* Botón para navegar a la pantalla de registro */}
                <Button color="#486673" onPress={() => props.navigation.navigate("Registro")}>¿No tienes una cuenta? Regístrate</Button>
            </View>
        </ScrollView>
    );
};

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

export default InicioSesion;
