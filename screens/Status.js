// Importa React y useContext desde React
import React, { useContext } from "react";

// Importa componentes esenciales de React Native
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";

// Importa el componente ListaOrdenes desde la ruta relativa
import ListaOrdenes from "../components/ListaOrdenes";

// Importa el contexto de la aplicación desde la ruta relativa
import AppContext from "../context/app/appContext";

// Importa el componente Productos desde la ruta relativa
import Productos from "../components/Productos";

// Define el componente funcional Status
const Status = () => {
  // Obtiene el estado y las funciones del contexto de la aplicación
  const { ordenConfirmada, ordenActual, setOrdenActual } = useContext(AppContext);

  // Renderiza la vista principal del componente
  return (
    <View style={styles.container}>

      {/* Renderiza el botón de regreso si hay una orden actual */}
      {ordenActual[0] && (
        <TouchableOpacity style={styles.regresar}
          onPress={() => setOrdenActual({})}
        >
          <Image source={require("../assets/arrow-left-black.png")} />
        </TouchableOpacity>
      )}

      {/* Verifica si hay una orden confirmada */}
      {ordenConfirmada.orden.length !== 0 ? 
        <>
          {/* Muestra información de la orden actual si existe */}
          {ordenActual[0] && (
            <>
              <Text style={styles.titulo}>
                Tu orden estará lista en aproximadamente {"\n"}
                <Text style={styles.tiempo}>{5 * (Object.keys(ordenActual[0]).length - 3)} minutos</Text>
              </Text>

              {/* Contenedor principal de la orden */}
              <View style={styles.contenedorPrincipal}>
                <Text style={styles.textoProductos}>Tus Productos</Text>
                <Productos />
                <View style={styles.contenedorTotal}>
                  <Text style={styles.textoTotal}>Total</Text>
                  <Text style={styles.textoCantidad}>${ordenActual[0].total}</Text>
                </View>
              </View>
            </>
          )}
          
          {/* Muestra la lista de órdenes si no hay una orden actual */}
          {!ordenActual[0] && (
            <ListaOrdenes />
          )}
        </>
        :
        /* Muestra un mensaje si no hay órdenes disponibles */
        <View style={styles.textoSinProductos}>
          <Text style={styles.noProducts}>No hay ordenes disponibles</Text>
        </View>
      }
    </View>
  );
};

// Define los estilos para los componentes de la pantalla de estado
const styles = StyleSheet.create({
  titulo: {
    fontSize: 23,
    color: "#8E8EA9",
    textAlign: "center",
    marginTop: 25,
    letterSpacing: 1,
    lineHeight: 35,
  },
  tiempo: {
    fontSize: 23,
    color: "#35253A",
    fontWeight: "bold",
  },
  contenedorPrincipal: {
    marginTop: 30,
    marginHorizontal: 30,
  },
  textoProductos: {
    color: "#8E8EA9",
    fontSize: 20,
    marginBottom: 10,
  },
  contenedorTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  textoTotal:{
    color: "#4A4A6A",
    fontSize: 20
  },
  textoCantidad: {
    fontSize: 20,
    color: "#4A4A6A",
    fontWeight: "bold"
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    marginTop: 25
  },
  textoSinProductos: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10
  },
  noProducts: {
    color: "#BABABA",
    fontSize: 28,
    marginHorizontal: 20,
    textAlign: "center",
    marginTop: -120
  },
  regresar: {
    marginTop: 20,
    padding: 1,
    marginHorizontal: 15,
  }
});

// Exporta el componente Status como componente principal
export default Status;
