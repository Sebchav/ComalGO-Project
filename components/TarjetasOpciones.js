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

const ModalTarjeta = ({ modalVisible, setModalVisible }) => {

  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  const {usuarioActual, tarjetas, orden, setOrden, pantallaActual, setPantallaActual, setOrdenConfirmada, ordenConfirmada} = useContext(AppContext);
  
  const handleTarjetaPress = (tarjetaId) => {
    setTarjetaSeleccionada(tarjetaId);
  };

  const guardarTarjeta = async()=>{
    if(route.name == "Orden"){
      const total = orden.reduce((acumulador, producto) => {
        return acumulador + (parseInt(producto.precio)*parseInt(producto.cantidad));
      }, 0);

      const idOrden = Date.now();

      try{
        await firebase.db.collection("orders").add({
          orden,
          total,
          idOrden,
          usuario: {
            id: usuarioActual.id,
            username: usuarioActual.username
          },
          status: 0
        })

        setOrdenConfirmada({
          orden: [...ordenConfirmada.orden, { ...orden, total, status: 0, idOrden }],
        })

        setOrden([]);   
        setPantallaActual("Status")
        navigation.navigate("Status");
      }catch(error){
        console.log(error)
      }
    }
  }
  
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
            <View style={styles.imgTop}>
              <View></View>
              <Text style={styles.titulo}>Elige tu método de pago</Text>
              <TouchableOpacity onPress={() => {
                setModalVisible(!modalVisible)
               
              }}>
                <Image
                  style={styles.imgClose}
                  source={require("../assets/x.png")}
                />
              </TouchableOpacity>
            </View>
            
            <View style={styles.contenedorMaximo}>
            {tarjetas.map((tarjeta) => (
            <TouchableOpacity style={styles.contenedorTarjetas} key={tarjeta.id} onPress={() => handleTarjetaPress(tarjeta.id)}>
              <Image style={styles.imagenTarjeta} source={require('../assets/iconoTarjeta.png')} />
              <Text>{tarjeta.numeroTarjeta}</Text>
              <Text>{tarjeta.fechaExp}</Text>
              <View onPress={() => handleTarjetaPress(tarjeta.id)} style={[
              styles.radioButton,
              {
                backgroundColor:
                  tarjeta.id === tarjetaSeleccionada ? '#BABABA' : 'transparent',
              },
            ]}
              ></View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.addNew} onPress={() => handleVisible()}>
                  <Image style={styles.imgPlus} source={require('../assets/plus.png')} />
                  <Text style={styles.textoTarj}>Añadir Tarjeta</Text>
          </TouchableOpacity>
          </View>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={()=> setModalVisible(false)}
              >
                <BtnPrincipal texto={route.name == "MisTarjetas" ? "Guardar Tarjeta" : "Pagar"} handleVisible={guardarTarjeta}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
    </View>
  );
};

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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#32324D",
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
  contenedorTarjetas: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10
  },
  radioButton:{
    backgroundColor: "white",
    width: 30,
    height: 30,
    marginLeft: 15,
    borderRadius: 100,
    borderWidth: 2
  },
  contenedorMaximo:{
    gap: 10
  },
  addNew: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 20
  },
  textoTarj:{
    fontSize: 18,
  },
  imgPlus:{
    height:35,
    width:35,
  },
});

export default ModalTarjeta;
