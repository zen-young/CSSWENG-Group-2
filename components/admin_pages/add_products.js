
import { useState } from "react";
import { useRouter } from "next/router";
import { IconCircleX } from "@tabler/icons";

function Add_Product() {

    const router = useRouter()
    const [images, setImages] = useState([])
    const [message, setMessage] = useState('')

    
    //Add Image to images array
    function handleImageUpload(e){
        setMessage("")
        let file = e.target.files;

        for(let i = 0; i < file.length; i++){
            const fileType = file[i]['type'];
            const validTypes = ['image/gif', 'image/jpeg', 'image/png'];
            if(validTypes.includes(fileType)){
                setImages([...images, file[i]])
            }else{
                setMessage("Only Images of Type JPEG, PNG, and GIF are accepted")
            }
        }
    }

    function removeImage(i){
        setImages(images.filter(x => x.name !== i));
    }

    //Clear all forms and redirect to settings
    function clear(){
        document.getElementById('static_form').reset()
        document.getElementById('product_sizes').reset()
        document.getElementById('paper_types').reset()
        document.getElementById('row_variations').reset()
        // router.push('/admin/settings')
    }

    //Add another input given element id
    function add_input(id){
        var x = document.createElement('li')
        
        x.innerHTML = 
        ` <input type="text" class="w-full p-1 border border-black rounded-sm mt-[5px] mb-[10px]"/> `

        document.getElementById(id).appendChild(x) 
    }

    //Add another row to variation rows
    function add_row(id){
        var x = document.createElement('li')

        x.innerHTML = 
        `
            <div class="flex w-1/3 justify-center">
                <input
                    type="text"
                    class="w-1/2 border border-black rounded-sm"
                />
            </div>
            <div class="flex w-1/3 justify-center">
                <input
                    type="text"
                    class="w-1/2 border border-black rounded-sm"
                />
            </div>
            <div class="flex w-1/3 justify-center">
                <input
                    type="text"
                    class="w-1/2 border border-black rounded-sm"
                />
            </div>
        `
        x.className = `flex w-full mb-[10px]`;

        document.getElementById('variations').appendChild(x)
    }


    return (
        <>

            {/* TITLE OF PAGE AND LIVE PREVIEW BUTTON */}
            <div className="flex bg-[#282828] w-full h-[100px] items-center">
                <p className="text-[26px] text-white ml-[25px] font-semibold">
                    Add Product
                </p>
                <button className="ml-auto mr-10 py-2 px-5 bg-cyan-400 hover:brightness-90 rounded-sm font-bold text-[14px]">
                    Live Preview
                </button>
            </div>


            {/* UPLOADING PRODUCT IMAGES */}
            <div className="flex-col w-full h-auto bg-gray-100 pr-[40px] pt-[50px]">

                <p className="w-full text-[12px] align-top text-center text-red-500 mb-[20px]">
                    {message}
                </p>

                <div className="flex mb-[20px] w-full h-auto">
                    <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                        Product Images:
                    </p>

                    <div
                        id="images_collection"
                        className="flex w-full gap-5 overflow-auto"
                    >
                        <div className="flex flex-nowrap gap-2 overflow-auto">
                            {images.map((file, key) => {
                                return (
                                    <div key={key} className="relative">
                                        <IconCircleX
                                            onClick={() => {
                                                removeImage(file.name);
                                            }}
                                            className="mdi mdi-close absolute right-1 cursor-pointer"
                                        />
                                            
                                        <img
                                            className="h-[75px] w-[75px] rounded-md cursor-pointer border border-black"
                                            src={URL.createObjectURL(file)}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        <div className="relative w-1/5 justify-center bg-gray-100 rounded-md border-2 border-black border-dotted cursor-pointer hover:brightness-90">
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                className="absolute h-full w-full bg-transparent opacity-0 z-10 cursor-pointer"
                                multiple="multiple"
                                name="images[]"
                            />
                            <img
                                src="/assets/add_image_icon.png"
                                alt=""
                                className="max-h-[40px] m-auto cursor-pointer"
                            />
                            <p className="w-full text-center font-bold text-[12px] cursor-pointer">
                                Add Image
                            </p>
                        </div>
                    </div>
                </div>



                {/* STATIC FORM */}
                <form action="" id="static_form">

                    {/* PRODUCT NAME*/}
                    <div className="flex mb-[20px] w-full h-auto">
                        <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                            Product Name:
                        </p>
                        <input
                            type="text"
                            className="w-full p-1 border border-black rounded-sm mt-[5px]"
                        />
                    </div>

                    {/* CATEGORY */}
                    <div className="flex mb-[20px] w-full h-auto">
                        <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                            Category:
                        </p>
                        <input
                            type="text"
                            className="w-full p-1 border border-black rounded-sm mt-[5px]"
                        />
                    </div>

                    {/* FEATURED CHECKBOX */}
                    <div className="flex mb-[20px] w-full h-auto">
                        <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                            Featured:
                        </p>
                        <span className="w-full">
                            <input
                                type="checkbox"
                                className="w-[20px] h-[20px] align-middle"
                            />
                        </span>
                    </div>

                    {/* PRODUCT DESCRIPTION TEXTAREA */}
                    <div className="flex mb-[50px] w-full h-auto align-top">
                        <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                            Product Description:
                        </p>
                        <textarea
                            name=""
                            id=""
                            className="w-full h-[150px] p-1 border border-black rounded-sm mt-[5px]"
                        />
                    </div>
                </form>

                {/* DYNAMIC FORM PRODUCT SIZES */}
                <form action="" id="product_sizes">
                    <div className="flex w-full h-auto align-top">
                        <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                            Product Sizes:
                        </p>
                        <ul id="sizes" className="w-full">
                            <li>
                                <input
                                    type="text"
                                    className="w-full p-1 border border-black rounded-sm mt-[5px] mb-[10px]"
                                />
                            </li>
                        </ul>
                    </div>
                </form>

                <div className="flex items-end mb-[50px]">
                    <div className="w-2/5 pr-[25px]"></div>
                    <button
                        onClick={() => {
                            add_input("sizes");
                        }}
                        className="w-full border p-1 border-black rounded-sm font-bold bg-cyan-100 text-[16px] hover:brightness-90"
                    >
                        ADD PRODUCT SIZE
                    </button>
                </div>

                {/* DYNAMIC FORM PAPER TYPES */}
                <form action="" id="paper_types">
                    <div className="flex w-full h-auto align-top">
                        <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                            Paper Types:
                        </p>
                        <ul id="papers" className="w-full">
                            <li>
                                <input
                                    type="text"
                                    className="w-full p-1 border border-black rounded-sm mt-[5px] mb-[10px]"
                                />
                            </li>
                        </ul>
                    </div>
                </form>

                <div className="flex mb-[20px]">
                    <div className="w-2/5 pr-[25px]"></div>
                    <button
                        onClick={() => {
                            add_input("papers");
                        }}
                        className="w-full border p-1 border-black rounded-sm font-bold bg-cyan-100 text-[16px] hover:brightness-90"
                    >
                        ADD PAPER TYPE
                    </button>
                </div>

                {/* DYNAMIC FORM ROW VARIATIONS */}
                <div className="flex mb-[10px] w-full h-auto">
                    <p
                        htmlFor="product_name"
                        className="w-2/5 text-[20px] align-top text-right pr-[25px]"
                    >
                        Variations:
                    </p>

                    <div className="flex w-full">
                        <p className="w-1/3 text-center">Product Size:</p>
                        <p className="w-1/3 text-center">Quantity (pcs):</p>
                        <p className="w-1/3 text-center">Price:</p>
                    </div>
                </div>

                <form action="" id="row_variations">
                    <div className="flex w-full mb-[20px]">
                        <div className="w-2/5 pr-[25px]"></div>
                        <div className="w-full">
                            <ul id="variations">
                                <li className="flex w-full mb-[10px]">
                                    <div className="flex w-1/3 justify-center">
                                        <input
                                            type="text"
                                            className="w-1/2 border border-black rounded-sm"
                                        />
                                    </div>
                                    <div className="flex w-1/3 justify-center">
                                        <input
                                            type="text"
                                            className="w-1/2 border border-black rounded-sm"
                                        />
                                    </div>
                                    <div className="flex w-1/3 justify-center">
                                        <input
                                            type="text"
                                            className="w-1/2 border border-black rounded-sm"
                                        />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </form>

                <div className="flex mb-[100px]">
                    <div className="w-2/5 pr-[25px]"></div>
                    <button
                        onClick={(e) => {
                            add_row();
                        }}
                        className="w-full border p-1 border-black rounded-sm font-bold bg-cyan-100 text-[16px] hover:brightness-90"
                    >
                        ADD ROW
                    </button>
                </div>


                {/* DISCARD AND SAVE BUTTON */}
                <div className="flex justify-end mb-[50px] gap-5">
                    <button
                        className="font-bold text-[14px] border px-[20px] py-1 bg-gray-300"
                        onClick={() => {
                            clear();
                        }}
                    >
                        Discard
                    </button>
                    <button className="font-bold text-[14px] border px-[20px] py-1 bg-green-500">
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}

export default Add_Product;