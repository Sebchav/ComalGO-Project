import React, {useContext} from "react";
import { Text } from "react-native";
import Producto from "../components/Producto";
import { View } from "react-native";
import AppContext from "../context/app/appContext";

const Productos = () => {
  const { ordenConfirmada, ordenActual } = useContext(AppContext);
  console.log(ordenActual)
  return (
    <View>
      {/* <Producto nombreProducto={"Ejemplo"} cantidad={2} precio={10} />
      <Producto nombreProducto={"Ejemplo"} cantidad={2} precio={10} />
      <Producto nombreProducto={"Ejemplo"} cantidad={2} precio={10} /> */}
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
  )
};

export default Productos;
