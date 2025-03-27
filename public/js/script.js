

// Récupérer les tâches depuis l'API et les afficher quand la page est chargé
document.addEventListener("DOMContentLoaded", () => {
  fetchTasks(); // Charger les tâches au début

  // Sélectionner les filtres
  const filters = document.querySelectorAll("#filterForm select");
  console.log("On applique un filtre");

  // Ajouter un écouteur sur chaque filtre
  filters.forEach(filter => {
      filter.addEventListener("change", () => {
          fetchTasks(); // Mettre à jour la liste quand un filtre change
      });
  });
});

// Fonction pour récupérer les tâches filtrées
function fetchTasks() {
  let query = buildQueryParams();
  fetch(`http://localhost:5000/tasks${query}`)
      .then(response => response.json())
      .then(tasks => updateTaskList(tasks))
      .catch(error => console.error("Erreur lors de la récupération des tâches:", error));
}

// Construire l'URL avec les paramètres des filtres
function buildQueryParams() {
  const statut = document.getElementById("statut").value;
  const priorite = document.getElementById("priorite").value;
  const categorie = document.getElementById("categorie").value;

  let params = new URLSearchParams();
  if (statut) params.append("statut", statut);
  if (priorite) params.append("priorite", priorite);
  if (categorie) params.append("categorie", categorie);

  return params.toString() ? `?${params.toString()}` : "";
}


// Met à jour l'affichage des tâches
function updateTaskList(tasks) {
  const taskContainer = document.getElementById("taskContainer");
  taskContainer.innerHTML = "";

  if (tasks.length === 0) {
      taskContainer.innerHTML = "<p id='emptyMessage'>Aucune tâche pour le moment.</p>";
  } else {
      tasks.forEach(task => {
          const taskElement = document.createElement("div");
          taskElement.classList.add("task");
          taskElement.innerHTML = `
              <h3>${task.titre}</h3>
              <p>${task.description}</p>
              <p><strong>Échéance:</strong> ${new Date(task.echeance).toLocaleDateString()}</p>
              <p><strong>Statut:</strong> ${task.statut}</p>
              <button onclick="deleteTask('${task._id}')">Supprimer</button>
          `;
          taskContainer.appendChild(taskElement);
      });
  }
}


// Ajouter une sous-tâche au clic
document.getElementById('ajouterSousTache').addEventListener('click', function () {
  const container = document.getElementById('sousTachesContainer');
  const index = container.children.length;

  const sousTacheDiv = document.createElement('div');
  sousTacheDiv.classList.add('sousTache');

  sousTacheDiv.innerHTML = `
    <label for="sousTacheTitre">Titre:</label>
    <input type="text" name="sousTaches[${index}][titre]">

    <label for="sousTacheStatut">Statut:</label>
    <select name="sousTaches[${index}][statut]">
      <option value="à faire">À faire</option>
      <option value="en cours">En cours</option>
      <option value="terminée">Terminée</option>
      <option value="annulée">Annulée</option>
    </select>

    <label for="sousTacheEcheance">Échéance:</label>
    <input type="date" name="sousTaches[${index}][echeance]">

    <button type="button" class="supprimerSousTache">Supprimer</button>
  `;

  container.appendChild(sousTacheDiv);
});

// Supprimer une sous-tâche au clic sur le bouton "Supprimer"
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('supprimerSousTache')) {
      event.target.parentElement.remove();
  }
});

//Supprimer unee tache
function deleteTask(id) {
  fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" }) // Envoie une requête DELETE à la route du serveur
    .then(response => {
      if (response.ok) {
        console.log(`Tâche ${id} supprimée`);
        document.location.reload(); // Recharge la page pour mettre à jour la liste des tâches
      } else {
        console.error('Erreur lors de la suppression de la tâche');
      }
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
}