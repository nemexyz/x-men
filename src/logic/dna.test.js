const { isMutant } = require("./dna");

describe("DNA complexity", () => {
  test("Mutant DNA", () => {
    [
      ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
      ["TCACTG", "ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA"],
    ].forEach((dna) => {
      expect(isMutant(dna)).toBeTruthy();
    });
  });

  test("Human DNA", () => {
    [
      ["AT", "CA"],
      ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"],
    ].forEach((dna) => {
      expect(isMutant(dna)).toBe(false);
    });
  });

  test("DNA with undefined nucleotide", () => {
    [
      ["ATGBGA", "CABGXC", "CBATGT", "BCAAGG", "TCCCCA", "TCACGG"],
      ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCY", "TCACTG"],
      ["atGCGA", "CAGTGC", "TTATTT", "AGAcGG", "GCGTCA", "TCACTG"],
      ["ATGBGA", "CABGXC", "CBA GT", "BCAAGG", "TCCCCA", "TCACGG"],
    ].forEach((dna) => {
      expect(isMutant(dna)).toBeNull();
    });
  });

  test("Malformed DNA", () => {
    [
      ["ATGBGA", null, "CBATGT", "BCAAGG", "XCCCCA", "TCACGG"],
      ["ATGCGA", "CAGTGC", "TTATGTT", "CCCCTA", "TCACTG"],
      ["ATGCGA", ["CCCCTA"], "TTATGT", "CCCCTA", "TCACTG"],
      [""],
      "TTATGTT",
      null,
      undefined,
    ].forEach((dna) => {
      expect(isMutant(dna)).toBeUndefined();
    });
  });
});
