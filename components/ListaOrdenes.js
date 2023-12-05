import React, {useContext} from 'react'
import AppContext from '../context/app/appContext'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

const ListaOrdenes = () => {
  const {ordenConfirmada, setOrdenActual} = useContext(AppContext)

  return (
    <View>
      {ordenConfirmada.orden.map((orden, index) => (
        <TouchableOpacity style={styles.contenedorPrincipal} key={orden.idOrden}
           onPress={()=> setOrdenActual([orden])}
        >
          <Text>Orden {index+1}</Text>
          <Text>ID: {orden.idOrden}</Text>
          <Text>Status: {orden.status == 0 ? "En proceso" : "Entregado"}</Text>   
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
    contenedorPrincipal:{
        backgroundColor: "white",
        borderRadius: 10,
        marginVertical: 20,
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
    }
})

export default ListaOrdenes