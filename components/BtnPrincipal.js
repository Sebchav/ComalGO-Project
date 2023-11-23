import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const BtnPrincipal = ({ texto, handleVisible }) => {
  return (
    <Pressable style={styles.contenedorBtn} onPress={() => handleVisible()}>
      <Text style={styles.textoBtn}>{texto}</Text>
    </Pressable>
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
