import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Productos from "../components/Productos";

const Status = () => {
  const tiempoAproximado = 10;
  const total = 50;
  return (
    <View>
      <Text style={styles.titulo}>
        Tu orden estará lista en aproximadamente {"\n"}
        <Text style={styles.tiempo}>{tiempoAproximado} minutos</Text>
      </Text>

      <View style={styles.contenedorPrincipal}>
        <Text style={styles.textoProductos}>Tus Productos</Text>
        <Productos />
        <View style={styles.contenedorTotal}>
          <Text>Total</Text>
          <Text>${total}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 23,
    color: "#8E8EA9",
    textAlign: "center",
    marginTop: 25,
    letterSpacing: 1,
    lineHeight: 35,
  },
  tiempo: {
    fontSize: 23,
    color: "#35253A",
    fontWeight: "bold",
  },
  contenedorPrincipal: {
    backgroundColor: "lightblue",
    marginTop: 30,
    marginHorizontal: 30,
  },
  textoProductos: {
    color: "#8E8EA9",
    fontSize: 20,
    marginBottom: 10,
  },
  contenedorTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default Status;
