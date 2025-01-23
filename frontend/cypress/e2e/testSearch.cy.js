const url = "http://localhost:5173/search";

describe("Search Page", () => {
  // Verify the title and meta description (created dynamically with Helmet in the Search.tsx page)
  it("should have the correct title and meta tags when filtering", () => {
    cy.visit(url);
    cy.title().should("exist");
    cy.get('meta[name="description"]').should("have.attr", "content");
    cy.get('meta[property="og:title"]').should("have.attr", "content");
    cy.get('meta[property="og:description"]').should("have.attr", "content");
    cy.get('link[rel="canonical"]')
      .should("have.attr", "href")
      .and("include", "/search");
  });

  // Verify initial profiles are loaded on first render
  it("should display profiles on initial load", () => {
    cy.visit(url);
    cy.get(".profileInformations .profile")
      .should("exist")
      .and("have.length.greaterThan", 0);
  });

  // Verify toggling filtering state
  it("should toggle filtering mode", () => {
    cy.visit(url);
    // Check if in the browsing state of the page
    cy.get('[aria-label="browse profiles page"]').should("exist");
    // Click on the filter button to change state
    cy.get("button").contains("Filter").click();
    // Check if in the filtering state of the page
    cy.get('[aria-label="filter profiles page"]').should("exist");
  });

  // Verify filtering functionality
  it("should filter profiles based on selected criteria", () => {
    cy.visit(url);
    cy.get("button").contains("Filter").click();
    // Enter filter criteria
    cy.get("#minAge").clear().type("15");
    cy.get("#maxAge").clear().type("80");
    cy.get("#code").check();
    cy.get("#english\\.gb").check();
    // Apply filters and change state to browse profiles
    cy.get("button").contains("Search").click();
    // Assert results
    cy.get(".profileInformations .profile")
      .should("exist")
      .and("have.length.greaterThan", 0);
    cy.get(".profile").each((profile) => {
      cy.wrap(profile)
        .find('.languages img[alt="English"]') // Find the <img> with alt="English"
        .should("exist");
      cy.wrap(profile).find(".jobs").should("contain.text", "Code");
    });
  });

  // Verify no profiles message when no match
  it("should display a no profiles message when no results match", () => {
    cy.visit(url);
    cy.get("button").contains("Filter").click();
    // Apply extreme filters to get no results
    cy.get("#minAge").clear().type("80");
    cy.get("#maxAge").clear().type("80");
    cy.get("button").contains("Search").click();
    // Assert no profiles message is displayed
    cy.get('[aria-label="no profiles found message"]')
      .should("be.visible")
      .and("contain.text", "No profiles found");
  });

  // Verify profile card structure
  it("should display all profile card elements", () => {
    cy.visit(url);
    cy.get(".profileInformations .profile")
      .first()
      .within(() => {
        cy.get(".basicInformations").should("exist");
        cy.get(".jobs").should("exist");
        cy.get(".remunerations").should("exist");
        cy.get(".description").should("exist");
        cy.get(".portfolio").should("exist");
        cy.get(".mail").should("exist");
      });
  });
});
