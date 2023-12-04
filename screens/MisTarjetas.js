import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ModalTarjeta from '../components/ModalTarjeta';
import AppContext from '../context/app/appContext';
import firebase from '../database/firebase';

const MisTarjetas = () => {
  const { usuarioActual, tarjetas, setTarjetas } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  
  const handleVisible = () => {
    setModalVisible(!modalVisible);
  };

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

  const mostrarAlerta = (id) =>
    Alert.alert('¿Estás seguro de eliminar esta tarjeta?', 'Esta acción no se podrá revertir', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancelar',
      },
      { text: 'Confirmar', onPress: () => eliminarTarjeta(id) },
    ]);

  return (
    <View style={styles.contenedorPrincipal}>
      {tarjetas.length > 0 ? (
        tarjetas.map((tarjeta) => (
          <View style={styles.contenedorTarjetas} key={tarjeta.id}>
            <Image style={styles.imagenTarjeta} source={require('../assets/iconoTarjeta.png')} />
            <Text>{tarjeta.numeroTarjeta}</Text>
            <Text>{tarjeta.fechaExp}</Text>
            <TouchableOpacity onPress={() => mostrarAlerta(tarjeta.id)}>
              <Image style={styles.xroja} source={require('../assets/xroja.png')} />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <>
          <Image style={styles.imagenTarjeta} source={require('../assets/imgTarjeta.png')} />
          <Text style={styles.titulo}>Todavía no has agregado Tarjetas</Text>
          <Text style={styles.texto}>Por favor añade una tarjeta {"\n"} de crédito o débito</Text>
        </>
      )}

      <TouchableOpacity style={styles.addNew} onPress={() => handleVisible()}>
        <Image style={styles.imgPlus} source={require('../assets/plus.png')} />
        <Text style={styles.textoTarj}>Añadir Tarjeta</Text>
      </TouchableOpacity>

      <ModalTarjeta modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

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

export default MisTarjetas