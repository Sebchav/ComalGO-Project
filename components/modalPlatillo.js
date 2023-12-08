import React, { useState, useContext } from 'react';
import { Alert, Modal, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import BtnPrincipal from '../components/BtnPrincipal';
import AppContext from '../context/app/appContext';

// Componente funcional ModalPlatillo que muestra un modal para agregar platillos a la orden
const ModalPlatillo = ({ nombrePlatillo, precioPlatillo, modalVisible, setModalVisible, productoActual, id }) => {
  // Obteniendo variables y funciones del contexto de la aplicación
  const { orden, setOrden, setToastVisible } = useContext(AppContext);

  // Estado local para manejar la cantidad de platillos a agregar
  const [cantidad, setCantidad] = useState(1);

  // Función para incrementar la cantidad de platillos
  const handleCantidadPlus = (cantidad) => {
    if (cantidad === 5) {
      return;
    }
    const nuevaCantidad = cantidad + 1;
    setCantidad(nuevaCantidad);
  };

  // Función para decrementar la cantidad de platillos
  const handleCantidadMinus = (cantidad) => {
    if (cantidad === 1) {
      return;
    }
    const nuevaCantidad = cantidad - 1;
    setCantidad(nuevaCantidad);
  };

  // Función para guardar el producto en la orden
  const guardarProducto = () => {
    setToastVisible(true);
    const productoExistente = orden.find(item => item.id === productoActual.id);

    if (productoExistente) {
      const ordenActualizada = orden.map(item =>
        item.id === productoActual.id
          ? { ...item, cantidad: cantidad }
          : item
      );

      setOrden(ordenActualizada);
    } else {

      setOrden([
        ...orden,
        {
          id: productoActual.id,
          imagen: productoActual.imagen,
          nombrePlatillo: productoActual.nombrePlatillo,
          precio: productoActual.precio,
          cantidad,
        },
      ]);

    }
    setModalVisible(!modalVisible);
    setCantidad(1);
  };

  return (
    // Vista modal para agregar platillos
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Encabezado del modal con imagen, nombre y botón de cerrar */}
            <View style={styles.imgTop}>
              <View></View>
              <Image style={styles.imgPlatillo} source={{ uri: productoActual.imagen }} />
              <TouchableOpacity onPress={() => {
                setModalVisible(!modalVisible)
                setCantidad(1)
              }}>
                <Image style={styles.imgClose} source={require('../assets/x.png')} />
              </TouchableOpacity>
            </View>
            {/* Contenedor de datos del platillo */}
            <View style={styles.dataCont}>
              <Text style={styles.nombrePlatillo}> {productoActual.nombrePlatillo}</Text>
              <Text style={styles.precioPlatillo}> ${productoActual.precio}</Text>
            </View>
            <Text style={styles.descripcion}> 
              {productoActual.descripcion}
            </Text>
            {/* Contenedor de entrada de comentario */}
            <View style={styles.inputCont}>
              <Text style={styles.textoComentario}> Agrega un comentario</Text>
              <TextInput style={styles.input} placeholder={'Ej: Sin aderezos'}></TextInput>
            </View>
            {/* Contenedor de botones (contador y botón de añadir a la orden) */}
            <View style={styles.buttons}>
              {/* Contador de cantidad de platillos */}
              <View style={styles.counter}>
                <TouchableOpacity onPress={() => handleCantidadMinus(cantidad)}>
                  <Image style={styles.btn} source={require('../assets/minus.png')} />
                </TouchableOpacity>

                <Text style={styles.cantidad}>{cantidad}</Text>

                <TouchableOpacity onPress={() => handleCantidadPlus(cantidad)}>
                  <Image style={styles.btn} source={require('../assets/plus.png')} />
                </TouchableOpacity>
              </View>
              {/* Botón principal para añadir a la orden */}
              <TouchableOpacity>
                <BtnPrincipal texto={'Añadir a la orden'} handleVisible={guardarProducto} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Estilos del componente ModalPlatillo
const styles = StyleSheet.create({
  // Vista centrada para el modal
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 50,
  },
  // Contenedor principal del modal
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    height: 490,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  // Contenedor de botón
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#32324D',
  },
  // Encabezado del modal
  imgTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15,
  },
  // Icono de cierre del modal
  imgClose: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  // Contenedor de datos del platillo
  dataCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  // Contenedor de botones
  buttons: {
    flexDirection: 'row',
    gap: 50,
    marginTop: 40,
    alignItems: "center"
  },
  // Contador de cantidad de platillos
  counter: {
    flexDirection: 'row',
    gap: 10,
  },
  // Botón de incremento y decremento de cantidad
  btn: {
    width: 40,
    height: 40,
  },
  // Texto de cantidad
  cantidad: {
    fontSize: 25,
  },
  // Contenedor de entrada de comentario
  inputCont: {
    width: '80%',
    marginTop: 10,
    gap: 10,
  },
  // Entrada de comentario
  input: {
    borderWidth: 0.5,
    paddingVertical: 25,
    borderRadius: 20,
    textAlign: 'center',
    borderColor: '#666687'
  },
  // Nombre del platillo
  nombrePlatillo: {
    fontSize: 22,
    color: '#32324D',
  },
  // Precio del platillo
  precioPlatillo: {
    fontSize: 25,
    color: '#32324D',
    fontWeight: 'bold',
  },
  // Texto de comentario
  textoComentario: {
    fontSize: 18,
    color: '#666687',
  },
  // Imagen del platillo
  imgPlatillo: {
    width: 130,
    height: 130,
    marginBottom: 10,
    marginLeft: 50,
  },
  descripcion: {
    marginHorizontal: 36,
    textAlign: "justify",
    fontSize: 14,
    marginVertical: 5
  }
});

// Exportar el componente ModalPlatillo como componente predeterminado
export default ModalPlatillo;
