const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Route pour afficher le formulaire d'ajout de tâche
router.get("/new", (req, res) => {
  res.render("newTask"); // Affiche la page du formulaire
});

// Routes CRUD pour les tâches
router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.get("/:id", taskController.getTaskById);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
