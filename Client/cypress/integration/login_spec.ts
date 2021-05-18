// Arrange - setup initial app state
// Act - take an action
// Assert - make an assertion

describe("login page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });

  // UI

  it("should see the sentence 'I already have an account'", () => {
    cy.contains("h4", "I already have an account");
  });

  it("should detect the signup tab", () => {
    cy.get("button").within(() => {
      cy.contains("span", "Sign Up");
    });
  });

  // Validation

  it("should require fields", () => {
    cy.get("form").submit();

    cy.contains("p", "This field is required");
  });

  // Redirection

  it("should redirect to forgot password page", () => {
    cy.contains("p", "Forgot Password ?").click();

    cy.location("href").should("eq", "http://localhost:3000/validation/password");
  });
});
