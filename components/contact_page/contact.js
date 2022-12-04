
import { Image, Grid } from '@mantine/core'
import H_Divider from '../homepage/H_Divider';


function Contact_Page() {
    return (
        <div className="w-4/5 flex-row mx-auto mt-[50px]">
            <p className="text-center text-[32px] font-bold">CONTACT US</p>
            <H_Divider />

            <div className="w-full bg-black text-center py-5">
                <p className="text-white text-[24px]  ">
                    Contact us on Viber for inquiries!
                </p>
                <p className="text-white text-[32px] font-bold">
                    +639175101023
                </p>
            </div>

            <div className="w-5/6 mx-auto mt-[100px] mb-[50px]">
                <Grid columns={10} pt={10} gutter={50}>
                    <Grid.Col span={4}>
                        <Image
                            alt="Google Maps"
                            src="/assets/map.png"
                            sx={{
                                border: "solid",
                                borderWidth: "1px",
                            }}
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <p className="font-bold text-[24px]">Address</p>
                        <p className="text-[20px]">
                            1056 Baltimore St., Brookside Hills Subdivision, San
                            Isidro, Cainta, Rizal
                        </p>
                        <br />
                        <p className="font-bold text-[24px]">Service Hours</p>
                        <p className="text-[20px]">
                            <span className="font-bold">Mon-Fri:</span> TBA
                        </p>
                    </Grid.Col>
                </Grid>
            </div>

            <div className="border border-black mt-[100px] mb-[100px]">
                <div className="px-[50px] py-[25px] border-b border-black bg-gray-100">
                    <p className="text-[32px] font-bold">
                        Email Us at upscale.printing@gmail.com
                    </p>
                </div>

                <form action="">
                    <div className="flex-row px-[50px] py-[50px]">
                        <label
                            htmlFor="Name"
                            className="block text-[24px] font-bold"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="Name"
                            id="Name"
                            className="w-4/5 rounded-md border-[3px] border-black block mb-[50px] p-3"
                        />

                        <label
                            htmlFor="email"
                            className="block text-[24px] font-bold"
                        >
                            Email Address
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="w-4/5 rounded-md border-[3px] border-black block mb-[50px] p-3"
                        />

                        <label
                            htmlFor="Subject"
                            className="block text-[24px] font-bold"
                        >
                            Subject
                        </label>
                        <input
                            type="text"
                            name="Subject"
                            id="Subject"
                            className="w-4/5 rounded-md border-[3px] border-black block mb-[50px] p-3"
                        />

                        <label
                            htmlFor="Message"
                            className="block text-[24px] font-bold"
                        >
                            Message
                        </label>
                        <textarea
                            name="Message"
                            id="Message"
                            cols="30"
                            rows="10"
                            className="w-4/5 h-80 rounded-md border-[3px] border-black block mb-[50px] p-3"
                        />

                        <div className="flex justify-center">
                            <button className="px-[100px] py-[20px] bg-gray-300 rounded-md text-[28px] text-white font-bold">
                                SEND E-MAIL
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <H_Divider />

            <p className="text-center text-[32px] font-bold">FOLLOW US!</p>

            <a href="" className="mt-[25px]"></a>

            <div className="flex justify-center items-center content-center mt-[25px]">
                <a
                    href="https://www.facebook.com/upscaleprintingsolutions"
                    className="mx-auto text-center text-[24px] font-bold"
                >
                    <img
                        alt="FB Logo"
                        src={"/assets/fb_logo.png"}
                        className="w-[100px] mx-auto"
                    />
                </a>
            </div>

            <div className="flex justify-center items-center content-center">
                <a
                    href="https://www.facebook.com/upscaleprintingsolutions"
                    className="mx-auto pt-[10px] text-center text-[24px] font-bold hover:underline"
                >
                    Upscale Printing Solutions
                </a>
            </div>
        </div>
    );
}

export default Contact_Page;