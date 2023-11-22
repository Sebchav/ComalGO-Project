import React from 'react'
import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import ModalPlatillo from '../components/modalPlatillo'

const Categorias = () => {
 
  return (
    <View>
        <Text>Pantalla Categorías</Text>
        <ModalPlatillo nombrePlatillo={'Ejemplo'} precioPlatillo={'10.00'}/>
    </View>
  )
}

export default Categorias