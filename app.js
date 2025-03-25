require("dotenv").config(); //Charge les variables d'environnement depuis un fichier .env pour sécuriser les informations sensibles
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); ///Module Node.js pour manipuler les chemins de fichiers
const Task = require("./model/model"); //Importation du modèle Task

const app = express();
app.use(express.json());
app.use(cors());

//J'utilise ejs pour facilité l'écriture de code HTML
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views')); // Là, j'indique où se trouvent les fichiers de vue  

//Cela permet à Express d'interpréter les données envoyées via le formulaire POST
app.use(express.urlencoded({ extended: true }));


// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error("Erreur de connexion MongoDB:", err));


// Routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

// Serveur statique, ici on sert le fichier index.ejs par défaut 
app.use(express.static(path.join(__dirname, "public")));

// Route principale, on rend la vue index.ejs
app.get("/", async (req, res) => {
  try {
    const tasks = await Task.find(); // Récupérer les tâches depuis MongoDB
    res.render("index", { tasks }); // Passer les tâches à la vue
  } catch (err) {
    console.error("Erreur lors de la récupération des tâches:", err);
    res.status(500).send("Erreur serveur");
  }
});

// Route pour afficher le formulaire d'ajout de tâche
app.get("/tasks/new", (req, res) => {
  res.render("newTask"); // Affiche la page du formulaire
});

// Route pour supprimer une tâche
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params; // Récupérer l'ID de la tâche à supprimer
    await Task.findByIdAndDelete(id); // Supprimer la tâche dans MongoDB

      console.log("Tâche supprimée:");
    res.status(200).json({ message: "Tâche supprimée avec succès" }); // Répond avec un message JSON
  } catch (err) {
    console.error("Erreur lors de la suppression de la tâche:", err);
    res.status(500).send("Erreur serveur");
  }
});


// ICI on démar le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
