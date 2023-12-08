import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

// Componente Producto que representa un elemento en la lista de productos
const Producto = ({ nombreProducto, cantidad, precio, imagen }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contenedorIzq}>
        {/* Imagen del producto */}
        <Image
          style={styles.imgProducto}
          source={{ uri: imagen }}
        />
        {/* Nombre del producto */}
        <Text style={styles.nombreProducto}>{nombreProducto}</Text>
      </View>
      {/* Detalles de la cantidad y precio del producto */}
      <Text style={styles.precio}>
        {cantidad} x $<Text style={styles.precioBold}>{precio}</Text>
      </Text>
    </View>
  );
};

// Estilos para el componente Producto
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
    width: 200,
    textAlign: "left",
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

// Exportar el componente Producto como componente principal
export default Producto;
