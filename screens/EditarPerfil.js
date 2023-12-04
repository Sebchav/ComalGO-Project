import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import HeaderPerfil from '../components/HeaderPerfil';
import BtnPrincipal from '../components/BtnPrincipal';
import AppContext from '../context/app/appContext';

const EditarPerfil = () => {

  const { usuarioActual, setUsuarioActual } = useContext(AppContext)

  const handleChangeText = (name, value)=>{
    setUsuarioActual({...usuarioActual, [name]: value})
    console.log(usuarioActual);
}

  return (
    <View>
        <HeaderPerfil texto={"Mi Perfil"} mostrarFlecha={true}/>
        <Image style={styles.icono} source={require("../assets/iconoPerfil.png")}/>
        <View style={styles.form}>
            
            <View style={styles.campo}>
              <Text style={styles.label}>Username</Text>
              <TextInput 
               style={styles.input} 
               placeholder='Ingresa tu username para cambiarlo'
               value={usuarioActual.username}
               onChangeText={(value)=> handleChangeText("username", value)}
               ></TextInput>
            </View>
            
            <View style={styles.campo}>
              <Text style={styles.label}>Correo</Text>
              <TextInput
                 style={styles.input}
                 placeholder='Ingresa tu correo para cambiarlo'
                 value={usuarioActual.correo}
                 onChangeText={(value)=> handleChangeText("correo", value)}
                ></TextInput>
            </View>
            <View style={styles.campo}>
              <Text style={styles.label}>Contraseña Actual</Text>
              <TextInput style={styles.input} secureTextEntry={true} placeholder='Ingresa tu contraseña actual para cambiarla'>{usuarioActual.contraseña}</TextInput>
            </View>
            <View style={styles.campo}>
              <Text style={styles.label}>Nueva Contraseña</Text>
              <TextInput style={styles.input} secureTextEntry={true} placeholder='Ingresa tu nueva contraseña'></TextInput>
            </View>
          
        </View>

        <View style={styles.boton}>
          <BtnPrincipal texto={"Confirmar Cambios"} handleVisible={()=> console.log("algo")}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    icono: {
        position: "absolute",
        top: 100,
        left: 115,
        height: 160,
        width:160,
    },
    form: {
      marginHorizontal: 30,
      gap: 20
    },
    input:{
        padding: 15,
        borderWidth: .5,
        borderRadius: 20,
        borderColor: "#666687",
    },
    campo: {
      gap: 5
    },
    boton: {
      marginHorizontal: 70,
      marginTop: 20
    },
    label:{
        fontSize: 15,
        fontWeight: "500"
    }

})

export default EditarPerfil;