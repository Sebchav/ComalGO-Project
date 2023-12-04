// Función para obtener el ID del documento del usuario desde AsyncStorage
export const obtenerId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      return userId;
    } catch (error) {
      console.error('Error al obtener el ID del usuario desde AsyncStorage:', error.message);
      return null;
    }
  };
  
  // Función para obtener el correo del usuario desde AsyncStorage
  export const obtenerCorreo = async () => {
    try {
      const userCorreo = await AsyncStorage.getItem('userCorreo');
      return userCorreo;
    } catch (error) {
      console.error('Error al obtener el correo del usuario desde AsyncStorage:', error.message);
      return null;
    }
  };