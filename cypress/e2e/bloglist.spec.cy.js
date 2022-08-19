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

    it.only("fails with wrong credentials", function () {
      cy.get("#username").type("testuser");
      cy.get("#password").type("testpssword");
      cy.get("#login-button").click();

      cy.get(".notification").should("have.css", "color", "rgb(255, 0, 0)");
      cy.contains("wrong credentials");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("testuser");
      cy.get("#password").type("testpassword");
      cy.get("#login-button").click();
      cy.contains("create new blog").click();
      cy.get("#title").type("sudesh");
      cy.get("#author").type("sudesh");
      cy.get("#url").type("sudesh.com");
      cy.get("#create").click();
    });

    it("A blog can be created", () => {
      cy.contains("create new blog").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("#create").click();
      cy.contains("test title");
    });

    it("user can like a blog", () => {
      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains("1");
    });

    it("user can delete a blog", () => {
      cy.contains("create new blog").click();
      cy.get("#title").type("something");
      cy.get("#author").type("somethingmore");
      cy.get("#url").type("someting.com");
      cy.get("#create").click();

      cy.contains("view").click();
      cy.contains("remove").click();
      cy.contains("something").should("not.exist");
    });
  });
});
