const url = "http://localhost:5173";

describe("Home Page", () => {
  // Verify the title and meta description (they are created dynamically in the Home.tsx page)
  it("should have the correct title and meta tags", () => {
    cy.visit(url);
    cy.title().should("exist");
    cy.get('meta[name="description"]').should("have.attr", "content");
    cy.get('meta[property="og:title"]').should("have.attr", "content");
    cy.get('meta[property="og:description"]').should("have.attr", "content");
  });

  // Verify if the homepage message is displayed correctly
  it("should display the homepage welcome message", () => {
    cy.visit(url);
    cy.get(".homeMessage").should("be.visible").and("not.have.text", ""); // Ensure the element contains some text (not empty)
  });

  // Verify if the link to the "Profile" page in the homepage message is working properly
  it('should navigate to the "Create Profile" page when clicked', () => {
    cy.visit(url);
    cy.get("a").contains("Creating your profile").click();
    cy.url().should("include", "/profile");
  });

  // Verify if the link to the "Search" page in the homepage message is working properly
  it('should navigate to the "Browse Profiles" page when clicked', () => {
    cy.visit(url);
    cy.get("a").contains("explore other profiles").click();
    cy.url().should("include", "/search");
  });

  // Verify if the Footer is rendered correctly
  it("should render the footer component", () => {
    cy.visit(url);
    cy.get("footer").should("be.visible");
  });
});
