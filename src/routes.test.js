const supertest = require("supertest");
const fs = require("fs-extra");

const app = require("./server");
const request = supertest(app);
const DataPersistence = require("./controllers/data-persistence");

beforeAll(async () => {
  const data = new DataPersistence();
  const querys = fs.readFileSync("./src/resources/test.sql", "utf8").split(";");
  for (const i in querys) {
    await data.pool.query(querys[i]);
  }
  await data.pool.end();
});

describe("API Routes", () => {
  it("Stats service case empty", async done => {
    const res = await request.get("/api/v1/stats");

    expect(res.statusCode).toEqual(200);
    expect(res.body.ratio).toEqual(0);
    
    done();
  });

  it("Mutant service with positive case", async done => {
    var obj = { dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"] };
    const res = await request.post("/api/v1/mutant").send(obj);

    expect(res.statusCode).toEqual(200);
    
    done();
  });

  it("Mutant service with human case", async done => {
    var obj = { dna: ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"] };
    const res = await request.post("/api/v1/mutant").send(obj);
    
    expect(res.statusCode).toEqual(403);
    
    done();
  });

  it("Mutant service with undefined nucleotide case", async done => {
    var obj = { dna: ["ATGBGA", "CABGXC", "CBA GT", "BCAAGG", "TCCCCA", "TCACGG"] };
    const res = await request.post("/api/v1/mutant").send(obj);
    
    expect(res.statusCode).toEqual(400);
    
    done();
  });

  it("Mutant service with malformed DNA case", async done => {
    var obj = { dna: ["ATGCGA", "CAGTGC", "TTATGTT", "CCCCTA", "TCACTG"] };
    const res = await request.post("/api/v1/mutant").send(obj);
    
    expect(res.statusCode).toEqual(400);
    
    done();
  });

  it("Mutant service with not body case", async done => {
    const res = await request.post("/api/v1/mutant").send("{ asdf: 15 5 a }");
    
    expect(res.statusCode).toEqual(400);
    
    done();
  });

  it("Stats service case", async done => {
    const res = await request.get("/api/v1/stats");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("count_mutant_dna");
    expect(res.body).toHaveProperty("count_human_dna");
    expect(res.body).toHaveProperty("ratio");
    
    done();
  });
});
