import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const BtnPrincipal = ({ texto, handleVisible }) => {
  return (
    <TouchableOpacity style={styles.contenedorBtn} onPress={() => handleVisible()}>
      <Text style={styles.textoBtn}>{texto}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contenedorBtn: {
    backgroundColor: "#35253A",
    padding: 20,
    borderRadius: 20,
  },
  textoBtn: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BtnPrincipal;
