import { useState } from "react";
import { IconCircleX } from "@tabler/icons";
import { setDoc, doc, getDoc, updateDoc, arrayUnion, query, collection, getDocs, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from "../../firebaseConfig";
import { uuidv4 } from "@firebase/util";
import { useEffect } from "react";
import Header_Live_Preview from "./Header_LivePreview";

function Add_Product({setPages}) {
    const [message, setMessage] = useState("");

    // PRODUCT DATA
    const [images, setImages] = useState([])
    const [prodName, setProductName] = useState("")
    const [category, setCategory] = useState([])
    const [prodCateg, setProdCateg] = useState("")
    const [featured, setFeatured] = useState(false)
    const [prodDesc, setDescription] = useState("")
    const [packaging, setPackaging] = useState("")
    const [sizes, setSizes] = useState([])
    const [paperTypes, setTypes] = useState([])
    const [rows, setRows] = useState([])
    const [colors, setColors] = useState([])
    const [urls, setUrls] = useState([])

    // HTML ELEMENTS LIST
    const [sizeInputs, setSizeInputs] = useState([])
    const [paperInputs, setPaperInputs] = useState([])
    const [colorInputs, setColorInputs] = useState([])
    const [includeRow, setIncludedRows] = useState([true, true, true])
    const [rowInputs, setRowInputs] = useState([])

    const [btnDisabled, setDisabled] = useState(false)

    //Adds a doc to the database
    async function addToDatabase(){
        const promises = [];

        //Pushes images to storage with unique filename
        images && images.map((image) => {
            const uid = uuidv4();
            const filename = "images/" + image.name + "_" + uid;
            const storageRef = ref( storage, filename)
            
            //Uploads Image with unique name
            promises.push(
                uploadBytesResumable( storageRef,  image).
                then((uploadResult) => {
                    return getDownloadURL(uploadResult.ref);
                })
            );
        });

        //List of urls per image
        const urls = await Promise.all(promises);

        //Adds product to database
        try {
            await addDoc(collection(db, "products"), {
                name: prodName,
                category: prodCateg,
                featured: featured,
                description: prodDesc,
                product_sizes: sizes,
                paper_colors: colors,
                packaging: packaging,
                paper_types: paperTypes,
                variations: rows,
                image_urls: urls,
            }).then((docRef) => {
                //Clear stored files and images in states
                setImages([]);
                setUrls([]);
                updateDoc(doc(db, "products", docRef.id), {
                    product_id: docRef.id
                })
            });
        } catch (err) {
            console.log(err);
        }
    };

    //Add Image to images array
    function handleImageUpload(e) {
        setMessage("");

        let file = e.target.files;
        for (let i = 0; i < file.length; i++) {
            const fileType = file[i]["type"];
            const validTypes = ["image/gif", "image/jpeg", "image/png"];

            if (validTypes.includes(fileType)) {
                setImages((images) => [...images, file[i]]);
                setUrls((urls) => [...urls, URL.createObjectURL(file[i])]);
            } else {
                setMessage(
                    "Only Images of Type JPEG, PNG, and GIF are accepted"
                );
            }
        }
    }

    //Remove selected image
    function removeImage(i) {
        let index = i
        setImages(images => images.filter((img, i) => i !== index));
        setUrls(urls => urls.filter((imgurl, i) => i !== index));

        if (images.length == 0){
            setImages([]);
            setUrls([]);
            document.getElementById("image_files").value = null
        } 
    }

    //Icon component for Product Features/Attributes
    const FeatureRemoveIcon = (
        <div className="flex w-1/6 justify-center">
            <IconCircleX
                onClick={(e) => {
                    let x = e.target.parentNode.parentNode;
                    x.nodeName === "LI" ? x.remove() : x.parentNode.remove();
                }}
                className="cursor-pointer stroke-red-500"
            />
        </div>
    );

    //Add Feature Button
    function FeatureButton(buttonTitle, buttonFunc){
        return (
            <div className="flex items-end mb-[50px]">
                <div className="w-1/4 pr-[25px] mt-10" />
                <div className="flex w-full">
                    <div className="w-1/6" />
                    <button
                        onClick={buttonFunc}
                        className="w-4/6 border p-1 border-black rounded-sm font-bold bg-gray-300 text-[16px] hover:brightness-90"
                    >
                        {buttonTitle}
                    </button>
                </div>
            </div>
        )
    }

    // Depending on feature, returns list of HTML Elements related to that feature
    function handleFeature(feature){
        switch(feature){
            case 1:
                return sizeInputs
            case 2:
                return paperInputs
            case 3:
                return colorInputs
        }
    }

    // Stores values in features to respective arrays
    function updateFeatureValues(feature){
        switch (feature) {
            case 1: //Sizes
                var x = [];
                Array.prototype.forEach.call(document.getElementById("product_sizes").elements, (element) => {
                    if (element.value.length > 0 && element.type != 'checkbox'){
                        x.push(element.value)
                    }
                    if(element.type == 'checkbox'){
                        var [a, b, c] = includeRow;
                        setIncludedRows([element.checked, b, c])
                    }
                });
                setSizes(x);
                break;
        
            case 2: //Paper Types
                var x = [];
                Array.prototype.forEach.call(document.getElementById("paper_types").elements, (element) => {
                    if (element.value.length > 0 && element.type != 'checkbox')
                        x.push(element.value)
                    if(element.type == 'checkbox'){
                        var [a, b, c] = includeRow;
                        setIncludedRows([a, element.checked, c])
                    }
                });
                setTypes(x);
                break;

            case 3: //Paper Colors
                var x = [];
                Array.prototype.forEach.call(document.getElementById("paper_colors").elements, (element) => {
                    if (element.value.length > 0 && element.type != 'checkbox'){
                        x.push(element.value)
                    }
                    if(element.type == 'checkbox'){
                        var [a, b, c] = includeRow;
                        setIncludedRows([a, b, element.checked])
                    }
                });
                setColors(x);
                break;

        }
    }

    // Feature HTML Element / Component
    function FeatureComponent(title, feature){ 
        return(
            <div className="flex w-full h-auto">
                <p className=" w-1/4 text-[16px] text-right">{title}:</p>
                <ul id="sizes" className="w-full align-middle">
                    <li className="flex mb-1">
                        <div className="flex justify-center w-1/6">
                            <input
                                type="checkbox"
                                checked={feature == 1 ? includeRow[0] : (feature == 2 ? includeRow[1] : includeRow[2])}
                                onChange={() => {updateFeatureValues(feature)}}
                                className="w-[20px]"
                            />
                        </div>
                        <input
                            type="text"
                            className="w-4/6 p-1 border border-black rounded-sm"
                            onChange={() => {updateFeatureValues(feature)}}
                            required
                        />
                    </li>
                    {handleFeature(feature)}
                </ul>
            </div>
            )
        };

    // Add new entry for feature
    function add_entry(inputs, inputFunc, feature){
        var x = (
            <li key={inputs.length + 1} className="flex mb-1">
                {FeatureRemoveIcon}
                {/* <div className="flex w-1/6" /> */}
                <input
                    type="text"
                    className="w-4/6 p-1 border border-black rounded-sm"
                    onChange={() => {updateFeatureValues(feature)}}
                />
            </li>
        );
        inputFunc(inputs => [...inputs, x])
    }

    // Gets data for variation and stores it to rows
    function updateVariationsValue(){
        Array.prototype.forEach.call(document.getElementById("variations").children, (child, index) => {
            let x = child.children; //Each Div

            var Obj = new Object();
            for(let i = 0; i < x.length; i++){
                let y = x[i].children

                if(y[0].name == 'ProdSize') Obj['size'] = y[0].value

                if(y[0].name == 'PaperType') Obj['paper_type'] = y[0].value

                if(y[0].name == 'PaperColor') Obj['color'] = y[0].value

                if (y[0].name == "quantity") Obj["quantity"] = y[0].value

                if (y[0].name == "price"){
                    Obj["price"] = y[0].value;                    
                    rows.push(structuredClone(Obj));
                    Obj = {}
                } 
            }
        });
    }


    //Add another row to variations' rows
    function add_row() {
        var x = (
            <li key={rowInputs.length + 1} className="flex w-full mb-[10px]">

                {includeRow[0] ? 
                    (
                        <div className="flex w-1/5 justify-center">
                            <select
                                name="ProdSize"
                                className="w-1/2 border border-black rounded-sm"
                                defaultValue=""
                            >
                            <option value="" disabled></option>
                            {sizes.map((val, key) => {
                                return (
                                    <option key={key} value={val}>
                                        {val}
                                    </option>
                                );
                            })}
                            </select>
                        </div>
                    ) : ''
                }

                {includeRow[1] ? 
                    (
                        <div className="flex w-1/5 justify-center">
                            <select
                                name="PaperType"
                                className="w-1/2 border border-black rounded-sm"
                                defaultValue=""
                            >
                            <option value="" disabled></option>
                            {paperTypes.map((val, key) => {
                                return (
                                    <option key={key} value={val}>
                                        {val}
                                    </option>
                                );
                            })}
                            </select>
                        </div>
                    ) : ''
                }

                {includeRow[2] ? 
                    (
                        <div className="flex w-1/5 justify-center">
                            <select
                                name="PaperColor"
                                className="w-1/2 border border-black rounded-sm"
                                defaultValue=""
                            >
                            <option value="" disabled></option>
                            {colors.map((val, key) => {
                                return (
                                    <option key={key} value={val}>
                                        {val}
                                    </option>
                                );
                            })}
                            </select>
                        </div>
                    ) : ''
                }
                
                <div className="flex w-1/5 justify-center">
                    <input
                        name="quantity"
                        type="text"
                        className="w-1/2 border border-black rounded-sm"
                    />
                </div>

                <div className="flex w-1/5 justify-center">
                    <input
                        name="price"
                        type="text"
                        className="w-1/2 border border-black rounded-sm"
                    />
                </div>

                <IconCircleX
                    onClick={(e) => {
                        let x = e.target.parentNode;
                        x.nodeName === "LI" ? x.remove() : x.parentNode.remove();
                    }}
                    className="absolute cursor-pointer stroke-red-500"
                />
            </li>
        );

        setRowInputs(rowInputs => [...rowInputs, x]);
    }

    // Gets all product categories
    async function getCategories(){

        const arr = []
        const querySnapshot = await getDocs(query(collection(db, "categories")));
        querySnapshot.forEach((doc) => {
            arr.push(doc.id)
        });
        setCategory(arr)
    }

    // Runs when page is loaded
    useEffect(() => {
        getCategories()
    }, [])


    return (
        <>
            {/* TITLE OF PAGE AND LIVE PREVIEW BUTTON */}
            <Header_Live_Preview title="Add Product" />

            {/* UPLOADING PRODUCT IMAGES */}
            <div className="flex-col w-full h-auto bg-gray-100 pr-[40px] pt-[25px] pl-[20px]">
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
                            {urls.map((url, key) => {
                                return (
                                    <div key={key + 1} className="relative">
                                        <IconCircleX
                                            onClick={() => { removeImage(key) }}
                                            className="mdi mdi-close absolute right-1 cursor-pointer bg-red-400 rounded-full"
                                        />

                                        <img
                                            className="h-[75px] w-[75px] rounded-md cursor-pointer"
                                            src={url}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        <div className="relative w-1/5 justify-center bg-gray-100 rounded-md border-2 border-black border-dotted cursor-pointer hover:brightness-90">
                            <input
                                id="image_files"
                                type="file"
                                onChange={handleImageUpload}
                                className="absolute h-full w-full bg-transparent opacity-0 z-10 cursor-pointer"
                                multiple
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
                            name="product_name"
                            className="w-full p-1 border border-black rounded-sm mt-[5px]"
                            onChange={(e) => { setProductName(e.target.value) }}
                        />
                    </div>

                    {/* CATEGORY */}
                    <div className="flex mb-[20px] w-full h-auto">
                        <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                            Category:
                        </p>
                        <select
                            name="category"
                            onChange={(e) => { setProdCateg(e.target.value) }}
                            className="w-full p-1 border border-black rounded-sm mt-[5px]"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                --- Select Category ---
                            </option>
                            {category.map((val, key) => {
                                return (
                                    <option key={key} value={val}>
                                        {val}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {/* FEATURED CHECKBOX */}
                    <div className="flex mb-[20px] w-full h-auto">
                        <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                            Featured:
                        </p>
                        <span className="w-full">
                            <input
                                type="checkbox"
                                name="featured"
                                className="w-[20px] h-[20px] align-middle"
                                onChange={(e) => {
                                    setFeatured(e.target.checked);
                                }}
                            />
                        </span>
                    </div>

                    {/* PRODUCT DESCRIPTION TEXTAREA */}
                    <div className="flex mb-5 w-full h-auto align-top">
                        <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                            Contents:
                        </p>
                        <textarea
                            name="product_desc"
                            className="w-full h-[150px] p-1 border border-black rounded-sm mt-[5px]"
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </div>

                    <div className="flex mb-[50px] w-full h-auto">
                        <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                            Packaging:
                        </p>
                        <input
                            type="text"
                            name="product_name"
                            className="w-full p-1 border border-black rounded-sm mt-[5px]"
                            onChange={(e) => { setPackaging(e.target.value) }}
                        />
                    </div>
                </form>

                

                <div className="flex-col pt-5 mb-10">
                    
                    <p className="text-[20px] font-bold ml-10 mb-2">Product Features</p>
                    <div className="flex">
                        <p className="ml-10 w-1/4 text-right text-[12px] font-bold">Feature Name</p>
                        <p className="ml-5 w-3/6 text-[12px] font-bold">Add to Variation</p>
                        <p className="w-full text-[12px] font-bold">Feature Values</p>
                    </div>

                    <div className="mx-auto bg-gray-700 w-11/12 h-[1px] mb-4"/>
                    {/* === ADD PRODUCT SIZES === */}
                    <form action="" id="product_sizes">
                        {FeatureComponent("Product Sizes", 1)}
                    </form>
                    { FeatureButton("ADD PRODUCT SIZE", () => add_entry(sizeInputs, setSizeInputs, 1)) }        


                    {/* === ADD PAPER TYPES === */}
                    <form action="" id="paper_types">
                        {FeatureComponent("Paper Types", 2)}
                    </form>
                    { FeatureButton("ADD PAPER TYPE", () => add_entry(paperInputs, setPaperInputs, 2))}


                    {/* === ADD PAPER COLOR ==== */}
                    <form action="" id="paper_colors">
                        {FeatureComponent("Paper Color", 3)}
                    </form>
                    { FeatureButton("ADD PAPER COLOR", () => add_entry(colorInputs, setColorInputs, 3))}

                    <div className="mx-auto bg-black w-11/12 h-[2px] mb-4"/>
                </div>

                {/* DYNAMIC FORM ROW VARIATIONS */}
                    <div className="flex mb-[10px] w-full h-auto">
                        <p
                            htmlFor="product_name"
                            className="w-1/5 text-[20px] align-top text-right"
                        >
                            Variations:
                        </p>

                        <div className="flex w-full ml-5">
                            {includeRow[0] ? <p className="w-1/5 text-center">Product Size:</p> : ''}
                            {includeRow[1] ? <p className="w-1/5 text-center">Paper Type:</p> : ''}
                            {includeRow[2] ? <p className="w-1/5 text-center">Paper Color:</p> : ''}
                            <p className="w-1/5 text-center">Quantity (pcs):</p>
                            <p className="w-1/5 text-center">Price:</p>
                        </div>
                    </div>

                    <form action="" id="row_variations">
                        <div className="flex w-full mb-[20px]">
                            <div className="w-1/5 pr-[25px]"></div>
                            <div className="w-full">
                                <ul id="variations">
                                    <li className="flex w-full mb-[10px]">

                                        {includeRow[0] ? 
                                            (
                                            <div className="flex w-1/5 justify-center">
                                                <select
                                                    name="ProdSize"
                                                    type=""
                                                    className="w-1/2 border border-black rounded-sm"
                                                    defaultValue=""
                                                >
                                                <option value="" disabled></option>
                                                {sizes.map((val, key) => {
                                                    return (
                                                        <option key={key} value={val}>
                                                            {val}
                                                        </option>
                                                    );
                                                })}
                                                </select>
                                            </div>
                                            ) : ''
                                        }

                                        {includeRow[1] ? 
                                            (
                                            <div className="flex w-1/5 justify-center">
                                                <select
                                                    name="PaperType"
                                                    className="w-1/2 border border-black rounded-sm"
                                                    defaultValue=""
                                                >
                                                <option value="" disabled></option>
                                                {paperTypes.map((val, key) => {
                                                    return (
                                                        <option key={key} value={val}>
                                                            {val}
                                                        </option>
                                                    );
                                                })}
                                                </select>
                                            </div>
                                            ) : ''
                                        }

                                        {includeRow[2] ? 
                                            (
                                                <div className="flex w-1/5 justify-center">
                                                    <select
                                                        name="PaperColor"
                                                        className="w-1/2 border border-black rounded-sm"
                                                        defaultValue=""
                                                    >
                                                    <option value="" disabled></option>
                                                    {colors.map((val, key) => {
                                                        return (
                                                            <option key={key} value={val}>
                                                                {val}
                                                            </option>
                                                        );
                                                    })}
                                                    </select>
                                                </div>
                                            ) : ''
                                        }

                                        <div className="flex w-1/5 justify-center">
                                            <input
                                                name="quantity"
                                                type="text"
                                                className="w-1/2 border border-black rounded-sm"
                                            />
                                        </div>

                                        <div className="flex w-1/5 justify-center">
                                            <input
                                                name="price"
                                                type="text"
                                                className="w-1/2 border border-black rounded-sm"
                                            />
                                        </div>
                                    </li>
                                    {rowInputs}
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
                            // window.location.reload(false);
                            setPages(0)
                        }}
                    >
                        Discard Changes
                    </button>
                    <button
                        className="font-bold text-[14px] border px-[20px] py-1 bg-green-500"
                        disabled={btnDisabled}
                        onClick={() => {
                            setDisabled(true);
                            updateVariationsValue()
                            addToDatabase().then(() => {
                                //What to do after adding to database
                                // window.location.reload(false);
                                setPages(0)
                            });
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}

export default Add_Product;
