

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

// Ajouter une tâche
document.getElementById("addTaskBtn").addEventListener("click", () => {
    const titre = prompt("Titre de la tâche :");
    const description = prompt("Description de la tâche :");
    const echeance = prompt("Date d'échéance (YYYY-MM-DD) :");

    if (titre && echeance) {
        fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titre, description, echeance, statut: "à faire" })
        })
        .then(() => fetchTasks()) // Recharger la liste après ajout
        .catch(error => console.error("Erreur lors de l'ajout:", error));
    }
});
