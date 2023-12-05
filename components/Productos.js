import React, {useContext} from "react";
import { Text } from "react-native";
import Producto from "../components/Producto";
import { View } from "react-native";
import AppContext from "../context/app/appContext";

const Productos = () => {
  const { ordenConfirmada } = useContext(AppContext);
  
  return (
    <View>
      {/* <Producto nombreProducto={"Ejemplo"} cantidad={2} precio={10} />
      <Producto nombreProducto={"Ejemplo"} cantidad={2} precio={10} />
      <Producto nombreProducto={"Ejemplo"} cantidad={2} precio={10} /> */}
      {ordenConfirmada.orden.map(producto=>(
        <Producto imagen={producto.imagen} key={producto.id} nombreProducto={producto.nombrePlatillo} cantidad={producto.cantidad} precio={producto.precio}/>
      ))}
    </View>
  )
};

export default Productos;
