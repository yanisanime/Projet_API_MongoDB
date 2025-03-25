const express = require("express");
const router = express.Router();
const Task = require("../model/model");

// Récupérer toutes les tâches
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ajouter une nouvelle tâche
router.post("/", async (req, res) => {
  try {
    // Récupération des données du formulaire
    const { 
      titre, 
      description, 
      echeance, 
      statut, 
      priorite, 
      auteur, 
      categorie, 
      etiquettes, 
      sousTaches, 
      commentaires 
    } = req.body;

    // Création de la tâche dans MongoDB
    const newTask = new Task({
      titre,
      description,
      echeance,
      statut,
      priorite,
      auteur, // L'auteur est directement dans le corps de la requête (nom, prénom, email)
      categorie,
      etiquettes: etiquettes ? etiquettes.split(',') : [], // Si des étiquettes sont envoyées sous forme de texte séparé par des virgules
      sousTaches: sousTaches ? sousTaches.map(st => ({
        titre: st.titre,
        statut: st.statut,
        echeance: st.echeance
      })) : [],
      commentaires: commentaires ? commentaires.map(comment => ({
        auteur: comment.auteur,
        contenu: comment.contenu,
      })) : [],
    });

    await newTask.save(); // ICI on sauvegarde ds base

    console.log("Tâche ajoutée:");
    res.redirect("/"); // Redirige vers la page d'accueil après l'ajout
  } catch (err) {
    console.error("Erreur lors de l'ajout de la tâche:", err);
    res.status(500).send("Erreur serveur");
  }
});

// Route pour afficher le formulaire d'ajout de tâche
router.get("/new", (req, res) => {
  res.render("newTask"); // Affiche la page du formulaire
});

// Route pour supprimer une tâche
router.delete("/:id", async (req, res) => {
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


module.exports = router;
