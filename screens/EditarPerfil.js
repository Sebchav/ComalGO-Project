import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import HeaderPerfil from '../components/HeaderPerfil';
import BtnPrincipal from '../components/BtnPrincipal';
import AppContext from '../context/app/appContext';
import Alerta from '../components/Alerta'
import { Icon } from 'react-native-elements';
import firebase from '../database/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditarPerfil = () => {
  const { usuarioActual, setUsuarioActual } = useContext(AppContext);

  const [mostrarContraseñaActual, setMostrarContraseñaActual] = useState(false);
  const [mostrarNuevaContraseña, setMostrarNuevaContraseña] = useState(false);
  const [contraseñaActual, setContraseñaActual] = useState('');
  
  useEffect(() => {
    setContraseñaActual(usuarioActual.contraseña);
  }, [usuarioActual.contraseña]);
  

  const toggleMostrarContraseñaActual = () => {
    setMostrarContraseñaActual(!mostrarContraseñaActual);
  };

  const toggleMostrarNuevaContraseña = () => {
    setMostrarNuevaContraseña(!mostrarNuevaContraseña);
  };

  const handleChangeText = (name, value) => {
    setUsuarioActual({ ...usuarioActual, [name]: value, actualUsername: value });
    console.log(usuarioActual);
  };

  const [alerta, setAlerta] = useState({
    visible: false,
    mensaje: "",
    tipo: ""
  })

  const limpiarAlerta = () => {
    setTimeout(() => {
      setAlerta({
        visible: false,
        mensaje: "",
        tipo: ""
      });
    }, 3000);
  };

  const validarUsername = () => {
    const regexCaracteresEspeciales = /^[a-zA-Z0-9]+$/;

    if (usuarioActual.username.length < 6) {
      setAlerta({
        visible: true,
        mensaje: 'El nombre de usuario debe tener al menos 6 caracteres',
        tipo: 'error',
      });

      limpiarAlerta();

      return false;
    } else if (!regexCaracteresEspeciales.test(usuarioActual.username)) {
      setAlerta({
        visible: true,
        mensaje: 'El nombre de usuario no debe contener caracteres especiales ni espacios',
        tipo: 'error',
      });

      limpiarAlerta();

      return false;
    }

    return true;
  };


  const actualizarUsuario = async () => {
    // Validar si algún valor en el estado es vacío
    if (!usuarioActual.username || !usuarioActual.nuevaContraseña) {
      setAlerta({
        visible: true,
        mensaje: "No puede haber entradas vacias",
        tipo: "error"
      });
  
      limpiarAlerta();
  
      return;
    }

    //Validar si existe el usuario
    try {
      const lowerCaseInputUsername = usuarioActual.username.toLowerCase();

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
              mensaje: "El nombre de usuario no está disponible o debes cambiarlo para actualizar la contraseña",
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

    if (!validarUsername()) {
      return;
    }

    //Validar contraseña
    if (usuarioActual.nuevaContraseña.length < 6) {
      setAlerta({
        visible: true,
        mensaje: "La contraseña debe contener al menos 6 caracteres",
        tipo: "error"
      });
  
      limpiarAlerta();
  
      return;
    }


    if (!usuarioActual.correo) {
      console.error('Correo electrónico no válido');
      setAlerta({
        visible: true,
        mensaje: "Error al actualizar usuario: Correo electrónico no válido",
        tipo: "error",
      });
      return;
    }


    try {
      const usersCollection = firebase.db.collection('users');
      const querySnapshot = await usersCollection
        .where('correo', '==', usuarioActual.correo)
        .get();
  
      if (querySnapshot.empty) {
        console.error('Usuario no encontrado');
        return;
      }
  
      const userId = querySnapshot.docs[0].id;
      
  
      // Actualizar los datos del usuario
      await firebase.db.collection("users").doc(userId).update({
        username: usuarioActual.username,
        contraseña: usuarioActual.nuevaContraseña,
      });
  
      console.log("Usuario actualizado correctamente");

      setUsuarioActual({
        ...usuarioActual,
        nuevaContraseña: '', // Limpiar la nueva contraseña
        contraseña: usuarioActual.nuevaContraseña, // Actualizar la contraseña actual
      });
    
      setContraseñaActual(usuarioActual.nuevaContraseña); // Actualizar la contraseña actual en el estado

      // Actualizar AsyncStorage con los nuevos datos
      await AsyncStorage.setItem('username', usuarioActual.username);
      await AsyncStorage.setItem('contraseña', usuarioActual.nuevaContraseña);

      setAlerta({
        visible: true,
        mensaje: "Usuario actualizado correctamente",
        tipo: "exito",
      });
      limpiarAlerta();
      return false;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      setAlerta({
        visible: true,
        mensaje: "Error al actualizar usuario",
        tipo: "error",
      });
      limpiarAlerta();
      return false;
    }
  
////////////////////
}

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View>
      <HeaderPerfil texto={"Mi Perfil"} mostrarFlecha={true} />
      <Image style={styles.icono} source={require("../assets/iconoPerfil.png")} />
      {alerta.visible && <Alerta mensaje={alerta.mensaje} tipo={alerta.tipo}/>}
      <View style={styles.form}>
        <View style={styles.campo}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder='Ingresa tu username para cambiarlo'
            value={usuarioActual.username}
            onChangeText={(value) => handleChangeText("username", value)}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            placeholder='Ingresa tu correo para cambiarlo'
            value={usuarioActual.correo}
            onChangeText={(value) => handleChangeText("correo", value)}
            editable={false}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Contraseña Actual</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!mostrarContraseñaActual}
              placeholder='Ingresa tu contraseña actual para cambiarla'
              value={usuarioActual.contraseña}
              editable={false}
            />
            <TouchableOpacity onPress={toggleMostrarContraseñaActual} style={styles.iconContainer}>
              <Icon
                type="material"
                name={mostrarContraseñaActual ? "visibility" : "visibility-off"}
                size={23}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Nueva Contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!mostrarNuevaContraseña}
              placeholder='Ingresa tu nueva o misma contraseña'
              value={usuarioActual.nuevaContraseña} 
              onChangeText={(value) => handleChangeText("nuevaContraseña", value)} 
            />
            <TouchableOpacity onPress={toggleMostrarNuevaContraseña} style={styles.iconContainer}>
              <Icon
                type="material"
                name={mostrarNuevaContraseña ? "visibility" : "visibility-off"}
                size={23}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.boton}>
        <BtnPrincipal texto={"Confirmar Cambios"} handleVisible={actualizarUsuario} />
      </View>
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  icono: {
    position: "absolute",
    top: 100,
    left: 115,
    height: 160,
    width: 160,
  },
  form: {
    marginHorizontal: 30,
    gap: 20,
  },
  input: {
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: "#666687",
    flexDirection: "row",
    alignItems: "center",
  },
  campo: {
    gap: 5,
  },
  boton: {
    marginHorizontal: 70,
    marginTop: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: "#666687",
  },
  passwordInput: {
    flex: 1,
    padding: 15,
  },
  iconContainer: {
    padding: 15,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

export default EditarPerfil;
