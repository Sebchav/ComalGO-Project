import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, StyleSheet, Image, View, Alert } from 'react-native'
import { Input, Text, Button } from '@rneui/themed'
import Platillos from '../components/Platillos'
import BtnPrincipal from '../components/BtnPrincipal'
import Alerta from '../components/Alerta'
import firebase from '../database/firebase'
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import AppContext from '../context/app/appContext'

const Registro = (props) => {

    const {setLogeado} = useContext(AppContext);
    const navigation = useNavigation();
  
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

    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    const [mostrarContraseñaRepetida, setMostrarContraseñaRepetida] = useState(false);

    const toggleMostrarContraseña = () => {
        setMostrarContraseña(!mostrarContraseña);
    };

    const toggleMostrarContraseñaRepetida = () => {
        setMostrarContraseñaRepetida(!mostrarContraseñaRepetida);
    };

    const [alerta, setAlerta] = useState({
        visible: false,
        mensaje: "",
        tipo: ""
    })

    const [ state, setState ] = useState({
        correo: "",
        username: "",
        contraseña: "",
        contraseñaRepetida: ""
    })

    const handleChangeText = (name, value)=>{
        setState({...state, [name]: value})
    }

    const limpiarAlerta = ()=>{
        setTimeout(()=>{
            setAlerta({
                visible: false,
                mensaje: "",
                tipo: ""
            });
        }, 3000)
    }

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


    const checkUserExistence = async (usuario) => {
        try {
            const usersCollection = firebase.db.collection('users');
            const lowerCaseUsername = usuario.toLowerCase();
            const querySnapshot = await usersCollection
                .where('username', '==', lowerCaseUsername)
                .get();
    
            console.log('Username to check:', lowerCaseUsername);
            console.log('Existing usernames:', querySnapshot.docs.map(doc => doc.data().username));
    
            return querySnapshot.size > 0;
        } catch (error) {
            console.error('Error al verificar el usuario:', error);
            throw error;
        }
    };
    
    
    
    
       

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


    const registrarUsuario = async()=>{
        if(Object.values(state).includes('')){
            setAlerta({
                visible: true,
                mensaje: "Todos los campos son obligatorios",
                tipo: "error"
            });

            limpiarAlerta();


            return;
        }

        if(state.contraseña.length < 6){
            setAlerta({
                visible: true,
                mensaje: "La contraseña debe contener al menos 6 caracteres",
                tipo: "error"
            });

           limpiarAlerta();

            return;
        }

        if(state.contraseña != state.contraseñaRepetida ){
            setAlerta({
                visible: true,
                mensaje: "Las contraseñas deben ser las mismas",
                tipo: "error"
            });

            limpiarAlerta();

            return;
        }

        if (!validarCorreo()) {
            return;
        }

        if (!validarUsername()) {
            return;
        }

        
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

        try {
            const lowerCaseInputUsername = state.username.toLowerCase();
        
            console.log('Nombre de usuario a verificar:', lowerCaseInputUsername);
        
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
        
        
        try{
            await firebase.db.collection("users").add({
                correo: state.correo,
                contraseña: state.contraseña,
                username: state.username
        });

        console.log("usuario almacenado");
        }catch(error){
            console.log(error);
        }
        setAlerta({
            visible: true,
            mensaje: "Registro exitoso",
            tipo: "exito"
        });

        setState({
            correo: "",
            username: "",
            contraseña: "",
            contraseñaRepetida: ""
        })

        limpiarAlerta();

        setTimeout(()=>{
            props.navigation.navigate("InicioSesion")
        }, 2000)
    }

  return (
    <ScrollView style={styles.container}>
        {/* <Platillos /> */}
        {/* <BtnPrincipal texto={"Añadir a la orden"}/> */}
        <Image style={styles.logo} source={require("../img/LogotipoWhite.png")} />

        {alerta.visible && <Alerta mensaje={alerta.mensaje} tipo={alerta.tipo}/>}

        <Input 
            label="Correo"
            style={{paddingHorizontal: 10}}
            placeholder='Ingresa tu correo'
            labelStyle={{color: "black", fontWeight: "600"}}
            inputContainerStyle={{border: "1.5px solid black", borderRadius: 5}}
            containerStyle={{paddingHorizontal: 0}}
            value={state.correo}
            onChangeText={(value)=> handleChangeText("correo", value)}
        />

        <Input 
            label="Username"
            style={{paddingHorizontal: 10}}
            value={state.username}
            placeholder='Ingresa tu nombre de usuario'
            labelStyle={{color: "black", fontWeight: "600"}}
            inputContainerStyle={{border: "1.5px solid black", borderRadius: 5}}
            containerStyle={{paddingHorizontal: 0}}
            onChangeText={(value)=> handleChangeText("username", value)}
        />

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

        <View
            style={styles.buttons}
        >
            <Button color="#35253A" onPress={()=> registrarUsuario()}>¡Regístrate!</Button>

            <Button color="#486673" onPress={()=> props.navigation.navigate("InicioSesion")}>¿Ya tienes una cuenta? Inicia Sesión</Button>
        </View>
       
      
    </ScrollView>
  )
}
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

