import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const BtnCategoria = ({ nombreCategoria, onPress }) => {
  return (
    <TouchableOpacity style={styles.contenedorCategoria} onPress={onPress}>
      <Text style={styles.textoCategoria}>{nombreCategoria}</Text>
    </TouchableOpacity>
  );
}


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
})

export default BtnCategoria