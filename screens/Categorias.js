import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import Platillos2 from "../components/Platillos2";
import ModalPlatillo from "../components/modalPlatillo";
import ModalTarjeta from "../components/ModalTarjeta";
import { SafeAreaView } from "react-native-safe-area-context";

const Categorias = () => {

  return (
    <SafeAreaView>
      <Text>Pantalla Categorías</Text>
      {/* <Platillos2/> */}
      {/* <ModalPlatillo nombrePlatillo={'Ejemplo'} precioPlatillo={'10.00'}/> */}
    </SafeAreaView>
  );
};

export default Categorias;
