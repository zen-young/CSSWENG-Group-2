import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import Footer from "../components/footer/Footer";


describe("Footer", () => {
  it('when "back to top" in footer is clicked, page scrolls up', () => {
    render(<Footer />);

    const scrollIntoViewMock = jest.fn();
    HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    
    //simulates clicking on "Back to top"
    fireEvent.click(screen.getByText("Back to Top"));

    expect(scrollIntoViewMock).toBeCalledWith({ behavior: 'smooth' });
    

  });

  
});
