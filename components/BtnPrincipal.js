import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const BtnPrincipal = ({texto}) => {
  return (
    <View style={styles.contenedorBtn}>
        <Text style={styles.textoBtn}>{texto}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedorBtn: {
        backgroundColor: "#35253A",
        padding: 20,
        borderRadius: 20
    },
    textoBtn: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
    }
})

export default BtnPrincipal