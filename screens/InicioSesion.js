import React, {useContext} from 'react'
import { ScrollView, StyleSheet, Image, View } from 'react-native'
import { Input, Text, Button } from '@rneui/themed'
import AppContext from '../context/app/appContext'

const InicioSesion = (props) => {

    const {setLogeado} = useContext(AppContext);

    const handleInicioSesion = ()=>{
        setLogeado(true)
        props.navigation.navigate("Categorias")
    }

  return (
    <ScrollView style={styles.container}>
        <Image style={styles.logo} source={require("../img/LogotipoWhite.png")} />

        <Input 
            label="Correo"
            style={{paddingHorizontal: 10}}
            placeholder='Ingresa tu correo'
            labelStyle={{color: "black", fontWeight: "600"}}
            inputContainerStyle={{border: "1.5px solid black", borderRadius: 5}}
            containerStyle={{paddingHorizontal: 0}}
        />

        <Input 
            placeholder='Ingresa tu contraseña'
            label="Contraseña"
            style={{paddingHorizontal: 10}}
            labelStyle={{color: "black", fontWeight: "600"}}
            inputContainerStyle={{border: "1.5px solid black", borderRadius: 5}}
            containerStyle={{paddingHorizontal: 0}}
          
        />

        <View
            style={styles.buttons}
        >
            <Button color="#35253A" onPress={()=> handleInicioSesion()}>¡Inicia Sesión!</Button>

            <Button color="#486673" onPress={()=> props.navigation.navigate("Registro")}>¿No tienes una cuenta? Regístrate</Button>
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

export default InicioSesion

