import React from 'react'
import { View, StyleSheet } from 'react-native'
import PlatilloCard2 from './PlatilloCard2'

const Platillos2 = () => {
  return ( 
    <View style={styles.contenedorPlatillos}>
        <PlatilloCard2 nombrePlatillo={"Ejemplo1"} precio={"$10.40"}/>
        <PlatilloCard2 nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/>

        
    </View>
  )
}

const styles = StyleSheet.create({
    contenedorPlatillos: {
        gap: 20,
        marginTop: 10
    }
})

export default Platillos2