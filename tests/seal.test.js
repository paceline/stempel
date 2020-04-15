const request = require("supertest");
const fs = require('fs');
const app = require("../server.js");
var mongoose = require('mongoose');
let server;

beforeAll(async (done) => {
  await mongoose.connect('mongodb://localhost/stempel_test', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
  server = app.listen(4000, () => {
    global.agent = request.agent(server);
    done();
  });
});

afterAll(async () => {
  await server.close();
  await mongoose.connection.db.dropCollection('seals');
  await mongoose.disconnect();
});

describe('Generate and return seal', () => {

  it("should create a new seal", async () => {
    const res = await request(app)
      .post('/api/seal')
      .send({
        company: "RoutIT GmbH",
        address: "Prinzenallee 7\n40459 Düsseldorf",
        phone: "0211 41 872 080"
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('_id')
  });

  it("should throw a bad request when skipping params", async () => {
    const res = await request(app)
      .post('/api/seal')
      .send({
        address: "Prinzenallee 7\n40459 Düsseldorf",
        phone: "0211 41 872 080"
      })
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('error')
  });

  it("should throw a bad request on blank params", async () => {
    const res = await request(app)
      .post('/api/seal')
      .send({
        company: "",
        address: "Prinzenallee 7\n40459 Düsseldorf",
        phone: "0211 41 872 080"
      })
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('error')
  });

})
