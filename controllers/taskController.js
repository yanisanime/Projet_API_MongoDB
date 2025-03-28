const Task = require("../model/model");

//Récupérer toutes les tâches
// Récupérer toutes les tâches
exports.getTasks = async (req, res) => {
  try {
    let filter = {};

    // Filtres simples
    if (req.query.statut) {
      filter.statut = req.query.statut;
    }
    if (req.query.priorite) {
      filter.priorite = req.query.priorite;
    }
    if (req.query.categorie) {
      filter.categorie = req.query.categorie;
    }

    // Filtre des étiquettes - correction ici
    if (req.query.etiquette) {
      filter.etiquettes = { $in: [req.query.etiquette] }; // Tableau avec une seule valeur
    }

    // Filtrage sur la date d'échéance - correction ici
    if (req.query.avant || req.query.apres) {
      filter.echeance = {};
      
      if (req.query.avant) {
        filter.echeance.$lt = new Date(req.query.avant);
      }
      if (req.query.apres) {
        filter.echeance.$gt = new Date(req.query.apres);
      }
    }

    // Recherche textuelle - correction ici
    if (req.query.q) {
      filter.$or = [
        { titre: { $regex: req.query.q, $options: "i" } },
        { description: { $regex: req.query.q, $options: "i" } }
      ];
    }

    // Tri des résultats
    let sort = {};
    if (req.query.tri) {
      sort[req.query.tri] = req.query.ordre === 'desc' ? -1 : 1;
    }

    const tasks = await Task.find(filter).sort(sort);
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

    // Transformez les étiquettes si nécessaire
    const etiquettesArray = typeof etiquettes === 'string' 
      ? etiquettes.split(',').map(e => e.trim()) 
      : [];

    // Créez la nouvelle tâche
    const newTask = new Task({
      titre,
      description,
      echeance: echeance ? new Date(echeance) : null,
      statut,
      priorite,
      auteur,
      categorie,
      etiquettes: etiquettesArray,
      sousTaches: sousTaches || [],
      commentaires: commentaires || [],
      dateCreation: new Date()
    });

    await newTask.save();

    console.log("Tâche ajoutée avec succès !");
    res.redirect("/");
  } catch (err) {
    console.error("Erreur lors de l'ajout de la tâche :", err);
    res.status(500).send("Erreur serveur");
  }
};


//Supprimer une tâche
exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id; 
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

      console.log("Tâche Modifier avec succès !");
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

