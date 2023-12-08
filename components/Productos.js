import React, { useContext } from "react";
import { Text } from "react-native";
import Producto from "../components/Producto";
import { View } from "react-native";
import AppContext from "../context/app/appContext";

// Componente Productos que muestra la lista de productos en la orden actual
const Productos = () => {
  // Obtener la información de la orden confirmada y la orden actual desde el contexto de la aplicación
  const { ordenConfirmada, ordenActual } = useContext(AppContext);
  console.log(ordenActual);

  return (
    <View>
      {/* Mapear y renderizar cada producto en la orden actual */}
      {Object.values(ordenActual[0])
        .filter(propiedad => typeof propiedad !== 'number')  // Filtra propiedades no numéricas
        .map((producto, index) => (
          <Producto
            imagen={producto.imagen}
            key={producto.id}
            nombreProducto={producto.nombrePlatillo}
            cantidad={producto.cantidad}
            precio={producto.precio}
          />
        ))
      }
    </View>
  );
};

// Exportar el componente Productos como componente principal
export default Productos;
