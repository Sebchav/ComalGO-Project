import React, { useState, useContext } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import BtnPrincipal from "../components/BtnPrincipal";
import AppContext from "../context/app/appContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import firebase from "../database/firebase";
import Producto from "./Producto";


// Componente ModalTarjeta que muestra un modal para seleccionar y guardar tarjetas de pago
const ModalTarjeta = ({ modalVisible, setModalVisible }) => {
  // Estado para almacenar la tarjeta seleccionada
  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(null);
  const { toastVisible2, setToastVisible2 } = useContext(AppContext);

  // Hooks de navegación y rutas de React Navigation
  const navigation = useNavigation();
  const route = useRoute();

  // Contexto de la aplicación
  const {
    usuarioActual,
    tarjetas,
    orden,
    setOrden,
    pantallaActual,
    setPantallaActual,
    setOrdenConfirmada,
    ordenConfirmada,
  } = useContext(AppContext);

  // Maneja la acción cuando se presiona una tarjeta
  const handleTarjetaPress = (tarjetaId) => {
    setTarjetaSeleccionada(tarjetaId);
  };

  // Guarda la orden con la tarjeta seleccionada
  const guardarTarjeta = async () => {
    if (route.name === "Orden") {
      // Calcula el total de la orden sumando el precio de cada producto
      const total = orden.reduce((acumulador, producto) => {
        return acumulador + parseInt(producto.precio) * parseInt(producto.cantidad);
      }, 0);

      // Genera un ID único para la orden
      const idOrden = Date.now();

      try {
        // Guarda la orden en la base de datos
        await firebase.db.collection("orders").add({
          orden,
          total,
          idOrden,
          usuario: {
            id: usuarioActual.id,
            username: usuarioActual.username,
          },
          status: 0,
        });

        // Actualiza el estado de la orden confirmada en el contexto
        setOrdenConfirmada({
          orden: [...ordenConfirmada.orden, { ...orden, total, status: 0, idOrden }],
        });

        setToastVisible2(true)
        // Limpia la orden actual en el contexto
        setOrden([]);
        // Cambia la pantalla actual y navega a la pantalla de estado
        setPantallaActual("Status");
        navigation.navigate("Status");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleVisible = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Encabezado del modal */}
            <View style={styles.imgTop}>
              <View></View>
              <Text style={styles.titulo}>Elige tu método de pago</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Image style={styles.imgClose} source={require("../assets/x.png")} />
              </TouchableOpacity>
            </View>

            {/* Contenedor de tarjetas */}
            <View style={styles.contenedorMaximo}>
              {tarjetas.map((tarjeta) => (
                <TouchableOpacity
                  style={styles.contenedorTarjetas}
                  key={tarjeta.id}
                  onPress={() => handleTarjetaPress(tarjeta.id)}
                >
                  <Image
                    style={styles.imagenTarjeta}
                    source={require("../assets/iconoTarjeta.png")}
                  />
                  <Text>{tarjeta.numeroTarjeta}</Text>
                  <Text>{tarjeta.fechaExp}</Text>
                  {/* Radio button para indicar la tarjeta seleccionada */}
                  <View
                    onPress={() => handleTarjetaPress(tarjeta.id)}
                    style={[
                      styles.radioButton,
                      {
                        backgroundColor:
                          tarjeta.id === tarjetaSeleccionada ? "#BABABA" : "transparent",
                      },
                    ]}
                  ></View>
                </TouchableOpacity>
              ))}

              {/* Botón para añadir nueva tarjeta */}
              {/* <TouchableOpacity style={styles.addNew} onPress={() => handleVisible()}>
                <Image style={styles.imgPlus} source={require("../assets/plus.png")} />
                <Text style={styles.textoTarj}>Añadir Tarjeta</Text>
              </TouchableOpacity> */}
            </View>

            {/* Contenedor de botones */}
            <View style={styles.btnContainer}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                {/* Botón para cerrar el modal */}
                <BtnPrincipal texto={route.name === "MisTarjetas" ? "Guardar Tarjeta" : "Pagar"} handleVisible={guardarTarjeta} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Estilos para el componente ModalTarjeta
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "space-around",
    marginTop: 50,
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    height: 460,
    alignItems: "center",
    justifyContent: "space-around",
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
  contenedorMaximo: {
    gap: 10,
  },
  contenedorTarjetas: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  radioButton: {
    backgroundColor: "white",
    width: 30,
    height: 30,
    marginLeft: 15,
    borderRadius: 100,
    borderWidth: 2,
  },
  addNew: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
  },
  textoTarj: {
    fontSize: 18,
  },
  imgPlus: {
    height: 35,
    width: 35,
  },
  btnContainer: {
    width: "80%",
    marginTop: 20,
  },
  titulo: {
    marginLeft: 15,
    fontSize: 25,
    color: "#32324D",
  },
});

export default ModalTarjeta;
