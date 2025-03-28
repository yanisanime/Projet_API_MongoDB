document.addEventListener('DOMContentLoaded', function() {
    // Gestion des sous-tâches
    const sousTachesContainer = document.getElementById('sousTachesContainer');
    const ajouterSousTacheBtn = document.getElementById('ajouterSousTache');
    
    if (ajouterSousTacheBtn) {
        ajouterSousTacheBtn.addEventListener('click', function() {
            const index = sousTachesContainer.children.length;
            
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
            
            sousTachesContainer.appendChild(sousTacheDiv);
        });
    }

    // Gestion des commentaires
    const commentairesContainer = document.getElementById('commentairesContainer');
    const ajouterCommentaireBtn = document.getElementById('ajouterCommentaire');
    
    if (ajouterCommentaireBtn) {
        ajouterCommentaireBtn.addEventListener('click', function() {
            const index = commentairesContainer.children.length;
            const nom = document.getElementById('nom').value;
            const prenom = document.getElementById('prenom').value;
            const email = document.getElementById('email').value;
            
            const commentaireDiv = document.createElement('div');
            commentaireDiv.classList.add('commentaire');
            
            commentaireDiv.innerHTML = `
                <label>Commentaire:</label>
                <textarea name="commentaires[${index}][contenu]" required></textarea>
                
                <input type="hidden" name="commentaires[${index}][auteur][nom]" value="${nom}">
                <input type="hidden" name="commentaires[${index}][auteur][prenom]" value="${prenom}">
                <input type="hidden" name="commentaires[${index}][auteur][email]" value="${email}">
                
                <button type="button" class="supprimerCommentaire">Supprimer</button>
            `;
            
            commentairesContainer.appendChild(commentaireDiv);
        });
    }

    // Gestion de la suppression (déléguée)
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('supprimerSousTache')) {
            event.target.closest('.sousTache').remove();
            reindexFields('sousTaches');
        }
        
        if (event.target.classList.contains('supprimerCommentaire')) {
            event.target.closest('.commentaire').remove();
            reindexFields('commentaires');
        }
    });

    // Réindexer les champs après suppression
    function reindexFields(prefix) {
        const container = document.getElementById(`${prefix}Container`);
        const elements = container.getElementsByClassName(prefix === 'sousTaches' ? 'sousTache' : 'commentaire');
        
        Array.from(elements).forEach((element, index) => {
            // Mise à jour des noms des champs
            const inputs = element.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                const name = input.name.replace(new RegExp(`${prefix}\\[\\d+\\]`), `${prefix}[${index}]`);
                input.name = name;
            });
        });
    }
});