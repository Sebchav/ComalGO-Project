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
    <ScrollView style={styles.contenedorPlatillos}>
        {orden.map(producto=>(
          <PlatilloCard2 id={producto.id} cantidad={producto.cantidad} imagen={producto.imagen} key={producto.id} nombrePlatillo={producto.nombrePlatillo} precio={producto.precio}/>
        ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    contenedorPlatillos: {
        gap: 20,
        maxHeight: "86%"
    }
})

export default Platillos2