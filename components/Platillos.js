import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import PlatilloCard from './PlatilloCard'
import { ScrollView } from 'react-native'
import firebase from "../database/firebase"

const Platillos = ({modalVisible, setModalVisible, productoActual, setProductoActual}) => {

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de Firestore
    const fetchMenuItems = async () => {
      try {
        const menuCollection = await firebase.db.collection('productos').get();
        const menuArray = menuCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Actualiza el estado con el array de objetos
        setMenuItems(menuArray);
        console.log(menuArray)
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    // Llama a la función para obtener los datos
    fetchMenuItems();
  }, []); // El segundo

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
        {/* <PlatilloCard modalVisible={modalVisible} setModalVisible={setModalVisible} nombrePlatillo={"Ejemplo1"} precio={"$10.40"}/>
        <PlatilloCard modalVisible={modalVisible} setModalVisible={setModalVisible} nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/>
        <PlatilloCard modalVisible={modalVisible} setModalVisible={setModalVisible} nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/>
        <PlatilloCard modalVisible={modalVisible} setModalVisible={setModalVisible} nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/>
        <PlatilloCard modalVisible={modalVisible} setModalVisible={setModalVisible} nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/> 
        <PlatilloCard modalVisible={modalVisible} setModalVisible={setModalVisible} nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/> 
        <PlatilloCard modalVisible={modalVisible} setModalVisible={setModalVisible} nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/> 
        <PlatilloCard modalVisible={modalVisible} setModalVisible={setModalVisible} nombrePlatillo={"Ejemplo2"} precio={"$10.40"}/>  */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    contenedorPlatillos: {
        gap: 20,
        marginTop: 10,
        maxHeight: "80%"
    }
})

export default Platillos