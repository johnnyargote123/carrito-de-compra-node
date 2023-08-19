import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Set de pruebas de integracion para modulo de sesiones", function () {
  describe("POST /api/sessions/register", function () {
    it("Debe crear un usuario correctamente", async function () {
      const user = {
        first_name: "Maria",
        last_name: "Quevedo",
        email: "mafeque@example.com",
        age: 40,
        password: "securepassword",
        rol: "PREMIUM"
      };

      const response = await requester
        .post("/api/sessions/register")
        .send(user);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("object");
      expect(response.body.status).to.equal("success");
      expect(response.body.message).to.equal("User registered");

      /*       expect(response.body.payload).to.be.an("object")
      expect(response.body.payload.first_name).to.equal(user.first_name)
      expect(response.body.payload.last_name).to.equal(user.last_name)
      expect(response.body.payload.email).to.equal(user.email)
      expect(response.body.payload.age).to.equal(user.age) */
    });
  });

  describe("POST /api/sessions/login", function () {
    it("Debe autenticar un usuario correctamente", async function () {
      
      const credentials = {
        email: "mafeque@example.com",
        password: "securepassword",
      };

      const response = await requester
        .post("/api/sessions/login")
        .send(credentials);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("object");
      expect(response.body.status).to.equal("success");
      expect(response.body.message).to.equal("Logged in");

      expect(response.body.payload).to.be.an("object");
      expect(response.body.payload.first_name).to.equal("Maria");
      expect(response.body.payload.last_name).to.equal("Quevedo");
      expect(response.body.payload.email).to.equal("mafeque@example.com");
      expect(response.body.payload.age).to.equal(40);
    });
  });

  describe("POST /api/sessions/forgot-password", function () {
    it("Debe enviar un correo para restablecer la contraseña", async function () {
      const email = {
        email: "mafeque@example.com",
      };

      const response = await requester
        .post("/api/sessions/forgot-password")
        .send(email);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("object");
      expect(response.body.status).to.equal("success");
      expect(response.body.message).to.equal("Email find");
      expect(response.body.payload).to.equal("mafeque@example.com");
    });
  });

  describe("POST /api/sessions/reset-password/:token", function () {
    it("Debe restablecer la contraseña de un usuario correctamente", async function () {
      const resetData = {
        email: "mafeque@example.com",
        password: "newsecurepassword",
        token: "reset-token-example",
      };

      const response = await requester
        .post(`/api/sessions/reset-password/${resetData.token}`)
        .send(resetData);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("object");
      expect(response.body.status).to.equal("success");
      expect(response.body.message).to.equal("password changed");
    });
  });

   describe("POST /api/sessions/logout", function () {
    it("Debe cerrar la sesión de un usuario correctamente", async function () {
      const credentials = {
        email: "mafeque@example.com",
        password: "newsecurepassword",
      };
      const loginResponse = await requester
        .post("/api/sessions/login")
        .send(credentials);
      const sessionCookie = loginResponse.headers["set-cookie"];
      const response = await requester
        .post("/api/sessions/logout")
        .set("Cookie", sessionCookie);
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("User logged out successfully");
    });
  });

  describe("DELETE /api/sessions/users/:email", function () {
    it("Debe eliminar un usuario correctamente", async function () {
      const email = {
        email: "mafeque@example.com",
      };
      if (!email) {
        this.skip();
      }
      const response = await requester.delete(
        `/api/sessions/users/mafeque@example.com`
      );
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("object");
      expect(response.body.status).to.equal("success");
      expect(response.body.message).to.equal("User deleted");
    });
  });
});
