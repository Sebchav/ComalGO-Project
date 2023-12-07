import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BtnCategoria = ({ nombreCategoria, onPress, categoriaSeleccionada }) => {
  const estiloBoton = {
    ...styles.contenedorCategoria,
    backgroundColor: categoriaSeleccionada === nombreCategoria ? "#c79c63" : "#E0B071",
  };

  return (
    <TouchableOpacity style={estiloBoton} onPress={() => onPress(nombreCategoria)}>
      <Text style={styles.textoCategoria}>{nombreCategoria}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contenedorCategoria: {
    backgroundColor: "#E0B071",
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "50%",
    borderRadius: 6
  },
  textoCategoria: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  }
});

export default BtnCategoria;
