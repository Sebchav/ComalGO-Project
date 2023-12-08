import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAw0090ZABO8fL4DpvNpsTVFroh_F11UhQ",
    authDomain: "comalgo-93c58.firebaseapp.com",
    projectId: "comalgo-93c58",
    storageBucket: "comalgo-93c58.appspot.com",
    messagingSenderId: "689444786940",
    appId: "1:689444786940:web:61906df1ea9e7e98193d79",
    measurementId: "G-W5RRCHVB6Q"
};
  
// Inicializa Firebase con la configuración
firebase.initializeApp(firebaseConfig);

// Obtiene la instancia de Firestore
const db = firebase.firestore();

// Exporta el objeto con las instancias de firebase y firestore
export default {
    firebase,
    db
};
