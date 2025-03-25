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
    console.log(req.body);

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

    console.log("On est ici");

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

    await newTask.save(); // Sauvegarde en base

    console.log("Tâche ajoutée:");
    res.redirect("/"); // Redirige vers la page d'accueil après l'ajout
  } catch (err) {
    console.error("Erreur lors de l'ajout de la tâche:", err);
    res.status(500).send("Erreur serveur");
  }

});

module.exports = router;
