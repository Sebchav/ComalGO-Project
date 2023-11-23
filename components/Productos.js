import React from "react";
import { Text } from "react-native";
import Producto from "../components/Producto";
import { View } from "react-native";

const Productos = () => {
  return (
    <View>
      <Producto nombreProducto={"Ejemplo"} cantidad={2} precio={10} />
      <Producto nombreProducto={"Ejemplo"} cantidad={2} precio={10} />
      <Producto nombreProducto={"Ejemplo"} cantidad={2} precio={10} />
    </View>
  )
};

export default Productos;
