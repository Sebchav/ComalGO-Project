import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Platillos2 from "../components/Platillos2";
import ModalTarjeta from "../components/ModalTarjeta";
import { SafeAreaView } from "react-native-safe-area-context";
import BtnPrincipal from "../components/BtnPrincipal";
import AppContext from "../context/app/appContext";
import { useRoute } from '@react-navigation/native'

const Orden = () => {
  const {setPantallaActual, pantallaActual} = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);

  const route = useRoute();

  const handleVisible = () => {
    setModalVisible(!modalVisible);
  };

  // useEffect(() => {
  //   // Verificar si la pantalla actual es diferente antes de actualizar el estado
  //   if (route.name !== pantallaActual) {
  //     setPantallaActual(route.name);
  //   }
  // }, [route.name, setPantallaActual]);
    
  return (
    <SafeAreaView style={styles.contenedorPrincipal}>
      {/* <ScrollView> */}

      <Platillos2 />
      {/* <ModalTarjeta /> */}
      {/* </ScrollView> */}
      <View style={styles.BtnPrincipal}>
        <BtnPrincipal
          texto={"Proceder al pago"}
          handleVisible={handleVisible}
        />
      </View>

      <ModalTarjeta
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  BtnPrincipal: {
    // alignItems: "center",
    marginTop: "15%",
    maxWidth: "100%",
    marginHorizontal: "10%",
  },
  contenedorPrincipal: {
    backgroundColor: "white",
    flex:1,
  }
});

export default Orden;
