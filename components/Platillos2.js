import React, {useContext} from 'react'
import { View, StyleSheet } from 'react-native'
import PlatilloCard2 from './PlatilloCard2'
import BtnPrincipal from './BtnPrincipal'
import { ScrollView } from 'react-native'
import AppContext from '../context/app/appContext'
import Producto from './Producto'

const Platillos2 = () => {

  const {orden} = useContext(AppContext);

  return ( 
    <View style={styles.container}>
    <ScrollView style={styles.contenedorPlatillos}>
        {orden.map(producto=>(
          <PlatilloCard2 id={producto.id} cantidad={producto.cantidad} imagen={producto.imagen} key={producto.id} nombrePlatillo={producto.nombrePlatillo} precio={producto.precio}/>
        ))}
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedorPlatillos: {
        gap: 20,
        maxHeight: "100%",
        marginBottom: 10
    },
    container: {
      width: "98%",
      maxHeight: "77%",
      borderRightWidth: 2,
      
      borderColor: "#BABABA"
    }
})

export default Platillos2