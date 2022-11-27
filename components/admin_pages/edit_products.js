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

function Add_Product({ setPages, productName }) {
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



    const [urls, setUrls] = useState([])
    const [productURLS, setProdURLS] = useState([])
    const [productURLSCopy, setProdURLCopy] = useState([]) 
    const [newUrls, setNewUrls] = useState([])

    // HTML ELEMENTS LIST
    const [sizeInputs, setSizeInputs] = useState([]);
    const [paperInputs, setPaperInputs] = useState([]);
    const [colorInputs, setColorInputs] = useState([]);
    const [includeRow, setIncludedRows] = useState([true, true, true]);
    const [rowInputs, setRowInputs] = useState([]);

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

        // Adds product to database
        try {
            await updateDoc(docRef, {
                name: prodName,
                category: prodCateg,
                featured: featured,
                description: prodDesc,
                product_sizes: sizes,
                paper_colors: colors,
                paper_types: paperTypes,
                variations: rows,
                image_urls: updatedUrls,
            }).then(() => {
                //Clear stored files and images in states
                console.log("SIZES: ", sizes)
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
        const docRef = doc(db, "products", prodName);
        await deleteDoc(docRef).then(() => {
            alert("Successfully Deleted Document")
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
                    x.nodeName === "LI" ? x.remove() : x.parentNode.remove();
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

    // Stores values in features to respective arrays
    function updateFeatureValues(feature) {
        switch (feature) {
            case 1: //Sizes
                var x = [];
                Array.prototype.forEach.call(
                    document.getElementById("product_sizes").elements,
                    (element) => {
                        if (
                            element.value.length > 0 &&
                            element.type != "checkbox"
                        ) {
                            x.push(element.value);
                        }
                        if (element.type == "checkbox") {
                            var [a, b, c] = includeRow;
                            setIncludedRows([element.checked, b, c]);
                        }
                    }
                );
                setSizes(x);
                break;

            case 2: //Paper Types
                var x = [];
                Array.prototype.forEach.call(
                    document.getElementById("paper_types").elements,
                    (element) => {
                        if (
                            element.value.length > 0 &&
                            element.type != "checkbox"
                        )
                            x.push(element.value);
                        if (element.type == "checkbox") {
                            var [a, b, c] = includeRow;
                            setIncludedRows([a, element.checked, c]);
                        }
                    }
                );
                setTypes(x);
                break;

            case 3: //Paper Colors
                var x = [];
                Array.prototype.forEach.call(
                    document.getElementById("paper_colors").elements,
                    (element) => {
                        if (
                            element.value.length > 0 &&
                            element.type != "checkbox"
                        ) {
                            x.push(element.value);
                        }
                        if (element.type == "checkbox") {
                            var [a, b, c] = includeRow;
                            setIncludedRows([a, b, element.checked]);
                        }
                    }
                );
                setColors(x);
                break;
        }
    }

    // Feature HTML Element / Component
    function FeatureComponent(title, feature) {
        return (
            <div className="flex w-full h-auto">
                <p className=" w-1/4 text-[16px] text-right">{title}:</p>
                <ul id="sizes" className="w-full align-middle">
                    <li className="flex mb-1">
                        <div className="flex justify-center w-1/6">
                            <input
                                type="checkbox"
                                checked={
                                    feature == 1
                                        ? includeRow[0]
                                        : feature == 2
                                        ? includeRow[1]
                                        : includeRow[2]
                                }
                                onChange={() => {
                                    updateFeatureValues(feature);
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
                                updateFeatureValues(feature);
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
                        updateFeatureValues(feature);
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
        let temp = []
        temp.push(rows[0] && rows[0].size ? true : false);
        temp.push(rows[0] && rows[0].paper_type ? true : false);
        temp.push(rows[0] && rows[0].color ? true : false);

        for(let i = 1; i < rows.length; i++){
            add_row(i)
        }
    }

    // Gets data for variation and stores it to rows
    function updateVariationsValue() {
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

                    if (y[0].name == "PaperColor") Obj["color"] = y[0].value;

                    if (y[0].name == "quantity") Obj["quantity"] = y[0].value;

                    if (y[0].name == "price") {
                        Obj["price"] = y[0].value;
                        rows.push(structuredClone(Obj));
                        Obj = {};
                    }
                }
            }
        );
    }

    //Add another row to variations' rows
    function add_row(index) {
        var x = (
            <li key={index ? index : rows.length + 1} className="flex w-full mb-[10px]">
                {includeRow[0] ? (
                    <div className="flex w-1/5 justify-center">
                        <select
                            name="ProdSize"
                            className="w-1/2 border border-black rounded-sm"
                            defaultValue={rows[index] ? rows[index].size : "DEFAULT"}
                        >
                            <option value="DEFAULT" disabled></option>
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

                {includeRow[1] ? (
                    <div className="flex w-1/5 justify-center">
                        <select
                            name="PaperType"
                            className="w-1/2 border border-black rounded-sm"
                            defaultValue={rows[index] ? rows[index].paper_type : "DEFAULT"}
                        >
                            <option value="DEFAULT" disabled></option>
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

                {includeRow[2] ? (
                    <div className="flex w-1/5 justify-center">
                        <select
                            name="PaperColor"
                            className="w-1/2 border border-black rounded-sm"
                            defaultValue={rows[index] ? rows[index].color : "DEFAULT"}
                        >
                            <option value="DEFAULT" disabled></option>
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
            arr.push(doc.id);
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

        // const docRef = doc(db, "products", Product_Name);
        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        //     var data = docSnap.data()
            
        //     return data
        // } else {
        //     // doc.data() will be undefined in this case
        //     console.log("No such document!")
        //     alert("Document Does Not Exist")
        // }
    }

    var count = 0
    const isFirstRender = useRef(true);
    // Runs when page is loaded
    useEffect(() => {
        if(isFirstRender.current == true){
            getCategories()

            // Product Parameter is to be changed later on
            getProduct(productName)

            isFirstRender.current = false;
            return
        }
        else{
            init_Features();
            if(rows.length > 1){
                init_Variations()
            }
        }
    }, [rows, sizes, colors, paperTypes]);



    return (
        <>
            {/* TITLE OF PAGE AND LIVE PREVIEW BUTTON */}
            <Header_Live_Preview title="Edit Product" />

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
                            {(productURLS.concat(newUrls)).map((url, key) => {
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
                            defaultValue={prodCateg}
                        >
                            <option value="DEFAULT" disabled>
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
                        {FeatureComponent("Product Sizes", 1)}
                    </form>
                    {FeatureButton("ADD PRODUCT SIZE", () =>
                        add_entry(sizeInputs, setSizeInputs, 1)
                    )}

                    {/* === ADD PAPER TYPES === */}
                    <form action="" id="paper_types">
                        {FeatureComponent("Paper Types", 2)}
                    </form>
                    {FeatureButton("ADD PAPER TYPE", () =>
                        add_entry(paperInputs, setPaperInputs, 2)
                    )}

                    {/* === ADD PAPER COLOR ==== */}
                    <form action="" id="paper_colors">
                        {FeatureComponent("Paper Color", 3)}
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
                        {includeRow[0] ? (
                            <p className="w-1/5 text-center">Product Size:</p>
                        ) : (
                            ""
                        )}
                        {includeRow[1] ? (
                            <p className="w-1/5 text-center">Paper Type:</p>
                        ) : (
                            ""
                        )}
                        {includeRow[2] ? (
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
                                {rows[0] && (
                                    <li className="flex w-full mb-[10px]">
                                        {includeRow[0] ? (
                                            <div className="flex w-1/5 justify-center">
                                                <select
                                                    name="ProdSize"
                                                    className="w-1/2 border border-black rounded-sm"
                                                    defaultValue={
                                                        rows[0].product_sizes ? rows[0].product_sizes : "DEFAULT"
                                                    }
                                                >
                                                    <option
                                                        value="DEFAULT"
                                                        disabled
                                                    ></option>
                                                    {sizes.map((val, key) => {
                                                        return (
                                                            <option
                                                                key={key}
                                                                value={val}
                                                            >
                                                                {val}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                        {includeRow[1] ? (
                                            <div className="flex w-1/5 justify-center">
                                                <select
                                                    name="PaperType"
                                                    className="w-1/2 border border-black rounded-sm"
                                                    defaultValue={
                                                        rows[0].paper_type ? rows[0].paper_type : "DEFAULT"
                                                    }
                                                >
                                                    <option
                                                        value="DEFAULT"
                                                        disabled
                                                    ></option>
                                                    {paperTypes.map(
                                                        (val, key) => {
                                                            return (
                                                                <option
                                                                    key={key}
                                                                    value={val}
                                                                >
                                                                    {val}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                        {includeRow[2] ? (
                                            <div className="flex w-1/5 justify-center">
                                                <select
                                                    name="PaperColor"
                                                    className="w-1/2 border border-black rounded-sm"
                                                    defaultValue={
                                                        rows[0].color ? rows[0].color : "DEFAULT"
                                                    }
                                                >
                                                    <option
                                                        value="DEFAULT"
                                                        disabled
                                                    ></option>
                                                    {colors.map((val, key) => {
                                                        return (
                                                            <option
                                                                key={key}
                                                                value={val}
                                                            >
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
                                                defaultValue={
                                                    rows[0].quantity ? rows[0].quantity : ""
                                                }
                                                className="w-1/2 border border-black rounded-sm"
                                            />
                                        </div>

                                        <div className="flex w-1/5 justify-center">
                                            <input
                                                name="price"
                                                type="text"
                                                defaultValue={
                                                    rows[0].price ? rows[0].price : ""
                                                }
                                                className="w-1/2 border border-black rounded-sm"
                                            />
                                        </div>
                                    </li>
                                )}

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
                            setPages(5)
                        }}
                    >
                        Discard Changes
                    </button>
                    <button
                        className="font-bold text-[14px] border px-[20px] py-1 bg-green-500"
                        onClick={() => {
                            updateVariationsValue();
                            addToDatabase().then(() => {
                                //What to do after adding to database
                                setPages(5)
                            });
                        }}
                    >
                        Save
                    </button>
                    <button
                        className="font-bold text-[14px] border px-[20px] py-1 bg-red-500"
                        onClick={() => { 
                            deleteDocument().then(() => {
                                setPages(5)
                            })
                            //Insert What to do after deleting
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </>
    );
}

export default Add_Product;
