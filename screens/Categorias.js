import React, {useState, useContext, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Platillos from '../components/Platillos'
import ModalPlatillo from '../components/modalPlatillo'
import ModalTarjeta from '../components/ModalTarjeta'
import AppContext from '../context/app/appContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import CategoriasBtn from "../components/CategoriasBtn";

const Categorias = () => {

  const {setPantallaActual, pantallaActual} = useContext(AppContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [productoActual, setProductoActual] = useState({})

  const route = useRoute();

  useEffect(() => {
    if (route.name !== pantallaActual) {
      setPantallaActual(route.name);
    }
  }, [route.name, setPantallaActual]);

  return (
    <SafeAreaView style={styles.contenedor}>
        <View style={styles.categorias}>
          <CategoriasBtn />
        </View>
        {/* <Platillos2/> */}
        <Platillos modalVisible={modalVisible} setModalVisible={setModalVisible} setProductoActual={setProductoActual} productoActual={productoActual}/>
        {/* <ModalPlatillo nombrePlatillo={'Ejemplo'} precioPlatillo={'10.00'}/> */}
        {/* <ModalTarjeta /> */}
        <ModalPlatillo nombrePlatillo={"Ejemplo"} precioPlatillo={"10.50"} modalVisible={modalVisible} setModalVisible={setModalVisible} setProductoActual={setProductoActual} productoActual={productoActual}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  categorias: {
    marginVertical: 10,
    height: 100,
    marginHorizontal: 15,
  },
  contenedor: {
    backgroundColor: "white"
  }
})

export default Categorias;
