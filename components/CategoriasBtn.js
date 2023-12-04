import React from 'react';
import { View, Text } from 'react-native';
import BtnCategoria from './BtnCategoria';

const CategoriasBtn = ({ onCategoriaSeleccionada, categoriaSeleccionada }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <BtnCategoria
          nombreCategoria={"Comidas"}
          onPress={onCategoriaSeleccionada}
          categoriaSeleccionada={categoriaSeleccionada}
        />
        <BtnCategoria
          nombreCategoria={"Desayunos"}
          onPress={onCategoriaSeleccionada}
          categoriaSeleccionada={categoriaSeleccionada}
        />
      </View>
      <View style={styles.row}>
        <BtnCategoria
          nombreCategoria={"Bebidas"}
          onPress={onCategoriaSeleccionada}
          categoriaSeleccionada={categoriaSeleccionada}
        />
        <BtnCategoria
          nombreCategoria={"Cafetería"}
          onPress={onCategoriaSeleccionada}
          categoriaSeleccionada={categoriaSeleccionada}
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    gap: 10
  },
};

export default CategoriasBtn;
