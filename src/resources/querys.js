/**
 *  Querys para uso con el controlador de persistencia.
 */
const Querys = {
    saveDNA: "INSERT INTO dnas(structure, mutant) VALUES ($1, $2) RETURNING created;",
    getStats: "SELECT mutant, COUNT(mutant) FROM public.dnas GROUP BY mutant ORDER BY mutant;",
}

module.exports = Querys;