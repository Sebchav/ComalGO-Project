import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Componente funcional Alerta que recibe propiedades 'mensaje' y 'tipo'
const Alerta = ({ mensaje, tipo }) => {
  // Devuelve un componente de vista con estilo condicional basado en el tipo de alerta
  return (
    <View style={[styles.contenedorAlerta, tipo == "exito" ? styles.exito : styles.error ]}>
      {/* Muestra el mensaje de la alerta */}
      <Text style={styles.mensajeAlerta}>{mensaje}</Text>
    </View>
  );
}

// Estilos para el componente Alerta
const styles = StyleSheet.create({
  contenedorAlerta: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 10
  },
  error: {
    backgroundColor: "#e33b4b", // Color de fondo para alertas de error
  },
  exito: {
    backgroundColor: "green", // Color de fondo para alertas de éxito
  },
  mensajeAlerta: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  }
});

// Exporta el componente Alerta para su uso en otras partes de la aplicación
export default Alerta;
