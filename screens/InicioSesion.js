import React, {useContext, useState} from 'react'
import { ScrollView, StyleSheet, Image, View } from 'react-native'
import { Input, Text, Button } from '@rneui/themed'
import AppContext from '../context/app/appContext'
import firebase from '../database/firebase'
import Alerta from '../components/Alerta'
import AsyncStorage from '@react-native-async-storage/async-storage';

const InicioSesion = (props) => {

    const {setLogeado} = useContext(AppContext);

    const [alerta, setAlerta] = useState({
        visible: false,
        mensaje: "",
        tipo: ""
    })

    const [ state, setState ] = useState({
        correo: "",
        contraseña: "",
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

    const handleInicioSesion = async () => {
        try {
          const usersCollection = firebase.db.collection('users');
          const userQuery = usersCollection.where('correo', '==', state.correo.toLowerCase());
          const userSnapshot = await userQuery.get();
      
          if (!userSnapshot.empty) {
            // Iterar sobre los documentos en la colección
            userSnapshot.forEach(async(doc) => {
              // Acceder al ID del documento
              const userId = doc.id;

              // Acceder a los datos de cada documento
              const userData = doc.data();
                
              const username = userData.username;

              // Verificar si la contraseña coincide
              if (userData.contraseña === state.contraseña) {
                
                await AsyncStorage.setItem('id', userId);
                await AsyncStorage.setItem('correo', state.correo);
                await AsyncStorage.setItem('username', username);
                await AsyncStorage.setItem('contraseña', state.contraseña);

                setLogeado(true);
                console.log('Inicio de sesión exitoso para el usuario:', state.correo);
                console.log('ID del documento:', userId);
                props.navigation.navigate('Categorias');
              } else {
                setAlerta({
                  visible: true,
                  mensaje: 'Contraseña Incorrecta',
                  tipo: 'error',
                });
      
                limpiarAlerta();
              }
            });
          } else {
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
            placeholder='Ingresa tu contraseña'
            label="Contraseña"
            secureTextEntry={true}
            style={{paddingHorizontal: 10}}
            labelStyle={{color: "black", fontWeight: "600"}}
            inputContainerStyle={{border: "1.5px solid black", borderRadius: 5}}
            containerStyle={{paddingHorizontal: 0}}
            value={state.contraseña}
            onChangeText={(value)=> handleChangeText("contraseña", value)}
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

