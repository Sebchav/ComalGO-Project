import React, { useState, useContext } from "react";
import { Alert, Modal, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import BtnPrincipal from "../components/BtnPrincipal";
import AppContext from "../context/app/appContext";
import { useRoute } from "@react-navigation/native";
import firebase from "../database/firebase";

// Componente funcional ModalTarjeta para agregar o pagar con tarjetas
const ModalTarjeta = ({ modalVisible, setModalVisible }) => {
  // Obtener la ruta actual
  const route = useRoute();

  // Obtener variables y funciones del contexto de la aplicación
  const { usuarioActual, setTarjetas, tarjetas } = useContext(AppContext);

  // Estado local para la información de la nueva tarjeta
  const [nuevaTarjeta, setNuevaTarjeta] = useState({
    numeroTarjeta: "",
    titular: "",
    fechaExp: "",
    cvv: "",
  });

  // Función para manejar cambios en los campos de texto
  const handleChangeText = (name, value) => {
    setNuevaTarjeta({ ...nuevaTarjeta, [name]: value });
  };

  // Función para manejar cambios en la fecha de expiración
  const handleChangeFechaExp = (value) => {
    // Limpiar caracteres no numéricos
    const cleanedValue = value.replace(/[^0-9]/g, '');

    // Obtener los primeros 4 caracteres (MMYY)
    const formattedValue = cleanedValue.slice(0, 4);

    // Aplicar el formato MM/YY
    if (formattedValue.length <= 2) {
      setNuevaTarjeta({ ...nuevaTarjeta, fechaExp: formattedValue });
    } else {
      setNuevaTarjeta({
        ...nuevaTarjeta,
        fechaExp: `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`,
      });
    }
  };

  // Función para limpiar el estado local
  const limpiarState = () => {
    setNuevaTarjeta({
      numeroTarjeta: "",
      titular: "",
      fechaExp: "",
      cvv: "",
    });
  };

  // Función para guardar la tarjeta en la base de datos
  const guardarTarjeta = async () => {
    try {
      await firebase.db.collection("tarjetas").add({
        numeroTarjeta: nuevaTarjeta.numeroTarjeta,
        titular: nuevaTarjeta.titular,
        fechaExp: nuevaTarjeta.fechaExp,
        cvv: nuevaTarjeta.cvv,
        userId: usuarioActual.id,
      });

      setTarjetas([...tarjetas, nuevaTarjeta])
      // Limpiar el estado local y cerrar el modal
      limpiarState();
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // Vista modal para agregar o pagar con tarjetas
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
       
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Encabezado del modal con título y botón de cerrar */}
            <View style={styles.imgTop}>
              <View></View>
              <Text style={styles.titulo}>Añadir Tarjeta</Text>
              <TouchableOpacity onPress={() => {
                setModalVisible(!modalVisible)
                limpiarState();
              }}>
                <Image
                  style={styles.imgClose}
                  source={require("../assets/x.png")}
                />
              </TouchableOpacity>
            </View>

            {/* Contenedor del formulario */}
            <View style={styles.formCont}>
              {/* Contenedor del número de tarjeta con imagen de tarjeta */}
              <View style={styles.cardNumberContainer}>
                <TextInput
                  placeholder="Numero de tarjeta"
                  style={styles.input}
                  inputMode="numeric"
                  maxLength={16}
                  value={nuevaTarjeta.numeroTarjeta}
                  onChangeText={(value) => handleChangeText("numeroTarjeta", value)}
                />
                <Image
                  source={require("../assets/card.png")}
                  style={styles.cardImage}
                />
              </View>

              {/* Campo de texto para el titular de la tarjeta */}
              <TextInput
                placeholder="Titular de la tarjeta"
                style={styles.input}
                value={nuevaTarjeta.titular}
                onChangeText={(value) => handleChangeText("titular", value)}
              ></TextInput>

              {/* Contenedor de la fila de fecha de expiración y CVV */}
              <View style={styles.row}>
                {/* Campo de texto para la fecha de expiración */}
                <TextInput
                  placeholder="Fecha Exp"
                  style={styles.input2}
                  inputMode="numeric"
                  maxLength={5}
                  value={nuevaTarjeta.fechaExp}
                  onChangeText={(value) => handleChangeFechaExp(value)}
                ></TextInput>

                {/* Campo de texto para el CVV */}
                <TextInput
                  placeholder="CVV"
                  style={styles.input2}
                  inputMode="numeric"
                  maxLength={3}
                  value={nuevaTarjeta.cvv}
                  onChangeText={(value) => handleChangeText("cvv", value)}
                ></TextInput>
              </View>
            </View>

            {/* Contenedor del botón principal para guardar la tarjeta */}
            <View style={styles.btnContainer}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <BtnPrincipal texto={route.name == "MisTarjetas" ? "Guardar Tarjeta" : "Pagar"} handleVisible={guardarTarjeta} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Estilos del componente ModalTarjeta
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 50,
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    height: 460,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imgTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 15,
    marginBottom: 10,
  },
  imgClose: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  dataCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  buttons: {
    flexDirection: "row",
    gap: 50,
    marginTop: 40,
    alignItems: "center",
  },
  btn: {
    width: 40,
    height: 40,
  },
  cantidad: {
    fontSize: 25,
  },
  inputCont: {
    width: "80%",
    marginTop: 30,
    gap: 10,
  },
  titulo: {
    marginLeft: 15,
    fontSize: 25,
    color: "#32324D",
  },
  input: {
    padding: 20,
    borderWidth: 0.5,
    borderRadius: 20,
    marginVertical: 12,
    width: "100%",
    borderColor: "#666687",
  },
  input2: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 12,
    width: "47%",
    borderWidth: 0.5,
    borderColor: "#666687",
  },
  formCont: {
    width: "80%",
  },
  row: {
    flexDirection: "row",
    gap: 20,
  },
  btnContainer: {
    width: "80%",
    marginTop: 20,
  },
  cardNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  cardImage: {
    position: "absolute",
    right: 20,
  },
});

// Exportar el componente ModalTarjeta como componente predeterminado
export default ModalTarjeta;
