import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const BtnCategoria = ({nombreCategoria}) => {
  return (
    <View style={styles.contenedorCategoria}>
        <Text style={styles.textoCategoria}>{nombreCategoria}</Text>
    </View>
  )
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