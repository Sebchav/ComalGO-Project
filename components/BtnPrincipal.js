import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Componente funcional BtnPrincipal que recibe las propiedades texto, handleVisible y disabled (por defecto, es false)
const BtnPrincipal = ({ texto, handleVisible, disabled = false }) => {
  // Devuelve un componente TouchableOpacity (botón táctil) con el texto y la función onPress proporcionados
  return (
    <TouchableOpacity disabled={disabled} style={styles.contenedorBtn} onPress={() => handleVisible()}>
      <Text style={styles.textoBtn}>{texto}</Text>
    </TouchableOpacity>
  );
};

// Estilos para el componente BtnPrincipal
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

// Exporta el componente BtnPrincipal para su uso en otras partes de la aplicación
export default BtnPrincipal;
