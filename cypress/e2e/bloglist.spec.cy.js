import axios from "axios";

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.visit("http://localhost:3000");

    const username = "testuser";
    const password = "testpassword";
    const name = "Test User";
    // axios
    //   .post("/api/users", {
    //     username,
    //     name,
    //     password,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    cy.request("POST", "http://localhost:3001/api/users", {
      username,
      name,
      password,
    }).then((response) => {
      console.log(response.body);
    });
  });

  it("Login form is shown", () => {
    cy.contains("log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("testuser");
      cy.get("#password").type("testpassword");
      cy.get("#login-button").click();

      cy.contains("Test User logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("testuser");
      cy.get("#password").type("testpssword");
      cy.get("#login-button").click();

      // cy.get("#notification").should("have.css", "color", "red");
      cy.contains("wrong credentials");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      // log in user here
    });

    it("A blog can be created", function () {
      // ...
    });
  });
});
