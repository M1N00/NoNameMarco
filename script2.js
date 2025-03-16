// Importation des modules Firebase nécessaires
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

// Configuration de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCIfAQ9L_RI1igDpCzQs84BBxtEX27ptCA",
    authDomain: "nonamemarcobdd.firebaseapp.com",
    projectId: "nonamemarcobdd",
    storageBucket: "nonamemarcobdd.firebasestorage.app",
    messagingSenderId: "544836475440",
    appId: "1:544836475440:web:6632eff99dcfbeb1e7abf5",
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Fonction pour uploader un fichier vers Firebase Storage
async function uploadFile() {
    const fileInput = document.getElementById("imageInput");
    if (!fileInput || fileInput.files.length === 0) {
        return;
    }

    const file = fileInput.files[0];
    const storage = getStorage(app);
    const storageRef = ref(storage, `img${file.name}`); // Stocke le fichier dans le dossier "uploads"
    
    try {
        const snapshot = await uploadBytes(storageRef, file);
        console.log("Upload réussi !", snapshot);
        alert("Image envoyée !");
        
        // Récupérer l'URL du fichier stocké
        const url = await getDownloadURL(snapshot.ref);
        console.log("URL du fichier :", url);
    } catch (error) {
        console.error("Erreur lors de l'upload :", error);
    }
}

// Ajout d'un écouteur d'événement pour déclencher l'upload
window.addEventListener("DOMContentLoaded", () => {
    const uploadButton = document.getElementById("uploadButton");
    if (uploadButton) {
        uploadButton.addEventListener("click", uploadFile);
    }
});