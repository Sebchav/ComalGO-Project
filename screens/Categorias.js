// Importaciones de React y Hooks
import React, { useState, useContext, useEffect } from 'react';

// Importaciones de React Native
import { View, StyleSheet } from 'react-native';

// Importaciones de React Navigation
import { useRoute } from '@react-navigation/native';

// Importaciones de componentes personalizados y contextos
import Platillos from '../components/Platillos';
import ModalPlatillo from '../components/modalPlatillo';
import ModalTarjeta from '../components/ModalTarjeta';
import AppContext from '../context/app/appContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoriasBtn from '../components/CategoriasBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from '../components/Toast';
import firebase from '../database/firebase';

// Página de categorías
const Categorias = () => {
  // Estado local para la categoría seleccionada
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // Contexto global de la aplicación
  const { setPantallaActual, pantallaActual, usuarioActual, setUsuarioActual, setTarjetas, setOrdenConfirmada, orden, ordenConfirmada } = useContext(AppContext);

  // Estado local para la visibilidad del modal y el producto actual seleccionado
  const [modalVisible, setModalVisible] = useState(false);
  const [productoActual, setProductoActual] = useState({});

  // Maneja la selección de una categoría
  const handleCategoriaSeleccionada = (categoria) => {
    console.log("Categoría seleccionada:", categoria);
    setCategoriaSeleccionada(categoria);
  };

  // Objeto de la ruta actual proporcionado por React Navigation
  const route = useRoute();

  // Efecto que se ejecuta cuando cambia la pantalla actual
  useEffect(() => {
    // Si el usuario no está autenticado, carga los datos desde AsyncStorage
    if (!usuarioActual.id) {
      // Carga el usuario desde AsyncStorage si no está autenticado
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
    } else {
      // Obtiene datos adicionales si el usuario está autenticado
      const obtenerDatos = async () => {
        try {
          // Obtiene las tarjetas asociadas al usuario desde la base de datos
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
          // Obtiene las órdenes asociadas al usuario desde la base de datos
          const ordenesCollection = await firebase.db.collection('orders').where('usuario.id', '==', usuarioActual.id).get();
          const ordenesArray = ordenesCollection.docs.map((doc) => ({
            ...doc.data(),
          }));

          // Actualiza el estado global con las órdenes confirmadas
          setOrdenConfirmada({
            orden: ordenesArray.map((order) => ({
              ...order.orden,
              total: order.total || 0,
              status: order.status || 0,
              idOrden: order.idOrden || '',
            })),
          });

        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };

      obtenerDatos();
      obtenerOrdenes();
    }

  }, [usuarioActual, modalVisible]);

  // Efecto que se ejecuta cuando cambia la pantalla actual
  useEffect(() => {
    // Actualiza la pantalla actual en el estado global si es diferente a la actual
    if (route.name !== pantallaActual) {
      setPantallaActual(route.name);
    }
  }, [route.name, setPantallaActual]);

  // JSX de la página
  return (
    <SafeAreaView style={styles.contenedor}>
      {/* Vista de las categorías */}
      <View style={styles.categorias}>
        {/* Componente de botones de categorías */}
        <CategoriasBtn
          onCategoriaSeleccionada={handleCategoriaSeleccionada}
          categoriaSeleccionada={categoriaSeleccionada}
        />
      </View>
      {/* Componente de lista de platillos */}
      <Platillos
        categoriaSeleccionada={categoriaSeleccionada}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        productoActual={productoActual}
        setProductoActual={setProductoActual}
      />
      {/* Componente de modal para mostrar detalles de platillo */}
      <ModalPlatillo
        nombrePlatillo={"Ejemplo"}
        precioPlatillo={"10.50"}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setProductoActual={setProductoActual}
        productoActual={productoActual}
      />
      {/* Componente de mensaje emergente (toast) */}
      <Toast />
    </SafeAreaView>
  );
};

// Estilos de la página
const styles = StyleSheet.create({
  categorias: {
    marginVertical: 10,
    height: 100,
    marginHorizontal: 15,
  },
  contenedor: {
    backgroundColor: 'white',
    flex: 1,
  },
});

// Exporta la página de categorías
export default Categorias;
