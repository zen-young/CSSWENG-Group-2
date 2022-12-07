import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { IconCircleX } from "@tabler/icons";
import {
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    query,
    collection,
    getDocs,
    where,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import { uuidv4 } from "@firebase/util";
import { useEffect } from "react";
import Header_Live_Preview from "./Header_LivePreview";

function Edit_Product({ setPages, productName }) {
    const [message, setMessage] = useState("");

    // PRODUCT DATA
    const [images, setImages] = useState([]);
    const [prodName, setProductName] = useState("");
    const [category, setCategory] = useState([]);
    const [prodCateg, setProdCateg] = useState("");
    const [featured, setFeatured] = useState(false);
    const [prodDesc, setDescription] = useState("");
    const [sizes, setSizes] = useState([]);
    const [paperTypes, setTypes] = useState([]);
    const [rows, setRows] = useState([]);
    const [colors, setColors] = useState([]);
    const [docId, setDocId] = useState([])

    const [productURLS, setProdURLS] = useState([])
    const [productURLSCopy, setProdURLCopy] = useState([]) 
    const [newUrls, setNewUrls] = useState([])

    // HTML ELEMENTS LIST
    const [sizeInputs, setSizeInputs] = useState([]);
    const [paperInputs, setPaperInputs] = useState([]);
    const [colorInputs, setColorInputs] = useState([]);
    const [includeSize, setIncludeSize] = useState([true]);
    const [includeType, setIncludeType] = useState([true]);
    const [includeColor, setIncludeColor] = useState([true]);
    const [rowInputs, setRowInputs] = useState([]);

    const [warningHidden, setWarningHidden] = useState(true);

    //Adds a doc to the database
    async function addToDatabase() {
        const promises = [];

        //Pushes images to storage with unique filename
        images && images.map((image) => {
                const uid = uuidv4();
                const filename = "images/" + image.name + "_" + uid;
                const storageRef = ref(storage, filename);

                //Uploads Image with unique name
                promises.push(
                    uploadBytesResumable(storageRef, image).then(
                        (uploadResult) => {
                            return getDownloadURL(uploadResult.ref);
                    }
                )
            );
        });

        //List of Firebase Urls for each newly uploaded image
        const reformedURLS = await Promise.all(promises);

        const updatedUrls = productURLS.concat(reformedURLS);
        var removedImages = productURLSCopy.filter((x) => !productURLS.includes(x));

        // Delete images if any
        try {
            if(removedImages.length > 0){    
                var fileRef = ref(storage, removedImages);
                if (fileRef) {
                    deleteObject(fileRef)
                        .then(() => {
                            console.log("file deleted");
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            }
        } catch (error) {
            console.log(error)
        }
        
        const docRef = doc(db, "products", docId)
        // const newRows = updateVariationsValue()
        // Adds product to database
        try {
            await updateDoc(docRef, {
                name: prodName,
                category: prodCateg,
                featured: featured,
                description: prodDesc,
                product_sizes: updateFeatureValues()[0],
                paper_types: updateFeatureValues()[1],
                paper_colors: updateFeatureValues()[2],
                variations: updateVariationsValue(),
                image_urls: updatedUrls,
            }).then(() => {
                //Clear stored files and images in states
                setImages([]);
                setUrls([]);
            });
        } catch (err) {
            console.log(err);
        }

        //Update Categories
        try {
            await updateDoc(doc(db, "categories", prodCateg), {
                products: arrayUnion(prodName.toString()),
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Deletes from database
    async function deleteDocument(){
        if(newUrls.length > 0){
            for(let i = 0; i < newUrls.length; i++){
                var photo = newUrls[i];
                const storageRef = ref(storage, photo);
                deleteObject(storageRef).then(()=> {
                    console.log("Deleted Image")
                }).catch((error) =>{
                    alert("Error Detected")
                    console.log(error.message)
                })
            }
        }

        const docRef = doc(db, "products", docId);
        await deleteDoc(docRef).then(() => {
            // alert("Successfully Deleted Document")
        }).catch((error) =>{
            alert("Error Occurred: ", error)
        });
    }

    //Add Image to images array
    function handleImageUpload(e) {
        setMessage("");

        let file = e.target.files;
        for (let i = 0; i < file.length; i++) {
            const fileType = file[i]["type"];
            const validTypes = ["image/gif", "image/jpeg", "image/png"];

            if (validTypes.includes(fileType)) {
                setImages((images) => [...images, file[i]]);
                setNewUrls((newUrls) => [...newUrls, URL.createObjectURL(file[i])]);
            } else {
                setMessage(
                    "Only Images of Type JPEG, PNG, and GIF are accepted"
                );
            }
        }
    }

    //Remove selected image
    function removeImage(index) {

        let arrLen1 = productURLS.length
        let arrLen2 = newUrls.length
        
        if(index < arrLen1 && arrLen1 > 0){
            setProdURLS((productURLS) => productURLS.filter((img_url, i) => i !== index))
            if(arrLen1 - 1 == 0)
                setProdURLS([])
        }

        else if(index >= arrLen1 && arrLen1 > 0){
            setNewUrls((newUrls) => newUrls.filter((img_url, i) => i !== (index - arrLen1)))
            setImages((images) => images.filter((img, i) => i !== (index - arrLen1)));
            if(arrLen2 - 1 == 0){
                setNewUrls([])
                setImages([])
                document.getElementById("image_files").value = null;
            }
        }

        else if(arrLen1 == 0){
            setNewUrls((newUrls) => newUrls.filter((img_url, i) => i !== index))
            if (arrLen2 - 1 == 0) {
                setNewUrls([]);
                setImages([]);
                document.getElementById("image_files").value = null;
            }
        }
    }

    //Icon component for Product Features/Attributes
    const FeatureRemoveIcon = (
        <div className="flex w-1/6 justify-center">
            <IconCircleX
                onClick={(e) => {
                    let x = e.target.parentNode.parentNode;
                    let x_par = x.parentNode
                    x.nodeName === "LI" ? x.remove() : x_par.remove();  
                }}
                className="cursor-pointer stroke-red-500"
            />
        </div>
    );

    //Add Feature Button
    function FeatureButton(buttonTitle, buttonFunc) {
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
        );
    }

    function handleInclude(feature){
        switch (feature) {
            case 1:
                setIncludeSize(!includeSize)
                break;
            case 2:
                setIncludeType(!includeType)
                break;
            case 3:
                setIncludeColor(!includeColor)
                break;
        }
    }

    // Stores values in features to respective arrays
    function updateFeatureValues() {
        var arr = []

        var x = [];
        Array.prototype.forEach.call(
            document.getElementById("product_sizes").elements,
            (element) => {
                if (element.value.length > 0 && element.type != "checkbox")
                    x.push(element.value);
            }
        );
        arr.push(x);
        setSizes(x);

        var y = [];
        Array.prototype.forEach.call(
            document.getElementById("paper_types").elements,
            (element) => {
                if (element.value.length > 0 && element.type != "checkbox")
                    y.push(element.value);
            }
        );
        arr.push(y);
        setTypes(y);

        var z = [];
        Array.prototype.forEach.call(
            document.getElementById("paper_colors").elements,
            (element) => {
                if (element.value.length > 0 && element.type != "checkbox")
                    z.push(element.value);
            }
        );
        arr.push(z)
        setColors(z);

        return arr;
    }

    // Feature HTML Element / Component
    function FeatureComponent(title, feature, key) {
        return (
            <div key={key} className="flex w-full h-auto">
                <p className=" w-1/4 text-[16px] text-right">{title}:</p>
                <ul id="sizes" className="w-full align-middle">
                    <li className="flex mb-1">
                        <div className="flex justify-center w-1/6">
                            <input
                                type="checkbox"
                                checked={
                                    feature == 1
                                        ? includeSize
                                        : feature == 2
                                        ? includeType
                                        : includeColor
                                }
                                onChange={() => {
                                    // updateFeatureValues();
                                    handleInclude(feature)
                                }}
                                className="w-[20px]"
                            />
                        </div>
                        <input
                            type="text"
                            className="w-4/6 p-1 border border-black rounded-sm"
                            defaultValue={
                                feature == 1
                                    ? sizes[0]
                                    : feature == 2
                                    ? paperTypes[0]
                                    : colors[0]
                            }
                            onChange={() => {
                                updateFeatureValues();
                            }}
                            required
                        />
                    </li>
                    {
                        feature == 1 ? sizeInputs :
                        feature == 2 ? paperInputs :
                        colorInputs
                    }
                </ul>
            </div>
        );
    }

    // Add new entry for feature
    function add_entry(inputs, inputFunc, feature, val) {
        var x = (
            <li key={inputs.length + 1} className="flex mb-1">
                {FeatureRemoveIcon}
                <input
                    type="text"
                    className="w-4/6 p-1 border border-black rounded-sm"
                    defaultValue={val ? val : ""}
                    onChange={() => {
                        updateFeatureValues();
                    }}
                />
            </li>
        );
        inputFunc((inputs) => [...inputs, x]);
    }

    function init_Features(){
        sizes.map((val, index) => {
            if (index != 0 && sizeInputs.length == 0) add_entry(sizeInputs, setSizeInputs, 1, val);
        });

        paperTypes.map((val, index) => {
            if (index != 0 && paperInputs.length == 0) add_entry(paperInputs, setPaperInputs, 2, val);
        });

        colors.map((val, index) => {
            if (index != 0 && colorInputs.length == 0) add_entry(colorInputs, setColorInputs, 3, val);
        });
    }

    function init_Variations(){
        if(rows.length > 0){
            if (rowInputs.length == 0) {
                for (let i = 0; i < rows.length; i++) {
                    add_row(i);
                }
            }
        }   
    }

    // Gets data for variation and stores it to rows
    function updateVariationsValue() {
        var variations = []
        Array.prototype.forEach.call(
            document.getElementById("variations").children,
            (child, index) => {
                let x = child.children; //Each Div
                
                var Obj = new Object();

                for (let i = 0; i < x.length; i++) {
                    let y = x[i].children;

                    if (y[0].name == "ProdSize") Obj["size"] = y[0].value;

                    if (y[0].name == "PaperType")
                        Obj["paper_type"] = y[0].value;

                    if (y[0].name == "PaperColor")
                        Obj["color"] = y[0].value;

                    if (y[0].name == "quantity")
                        Obj["quantity"] = y[0].value;

                    if (y[0].name == "price") {
                        Obj["price"] = y[0].value;
                        variations.push(structuredClone(Obj));
                        Obj = {};
                    }
                }
            }
        );
        return variations;
    }

    //Add another row to variations' rows
    function add_row(index) {
        var x = (
            <li key={index} className="flex w-full mb-[10px]">
                {includeSize ? (
                    <div className="flex w-1/5 justify-center">
                        <select
                            name="ProdSize"
                            className="w-1/2 border border-black rounded-sm"
                            defaultValue={rows[index] ? rows[index].size : ""}
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
                ) : (
                    ""
                )}

                {includeType ? (
                    <div className="flex w-1/5 justify-center">
                        <select
                            name="PaperType"
                            className="w-1/2 border border-black rounded-sm"
                            defaultValue={rows[index] ? rows[index].paper_type : ""}
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
                ) : (
                    ""
                )}

                {includeColor ? (
                    <div className="flex w-1/5 justify-center">
                        <select
                            name="PaperColor"
                            className="w-1/2 border border-black rounded-sm"
                            defaultValue={rows[index] ? rows[index].color : ""}
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
                ) : (
                    ""
                )}

                <div className="flex w-1/5 justify-center">
                    <input
                        name="quantity"
                        type="text"
                        defaultValue={rows[index] ? rows[index].quantity : ""}
                        className="w-1/2 border border-black rounded-sm"
                    />
                </div>

                <div className="flex w-1/5 justify-center">
                    <input
                        name="price"
                        type="text"
                        defaultValue={rows[index] ? rows[index].price : ""}
                        className="w-1/2 border border-black rounded-sm"
                    />
                </div>

                <IconCircleX
                    onClick={(e) => {
                        let x = e.target.parentNode;
                        x.nodeName === "LI"
                            ? x.remove()
                            : x.parentNode.remove();
                        setRows((rows) => rows.filter((row, i) => i !== index))
                    }}
                    className="absolute cursor-pointer stroke-red-500"
                />
            </li>
        );

        setRowInputs((rowInputs) => [...rowInputs, x]);
    }

    // Gets all product categories
    async function getCategories() {
        const arr = [];
        const querySnapshot = await getDocs(
            query(collection(db, "categories"))
        );
        querySnapshot.forEach((doc) => {
            arr.push(doc.data().name);
        });
        setCategory(arr);
    }

    // Get product details
    async function getProduct(Product_Name){
        var arr = []
        const docQuery = await getDocs(
            query(collection(db, "products"), where("name", "==", Product_Name))
        );
        docQuery.forEach((doc) => {
            arr.push(doc)
        })
        
        if(arr.length > 0){
            var data = arr[0].data()
            setDocId(arr[0].id)
            setProductName(data.name);
            setProdCateg(data.category);
            setDescription(data.description);
            setFeatured(data.featured);
            setProdURLS(data.image_urls);
            setProdURLCopy(data.image_urls);
            setColors(data.paper_colors);
            setTypes(data.paper_types);
            setSizes(data.product_sizes);
            setRows(data.variations);
            return data;
        }else{
            console.log("No such document!");
            alert("Document Does Not Exist");
        }
    }

    var count = 0
    const isFirstRender = useRef(true);
    // Runs when page is loaded
    useEffect(() => {
        if(isFirstRender.current == true){
            getCategories()
            getProduct(productName)

            isFirstRender.current = false;
            return
        }
        else{
            init_Features();
            init_Variations()
        }
    }, [rows, sizes, colors, paperTypes]);


    return (
        <>
            {/* TITLE OF PAGE AND LIVE PREVIEW BUTTON */}
            <Header_Live_Preview title="Edit Product" />

            {/* UPLOADING PRODUCT IMAGES pl-[20px] pt-[25px]*/}
            <div className="relative flex flex-col w-full h-full bg-gray-100 pr-[40px] ">
                
                {/* Confirm Delete */}
                <div className={`absolute w-full h-full z-10 bg-black bg-opacity-80 ${warningHidden ? "hidden" : ""}`} id="delete_warning">
                    <div className="absolute top-1/3 left-1/4 w-1/2 h-auto my-auto mx-auto bg-white opacity-100 px-2 py-2 rounded-md">
                        <div className="flex-col text-center">
                            <img className="w-[50px] mx-auto mb-[20px]" src="/assets/warning_icon.png" alt="" />
                            <p>Please Confirm Delete</p>
                            <p>You are about to delete Product: <span className="font-bold">{prodName}</span></p>
                            <p>Do you really want to delete this product?</p>
                            <div className="flex gap-5 justify-center mt-[20px]">
                                <button 
                                    className="w-1/4 bg-gray-300 rounded-md p-2 hover:brightness-90"
                                    onClick={ () => {
                                        setWarningHidden(true)}
                                    }
                                >
                                    Cancel
                                </button>
                                <button 
                                    className="w-1/4 bg-red-500 rounded-md hover:brightness-90 text-white"
                                    onClick={ () => {
                                        deleteDocument().then(() => {setPages(5)})} 
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="w-full text-[12px] align-top text-center text-red-500 mb-[20px] mt-[40px]">
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
                            {productURLS.concat(newUrls).map((url, key) => {
                                return (
                                    <div key={key + 1} className="relative">
                                        <IconCircleX
                                            onClick={() => {
                                                removeImage(key);
                                            }}
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
                            defaultValue={prodName}
                            onChange={(e) => {
                                setProductName(e.target.value);
                            }}
                        />
                    </div>

                    {/* CATEGORY */}
                    <div className="flex mb-[20px] w-full h-auto">
                        <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                            Category:
                        </p>
                        <select
                            name="category"
                            onChange={(e) => {
                                setProdCateg(e.target.value);
                            }}
                            className="w-full p-1 border border-black rounded-sm mt-[5px]"
                            value={prodCateg}
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
                                checked={featured}
                                className="w-[20px] h-[20px] align-middle"
                                onChange={(e) => {
                                    setFeatured(e.target.checked);
                                }}
                            />
                        </span>
                    </div>

                    {/* PRODUCT DESCRIPTION TEXTAREA */}
                    <div className="flex mb-[50px] w-full h-auto align-top">
                        <p className="w-2/5 text-[20px] align-top text-right pr-[25px]">
                            Product Description:
                        </p>
                        <textarea
                            name="product_desc"
                            className="w-full h-[150px] p-1 border border-black rounded-sm mt-[5px]"
                            defaultValue={prodDesc}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </div>
                </form>

                <div className="flex-col pt-5 mb-10">
                    <p className="text-[20px] font-bold ml-10 mb-2">
                        Product Features
                    </p>
                    <div className="flex">
                        <p className="ml-10 w-1/4 text-right text-[12px] font-bold">
                            Feature Name
                        </p>
                        <p className="ml-5 w-3/6 text-[12px] font-bold">
                            Add to Variation
                        </p>
                        <p className="w-full text-[12px] font-bold">
                            Feature Values
                        </p>
                    </div>

                    <div className="mx-auto bg-gray-700 w-11/12 h-[1px] mb-4" />
                    {/* === ADD PRODUCT SIZES === */}
                    <form action="" id="product_sizes">
                        {FeatureComponent("Product Sizes", 1, "sizes")}
                    </form>
                    {FeatureButton("ADD PRODUCT SIZE", () =>
                        add_entry(sizeInputs, setSizeInputs, 1)
                    )}

                    {/* === ADD PAPER TYPES === */}
                    <form action="" id="paper_types">
                        {FeatureComponent("Paper Types", 2, "types")}
                    </form>
                    {FeatureButton("ADD PAPER TYPE", () =>
                        add_entry(paperInputs, setPaperInputs, 2)
                    )}

                    {/* === ADD PAPER COLOR ==== */}
                    <form action="" id="paper_colors">
                        {FeatureComponent("Paper Color", 3, "colors")}
                    </form>
                    {FeatureButton("ADD PAPER COLOR", () =>
                        add_entry(colorInputs, setColorInputs, 3)
                    )}

                    <div className="mx-auto bg-black w-11/12 h-[2px] mb-4" />
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
                        {includeSize ? ( 
                            <p className="w-1/5 text-center">Product Size:</p>
                        ) : (
                            ""
                        )}
                        {includeType ? (
                            <p className="w-1/5 text-center">Paper Type:</p>
                        ) : (
                            ""
                        )}
                        {includeColor ? (
                            <p className="w-1/5 text-center">Paper Color:</p>
                        ) : (
                            ""
                        )}
                        <p className="w-1/5 text-center">Quantity (pcs):</p>
                        <p className="w-1/5 text-center">Price:</p>
                    </div>
                </div>

                <form action="" id="row_variations">
                    <div className="flex w-full mb-[20px]">
                        <div className="w-1/5 pr-[25px]"></div>
                        <div className="w-full">
                            <ul id="variations">
                                {rowInputs}
                            </ul>
                        </div>
                    </div>
                </form>

                <div className="flex mb-[100px]">
                    <div className="w-2/5 pr-[25px]"></div>
                    <button
                        onClick={(e) => {
                            add_row(rowInputs.length);
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
                            setPages(5);
                        }}
                    >
                        Discard Changes
                    </button>
                    <button
                        className="font-bold text-[14px] border px-[20px] py-1 bg-green-500"
                        onClick={() => {
                            addToDatabase().then(() => {
                                setPages(5);
                            });
                        }}
                    >
                        Save
                    </button>
                    <button
                        className="font-bold text-[14px] border px-[20px] py-1 bg-red-500"
                        onClick={() => {
                            setWarningHidden(false)
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </>
    );
}

export default Edit_Product;
