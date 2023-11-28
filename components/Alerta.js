import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Alerta = ({mensaje, tipo}) => {
  return (
    <View style={[styles.contenedorAlerta, tipo == "exito" ? styles.exito : styles.error ]}>
        <Text style={styles.mensajeAlerta}>{mensaje}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedorAlerta:{
        padding: 20,
        marginBottom: 20,
        borderRadius: 10
    },
    error:{
        backgroundColor: "#e33b4b",
    },
    exito: {
        backgroundColor: "green"
    },
    mensajeAlerta: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
    }
})

export default Alerta