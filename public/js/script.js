

// Récupérer les tâches depuis l'API et les afficher quand la page est chargé
document.addEventListener("DOMContentLoaded", () => {
    fetchTasks();
});

// Fonction pour récupérer les tâches depuis l'API et les Afficher
function fetchTasks() {
    fetch("http://localhost:5000/tasks")
        .then(response => response.json())
        .then(tasks => {
            const taskContainer = document.getElementById("taskContainer");
            taskContainer.innerHTML = "";

            // Si aucune tâche n'est trouvée, afficher un message
            if (tasks.length === 0) 
            {
                taskContainer.innerHTML = "<p id='emptyMessage'>Aucune tâche pour le moment.</p>";
            } 
            // Sinon, afficher les tâches
            else 
            {
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
        })
        .catch(error => console.error("Erreur lors de la récupération des tâches:", error));
}

// Fonction pour supprimer une tâche
function deleteTask(id) {
    fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" })
        .then(() => fetchTasks()) // Recharger la liste après suppression
        .catch(error => console.error("Erreur lors de la suppression:", error));
}




// Ajouter une sous tâche

document.getElementById('ajouterSousTache').addEventListener('click', function () {
    const container = document.getElementById('sousTachesContainer');
    const index = container.children.length;

    const sousTacheDiv = document.createElement('div');
    sousTacheDiv.classList.add('sousTache');

    sousTacheDiv.innerHTML = `
      <label for="sousTacheTitre">Titre:</label>
      <input type="text" name="sousTaches[${index}][titre]" required>

      <label for="sousTacheStatut">Statut:</label>
      <select name="sousTaches[${index}][statut]">
        <option value="à faire">À faire</option>
        <option value="en cours">En cours</option>
        <option value="terminée">Terminée</option>
        <option value="annulée">Annulée</option>
      </select>

      <label for="sousTacheEcheance">Échéance:</label>
      <input type="date" name="sousTaches[${index}][echeance]">
    `;

    container.appendChild(sousTacheDiv);
  });


  function deleteTask(id) {
    fetch(`/tasks/${id}`, { method: "DELETE" }) // Envoie une requête DELETE à la route du serveur
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
  