import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Platillos2 from "../components/Platillos2";
import ModalTarjeta from "../components/ModalTarjeta";
import { SafeAreaView } from "react-native-safe-area-context";
import BtnPrincipal from "../components/BtnPrincipal";
import AppContext from "../context/app/appContext";
import { useRoute } from '@react-navigation/native'
import TarjetasOpciones from "../components/TarjetasOpciones.js";

const Orden = () => {
  const { setPantallaActual, pantallaActual, orden, setOrden, tarjetas} = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();

  const handleVisible = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView style={styles.contenedorPrincipal}>
      {orden.length === 0 ? (
        <View style={styles.textoSinProductos}>
          <Text style={styles.noProducts}>No hay productos en la orden</Text>
        </View>
      ) : (
        <>
          <Platillos2 />
          <View style={styles.BtnPrincipal}>
          <BtnPrincipal
          texto={"Proceder al pago"}
          handleVisible={handleVisible}
        />
      </View>
      </>
       
      )}

      {tarjetas.length !==0 ? <TarjetasOpciones
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      /> :  
        <ModalTarjeta
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      }
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  BtnPrincipal: {
    marginTop: "15%",
    maxWidth: "100%",
    marginHorizontal: "10%",
  },
  contenedorPrincipal: {
    backgroundColor: "white",
    flex: 1,
  },
  textoSinProductos: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noProducts: {
    color: "#BABABA",
    fontSize: 28,
    marginHorizontal: 20,
    textAlign: "center",
    marginTop: 200
  }
});

export default Orden;
