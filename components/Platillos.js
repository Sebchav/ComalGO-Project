import React from 'react'
import { View, StyleSheet } from 'react-native'
import PlatilloCard from './PlatilloCard'

const Platillos = () => {
  return (
    <View style={styles.contenedorPlatillos}>
        <PlatilloCard nombrePlatillo={"Ejemplo1"} precio={"$10.40"}/>
        <PlatilloCard nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/>

        
    </View>
  )
}

const styles = StyleSheet.create({
    contenedorPlatillos: {
        gap: 20,
        marginTop: 10
    }
})

export default Platillos