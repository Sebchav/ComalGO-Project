import { useEffect, useContext } from "react";
import { useToast } from "react-native-toast-notifications";
import AppContext from "../context/app/appContext";

const Toast = () => {

  const {toastVisible, setToastVisible}= useContext(AppContext);
  const toast = useToast();

  useEffect(() => {
    if(toastVisible == true){
        toast.show("¡Producto agregado correctamente!", {
            type: "success",
            placement: "top",
            duration: 2400,
            offset: 30,
            animationType: "slide-in | zoom-in",
          });
          setToastVisible(false)
    }   
  }, [toastVisible]);
};

export default Toast;