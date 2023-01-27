module.exports = app => {
  const taches = require("../controllers/tache.controller.js");

  var router = require("express").Router();

  // Create a new Tache
  router.post("/", taches.create);

  // Retrieve all Taches
  router.get("/", taches.findAll);

  // Retrieve all Done Taches
  router.get("/done", taches.findAllDone);

  // Retrieve a single Tache with id
  router.get("/:id", taches.findOne);

  // Update a Tache with id
  router.put("/:id", taches.update);

  // Delete a Tache with id
  router.delete("/:id", taches.delete);

  // Create a new Tache
  router.delete("/", taches.deleteAll);

  app.use("/api/taches", router);
};
