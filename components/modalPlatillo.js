import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, View, Image, TextInput,TouchableOpacity} from 'react-native';
import BtnPrincipal from '../components/BtnPrincipal';

const ModalPlatillo = ({nombrePlatillo, precioPlatillo}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cantidad, setCantidad] = useState(0);

  const handleCantidadPlus = (cantidad)=> {
    if(cantidad==5){
        return
    }
    const nuevaCantidad = cantidad+1;
    setCantidad(nuevaCantidad)
  }

  const handleCantidadMinus = (cantidad)=> {

    if(cantidad==0){
        return
    }
    const nuevaCantidad = cantidad-1;
    setCantidad(nuevaCantidad)
  }

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
                <Image style={styles.imgPlatillo} source={require('../assets/platilloEjemplo.png')}/>            
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}> 
                    <Image style={styles.imgClose} source={require('../assets/x.png')}/>
                </TouchableOpacity>
            </View>
            <View style={styles.dataCont}>
                <Text style={styles.nombrePlatillo}> {nombrePlatillo}</Text>
                <Text style={styles.precioPlatillo}> ${precioPlatillo}</Text>
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
                    <BtnPrincipal texto={'Añadir a la orden'}/>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableOpacity>
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
    borderRadius: 30,
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
    fontSize:25,
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
    width: 150,
    height:150,
    marginLeft: 50,
  },
});

export default ModalPlatillo;