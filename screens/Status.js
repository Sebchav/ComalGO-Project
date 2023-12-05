import React, {useContext} from "react";
import { View, Text, StyleSheet } from "react-native";
import Productos from "../components/Productos";
import AppContext from "../context/app/appContext";

const Status = () => {

  const { ordenConfirmada } = useContext(AppContext);

  return (
    <View style={styles.container}>
      {ordenConfirmada.orden.length !== 0 ? 
        <>
          <Text style={styles.titulo}>
            Tu orden estará lista en aproximadamente {"\n"}
            <Text style={styles.tiempo}>{5*ordenConfirmada.orden.length} minutos</Text>
          </Text>

          <View style={styles.contenedorPrincipal}>
            <Text style={styles.textoProductos}>Tus Productos</Text>
            <Productos />
            <View style={styles.contenedorTotal}>
              <Text style={styles.textoTotal}>Total</Text>
              <Text style={styles.textoCantidad}>${ordenConfirmada.total}</Text>
            </View>
          </View>
        </>
        :
        <View style={styles.textoSinProductos}>
          <Text style={styles.noProducts}>No hay ordenes disponibles</Text>
        </View>
      }
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
    marginTop: 40,
  },
  textoTotal:{
    color: "#4A4A6A",
    fontSize: 20
  },
  textoCantidad: {
    fontSize: 20,
    color: "#4A4A6A",
    fontWeight: "bold"
  },
  container: {
    backgroundColor: "white",
    flex: 1
  },
  textoSinProductos: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10
  },
  noProducts: {
    color: "#BABABA",
    fontSize: 28,
    marginHorizontal: 20,
    textAlign: "center",
    marginTop: -120
  }
});

export default Status;
