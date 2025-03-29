# Gestionnaire de Tâches - Documentation

## Yanis MERIEM A1

## Description du Projet
Ce projet est une application web complète de gestion de tâches, offrant :
- Un backend Node.js/Express connecté à MongoDB.
- Une API RESTful avec des opérations CRUD.
- Une interface web interactive.
- Des fonctionnalités avancées de filtrage et de tri.
- Gestion des sous-tâches et des commentaires.

---

## Technologies Utilisées
- **Backend** : Node.js, Express, Mongoose
- **Base de données** : MongoDB
- **Frontend** : HTML5, CSS, JavaScript
- **Moteur de templates** : EJS (je l'ai ajouter pour me facilité la vie dans le html avec la possibilité de faire des boucle, des if, etc...)

---


### Configuration
```env
MONGO_URI=votre_uri_mongodb
PORT=5000
```

### Lancement
```bash
npm run dev
```
L'application sera accessible sur [http://localhost:5000](http://localhost:5000).

---

## Filtres Disponibles
- **Statut** : `à faire`, `en cours`, `terminée`, `annulée`.
- **Priorité** : `basse`, `moyenne`, `haute`, `critique`.
- **Catégorie** : `travail`, `personnel`, `autre`.
- **Avant/Après** : date limite (format `YYYY-MM-DD`).
- **q** : recherche texte dans le titre/description.

### Tris Disponibles
- par date d'échéance.
- par niveau de priorité.
- par date de création.
- Par ordre croisant ou invers

---

## Jeux de Données
J'ai fait un jeux de données de démonstration qui est dans le fichier `Jeux de données/YanisCollectionTaskManager.json`. 


---

## Fonctionnalités que j'ai implémenté
- Affichage liste/détail des tâches.
- Formulaire d'ajout/modification/consultation.
- On peut Suprimer/Ajouter/Editer/Consulter les taches.
- Ajout de commentaires et de sosu taches dynamique
- Filtres et trie (tout fonctionne sauf le tris par etiquette)

---

## Structure des Fichiers
```plaintext
.
├── controllers/       
├── model/             # Modèles Mongoose
├── public/            # Assets statiques (mes fichier js et css)
├── routes/            # Définition des routes
├── views/             # Templates EJS pour afficher mon HTML
├── app.js             # Point d'entrée de l'application
└── .env               # Configuration du port et variable d'environement
```
