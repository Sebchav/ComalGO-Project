import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import PlatilloCard from './PlatilloCard'
import { ScrollView } from 'react-native'
import firebase from "../database/firebase"

const Platillos = ({ categoriaSeleccionada, modalVisible, setModalVisible, productoActual, setProductoActual }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        let menuCollection;

        if (categoriaSeleccionada) {
          menuCollection = await firebase.db.collection('productos').where('existencia', '==', true).where('categoria', '==', categoriaSeleccionada).get();
        } else {
          menuCollection = await firebase.db.collection('productos').where('existencia', '==', true).get();
        }

        const menuArray = menuCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setMenuItems(menuArray);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchMenuItems();
  }, [categoriaSeleccionada]);

  return (
    <ScrollView style={styles.contenedorPlatillos}>
      {menuItems.map(producto => (
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


const styles = StyleSheet.create({
    contenedorPlatillos: {
        gap: 20,
        marginTop: 10,
        maxHeight: "80%"
    }
})

export default Platillos