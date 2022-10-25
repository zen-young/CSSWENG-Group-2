import React from "react";
import Image from "next/image";
import Logo from "../../public/assets/about-us_logo.png";

const AboutPage = () => {
  return (
    <div className="flex flex-col p-[32px] lg:px-[120px] mt-10">
      <div className="w-full flex flex-col items-center justify-center">
        <span className="text-[36px] font-bold font-sarala text-black uppercase">
          About Us
        </span>
        <div className="border-b-[1px] border-b-black w-full mb-[32px]" />

        <div className="mb-[32px]">
          <Image
            src={Logo}
            alt="logo"
            width="197px"
            height="265px"
            objectFit="contain"
          />
        </div>
      </div>
      <span className="font-normal font-robota text-[24px] text-[#222222] mb-[32px] text-justify">
        <strong>Upscale Printing Solutions</strong> is a modest enterprise that
        has been in the industry for more than <strong>10 years</strong>. It started as a small
        letterpress servicing businesses in the Metro East area. It eventually
        evolved as a commercial printer catering to different industries in and
        outside Metro Manila.
      </span>

      <span className="font-normal font-robota text-[24px] text-[#222222] text-justify mb-[111px]">
        Upscale Printing Solutions takes pride in being able to tap a wide
        spectrum of the market to service their offset and digital printing
        needs. With state of the art equipment, facilities and expertise, it
        provides a complete and cost effective printing solutions to its
        clients. Upscale Printing Solutions guarantees the highest quality of
        service from printing to finishing.
      </span>

      <div className="flex items-center justify-center text-[20px] font-bold text-center">
        * more info the product owner wishes to add like videos, clients, reviews,
        etc. *
      </div>
    </div>
  );
};

export default AboutPage;