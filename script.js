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

// Créer une référence vers le répertoire contenant les images
var storageRef = storage.ref();

// Lister tous les fichiers qui commencent par "img"
storageRef.listAll()
  .then(function(result) {
    result.items.forEach(function(imageRef) {
      // Vérifie si le fichier commence par "img"
      if (imageRef.name.startsWith('img')) {
        // Récupérer l'URL de téléchargement du fichier
        imageRef.getDownloadURL()
          .then(function(url) {
            // Créer une balise <img> et ajouter l'URL comme source
            var imgElement = document.createElement('img');
            imgElement.src = url;
            
            // Ajouter l'image au conteneur
            document.getElementById('container').appendChild(imgElement);
          })
          .catch(function(error) {
            // Gestion des erreurs (fichier non trouvé, permissions insuffisantes, etc.)
            console.error("Erreur lors de la récupération du fichier :", error);
          });
      }
    });
  })
  .catch(function(error) {
    // Gestion des erreurs pour la liste des fichiers
    console.error("Erreur lors de la récupération des fichiers :", error);
  });