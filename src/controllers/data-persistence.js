const { Pool } = require("pg");

const Querys = require("../resources/querys");

/**
 * Controlador Persistencia de Datos
 */
class DataPersistence {

  /**
   * Inicialización con pool para postgres y evento de contención de errores.
   */
  constructor() {
    this.pool = new Pool();

    this.pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
      process.exit(-1);
    });
  }

  /**
   * Guardar estructura de ADN en base de datos.
   * 
   * @param {Array} structure   Matrix de cadenas ADN.
   * @param {boolean} mutant    Valor si es mutante o humano.
   * 
   * @return {Object}          Resultado del guardado con fecha de creación { created }.
   */
  saveDNA = async (structure, mutant) => {
    const { rows } = await this.pool.query(Querys.saveDNA, [ structure, mutant ]);
    return rows[0];
  };

  /**
   * Obtener estadisticas de ADN por conteo de mutaciones.
   * 
   * @return {Array}          Resultados de estadisticas con columnas { mutant, count }.
   */
  getStats = async () => {
    const { rows } = await this.pool.query(Querys.getStats);
    return rows;
  };
}

module.exports = DataPersistence;
