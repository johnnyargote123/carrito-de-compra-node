import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080")

describe("Set de pruebas de integracion para modulo de productos", function () {
  describe("POST /api/sessions/register", function () {
    it("Debe crear un usuario correctamente", async function () {
      const user = {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        age: 30,
        password: "securepassword",
        rol: "PREMIUM",
      };

      const response = await requester
        .post("/api/sessions/register")
        .send(user);

      expect(response.status).to.equal(200)
      expect(response.body).to.be.an("object")
      expect(response.body.status).to.equal("success")
      expect(response.body.message).to.equal("User registered")

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
        email: "john.doe@example.com",
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
      expect(response.body.payload.first_name).to.equal("John");
      expect(response.body.payload.last_name).to.equal("Doe");
      expect(response.body.payload.email).to.equal("john.doe@example.com");
      expect(response.body.payload.age).to.equal(30);
    });
  });

  describe("GET /api/products", function () {
    it("Debe obtener todos los productos correctamente", async function () {

      const response = await requester.get("/api/products");

 
      expect(response.status).to.equal(200)
      expect(response.body).to.be.an("object");
    });
  });

  describe("POST /api/products", function () {
    it("Debe crear un producto correctamente", async function () {
      const credentials = {
        email: "john.doe@example.com",
        password: "securepassword",
      };

  
      const loginResponse = await requester
        .post("/api/sessions/login")
        .send(credentials);

      const sessionCookie = loginResponse.headers["set-cookie"];
      const productData = {
        title: "Test Product",
        description: "This is a test product",
        code: "TEST001",
        price: 100,
        status: true,
        thumbnail: "https://example.com/halo-infinite.jpg",
        stock: 10,
        category: "Test Category",
      };

      const productCreationResponse = await requester
        .post("/api/products/")
        .set("Cookie", sessionCookie)
        .send(productData);
      expect(productCreationResponse.status).to.equal(201);
    });
  });

  describe("GET /api/products/:id", function () {
    it("Debe obtener un producto por ID correctamente", async function () {


      const productId = "64375dfb1ffa0aec83890f24"


      const response = await requester.get(`/api/products/${productId}`)

      expect(response.status).to.equal(200);
      expect(response.body.payload.title).to.equal("Robot Gundam wing figura de acción")
      expect(response.body.payload.description).to.equal(
        "El traje móvil titular pilotado por el protagonista Heero Yuy de la popular serie Gundam Wing se une a las filas de la serie de figuras de acción avanzadas Robot Spirits. Este ambicioso lanzamiento de Robot Spirits contará con un truco de transformación en el modo Bird de Wing Gundam a través de la simple eliminación de partes de manos intercambiables."
      )

    })
  })

   describe("PUT /api/products/:id", function () {
    it("Debe actualizar un producto correctamente", async function () {
      const credentials = {
        email: "admin@Coder@coder.com",
        password: "adminCod3r123",
      };


      const loginResponse = await requester
        .post("/api/sessions/login")
        .send(credentials)

      const sessionCookie = loginResponse.headers["set-cookie"]

      const productId = "64375dfb1ffa0aec83890f24"
 
      const updatedProductData = {
        title: "Robot Gundam wing figura de acción update",
        description:
          "El traje móvil titular pilotado por el protagonista Heero Yuy de la popular serie Gundam Wing se une a las filas de la serie de figuras de acción avanzadas Robot Spirits. Este ambicioso lanzamiento de Robot Spirits contará con un truco de transformación en el modo Bird de Wing Gundam a través de la simple eliminación de partes de manos intercambiables. (update)",
        price: 150000,
        stock: 20,
      }

    
      const updateResponse = await requester
        .put(`/api/products/${productId}`).set("Cookie", sessionCookie)
        .send(updatedProductData);

      expect(updateResponse.status).to.equal(200)
      expect(updateResponse.body.payload.product.title).to.equal("Robot Gundam wing figura de acción update")
      expect(updateResponse.body.payload.product.description).to.equal("El traje móvil titular pilotado por el protagonista Heero Yuy de la popular serie Gundam Wing se une a las filas de la serie de figuras de acción avanzadas Robot Spirits. Este ambicioso lanzamiento de Robot Spirits contará con un truco de transformación en el modo Bird de Wing Gundam a través de la simple eliminación de partes de manos intercambiables. (update)");
    })
  })

  describe("DELETE /api/products/:id", function () {
    it("Debe eliminar un producto correctamente (Para esta prueba es necesario buscar el id y agregarlo manualmente en la prueba)", async function () {

      const credentials = {
        email: "admin@Coder@coder.com",
        password: "adminCod3r123",
      };


      const loginResponse = await requester
        .post("/api/sessions/login")
        .send(credentials)

      const sessionCookie = loginResponse.headers["set-cookie"]


      const productData = {
        title: "Test Product 2",
        description: "This is a test product 2",
        code: "TEST002",
        price: 50,
        status: true,
        thumbnail: "https://example.com/halo-infinite.jpg",
        stock: 20,
        category: "Test Category",
      };

      const createResponse = await requester.post("/api/products").set("Cookie", sessionCookie).send(productData);
    

productId = '64ca038cbda6d404499f62d6'
      const deleteResponse = await requester.delete(`/api/products/${productId}`).set("Cookie", sessionCookie);
 
      expect(deleteResponse.status).to.equal(200)
      expect(deleteResponse.title).to.equal("Test Product 2")
      expect(deleteResponse.description).to.equal("This is a test product 2")
   
    });
  }); 
})


