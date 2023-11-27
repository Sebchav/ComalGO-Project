import React from 'react'
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const HeaderPerfil = ({texto}) => {

  const navigation = useNavigation();
 
  return (
        <View style={styles.contenedor}>
            <StatusBar
            backgroundColor="#35253A"
            barStyle="light-content"
            />
            
            <View style={styles.contenedorFlecha}>
                <TouchableOpacity
                    onPress={()=> navigation.navigate("Perfil")}
                >
                    <Image style={styles.flecha} source={require("../assets/arrow-left.png")}/>
                </TouchableOpacity>
                <Text style={styles.titulo}>{texto}</Text>
                <View></View>
            </View>
            
        </View>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#35253A',
        height: 200,
        position: "relative",
        marginBottom: 80
    },
    contenedorFlecha: {
        marginTop: 50,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        justifyContent: "space-between"
    },
    titulo:{
        color: "white",
        fontSize: 20,
        marginRight: 40
    },
})

export default HeaderPerfil