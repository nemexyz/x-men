/**
 * Lógica de procesamiento ADN.
 */

const LENGTH = process.env.DNA_LENGTH;
const NUCLEOTIDES = process.env.DNA_NUCLEOTIDES;

/**
 * Función para obtener lineas horizontales en la matriz de ADN.
 * 
 * @param {Array} matrix  Matriz de datos.
 * 
 * @return {Array}        Vector con lineas de ADN.
 */
const getHorizontalLines = (matrix) => matrix.map((i) => i.join(""));

/**
 * Función para obtener lineas verticales en la matriz de ADN.
 * 
 * @param {Array} matrix  Matriz de datos.
 * 
 * @return {Array}        Vector con lineas de ADN.
 */
const getVerticalLines = (matrix) =>
  matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]).join(""));

/**
 * Función para obtener lineas diagonales en la matriz de ADN.
 * 
 * @param {Array} array           Matriz de datos.
 * @param {boolean} bottomToTop   Sentido de la diagonal.
 * 
 * @return {Array}                Vector con lineas de ADN.
 */
const getDiagonalLines = (array, bottomToTop) => {
  var Ylength = array.length;
  var Xlength = array[0].length;
  var maxLength = Math.max(Xlength, Ylength);
  var temp;
  var returnArray = [];
  for (var k = 0; k <= 2 * (maxLength - 1); ++k) {
    temp = [];
    for (var y = Ylength - 1; y >= 0; --y) {
      var x = k - (bottomToTop ? Ylength - y : y);
      if (x >= 0 && x < Xlength) {
        temp.push(array[y][x]);
      }
    }
    if (temp.length > 0) {
      returnArray.push(temp.join(""));
    }
  }
  return returnArray;
};

/**
 * Función para extraer las secuencias de letras en una linea de ADN.
 * 
 * @param {string} input  Linea de ADN.
 * 
 * @return {Array}        Secuencias de ADN.
 */
const getSequence = (input) => {
  return (array = input.match(/(\w)\1+/g) || []);
};

/**
 * Función para verificar si es una matriz NxN o cruadrada.
 * 
 * @param {Array} arr   Matriz.
 * 
 * @return {boolean}    Valor si es o no cuadrado.
 */
const isSquare = (arr) => {
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    if (arr[i].length != len) {
      return false;
    }
  }
  return true;
};

/**
 * Función para calcular si es mutante o no mediante una matriz de secuencias de ADN.
 *
 * @param {Array} array   Matriz de ADN.
 * 
 * @return {Any}          Si el resultado es acorde al formato se devolvera boolean.
 */
function isMutant(array) {
  try {
    if (!isSquare(array)) return undefined;
    if (!array.every((i) => !RegExp("[^" + NUCLEOTIDES + "]", "g").test(i)))
      return null;

    let matrix = array.map((i) => Array.from(i));

    var lines = [];
    lines = lines.concat(getHorizontalLines(matrix));
    lines = lines.concat(getVerticalLines(matrix));
    lines = lines.concat(
      getDiagonalLines(matrix).filter((i) => i.length >= LENGTH)
    );
    lines = lines.concat(
      getDiagonalLines(matrix, true).filter((i) => i.length >= LENGTH)
    );

    var sequences = [];
    lines.forEach((s) => {
      sequences = sequences.concat(
        getSequence(s).filter((i) => i.length >= LENGTH)
      );
    });

    return sequences.length > 0;
  } catch (e) {
    return undefined;
  }
}

module.exports = { isMutant };
