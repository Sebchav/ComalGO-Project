import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import BtnPrincipal from "../components/BtnPrincipal";

const ModalTarjeta = ({ modalVisible, setModalVisible }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.imgTop}>
              <View></View>
              <Text style={styles.titulo}>Añadir Tarjeta</Text>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  style={styles.imgClose}
                  source={require("../assets/x.png")}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.formCont}>
              <View style={styles.cardNumberContainer}>
                <TextInput
                  placeholder="Numero de tarjeta"
                  style={styles.input}
                  inputMode="numeric"
                />
                <Image
                  source={require("../assets/card.png")}
                  style={styles.cardImage}
                />
              </View>

              <TextInput
                placeholder="Titular de la tarjeta"
                style={styles.input}
              ></TextInput>

              <View style={styles.row}>
                <TextInput
                  placeholder="Fecha Exp"
                  style={styles.input2}
                  inputMode="numeric"
                ></TextInput>

                <TextInput
                  placeholder="CVV"
                  style={styles.input2}
                  inputMode="numeric"
                ></TextInput>
              </View>
            </View>

            <View style={styles.btnContainer}>
              <TouchableOpacity>
                <BtnPrincipal texto={"Pagar"} />
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
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 50,
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    height: 460,
    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "#32324D",
  },
  imgTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 15,
    marginBottom: 10,
  },
  imgClose: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  dataCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  buttons: {
    flexDirection: "row",
    gap: 50,
    marginTop: 40,
    alignItems: "center",
  },
  btn: {
    width: 40,
    height: 40,
  },
  cantidad: {
    fontSize: 25,
  },
  inputCont: {
    width: "80%",
    marginTop: 30,
    gap: 10,
  },
  titulo: {
    marginLeft: 15,
    fontSize: 25,
    color: "#32324D",
  },
  input: {
    padding: 20,
    borderWidth: 0.5,
    borderRadius: 20,
    marginVertical: 12,
    width: "100%",
    borderColor: "#666687",
  },
  input2: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 12,
    width: "47%",
    borderWidth: 0.5,
    borderColor: "#666687",
  },
  formCont: {
    width: "80%",
  },
  row: {
    flexDirection: "row",
    gap: 20,
  },
  btnContainer: {
    width: "80%",
    marginTop: 20,
  },
  cardNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  cardImage: {
    position: "absolute",
    right: 20,
  },
});

export default ModalTarjeta;
