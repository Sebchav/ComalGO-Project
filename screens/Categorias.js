import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Platillos from '../components/Platillos'
import ModalPlatillo from '../components/modalPlatillo'
import ModalTarjeta from '../components/ModalTarjeta'
import { SafeAreaView } from 'react-native-safe-area-context'
import CategoriasBtn from "../components/CategoriasBtn";

const Categorias = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView>
        <Text>Pantalla Categorías</Text>

        <View style={styles.categorias}>
          <CategoriasBtn />
        </View>
        {/* <Platillos2/> */}
        <Platillos modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        {/* <ModalPlatillo nombrePlatillo={'Ejemplo'} precioPlatillo={'10.00'}/> */}
        {/* <ModalTarjeta /> */}
        <ModalPlatillo nombrePlatillo={"Ejemplo"} precioPlatillo={"10.50"} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  categorias: {
    marginVertical: 10,
    height: 100,
    marginHorizontal: 15
    
  }
})

export default Categorias