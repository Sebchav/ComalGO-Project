import React, { useState, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AppContext from "../context/app/appContext";

// Componente funcional PlatilloCard2 para mostrar información de un platillo en una tarjeta con opciones de cantidad
const PlatilloCard2 = ({ nombrePlatillo, precio, imagen, cantidad, id }) => {
  // Obteniendo funciones y estado del contexto de la aplicación
  const { orden, setOrden } = useContext(AppContext);

  // Función para actualizar la cantidad de un platillo en la orden
  const actualizarCantidad = (id, nuevaCantidad) => {
    let nuevaOrden;

    if (nuevaCantidad > 0) {
      // Actualizar la cantidad si es mayor que 0
      nuevaOrden = orden.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      );
    } else {
      // Eliminar el producto si la cantidad es 0
      nuevaOrden = orden.filter((item) => item.id !== id);
    }

    setOrden(nuevaOrden);
  };

  // Función para restar la cantidad de un platillo en la orden
  const restarCantidad = () => {
    if (cantidad > 0) {
      actualizarCantidad(id, cantidad - 1);
    }
  };

  // Función para sumar la cantidad de un platillo en la orden
  const sumarCantidad = () => {
    actualizarCantidad(id, cantidad + 1);
  };

  return (
    <View style={styles.contenedorPlatillo}>
      {/* Contenedor de información del platillo */}
      <View style={styles.infoPlatillo}>
        {/* Imagen del platillo */}
        <Image style={styles.img} source={{ uri: imagen }} />
        {/* Contenedor de textos del platillo */}
        <View style={styles.textosPlatillo}>
          {/* Nombre del platillo */}
          <Text style={styles.nombrePlatillo}>{nombrePlatillo}</Text>
          {/* Precio del platillo */}
          <Text style={styles.precio}>${precio}</Text>
        </View>
      </View>

      {/* Contenedor de botones para ajustar la cantidad del platillo */}
      <View style={styles.botonesCantidad}>
        {/* Botón para restar cantidad */}
        <TouchableOpacity onPress={restarCantidad} style={styles.boton}>
          <Text style={styles.textoBoton}>-</Text>
        </TouchableOpacity>
        {/* Texto que muestra la cantidad actual */}
        <Text style={styles.cantidad}>{cantidad}</Text>
        {/* Botón para sumar cantidad */}
        <TouchableOpacity onPress={sumarCantidad} style={styles.boton}>
          <Text style={styles.textoBoton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos del componente PlatilloCard2
const styles = StyleSheet.create({
  contenedorPlatillo: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 10,
    marginVertical: 12,
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  infoPlatillo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  nombrePlatillo: {
    fontSize: 18,
    width: 120,
    color: "#35253A",
  },
  precio: {
    color: "#35253A",
    fontWeight: "bold",
    fontSize: 17,
  },
  textosPlatillo: {
    gap: 15,
  },
  botonesCantidad: {
    flexDirection: "column",
    alignItems: "center",
  },
  boton: {
    backgroundColor: "#FFF2EA",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  textoBoton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#35253A",
  },
  cantidad: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#35253A",
  },
  img: {
    width: 100,
    height: 100,
  },
});

// Exportar el componente PlatilloCard2 como componente predeterminado
export default PlatilloCard2;
