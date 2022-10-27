import React, { useState } from 'react';
import Carousel_comp from '../components/homepage/Carousel_comp';
import Featured_Products from '../components/homepage/Featured_Products';
import About_Us from '../components/homepage/about_us';


function Homepage() {
    const [numberofPages, setNumPages] = useState(3);

    return (
        <>
            <Carousel_comp />
            <Featured_Products numPages={numberofPages}/>
            <About_Us />
        </>
    );
}

export default Homepage;