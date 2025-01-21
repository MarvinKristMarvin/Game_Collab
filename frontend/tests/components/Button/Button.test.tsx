import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../../src/components/Button/Button";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  // Mock a function which can be used in tests, used to verify if it is called and which arguments have been passed etc
  const mockFunc = jest.fn();

  it("renders correctly with text", () => {
    // Render the button in a virtual DOM
    render(<Button text="Click Me" func={mockFunc} color="primary" />);
    // Find an element by his text (case insensitive)
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the function when clicked", () => {
    render(<Button text="Click Me" func={mockFunc} color="primary" />);
    // Get Button by his role "button" (because Button returns a "button" element)
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it("applies the correct color class", () => {
    render(<Button text="Click Me" func={mockFunc} color="primary" />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("primary");
  });

  it("uses the default button type", () => {
    render(<Button text="Click Me" func={mockFunc} color="primary" />);
    const buttonElement = screen.getByRole("button");
    // Expect the button to have the attribute type="button"
    expect(buttonElement).toHaveAttribute("type", "button");
  });

  it("accepts a custom button type", () => {
    render(<Button text="Submit" func={mockFunc} buttonType="submit" />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveAttribute("type", "submit");
  });
});
