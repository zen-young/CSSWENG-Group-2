import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import ManageProductHeader from "../components/admin_pages/ManageProducts/ManageProductHeader";

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

global.CSSObject = jest.fn();


describe("E;", () => {
    it("Product Header", () => {
      render(<ManageProductHeader />);
      
      const addnewButton = screen.getByText('+ Add New')

      //fireEvent.click(addnewButton)
  
   
    });

})
