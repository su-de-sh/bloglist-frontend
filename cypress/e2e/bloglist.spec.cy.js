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

    it.only("the blogs are ordered according to likes ", () => {
      cy.contains("create new blog").click();
      cy.get("#title").type("something");
      cy.get("#author").type("somethingmore");
      cy.get("#url").type("someting.com");
      cy.get("#create").click();

      // adding exact text to cy.contains() to make sure that it wont match the text of the notification
      // cy.contains("something somethingmore").contains("view").click();
      // cy.get(".blog").contains("something").contains("view").click();
      cy.get(".blog").should("contain", "something");
      cy.get(".blog").contains("something").contains("view").click();
      cy.get("#likeButton").click();
      cy.get("#like").should("contain", "1");
      cy.get("#likeButton").click();
      cy.get("#like").should("contain", "2");
      cy.get("#likeButton").click();
      cy.get("#like").should("contain", "3");
      cy.get("#likeButton").click();
      cy.get("#like").should("contain", "4");

      cy.contains("hide").click();

      cy.contains("create new blog").click();
      cy.get("#title").type("something1");
      cy.get("#author").type("somethingmore1");
      cy.get("#url").type("someting1.com");
      cy.get("#create").click();
      cy.contains("something1 somethingmore1").contains("view").click();
      cy.get("#likeButton").click();
      cy.get("#like").should("contain", "1");
      cy.get("#likeButton").click();
      cy.get("#like").should("contain", "2");
      cy.get("#likeButton").click();
      cy.get("#like").should("contain", "3");

      cy.get(".blog").eq(0).should("contain", "something");
      cy.get(".blog").eq(1).should("contain", "something1");
    });
  });
});
