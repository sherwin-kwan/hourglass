// Cypress End-to-End Tests!!

describe("Navigation", () => {

  it("should visit root", () => {
    cy.visit("/");
  });

  it("Tuesday initially should not be active", () => {
    // Tuesday does not start out as active
    cy.get('[data-testid="Tuesday"]')
      .should("not.have.class", "day-list__item--selected");
  });

  it("should navigate to Tuesday", () => {
    // Clicking on Tuesday makes its class active
    cy.get('[data-testid="Tuesday"]')
      .click()
    cy.get('[data-testid="Tuesday"]')
      .should("have.class", "day-list__item--selected");
  });

});
