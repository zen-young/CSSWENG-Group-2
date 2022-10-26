import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";

import About_Us from "../components/homepage/about_us";
import Carousel_Comp from "../components/homepage/Carousel_comp";
import Featured_Products from "../components/homepage/Featured_Products";


//mock for ResizeObserver, for fireEvent to work on Mantine React components
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

global.CSSObject = jest.fn();

describe("Homepage", () => {
  it("about us component rendered with correct image of map and logo", () => {
    render(<About_Us />);

    //TODO: since logo should be changeable by user, test by getting image with a mock api or mock db
    //if its possible(??)

    var googlemap_img_path = "/assets/map.png";

    //should not be hardcoded in final since user wants to change logo
    var companylogo_img_path = "/assets/about_logo.png";

    expect(screen.getByText("Upscale Printing Solutions")).toBeInTheDocument();

    const googlemap = screen.getByAltText("Google Maps");
    const companylogo = screen.getByAltText("Company Logo");

    expect(googlemap).toHaveProperty(
      "src",
      "http://localhost" + googlemap_img_path
    );
    expect(companylogo).toHaveProperty(
      "src",
      "http://localhost" + companylogo_img_path
    );
  });

  

  it("carousel displays all images", () => {
    render(<Carousel_Comp />);
    //CAROUSEL already unit tested by mantine devs themselves
    //https://github.com/mantinedev/mantine/blob/master/src/mantine-carousel/src/Carousel.test.tsx

    const images = [
      "/assets/sample_1.jpg",
      "/assets/sample_2.jpg",
      "/assets/sample_3.jpg",
    ];

    const retrieved_images = screen.getAllByRole("img");

    expect(retrieved_images).toHaveLength(images.length);
  });

  it("featured products are displayed correctly", () => {
    render(<Featured_Products />); 

    //TODO: refactor test to use mock db or mock api if its possible instead of hardcoded
    const productPics = [
        "sample_product_1.jpg",
        "sample_product_1.jpg",
        "sample_product_1.jpg",
        "sample_product_1.jpg",
        "sample_product_1.jpg",
        "sample_product_1.jpg",
      ];
    
      const productNames = [
        "Product Name 1",
        "Product Name 2",
        "Product Name 3",
        "Product Name 4",
        "Product Name 5",
        "Product Name 6",
      ];


      var i;

      for(i = 0; i < productNames.length; i++) {

        //for now, use 'getAll' instead of 'get' since products are recycled for each carousel
        const product_name = screen.getAllByText(productNames[i])

        var j;
        for(j = 0; j < product_name.length; j++) {
            
            expect(product_name[j]).toBeVisible()
        }
        
      

      }
     


    

    
  });

});

