import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const Footer = () => {
  return (
    <View style={styles.contenedorFooter}>
       <Image style={styles.img} source={require("../assets/iconoNav1.png")}/>

       <Image style={styles.img} source={require("../assets/iconoNav2.png")}/>

       <Image style={styles.img} source={require("../assets/iconoNav3.png")}/>

       <Image style={styles.img} source={require("../assets/iconoNav4.png")}/>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedorFooter: {
        backgroundColor: "#35253A",
        padding: 30,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    img: {
        width: 33,
        height: 33,
        resizeMode: 'contain',
    }
})

export default Footer