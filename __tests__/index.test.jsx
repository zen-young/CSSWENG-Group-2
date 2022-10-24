import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";


//mock for ResizeObserver, for fireEvent to work on Mantine React components
window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));


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


describe("NavBar", () => {

  beforeEach(() => {
  

    
    
  });

  const categories = [
    {
      title: "Business & Marketing",
      items: [
        "Placeholder 1",
        "Placeholder 2",
        "Placeholder 3",
        "Placeholder 4",
        "Placeholder 5",
      ],
    },
    {
      title: "Events",
      items: [
        "Placeholder 6",
        "Placeholder 7",
        "Placeholder 8",
        "Placeholder 9",
        "Placeholder 10",
        "Placeholder 11",
        "Placeholder 12",
      ],
    },
    {
      title: "Office & Stationery",
      items: ["Placeholder 13", "Placeholder 14", "Placeholder 15"],
    },
  ];
  
  const products = [
    "Gift Tags",
    "Gift Wrapping Paper",
    "Notecards",
    "Notecards Again",
    "Some Random Stuff 1",
    "Some Random Stuff 2",
    "Some Random Stuff 3",
    "Some Random Stuff 4",
    "Photocards",
    "Sticker and Labels",
  ];


    it('When user enters product name in searchbar, existing products should appear in autocomplete', () => {

    render(<NavBar />);
    
    const searchBar = screen.getByPlaceholderText('Search Products')


    

    for(var i = 0; i < products.length; i++) {

      //searching by typing on the search bar should show user correct existing suggestion
      fireEvent.change(searchBar, {target: { value: products[i] }})
      
      
      expect(screen.getByText(products[i])).toBeInTheDocument()

    

    
      


    }

    
    expect(searchBar).toBeInTheDocument()
    
    
    

  });

  
  

  

  

  
});
