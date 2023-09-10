import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native-web';
import { Image, View, ScrollView } from 'react-native';

const PantallaInicial = (props) => {

  useEffect(()=>{
    setTimeout(()=>{
        props.navigation.navigate("Registro")
    }, 3000)
  }, [])
  return (
    <View style={styles.container}>
        <Image style={styles.logo} source={require("../img/LogotipoWhite.png")} />
    </View>
  )
}

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
  

export default PantallaInicial