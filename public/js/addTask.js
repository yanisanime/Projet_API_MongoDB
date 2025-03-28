

document.addEventListener('DOMContentLoaded', function() {
    // Ajouter une sous-tâche
    const ajouterSousTacheBtn = document.getElementById('ajouterSousTache');
    if (ajouterSousTacheBtn) {
      ajouterSousTacheBtn.addEventListener('click', function() {
        const container = document.getElementById('sousTachesContainer');
        const index = container.children.length;
  
        const sousTacheDiv = document.createElement('div');
        sousTacheDiv.classList.add('sousTache');
  
        sousTacheDiv.innerHTML = `
          <label>Titre:</label>
          <input type="text" name="sousTaches[${index}][titre]" required>
  
          <label>Statut:</label>
          <select name="sousTaches[${index}][statut]">
            <option value="à faire">À faire</option>
            <option value="en cours">En cours</option>
            <option value="terminée">Terminée</option>
            <option value="annulée">Annulée</option>
          </select>
  
          <label>Échéance:</label>
          <input type="date" name="sousTaches[${index}][echeance]">
  
          <button type="button" class="supprimerSousTache">Supprimer</button>
        `;
  
        container.appendChild(sousTacheDiv);
      });
    }
  
    // Ajouter un commentaire
    const ajouterCommentaireBtn = document.getElementById('ajouterCommentaire');
    if (ajouterCommentaireBtn) {
      ajouterCommentaireBtn.addEventListener('click', function() {
        const container = document.getElementById('commentairesContainer');
        const index = container.children.length;
  
        const commentaireDiv = document.createElement('div');
        commentaireDiv.classList.add('commentaire');
  
        commentaireDiv.innerHTML = `
        <label>Commentaire:</label>
        <textarea name="commentaires[${index}][contenu]" required></textarea>
        
        <input type="hidden" name="commentaires[${index}][auteur][nom]" value="${document.getElementById('nom').value}">
        <input type="hidden" name="commentaires[${index}][auteur][prenom]" value="${document.getElementById('prenom').value}">
        <input type="hidden" name="commentaires[${index}][auteur][email]" value="${document.getElementById('email').value}">
      
        <button type="button" class="supprimerCommentaire">Supprimer</button>
      `;
        
        container.appendChild(commentaireDiv);
      });
    }
  
    // Gestion de la suppression (déléguée)
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('supprimerSousTache')) {
        event.target.closest('.sousTache').remove();
      }
      
      if (event.target.classList.contains('supprimerCommentaire')) {
        event.target.closest('.commentaire').remove();
      }
    });
  });