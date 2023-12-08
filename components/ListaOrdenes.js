import React, { useContext } from 'react';
import AppContext from '../context/app/appContext';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

// Componente funcional ListaOrdenes que muestra una lista de órdenes
const ListaOrdenes = () => {
  // Obteniendo variables y funciones del contexto de la aplicación
  const { ordenConfirmada, setOrdenActual } = useContext(AppContext);

  return (
    // Contenedor principal de la lista de órdenes
    <View style={styles.container}>
      {/* Scroll View para manejar la visualización de órdenes */}
      <ScrollView style={styles.contenedor}>
        {/* Mapeo de las órdenes confirmadas */}
        {ordenConfirmada.orden.map((orden, index) => (
          // Elemento táctil para seleccionar una orden
          <TouchableOpacity style={styles.contenedorPrincipal} key={orden.idOrden} onPress={() => setOrdenActual([orden])}>
            {/* Contenedor de imágenes y estado de la orden */}
            <View>
              {/* Imagen de la bolsa de papel */}
              <Image source={require("../assets/paperbag.png")} />
              {/* Imagen del estado de la orden (proceso o entregado) */}
              <Image style={styles.thick} source={orden.status === 0 ? require("../assets/process.png") : require("../assets/thick.png")} />
            </View>
            {/* Contenedor de información de la orden */}
            <View>
              {/* Texto que indica el número de orden */}
              <Text>Orden {index + 1}</Text>
              {/* Texto que muestra el ID de la orden */}
              <Text>ID: {orden.idOrden}</Text>
              {/* Texto que muestra el estado de la orden (En proceso o Entregado) */}
              <Text>Status: {orden.status === 0 ? "En proceso" : "Entregado"}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// Estilos del componente ListaOrdenes
const styles = StyleSheet.create({
  // Contenedor principal de cada orden
  contenedorPrincipal: {
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 40,
    // Sombra para resaltar visualmente la tarjeta
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 30,
  },
  // Contenedor de la lista de órdenes
  contenedor: {
    marginTop: 30,
    maxHeight: "100%",
  },
  // Contenedor principal de la lista de órdenes
  container: {
    maxHeight: "99%",
    width: "100%",
  },
  // Estilo para posicionar la imagen del estado de la orden
  thick: {
    position: "absolute",
    top: 42,
    left: 67,
    width: 30,
    height: 25,
  },
});

// Exportar el componente ListaOrdenes como componente predeterminado
export default ListaOrdenes;
