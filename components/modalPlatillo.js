import React, {useState, useContext} from 'react';
import {Alert, Modal, StyleSheet, Text, View, Image, TextInput,TouchableOpacity} from 'react-native';
import BtnPrincipal from '../components/BtnPrincipal';
import AppContext from '../context/app/appContext';

const ModalPlatillo = ({nombrePlatillo, precioPlatillo, modalVisible, setModalVisible, productoActual, id}) => {
  
  const {orden, setOrden, setToastVisible} = useContext(AppContext);

  const [cantidad, setCantidad] = useState(1);

  const handleCantidadPlus = (cantidad)=> {
    if(cantidad==5){
        return
    }
    const nuevaCantidad = cantidad+1;
    setCantidad(nuevaCantidad)
  }

  const handleCantidadMinus = (cantidad)=> {
    
    if(cantidad==1){
        return
    }
    const nuevaCantidad = cantidad-1;
    setCantidad(nuevaCantidad)
  }

  const guardarProducto = () => {
    setToastVisible(true)
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
    setCantidad(1)
  };

  return (
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
            <View style={styles.imgTop}>
                <View></View>
                <Image style={styles.imgPlatillo} source={{uri: productoActual.imagen}}/>            
                <TouchableOpacity onPress={() => {
                  setModalVisible(!modalVisible)
                  setCantidad(1)
                }}> 
                    <Image style={styles.imgClose} source={require('../assets/x.png')}/>
                </TouchableOpacity>
            </View>
            <View style={styles.dataCont}>
                <Text style={styles.nombrePlatillo}> {productoActual.nombrePlatillo}</Text>
                <Text style={styles.precioPlatillo}> ${productoActual.precio}</Text>
            </View>
            <View style={styles.inputCont}>
                <Text style={styles.textoComentario}> Agrega un comentario</Text>
                <TextInput style={styles.input} placeholder={'Ej: Sin aderezos'}></TextInput>
            </View>
            <View style={styles.buttons}>
                <View style={styles.counter}>
                    <TouchableOpacity onPress={()=> handleCantidadMinus(cantidad)}> 
                        <Image style={styles.btn} source={require('../assets/minus.png')}/>
                    </TouchableOpacity>
  
                    <Text style={styles.cantidad}>{cantidad}</Text>

                    <TouchableOpacity onPress={()=> handleCantidadPlus(cantidad)}> 
                        <Image style={styles.btn} source={require('../assets/plus.png')}/>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity>
                    <BtnPrincipal texto={'Añadir a la orden'} handleVisible={guardarProducto}/>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 50,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
    width: '100%',
    height: 460,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#32324D',
  },
  imgTop:{
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15,
  },
  imgClose:{
    width:60,
    height:60,
    resizeMode: 'contain',
  },
  dataCont:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  buttons:{
    flexDirection: 'row',
    gap: 50,
    marginTop: 40,
    alignItems: "center"
  },
  counter:{
    flexDirection: 'row',
    gap:10,
  },
  btn:{
    width:40,
    height:40,
  },
  cantidad:{
    fontSize:25,
  },
  inputCont:{
    width: '80%',
    marginTop:30,
    gap:10,
  },
  input:{
    borderWidth: 0.5,
    paddingVertical: 25,
    borderRadius: 20,
    textAlign: 'center',
    borderColor: '#666687'
  },
  nombrePlatillo:{
    fontSize:22,
    color: '#32324D',
  },
  precioPlatillo:{
    fontSize:25,
    color: '#32324D',
    fontWeight:'bold',
  },
  textoComentario:{
    fontSize:18,
    color: '#666687',
  },
  imgPlatillo:{
    width: 130,
    height:130,
    marginBottom: 10,
    marginLeft: 50,
  },
});

export default ModalPlatillo;