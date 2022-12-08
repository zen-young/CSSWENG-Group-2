import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import LabelSection from "../components/LabelSection/LabelSection";

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

global.CSSObject = jest.fn();

describe("labelSection", () => {
  let labelSectionData, labelSectionData2;

  beforeEach(() => {
    labelSectionData = {
      category: "Halloween",
      description: "Spooky Season",
      name: "Halloween Poster",
      image_urls: ["someurl"],
      paper_colors: ['Orange', "Yellow", "Black"],
      paper_types: ['Matte', 'Glossy'],
      product_id : 'DAijsStEZYfJK6NxsA69',
      product_sizes: ["2.4x1.25", "2.4x2", "3.5x2"],
      variations: [{price: '1500', color: 'Orange', paper_type: 'Matte', quantity: '10', size:'3.5x2'},
                   {price: '150', color: 'Yellow', paper_type: 'Glossy', quantity: '5', size:'2.4x2'}]
    };

    labelSectionData2 = {
      category: "Christmas",
      description: "Tis the season",
      name: "Christmas Poster",
      image_urls: ["someurl"],
      paper_colors: ['White', "Green"],
      paper_types: ['Matte', 'Glossy'],
      product_id : 'DAijsStEZYfJK6N1500',
      product_sizes: ["Small", "Medium", "Large"],
      variations: [{price: '150', color: 'White', paper_type: 'Matte', quantity: '10', size:'Small'},
                   {price: '150', color: 'Green', paper_type: 'Glossy', quantity: '5', size:'Medium'},
                   {price: '150', color: 'White', paper_type: 'Glossy', quantity: '5', size:'Large'}]
    };

    
  });

  it("LabelSection renders with appropriate info according to passed data", () => {
    render(<LabelSection product={labelSectionData} />);

    const prodName = screen.getByText(labelSectionData.name)
    
    //const descContainer = screen.getByText(labelSectionData.description)

    expect(prodName).toBeVisible()
    
    //expect(descContainer).toBeVisible()

    /*
    const name = screen.getByText("Notepads");
    const dropDown = screen.getAllByAltText("down");

    const sizeSelect = dropDown[0];
    const qtySelect = dropDown[1];
    //test case 1: 3.5x2 and 20

    fireEvent.click(sizeSelect);

    fireEvent.click(screen.getByText(labelSectionData.sizes[2]));

    fireEvent.click(qtySelect);

    fireEvent.click(
      screen.getByText(labelSectionData.quantities[2] + " Pieces")
    );

    expect(name).toBeVisible();

    const correctPrice = screen.getByText(
      "₱" +
        (labelSectionData.prices[2] * labelSectionData.quantities[2]).toFixed(2)
    );

    expect(correctPrice).toBeVisible();

    //test case 2: 150 and 2.5x2

    fireEvent.click(sizeSelect);

    fireEvent.click(screen.getByText(labelSectionData.sizes[1]));

    fireEvent.click(qtySelect);

    fireEvent.click(
      screen.getByText(labelSectionData.quantities[4] + " Pieces")
    );

    const correctPrice2 = screen.getByText(
      "₱" +
        (labelSectionData.prices[1] * labelSectionData.quantities[4]).toFixed(2)
    );

    expect(correctPrice2).toBeVisible();

    //test case 3: 40 and 2.4x2

    fireEvent.click(sizeSelect);

    fireEvent.click(screen.getByText(labelSectionData.sizes[0]));

    fireEvent.click(qtySelect);

    fireEvent.click(
      screen.getByText(labelSectionData.quantities[3] + " Pieces")
    );

    const correctPrice3 = screen.getByText(
      "₱" +
        (labelSectionData.prices[0] * labelSectionData.quantities[3]).toFixed(2)
    );

    expect(correctPrice3).toBeVisible();
    */
  });

  it("LabelSection renders with appropriate info according to passed data (2)", () => {
    render(<LabelSection product={labelSectionData2} />);

    const prodName = screen.getByText(labelSectionData2.name)
    
    //const descContainer = screen.getByText(labelSectionData.description)

    expect(prodName).toBeVisible()
  });
});
