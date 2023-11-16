import React, { useState } from 'react'
import { ScrollView, StyleSheet, Image, View, Alert } from 'react-native'
import { Input, Text, Button } from '@rneui/themed'
import Platillos from '../components/Platillos'
import BtnPrincipal from '../components/BtnPrincipal'

const Registro = (props) => {

    const [ state, setState ] = useState({
        correo: "",
        contraseña: "",
        contraseñaRepetida: ""
    })

    const handleChangeText = (name, value)=>{
        setState({...state, [name]: value})
    }

    const registrarUsuario = ()=>{
        if(Object.values(state).includes('')){
            console.log("Todos los campos son obligatorios")
            return;
        }

        console.log(state)
    }

  return (
    <ScrollView style={styles.container}>
        {/* <Platillos /> */}
        {/* <BtnPrincipal texto={"Añadir a la orden"}/> */}
        <Image style={styles.logo} source={require("../img/LogotipoWhite.png")} />

        <Input 
            label="Correo"
            style={{paddingHorizontal: 10}}
            placeholder='Ingresa tu correo'
            labelStyle={{color: "black", fontWeight: "600"}}
            inputContainerStyle={{border: "1.5px solid black", borderRadius: 5}}
            containerStyle={{paddingHorizontal: 0}}
            onChangeText={(value)=> handleChangeText("correo", value)}
        />

        <Input 
            placeholder='Ingresa tu contraseña'
            label="Contraseña"
            style={{paddingHorizontal: 10}}
            labelStyle={{color: "black", fontWeight: "600"}}
            inputContainerStyle={{border: "1.5px solid black", borderRadius: 5}}
            containerStyle={{paddingHorizontal: 0}}
            onChangeText={(value)=> handleChangeText("contraseña", value)}
          
        />

        <Input 
            placeholder='Confirma tu contraseña'
            label="Repite tu contraseña"
            style={{paddingHorizontal: 10}}
            labelStyle={{color: "black", fontWeight: "600"}}
            inputContainerStyle={{border: "1.5px solid black", borderRadius: 5}}
            containerStyle={{paddingHorizontal: 0}}
            onChangeText={(value)=> handleChangeText("contraseñaRepetida", value)}
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

