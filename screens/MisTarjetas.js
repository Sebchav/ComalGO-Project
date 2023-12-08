// Importaciones de React y Hooks para gestionar el estado y efectos secundarios
import React, { useState, useEffect, useContext } from 'react';

// Importaciones de componentes de React Native para la interfaz de usuario
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// Importación del componente ModalTarjeta desde la ubicación especificada
import ModalTarjeta from '../components/ModalTarjeta';

// Importación del contexto de la aplicación desde la ubicación especificada
import AppContext from '../context/app/appContext';

// Importación de la instancia de Firebase desde la ubicación especificada
import firebase from '../database/firebase';

// Componente funcional MisTarjetas
const MisTarjetas = () => {
  // Acceso al estado global y funciones a través del contexto de la aplicación
  const { usuarioActual, tarjetas, setTarjetas } = useContext(AppContext);
  // Estado local para gestionar la visibilidad del modal de tarjeta
  const [modalVisible, setModalVisible] = useState(false);

  // Función para alternar la visibilidad del modal de tarjeta
  const handleVisible = () => {
    setModalVisible(!modalVisible);
  };

  // Función para eliminar una tarjeta
  const eliminarTarjeta = async (id) => {
    try {
      // Elimina la tarjeta de Firestore
      await firebase.db.collection('tarjetas').doc(id).delete();

      // Actualiza el estado local excluyendo la tarjeta eliminada
      const tarjetasActualizadas = tarjetas.filter((tarjeta) => id !== tarjeta.id);
      setTarjetas(tarjetasActualizadas);
    } catch (error) {
      console.error('Error al eliminar la tarjeta:', error);
    }
  };

  // Función para mostrar una alerta de confirmación antes de eliminar una tarjeta
  const mostrarAlerta = (id) =>
    Alert.alert('¿Estás seguro de eliminar esta tarjeta?', 'Esta acción no se podrá revertir', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancelar',
      },
      { text: 'Confirmar', onPress: () => eliminarTarjeta(id) },
    ]);

  // Renderizado del componente
  return (
    // Contenedor principal que agrupa la visualización de las tarjetas, el botón para añadir una nueva tarjeta
    // y el componente ModalTarjeta para ingresar información de una nueva tarjeta.
    <View style={styles.contenedorPrincipal}>
      {/* Verifica si existen tarjetas en el estado local */}
      {tarjetas.length > 0 ? (
        // Mapea sobre las tarjetas existentes y muestra la información de cada una
        tarjetas.map((tarjeta) => (
          <View style={styles.contenedorTarjetas} key={tarjeta.numeroTarjeta}>
            {/* Imagen de la tarjeta */}
            <Image style={styles.imagenTarjeta} source={require('../assets/iconoTarjeta.png')} />
            {/* Número de la tarjeta */}
            <Text>{tarjeta.numeroTarjeta}</Text>
            {/* Fecha de expiración de la tarjeta */}
            <Text>{tarjeta.fechaExp}</Text>
            {/* Botón de eliminación de la tarjeta */}
            <TouchableOpacity onPress={() => mostrarAlerta(tarjeta.id)}>
              <Image style={styles.xroja} source={require('../assets/xroja.png')} />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        // Si no existen tarjetas, muestra una imagen predeterminada y un mensaje informativo
        <>
          <Image style={styles.imagenTarjeta} source={require('../assets/imgTarjeta.png')} />
          <Text style={styles.titulo}>Todavía no has agregado Tarjetas</Text>
          <Text style={styles.texto}>Por favor añade una tarjeta {"\n"} de crédito o débito</Text>
        </>
      )}

      {/* Botón para añadir una nueva tarjeta con un ícono y un texto */}
      <TouchableOpacity style={styles.addNew} onPress={() => handleVisible()}>
        <Image style={styles.imgPlus} source={require('../assets/plus.png')} />
        <Text style={styles.textoTarj}>Añadir Tarjeta</Text>
      </TouchableOpacity>

      {/* Componente ModalTarjeta para ingresar información de una nueva tarjeta */}
      <ModalTarjeta modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>

  );
};

// Estilos del componente
const styles = StyleSheet.create({
  contenedorPrincipal:{
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    marginTop: 30
  },
  titulo: {
    fontSize: 20,
    color: "#32324D"
  },
  texto:{
    fontSize: 18,
    color: '#8E8EA9',
    textAlign: 'center',
  },
  addNew: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20
  },
  textoTarj:{
    fontSize: 18,
  },
  imgPlus:{
    height:35,
    width:35,
  },
  contenedorTarjetas:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  xroja: {
    width: 40,
    height: 40,
    marginLeft: 10
  }
})

// Exportación del componente MisTarjetas
export default MisTarjetas;
