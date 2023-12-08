import { useEffect, useContext } from "react";
import { useToast } from "react-native-toast-notifications";
import AppContext from "../context/app/appContext";

// Componente Toast que muestra un mensaje emergente (toast) cuando un producto se agrega correctamente
const Toast = () => {
  // Contexto de la aplicación
  const { toastVisible, setToastVisible } = useContext(AppContext);
  
  // Hook de toast de react-native-toast-notifications
  const toast = useToast();

  // Efecto que se ejecuta cuando toastVisible cambia
  useEffect(() => {
    if (toastVisible === true) {
      // Muestra el toast con el mensaje de éxito
      toast.show("¡Producto agregado correctamente!", {
        type: "success",
        placement: "top",
        duration: 2400,
        offset: 30,
        animationType: "slide-in | zoom-in",
      });
      
      // Oculta el toast después de mostrarlo
      setToastVisible(false);
    }   
  }, [toastVisible]);

  return null; // El componente no renderiza nada directamente, solo muestra el toast cuando es necesario
};

export default Toast;
