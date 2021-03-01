const express = require("express");
const router = express.Router();

const DataPersistence = require("../controllers/data-persistence");
const { isMutant } = require("../logic/dna");

const data = new DataPersistence();

/**
 * Servicio POST para mutante.
 */
router.post("/mutant", async (req, res, next) => {
  try {
    const { dna } = req.body;

    var mutant = isMutant(dna);
    if (mutant) {
      var obj = await data.saveDNA(dna, mutant);
      return res.send({ message: "Mutant DNA", saved: obj.created });
    } else if (mutant === false) {
      var obj = await data.saveDNA(dna, mutant);
      return res.status(403).send({
        message: "Human DNA",
        saved: obj.created,
      });
    } else if (mutant === null) {
      return res.status(400).send({
        message: "DNA with undefined nucleotide",
      });
    } else {
      return res.status(400).send({
        message: "Malformed DNA",
      });
    }
  } catch (e) {
    next(e);
  }
});

/**
 * Servicio GET para estadisticas mutantes.
 */
router.get("/stats", async (req, res) => {
  var list = await data.getStats();

  var mutantCount = 0;
  var humanCount = 0;

  list.forEach(i => {
    if (i.mutant) mutantCount = Number(i.count);
    else humanCount = Number(i.count);
  });

  var response = {
    count_mutant_dna: mutantCount,
    count_human_dna: humanCount,
    ratio: mutantCount && humanCount ? mutantCount / humanCount : 0,
  };

  return res.send(response);
});

module.exports = router;
