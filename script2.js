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
    const fileType = file.type.split('/')[0]; // Récupère le type de fichier (image ou video)
    const storageRef = ref(storage, `${fileType}s/${file.name}`); // Stocke le fichier dans le dossier "images" ou "videos"
    
    try {
        const snapshot = await uploadBytes(storageRef, file);
        console.log("Upload réussi !", snapshot);
        alert(`${fileType.charAt(0).toUpperCase() + fileType.slice(1)} envoyé(e) !`);
        
        // Récupérer l'URL du fichier stocké
        const url = await getDownloadURL(snapshot.ref);
        console.log("URL du fichier :", url);
        
        // Afficher le média dans le conteneur
        displayMedia(url, fileType);
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

// Fonction pour afficher les médias dans le conteneur
function displayMedia(url, type) {
    const container = document.getElementById('container');
    let mediaElement;
    
    if (type === 'image') {
        mediaElement = document.createElement('img');
        mediaElement.src = url;
    } else if (type === 'video') {
        mediaElement = document.createElement('video');
        mediaElement.src = url;
        mediaElement.controls = true;
        mediaElement.preload = 'metadata';
    }
    
    container.appendChild(mediaElement);
}