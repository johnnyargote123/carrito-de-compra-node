import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Set de pruebas de integracion para modulo de carritos", function () {
  describe("GET /api/carts", function () {
    it("Debe obtener todos los carritos", async function () {
      const response = await requester.get("/api/carts");
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.greaterThan(0)
    });
  });

  describe("GET /api/carts/:id", function () {
    it("Debe obtener un carrito por su ID", async function () {
      const cartId = "644582bf3d9bdc4e85d301b3";

      const response = await requester.get(`/api/carts/${cartId}`);
      expect(response.status).to.equal(200)
      expect(response.body).to.be.an("object")
      expect(response.body._id).to.equal(cartId)
    });
  });

  describe("POST /api/carts", function () {
    it("Debe crear un nuevo carrito", async function () {
      const credentials = {
        email: "perez@hotmail.com",
        password: "perez",
      };

      const loginResponse = await requester
        .post("/api/sessions/login")
        .send(credentials);

      const sessionCookie = loginResponse.headers["set-cookie"];

     
      const response = await requester.post("/api/carts").set("Cookie", sessionCookie)
      expect(response.status).to.equal(200)
      expect(response.body).to.be.an("object")
    });
  });

});