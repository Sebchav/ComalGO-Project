import React from 'react';
import { View, Text } from 'react-native';
import BtnCategoria from './BtnCategoria';

const CategoriasBtn = ({ onCategoriaSeleccionada }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <BtnCategoria nombreCategoria={"Comidas"} onPress={() => onCategoriaSeleccionada("Comidas")} />
        <BtnCategoria nombreCategoria={"Desayunos"} onPress={() => onCategoriaSeleccionada("Desayunos")} />
      </View>
      <View style={styles.row}>
        <BtnCategoria nombreCategoria={"Bebidas"} onPress={() => onCategoriaSeleccionada("Bebidas")} />
        <BtnCategoria nombreCategoria={"Cafetería"} onPress={() => onCategoriaSeleccionada("Cafetería")} />
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
