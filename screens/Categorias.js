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
import Toast from '../components/Toast'
import firebase from '../database/firebase'

const Categorias = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const {setPantallaActual, pantallaActual, usuarioActual, setUsuarioActual, setTarjetas, setOrdenConfirmada, orden, ordenConfirmada} = useContext(AppContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [productoActual, setProductoActual] = useState({})

  const handleCategoriaSeleccionada = (categoria) => {
    console.log("Categoría seleccionada:", categoria);
    setCategoriaSeleccionada(categoria);
  };

  const route = useRoute();

  useEffect(()=>{
    if(pantallaActual){
      navi
    }
  }, [route.name])

  useEffect(() => {
    if(!usuarioActual.id){
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
    }else{
      const obtenerDatos = async () => {
        try {
          const tarjetasCollection = await firebase.db.collection('tarjetas').where('userId', '==', usuarioActual.id).get();
          const tarjetasArray = tarjetasCollection.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
  
          setTarjetas(tarjetasArray);
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };

      const obtenerOrdenes = async () => {
        try {
          const ordenesCollection = await firebase.db.collection('orders').where('usuario.id', '==', usuarioActual.id).get();
          const ordenesArray = ordenesCollection.docs.map((doc) => ({
            ...doc.data(),
          }));

          setOrdenConfirmada({
            orden: ordenesArray.map((order) => ({
              ...order.orden,
              total: order.total || 0,
              status: order.status || 0,
              idOrden: order.idOrden || '',
            })),
          });

          // try{
          //   await firebase.db.collection("orders").add({
          //     orden,
          //     total,
          //     idOrden,
          //     usuario: {
          //       id: usuarioActual.id,
          //       username: usuarioActual.username
          //     },
          //     status: 0
          //   })
    
          //   setOrdenConfirmada({
          //     orden: [...ordenConfirmada.orden, { ...orden, total, status: 0, idOrden }],
          //   })

          
  
          console.log(ordenesArray);
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };
  
      obtenerDatos();
      obtenerOrdenes();
    }
    
}, [usuarioActual, modalVisible]);  

  useEffect(() => {
    if (route.name !== pantallaActual) {
      setPantallaActual(route.name);
   
    }
  }, [route.name, setPantallaActual]);

  return (
    <SafeAreaView style={styles.contenedor}>
        <View style={styles.categorias}>
        <CategoriasBtn
          onCategoriaSeleccionada={handleCategoriaSeleccionada}
          categoriaSeleccionada={categoriaSeleccionada}
        />
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
          
        <Toast />
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
    backgroundColor: "white",
    flex: 1
  }
})

export default Categorias;
