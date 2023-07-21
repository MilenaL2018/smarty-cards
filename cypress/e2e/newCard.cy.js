describe("Send Data with form", () => {
  it("Write in inputs", () => {
    cy.visit("/");
    cy.get("#title-input").type(`Hello there!`);
    /* cy.get("#content-input").type(
      "This is a test card. Checking if everything is OK."
    ); */

    cy.get("card-form").submit();
  });
});
