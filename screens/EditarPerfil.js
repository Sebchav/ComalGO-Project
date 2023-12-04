import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import HeaderPerfil from '../components/HeaderPerfil';
import BtnPrincipal from '../components/BtnPrincipal';
import AppContext from '../context/app/appContext';
import { Icon } from 'react-native-elements';

const EditarPerfil = () => {
  const { usuarioActual, setUsuarioActual } = useContext(AppContext);

  const [mostrarContraseñaActual, setMostrarContraseñaActual] = useState(false);
  const [mostrarNuevaContraseña, setMostrarNuevaContraseña] = useState(false);

  const toggleMostrarContraseñaActual = () => {
    setMostrarContraseñaActual(!mostrarContraseñaActual);
  };

  const toggleMostrarNuevaContraseña = () => {
    setMostrarNuevaContraseña(!mostrarNuevaContraseña);
  };

  const handleChangeText = (name, value) => {
    setUsuarioActual({ ...usuarioActual, [name]: value });
    console.log(usuarioActual);
  };

  return (
    <View>
      <HeaderPerfil texto={"Mi Perfil"} mostrarFlecha={true} />
      <Image style={styles.icono} source={require("../assets/iconoPerfil.png")} />
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
              placeholder='Ingresa tu nueva contraseña'
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
        <BtnPrincipal texto={"Confirmar Cambios"} handleVisible={() => console.log("algo")} />
      </View>
    </View>
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
});

export default EditarPerfil;
