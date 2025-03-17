// Exemple d'initialisation de Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCIfAQ9L_RI1igDpCzQs84BBxtEX27ptCA",
    authDomain: "nonamemarcobdd.firebaseapp.com",
    projectId: "nonamemarcobdd",
    storageBucket: "nonamemarcobdd.firebasestorage.app",
    messagingSenderId: "544836475440",
    appId: "1:544836475440:web:6632eff99dcfbeb1e7abf5",
});

// Récupérer une instance de Firebase Storage
var storage = firebase.storage();

// Créer une référence vers le répertoire contenant les fichiers
var storageRef = storage.ref();

// Lister tous les fichiers
storageRef.listAll()
  .then(function(result) {
    result.items.forEach(function(fileRef) {
      // Récupérer l'URL de téléchargement du fichier
      fileRef.getDownloadURL()
        .then(function(url) {
          // Créer une balise <img> ou <video> selon le type de fichier
          var fileType = fileRef.name.split('.').pop().toLowerCase();
          var mediaElement;
          
          if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
            mediaElement = document.createElement('img');
            mediaElement.src = url;
          } else if (['mp4', 'webm', 'ogg',"mov"].includes(fileType)) {
            mediaElement = document.createElement('video');
            mediaElement.src = url;
            mediaElement.controls = true;
            mediaElement.preload = 'metadata';
          }
          
          // Ajouter le média au conteneur
          if (mediaElement) {
            document.getElementById('container').appendChild(mediaElement);
          }
        })
        .catch(function(error) {
          // Gestion des erreurs (fichier non trouvé, permissions insuffisantes, etc.)
          console.error("Erreur lors de la récupération du fichier :", error);
        });
    });
  })
  .catch(function(error) {
    // Gestion des erreurs pour la liste des fichiers
    console.error("Erreur lors de la récupération des fichiers :", error);
  });