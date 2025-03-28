
document.getElementById("filterForm").addEventListener("submit", function(e) {
  e.preventDefault(); // Empêche le rechargement de la page
  fetchTasks();
});

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
  console.log("Requête envoyée : ", `http://localhost:5000/tasks${query}`);

  fetch(`http://localhost:5000/tasks${query}`)
      .then(response => response.json())
      .then(tasks => updateTaskList(tasks))
      .catch(error => console.error("Erreur lors de la récupération des tâches:", error));
}

// Construire l'URL avec les paramètres des filtres
function buildQueryParams() 
{
  const form = document.getElementById("filterForm");
  const formData = new FormData(form);
  const params = new URLSearchParams();

  // Ajoute seulement les paramètres qui ont une valeur
  for (const [key, value] of formData.entries()) {
    if (value) {
      params.append(key, value);
    }
  }

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
              <p>${task.description ? task.description : "Aucune description."}</p>
              <p><strong>Échéance:</strong> ${new Date(task.echeance).toLocaleDateString()}</p>
              <p><strong>Statut:</strong> ${task.statut}</p>
              <button onclick="deleteTask('${task._id}')" class="BtnDelette">Supprimer</button>
              <button onclick="location.href='/tasks/${task._id}'" class="BtnDetail">Détails</button>
              <button onclick="location.href='/tasks/edit/${task._id}'" class="BtnModifier">Modifier</button>
          `;
          taskContainer.appendChild(taskElement);
      });
  }
}



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