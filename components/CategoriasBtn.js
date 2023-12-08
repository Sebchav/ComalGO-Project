import React from 'react';
import { View, Text } from 'react-native';
import BtnCategoria from './BtnCategoria';

// Componente funcional CategoriasBtn que muestra botones de categorías
const CategoriasBtn = ({ onCategoriaSeleccionada, categoriaSeleccionada }) => {
  return (
    // Contenedor principal del componente
    <View style={styles.container}>
      {/* Fila superior de botones de categorías */}
      <View style={styles.row}>
        {/* Componente BtnCategoria para la categoría "Comidas" */}
        <BtnCategoria
          nombreCategoria={"Comidas"}
          onPress={onCategoriaSeleccionada}
          categoriaSeleccionada={categoriaSeleccionada}
        />
        {/* Componente BtnCategoria para la categoría "Desayunos" */}
        <BtnCategoria
          nombreCategoria={"Desayunos"}
          onPress={onCategoriaSeleccionada}
          categoriaSeleccionada={categoriaSeleccionada}
        />
      </View>
      {/* Fila inferior de botones de categorías */}
      <View style={styles.row}>
        {/* Componente BtnCategoria para la categoría "Bebidas" */}
        <BtnCategoria
          nombreCategoria={"Bebidas"}
          onPress={onCategoriaSeleccionada}
          categoriaSeleccionada={categoriaSeleccionada}
        />
        {/* Componente BtnCategoria para la categoría "Cafetería" */}
        <BtnCategoria
          nombreCategoria={"Cafetería"}
          onPress={onCategoriaSeleccionada}
          categoriaSeleccionada={categoriaSeleccionada}
        />
      </View>
    </View>
  );
};

// Estilos del componente CategoriasBtn
const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10, // Espaciado entre los elementos hijos
    marginHorizontal: 5, // Margen horizontal del contenedor
  },
  row: {
    flexDirection: 'row', // Disposición en fila para los elementos hijos
    gap: 10 // Espaciado entre los elementos hijos de la fila
  },
};

// Exportar el componente CategoriasBtn como componente predeterminado
export default CategoriasBtn;
