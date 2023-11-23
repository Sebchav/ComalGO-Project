import React from 'react'
import { View, StyleSheet } from 'react-native'
import PlatilloCard2 from './PlatilloCard2'
import BtnPrincipal from './BtnPrincipal'
import { ScrollView } from 'react-native'

const Platillos2 = () => {
  return ( 
    <ScrollView style={styles.contenedorPlatillos}>
        <PlatilloCard2 nombrePlatillo={"Ejemplo1"} precio={"$10.40"}/>
        <PlatilloCard2 nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/>
        <PlatilloCard2 nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/>
        <PlatilloCard2 nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/>
        <PlatilloCard2 nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    contenedorPlatillos: {
        gap: 20,
        marginTop: 10,
        maxHeight: "82%"
    }
})

export default Platillos2