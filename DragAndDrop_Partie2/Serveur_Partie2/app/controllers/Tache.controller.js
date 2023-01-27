const db = require("../models");
const Tache = db.taches;

// Create and Save a new Tache
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tache
  const tache = new Tache({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : 'undefined'
  });

  // Save Tache in the database
  tache
    .save(tache)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tache."
      });
    });
};

// Retrieve all Taches from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Tache.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving taches."
      });
    });
};

// Find a single Tache with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tache.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tache with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tache with id=" + id });
    });
};

// Update a Tache by the id in the request
exports.update = (req, res) => {
  if (req.body.published == 'undefinedd') {
    req.body.published = 'undefined'
  }
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Tache.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        console.log('data', data)
        res.status(404).send({
          message: `Cannot update Tache with id=${id}. Maybe Tache was not found!`
        });
      } else res.send({ message: "Tache was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tache with id=" + id
      });
    });
};

// Delete a Tache with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tache.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tache with id=${id}. Maybe Tache was not found!`
        });
      } else {
        res.send({
          message: "Tache was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tache with id=" + id
      });
    });
};

// Delete all Taches from the database.
exports.deleteAll = (req, res) => {
  Tache.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Taches were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all taches."
      });
    });
};

// Find all Done Taches
exports.findAllDone = (req, res) => {
  Tache.find({ published: 'done' })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving taches."
      });
    });
};
