import React from 'react'
import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import ModalPlatillo from '../components/modalPlatillo'
import ModalTarjeta from '../components/ModalTarjeta'
import { SafeAreaView } from 'react-native-safe-area-context'

const Categorias = () => {
 
  return (
    <SafeAreaView>
        <Text>Pantalla Categorías</Text>
        {/* <ModalPlatillo nombrePlatillo={'Ejemplo'} precioPlatillo={'10.00'}/> */}
        {/* <ModalTarjeta /> */}
    </SafeAreaView>
  )
}

export default Categorias