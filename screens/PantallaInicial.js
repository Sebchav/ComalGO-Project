// Importaciones de React y componentes de React Native
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native-web'; // Importación del módulo StyleSheet de react-native-web
import { Image, View, ScrollView } from 'react-native';

// Componente funcional PantallaInicial
const PantallaInicial = (props) => {
  // Efecto secundario que navega a la pantalla de Registro después de 3 segundos
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate("Registro");
    }, 3000);
  }, []);

  // Renderizado del componente
  return (
    <View style={styles.container}>
      {/* Imagen del logotipo */}
      <Image style={styles.logo} source={require("../img/LogotipoWhite.png")} />
    </View>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50
  },
});

// Exportación del componente PantallaInicial
export default PantallaInicial;
