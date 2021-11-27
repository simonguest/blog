// navigation_spec.js created with Cypress

describe("Page Load Tests", () => {
  it("displays the blog header", () => {
    cy.visit("http://localhost:8000?test=true");
    cy.contains("Simon Guest");
    cy.contains("Articles");
    cy.contains("Presentations");
    cy.contains("Projects");
    cy.contains("About");
  });
});

describe("Article Navigation Tests", () => {
  it("navigates from summary to article and back again", () => {
    cy.visit("http://localhost:8000?test=true");
    cy.contains("Test Article 1");
    cy.get(":nth-child(1) > .summary-title").click();
    cy.contains("The quick brown fox jumps over the lazy dog.");
    cy.get("#back-button").click();
    cy.contains("Test Article 2");
  });

  it("displays the about page", () => {
    cy.visit("http://localhost:8000?test=true");
    cy.get('[data-route="/about"]').click()
    cy.contains('CTO')
  });
});
