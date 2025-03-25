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
  const { titre, description, echeance, statut, priorite } = req.body;
  try {
    const newTask = new Task({ titre, description, echeance, statut, priorite });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
