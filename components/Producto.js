import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const Producto = ({ nombreProducto, cantidad, precio }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contenedorIzq}>
        <Image
          style={styles.imgProducto}
          source={require("../assets/platilloEjemplo.png")}
        />
        <Text style={styles.nombreProducto}>{nombreProducto}</Text>
      </View>
      <Text style={styles.precio}>
        {cantidad} x $<Text style={styles.precioBold}>{precio}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imgProducto: {
    width: 70,
    height: 70,
  },
  container: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nombreProducto: {
    fontSize: 17,
    color: "#32324D",
  },
  contenedorIzq: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  precio: {
    fontSize: 17,
    color: "#A5A5BA",
  },
  precioBold: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Producto;
