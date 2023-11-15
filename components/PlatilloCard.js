import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const PlatilloCard = ({nombrePlatillo, precio}) => {
  return (
    <View style={styles.contenedorPlatillo}>
        <View style={styles.infoPlatillo}>
            <Image source={require("../assets/platilloEjemplo.png")}/>
            <View style={styles.textosPlatillo}>
                <Text style={styles.nombrePlatillo}>{nombrePlatillo}</Text>
                <Text style={styles.precio}>{precio}</Text>
            </View>
        </View>

        <Image source={require("../assets/flechaDerecha.png")}/>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedorPlatillo: {
        backgroundColor: 'white', // Ajusta el fondo según tus necesidades
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 4,
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
        gap: 10
    },
    nombrePlatillo: {
        fontSize: 19,
        color: "#35253A"
    },
    precio: {
        color: "#35253A",
        fontWeight: "bold",
        fontSize: 17
    },
    textosPlatillo: {
        gap: 15
    }
})
export default PlatilloCard