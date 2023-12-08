import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Componente funcional PlatilloCard para mostrar información de un platillo en una tarjeta
const PlatilloCard = ({ id, nombrePlatillo, descripcion, precio, imagen, modalVisible, setModalVisible, productoActual, setProductoActual }) => {
  return (
    <TouchableOpacity
      style={styles.contenedorPlatillo}
      onPress={() => {
        setModalVisible(!modalVisible);
        setProductoActual({
          id,
          nombrePlatillo,
          precio,
          imagen,
          descripcion,
        });
      }}
    >
      {/* Contenedor de información del platillo */}
      <View style={styles.infoPlatillo}>
        {/* Imagen del platillo */}
        <Image style={styles.imagen} source={{ uri: imagen }} />
        {/* Contenedor de textos del platillo */}
        <View style={styles.textosPlatillo}>
          {/* Nombre del platillo */}
          <Text style={styles.nombrePlatillo}>{nombrePlatillo}</Text>
          {/* Precio del platillo */}
          <Text style={styles.precio}>${precio}</Text>
        </View>
      </View>

      {/* Flecha derecha indicando acción */}
      <Image source={require("../assets/flechaDerecha.png")} />
    </TouchableOpacity>
  );
};

// Estilos del componente PlatilloCard
const styles = StyleSheet.create({
  contenedorPlatillo: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    marginHorizontal: 13,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
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
    width: 150,
  },
  precio: {
    color: "#35253A",
    fontWeight: "bold",
    fontSize: 17,
  },
  textosPlatillo: {
    gap: 15,
  },
  imagen: {
    width: 100,
    height: 100,
  },
});

// Exportar el componente PlatilloCard como componente predeterminado
export default PlatilloCard;
