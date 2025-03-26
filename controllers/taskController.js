const Task = require("../model/model");

//Récupérer toutes les tâches
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Ajouter une nouvelle tâche
exports.createTask = async (req, res) => {
  try {
    const { 
      titre, description, echeance, statut, priorite, 
      auteur, categorie, etiquettes, sousTaches, commentaires 
    } = req.body;

    // Création d'une nouvelle tâche avec validation des champs optionnels
    const newTask = new Task({
      titre,
      description,
      echeance,
      statut,
      priorite,
      auteur,
      categorie,
      etiquettes: etiquettes ? etiquettes.split(',') : [],
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

    await newTask.save(); // Enregistrer la tâche dans MongoDB

    console.log("Tâche ajoutée avec succès !");
    res.redirect("/"); // Rediriger vers la page d'accueil
  } catch (err) {
    console.error("Erreur lors de l'ajout de la tâche :", err);
    res.status(500).send("Erreur serveur");
  }
};

//Supprimer une tâche
exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id; // Correction de l'extraction de l'ID
    await Task.findByIdAndDelete(id); // Suppression dans MongoDB

    console.log("Tâche supprimée :", id);
    res.status(200).json({ message: "Tâche supprimée avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression de la tâche :", err);
    res.status(500).send("Erreur serveur");
  }
};

//Récupérer une tâche par ID (affichage détaillé)
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    res.render("taskDetails", { task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateTask = async (req, res) => {
    try {
      const id = req.params.id;
      const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
      
      if (!updatedTask) {
        return res.status(404).json({ message: "Tâche non trouvée" });
      }
  
      res.json(updatedTask);
      res.redirect("/"); // Rediriger vers la page d'accueil
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

exports.editTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
        return res.status(404).json({ message: "Tâche non trouvée" });
        }
        res.render("editTask", { task });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

