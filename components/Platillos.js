import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import PlatilloCard from './PlatilloCard'
import { ScrollView } from 'react-native'

const Platillos = ({modalVisible, setModalVisible}) => {
  return ( 
    <ScrollView style={styles.contenedorPlatillos}>
        <PlatilloCard modalVisible={modalVisible} setModalVisible={setModalVisible} nombrePlatillo={"Ejemplo1"} precio={"$10.40"}/>
        <PlatilloCard modalVisible={modalVisible} setModalVisible={setModalVisible} nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/>
        <PlatilloCard modalVisible={modalVisible} setModalVisible={setModalVisible} nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/>
        <PlatilloCard modalVisible={modalVisible} setModalVisible={setModalVisible} nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/>
        <PlatilloCard modalVisible={modalVisible} setModalVisible={setModalVisible} nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/> 
        <PlatilloCard modalVisible={modalVisible} setModalVisible={setModalVisible} nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/> 
        <PlatilloCard modalVisible={modalVisible} setModalVisible={setModalVisible} nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/> 
        <PlatilloCard modalVisible={modalVisible} setModalVisible={setModalVisible} nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/> 
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    contenedorPlatillos: {
        gap: 20,
        marginTop: 10,
        maxHeight: "80%"
    }
})

export default Platillos