import React from 'react';
import { View, Text } from 'react-native';
import BtnCategoria from './BtnCategoria';

const CategoriasBtn = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <BtnCategoria nombreCategoria={"Comidas"} />
        <BtnCategoria nombreCategoria={"Desayunos"} />
      </View>
      <View style={styles.row}>
        <BtnCategoria nombreCategoria={"Bebidas"} />
        <BtnCategoria nombreCategoria={"Cafetería"} />
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
