import React, {useState, useContext, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Platillos from '../components/Platillos'
import ModalPlatillo from '../components/modalPlatillo'
import ModalTarjeta from '../components/ModalTarjeta'
import AppContext from '../context/app/appContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import CategoriasBtn from "../components/CategoriasBtn";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Categorias = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const {setPantallaActual, pantallaActual, usuarioActual, setUsuarioActual} = useContext(AppContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [productoActual, setProductoActual] = useState({})

  const handleCategoriaSeleccionada = (categoria) => {
    console.log("Categoría seleccionada:", categoria);
    setCategoriaSeleccionada(categoria);
  };

  const route = useRoute();

  
  useEffect(() => {
    const cargarUsuarioDesdeStorage = async () => {
        try {
            const id = await AsyncStorage.getItem('id');
            const correo = await AsyncStorage.getItem('correo');
            const username = await AsyncStorage.getItem('username');
            const contraseña = await AsyncStorage.getItem('contraseña');

            if (id && correo && username && contraseña) {
                setUsuarioActual({
                    id,
                    correo,
                    username,
                    contraseña,
                });
            }
        } catch (error) {
            console.error('Error al cargar usuario desde AsyncStorage:', error.message);
        }
    };

    cargarUsuarioDesdeStorage();
}, []);  

  useEffect(() => {
    if (route.name !== pantallaActual) {
      setPantallaActual(route.name);
   
    }
  }, [route.name, setPantallaActual]);

  return (
    <SafeAreaView style={styles.contenedor}>
        <View style={styles.categorias}>
          <CategoriasBtn onCategoriaSeleccionada={handleCategoriaSeleccionada} />
        </View>
        {/* <Platillos2/> */}
        <Platillos
          categoriaSeleccionada={categoriaSeleccionada}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          productoActual={productoActual}
          setProductoActual={setProductoActual}
        />
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
