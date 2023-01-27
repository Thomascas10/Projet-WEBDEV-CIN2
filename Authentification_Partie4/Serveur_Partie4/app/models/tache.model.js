const mongoose = require("mongoose");

const Taches = mongoose.model(
  "Taches",
  new mongoose.Schema({
    Attribut: String,
    nom: String,
  })
);

module.exports = Taches;
