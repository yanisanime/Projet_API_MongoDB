const mongoose = require('mongoose');

const SubTaskSchema = new mongoose.Schema({
  titre: String,
  statut: { type: String, enum: ['à faire', 'en cours', 'terminée', 'annulée'] },
  echeance: Date
});

const CommentSchema = new mongoose.Schema({
  auteur: { nom: String, prenom: String, email: String },
  date: { type: Date, default: Date.now },
  contenu: String
});

const HistorySchema = new mongoose.Schema({
  champModifie: String,
  ancienneValeur: mongoose.Schema.Types.Mixed,
  nouvelleValeur: mongoose.Schema.Types.Mixed,
  date: { type: Date, default: Date.now }
});

const TaskSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: String,
  dateCreation: { type: Date, default: Date.now },
  echeance: Date,
  statut: { type: String, enum: ['à faire', 'en cours', 'terminée', 'annulée'], default: 'à faire' },
  priorite: { type: String, enum: ['basse', 'moyenne', 'haute', 'critique'], default: 'moyenne' },
  auteur: { nom: String, prenom: String, email: String },
  categorie: { type: String, enum: ['travail', 'personnel', 'autre'], default: 'travail' },
  etiquettes: [String],
  sousTaches: [SubTaskSchema],
  commentaires: [CommentSchema],
  historiqueModifications: [HistorySchema]
});

module.exports = mongoose.model('Task', TaskSchema);