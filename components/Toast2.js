import { useEffect, useContext } from "react";
import { useToast } from "react-native-toast-notifications";
import AppContext from "../context/app/appContext";

// Componente Toast que muestra un mensaje emergente (toast) cuando un producto se agrega correctamente
const Toast2 = () => {
  // Contexto de la aplicación
  const { toastVisible2, setToastVisible2 } = useContext(AppContext);
  
  // Hook de toast de react-native-toast-notifications
  const toast = useToast();

  // Efecto que se ejecuta cuando toastVisible cambia
  useEffect(() => {
    if (toastVisible2 === true) {
      // Muestra el toast con el mensaje de éxito
      toast.show("¡Orden generada correctamente!", {
        type: "success",
        placement: "top",
        duration: 2400,
        offset: 30,
        animationType: "slide-in | zoom-in",
      });
      
      // Oculta el toast después de mostrarlo
      setToastVisible2(false);
    }   
  }, [toastVisible2]);

  return null; // El componente no renderiza nada directamente, solo muestra el toast cuando es necesario
};

export default Toast2;
