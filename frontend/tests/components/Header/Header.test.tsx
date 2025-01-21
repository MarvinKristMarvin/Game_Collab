import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // Wrap in Router for routing tests
import Header from "../../../src/components/Header/Header";
import "@testing-library/jest-dom";

// Test suite for Header component
describe("Header Component", () => {
  // Wrap component in Router since we are using NavLink
  const renderHeader = () =>
    render(
      <Router>
        <Header />
      </Router>
    );

  it("renders the header", () => {
    renderHeader();
    // Check if the header component is rendered
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
  });

  it("contains the correct navigation links", () => {
    renderHeader();
    // Get by role "link" (Navlink or a) with a name (text or aria-label) with the specified regex, case insensitive
    const searchLink = screen.getByRole("link", { name: /browse profiles/i });
    expect(searchLink).toHaveAttribute("href", "/search");
    const logoLink = screen.getByRole("link", { name: /go to homepage/i });
    expect(logoLink).toHaveAttribute("href", "/");
    const profileLink = screen.getByRole("link", {
      name: /log in and modify your profile/i,
    });
    expect(profileLink).toHaveAttribute("href", "/profile");
  });

  it("renders the images and has an alt text", () => {
    renderHeader();
    const logoImage = screen.getByAltText(/game hearts logo/i);
    expect(logoImage).toBeInTheDocument();
    const searchImage = screen.getByAltText(/search icon/i);
    expect(searchImage).toBeInTheDocument();
    const profileImage = screen.getByAltText(/profile icon/i);
    expect(profileImage).toBeInTheDocument();
  });

  it("has aria labels for each link", () => {
    renderHeader();
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("aria-label");
    });
  });
});
