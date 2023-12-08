// Importaciones de React, Hooks y componentes de React Native
import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Platillos2 from "../components/Platillos2";
import ModalTarjeta from "../components/ModalTarjeta";
import { SafeAreaView } from "react-native-safe-area-context";
import BtnPrincipal from "../components/BtnPrincipal";
import AppContext from "../context/app/appContext";
import { useRoute } from '@react-navigation/native'
import TarjetasOpciones from "../components/TarjetasOpciones.js";
import Toast2 from "../components/Toast2.js";

// Componente funcional Orden
const Orden = () => {
  // Acceso al estado global y funciones a través del contexto de la aplicación
  const { setPantallaActual, pantallaActual, orden, setOrden, tarjetas} = useContext(AppContext);
  // Estado local para gestionar la visibilidad del modal de tarjeta
  const [modalVisible, setModalVisible] = useState(false);
  // Acceso a la ruta de navegación actual
  const route = useRoute();

  // Función para alternar la visibilidad del modal de tarjeta
  const handleVisible = () => {
    setModalVisible(!modalVisible);
  };

  // Renderizado del componente
  return (
    <SafeAreaView style={styles.contenedorPrincipal}>
      {/* Verifica si no hay productos en la orden */}
      {orden.length === 0 ? (
        <View style={styles.textoSinProductos}>
          <Text style={styles.noProducts}>No hay productos en la orden</Text>
        </View>
      ) : (
        <>
          {/* Componente Platillos2 para mostrar los platillos de la orden */}
          <Platillos2 />
          {/* Botón principal para proceder al pago */}
          {tarjetas.length !== 0 ? (
          <View style={styles.BtnPrincipal}>
            <BtnPrincipal
              texto={"Proceder al pago"}
              handleVisible={handleVisible}
            />
          </View>
        ) : (
          <Text style={styles.noTarjetas}>Agrega al menos una tarjeta desde "Mi perfil" para realizar tu pedido</Text>
        )}
          
        </>
      )}

      {/* Verifica si hay tarjetas disponibles */}
      {tarjetas.length !== 0 ? 
        // Muestra el componente TarjetasOpciones si hay tarjetas disponibles
        <TarjetasOpciones
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        /> :  
        // Muestra el componente ModalTarjeta si no hay tarjetas disponibles
        <ModalTarjeta
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      }
      <Toast2 />
    </SafeAreaView>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  BtnPrincipal: {
    marginTop: "15%",
    maxWidth: "100%",
    marginHorizontal: "10%",
  },
  contenedorPrincipal: {
    backgroundColor: "white",
    flex: 1,
  },
  textoSinProductos: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noProducts: {
    color: "#BABABA",
    fontSize: 28,
    marginHorizontal: 20,
    textAlign: "center",
    marginTop: 200
  },
  noTarjetas: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 60,
    marginHorizontal: 30
  }
});

// Exportación del componente Orden
export default Orden;
