import React from 'react'
import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Platillos2 from '../components/Platillos2'

const Categorias = () => {
 
  return (
    <View>
        <Text>Pantalla Categorías</Text>
        <Platillos2/>
    </View>
  )
}

export default Categorias