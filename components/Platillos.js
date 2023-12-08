import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import PlatilloCard from './PlatilloCard';
import { ScrollView } from 'react-native';
import firebase from "../database/firebase";

// Componente Platillos que muestra una lista de platillos según la categoría seleccionada
const Platillos = ({ categoriaSeleccionada, modalVisible, setModalVisible, productoActual, setProductoActual }) => {
  // Estado para almacenar la lista de platillos
  const [menuItems, setMenuItems] = useState([]);

  // Efecto de lado que se ejecuta cuando cambia la categoría seleccionada
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        let menuCollection;

        // Si hay una categoría seleccionada, filtrar por categoría y existencia
        if (categoriaSeleccionada) {
          menuCollection = await firebase.db.collection('productos').where('existencia', '==', true).where('categoria', '==', categoriaSeleccionada).get();
        } else {
          // Si no hay categoría seleccionada, solo filtrar por existencia
          menuCollection = await firebase.db.collection('productos').where('existencia', '==', true).get();
        }

        // Mapear los documentos de la colección a un array de objetos
        const menuArray = menuCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Actualizar el estado con la lista de platillos
        setMenuItems(menuArray);
      } catch (error) {
        // Manejar errores al obtener datos
        console.error('Error al obtener datos:', error);
      }
    };

    // Llamar a la función de obtención de platillos
    fetchMenuItems();
  }, [categoriaSeleccionada]);

  // Renderizar la lista de platillos en un ScrollView
  return (
    <ScrollView style={styles.contenedorPlatillos}>
      {menuItems.map(producto => (
        // Renderizar un componente PlatilloCard para cada platillo en la lista
        <PlatilloCard
          key={producto.id}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          nombrePlatillo={producto.nombre}
          precio={producto.precio}
          imagen={producto.imagen}
          id={producto.id}
          existencia={producto.existencia}
          categoria={producto.categoria}
          descripcion={producto.descripcion}
          productoActual={productoActual}
          setProductoActual={setProductoActual}
        />
      ))}
    </ScrollView>
  );
};

// Estilos para el componente Platillos
const styles = StyleSheet.create({
  contenedorPlatillos: {
    gap: 20,
    marginTop: 10,
    minHeight: "80%",
  }
});

// Exportar el componente Platillos como componente principal
export default Platillos;
