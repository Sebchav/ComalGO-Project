import React, {useState} from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const PlatilloCard2 = ({ nombrePlatillo, precio }) => {
  const [cantidad, setCantidad] = React.useState(1); // Estado para la cantidad de artículos

  const restarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const sumarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  return (
    <View style={styles.contenedorPlatillo}>
      <View style={styles.infoPlatillo}>
        <Image source={require("../assets/platilloEjemplo.png")} />
        <View style={styles.textosPlatillo}>
          <Text style={styles.nombrePlatillo}>{nombrePlatillo}</Text>
          <Text style={styles.precio}>{precio}</Text>
        </View>
      </View>

      <View style={styles.botonesCantidad}>
        <TouchableOpacity onPress={restarCantidad} style={styles.boton}>
          <Text style={styles.textoBoton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.cantidad}>{cantidad}</Text>
        <TouchableOpacity onPress={sumarCantidad} style={styles.boton}>
          <Text style={styles.textoBoton}>+</Text>
        </TouchableOpacity>
      </View>

      {/* <Image source={require("../assets/flechaDerecha.png")} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorPlatillo: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 4,
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  infoPlatillo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  nombrePlatillo: {
    fontSize: 19,
    color: "#35253A",
  },
  precio: {
    color: "#35253A",
    fontWeight: "bold",
    fontSize: 17,
  },
  textosPlatillo: {
    gap: 15,
  },
  botonesCantidad: {
    flexDirection: "column",
    alignItems: "center",
  },
  boton: {
    backgroundColor: "#FFF2EA",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  textoBoton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#35253A",
  },
  cantidad: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#35253A",
  },
});

export default PlatilloCard2;
