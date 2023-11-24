import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Platillos2 from "../components/Platillos2";
import ModalTarjeta from "../components/ModalTarjeta";
import { SafeAreaView } from "react-native-safe-area-context";
import BtnPrincipal from "../components/BtnPrincipal";

const Orden = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleVisible = () => {
    setModalVisible(!modalVisible);
  };

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
