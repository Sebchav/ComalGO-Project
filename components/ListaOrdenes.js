import React, {useContext} from 'react'
import AppContext from '../context/app/appContext'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native'

const ListaOrdenes = () => {
  const {ordenConfirmada, setOrdenActual} = useContext(AppContext)

  return (
    <View style={styles.container}>
    <ScrollView style={styles.contenedor}>
      {ordenConfirmada.orden.map((orden, index) => (
        <TouchableOpacity style={styles.contenedorPrincipal} key={orden.idOrden}
           onPress={()=> setOrdenActual([orden])}
        > 
          <View>
           
           <Image source={require("../assets/paperbag.png")}/>
           <Image style={styles.thick} source={orden.status == 0 ? require("../assets/process.png") : require("../assets/thick.png")}/>
          </View>
          <View>
            <Text>Orden {index+1}</Text>
            <Text >ID: {orden.idOrden}</Text>
            <Text>Status: {orden.status == 0 ? "En proceso" : "Entregado"}</Text>   
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedorPrincipal:{
        backgroundColor: "white",
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        gap: 30
    },
    contenedor: {
      marginTop: 30,
      maxHeight: "100%",
    },
    container: {
      maxHeight: "99%",
      width: "100%",
    },
    thick:{
      position: "absolute",
      top: 42,
      left: 67,
      width: 30,
      height: 25

    }
})

export default ListaOrdenes