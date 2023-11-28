import React, { useState } from 'react'
import { ScrollView, StyleSheet, Image, View, Alert } from 'react-native'
import { Input, Text, Button } from '@rneui/themed'
import Platillos from '../components/Platillos'
import BtnPrincipal from '../components/BtnPrincipal'
import Alerta from '../components/Alerta'
import firebase from '../database/firebase'

const Registro = (props) => {

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

    // const checkEmailExistence = async (email) => {
    //     try {
    //       const querySnapshot = await firebase.db.collection('users').where('correo', '==', state.email).get();
    //       return !querySnapshot.empty; // Devuelve true si hay resultados (correo ya en uso), false si no hay resultados
    //     } catch (error) {
    //       console.error('Error al verificar el correo electrónico:', error);
    //       throw error;
    //     }
    //   };

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

        // if(checkEmailExistence()){
        //     console.log("Si hay un usuario registrado con este correo")
        //     return
        // }else{
        //     console.log("correo no usado")
        //     return
        // }

        try{
            await firebase.db.collection("users").add({
                state
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
        }, 3000)
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
            style={{paddingHorizontal: 10}}
            labelStyle={{color: "black", fontWeight: "600"}}
            inputContainerStyle={{border: "1.5px solid black", borderRadius: 5}}
            containerStyle={{paddingHorizontal: 0}}
            onChangeText={(value)=> handleChangeText("contraseña", value)}
            secureTextEntry={true}
          
        />

        <Input 
            placeholder='Confirma tu contraseña'
            label="Repite tu contraseña"
            value={state.contraseñaRepetida}
            style={{paddingHorizontal: 10}}
            labelStyle={{color: "black", fontWeight: "600"}}
            inputContainerStyle={{border: "1.5px solid black", borderRadius: 5}}
            containerStyle={{paddingHorizontal: 0}}
            onChangeText={(value)=> handleChangeText("contraseñaRepetida", value)}
            secureTextEntry={true}
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
    }
  });

export default Registro

