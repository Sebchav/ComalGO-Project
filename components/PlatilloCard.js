import React from 'react'
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native'

const PlatilloCard = ({id, nombrePlatillo, precio, imagen, modalVisible, setModalVisible, productoActual, setProductoActual}) => {
  return (
    <TouchableOpacity style={styles.contenedorPlatillo}
       onPress={()=> {
        setModalVisible(!modalVisible)
            setProductoActual({
                id,
                nombrePlatillo,
                precio,
                imagen,
            })
       }}
    >
        <View style={styles.infoPlatillo}>
            <Image style={styles.imagen} source={{uri: imagen}}/>
            <View style={styles.textosPlatillo}>
                <Text style={styles.nombrePlatillo}>{nombrePlatillo}</Text>
                <Text style={styles.precio}>${precio}</Text>
            </View>
        </View>

        <Image source={require("../assets/flechaDerecha.png")}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    contenedorPlatillo: {
        backgroundColor: 'white', // Ajusta el fondo según tus necesidades
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 6,
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
    },
    imagen: {
        width: 100,
        height: 100
    }
})
export default PlatilloCard