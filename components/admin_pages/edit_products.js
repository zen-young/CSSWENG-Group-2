import { useState } from "react";
import { useRouter } from "next/router";
import { IconCircleX } from "@tabler/icons";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import { uuidv4 } from "@firebase/util";
import Header_Live_Preview from "./Header_LivePreview";
import { useEffect } from "react";

function Edit_Product(props) {
    const [message, setMessage] = useState("");

    // Values to fetch and put into forms
    const [images, setImages] = useState([]);
    const [prodName, setProductName] = useState("");
    const [category, setCategory] = useState([]);
    const [prodCateg, setProdCateg] = useState("")
    const [featured, setFeatured] = useState();
    const [prodDesc, setDescription] = useState("");
    const [sizes, setSizes] = useState([]);
    const [paperTypes, setTypes] = useState([]);
    const [rows, setRows] = useState([]);
    const [urls, setUrls] = useState([]);

    //Arrays holding added input html tags
    const [sizeInputs, setSizeInputs] = useState([]);
    const [paperInputs, setPaperInputs] = useState([]);
    const [rowInputs, setRowInputs] = useState([]);

    async function getURLS() {
        const promises = [];

        images &&
            images.map((image) => {
                const uid = uuidv4();
                const filename = "images/" + image.name + "_" + uid;
                const storageRef = ref(storage, filename);

                promises.push(
                    uploadBytesResumable(storageRef, image).then(
                        (uploadResult) => {
                            return getDownloadURL(uploadResult.ref);
                        }
                    )
                );
            });

        const urls = await Promise.all(promises);

        Array.prototype.forEach.call(
            document.getElementById("product_sizes").elements,
            (element) => {
                if (element.value.length > 0) sizes.push(element.value);
            }
        );

        Array.prototype.forEach.call(
            document.getElementById("paper_types").elements,
            (element) => {
                if (element.value.length > 0) paperTypes.push(element.value);
            }
        );

        var y = new Array();
        Array.prototype.forEach.call(
            document.getElementById("row_variations").elements,
            (element) => {
                y.push(element.value);

                if (y.length == 3) {
                    rows.push({
                        size: y[0],
                        quantity: y[1],
                        price: y[2],
                    });
                    y = new Array();
                }
            }
        );

        try {
            await setDoc(doc(db, "data", prodName.toString()), {
                product_name: prodName,
                category: category,
                featured: featured,
                product_description: prodDesc,
                sizes: sizes,
                paper_types: paperTypes,
                variations: rows,
                image_urls: urls,
            }).then(() => {
                setImages([]);
                setUrls([])
            });
        } catch (err) {
            console.log(err);
        }
    }

    //Add Image to images array
    function handleImageUpload(e) {
        setMessage("");
        let file = e.target.files;

        for (let i = 0; i < file.length; i++) {
            const fileType = file[i]["type"];
            const validTypes = ["image/gif", "image/jpeg", "image/png"];

            if (validTypes.includes(fileType)) {
                if(images.length == 0){
                    setImages([file[i]])
                    setUrls([URL.createObjectURL(file[i])])
                }else{
                    setImages((images) => [...images, file[i]]);
                    setUrls((urls) => [...urls, URL.createObjectURL(file[i])]);
                }
            } else {
                setMessage(
                    "Only Images of Type JPEG, PNG, and GIF are accepted"
                );
            }
        }
    }

    function removeImage(i) {
        let index = i;

        setImages((images) => images.filter((img, i) => i !== index));
        setUrls((urls) => urls.filter((imgurl, i) => i !== index));
    }

    //Add another input for sizes
    function add_size(props) {
        var x = (
            <li key={"size" + (props.index).toString()} className="flex">
                <IconCircleX
                    onClick={(e) => {
                        let x = e.target.parentNode;
                        x.nodeName === "LI"
                            ? x.remove()
                            : x.parentNode.remove();
                    }}
                    className="cursor-pointer"
                />
                <input
                    type="text"
                    className="w-full p-1 border border-black rounded-sm mt-[5px] mb-[10px]"
                    defaultValue={props.val}
                />
            </li>
        );
        setSizeInputs(sizeInputs => [...sizeInputs, x]);
    }

    //Add another input for paper types
    function add_type(props) {
        var x = (
            <li key={"type" + (props.index).toString()} className="flex">
                <IconCircleX
                    onClick={(e) => {
                        let x = e.target.parentNode;
                        x.nodeName === "LI"
                            ? x.remove()
                            : x.parentNode.remove();
                    }}
                    className="cursor-pointer"
                />
                <input
                    type="text"
                    className="w-full p-1 border border-black rounded-sm mt-[5px] mb-[10px]"
                    defaultValue={props.val}
                />
            </li>
        );
        setPaperInputs(paperInputs => [...paperInputs, x]);
    }

    //Add another row to variation rows
    function add_row(props) {
        var x = (
            <li key={"row" + (props.index).toString()} className="flex w-full mb-[10px]">
                <div className="flex w-1/3 justify-center">
                    <input
                        type="text"
                        className="w-1/2 border border-black rounded-sm"
                        defaultValue={props.val != null ? props.val.size : ""}
                    />
                </div>
                <div className="flex w-1/3 justify-center">
                    <input
                        type="text"
                        className="w-1/2 border border-black rounded-sm"
                        defaultValue={props.val != null ? props.val.quantity : ""}
                    />
                </div>
                <div className="flex w-1/3 justify-center">
                    <input
                        type="text"
                        className="w-1/2 border border-black rounded-sm"
                        defaultValue={props.val != null ? props.val.price : ""}
                    />
                </div>

                <IconCircleX
                    onClick={(e) => {
                        let x = e.target.parentNode;
                        x.nodeName === "LI"
                            ? x.remove()
                            : x.parentNode.remove();
                    }}
                    className="absolute cursor-pointer"
                />
            </li>
        );

        setRowInputs(rowInputs => [...rowInputs, x]);
    }

    async function getDocument(dbName, docName) {
        const docRef = doc(db, dbName, docName);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("Did not find document");
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    let count = 0
    async function loadData(){
        getDocument("products", "Notes").then((data) => {
            if (data != null) {
                setUrls(data.image_urls);
                setProductName(data.product_name);
                setDescription(data.product_description);
                setProdCateg(data.category);
                setTypes(data.paper_types);
                setSizes(data.sizes);
                setRows(data.variations);

                if (count == 0) {
                    for (let i = 1; i < data.sizes.length; i++) {
                        add_size({ val: data.sizes[i], index: i });
                    }

                    for (let j = 1; j < data.paper_types.length; j++) {
                        add_type({ val: data.paper_types[j], index: j });
                    }

                    for (let k = 1; k < data.variations.length; k++){
                        add_row({val: data.variations[k], index: k})
                        console.log(rows)
                    }
                }

                getDocument("categories", "category_list").then((categories) => {
                    const values = Object.values(categories);
                    setCategory(values);
                });

                count = 1
            }
        })
    }

    return (
        <>
            {/* TITLE OF PAGE AND LIVE PREVIEW BUTTON */}
            <Header_Live_Preview title="Edit Product" />

            {/* UPLOADING PRODUCT IMAGES */}
            <div className="flex-col w-full h-auto bg-gray-100 pr-[40px] pt-[25px]">
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
                                type="file"
                                onChange={handleImageUpload}
                                className="absolute h-full w-full bg-transparent opacity-0 z-10 cursor-pointer"
                                multiple
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
                            name="product_name"
                            className="w-full p-1 border border-black rounded-sm mt-[5px]"
                            value={prodName}
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
                                checked={featured}
                                onChange={(e) => {
                                    setFeatured(e.target.checked);
                                }}
                            />
                            <p>{featured}</p>
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
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            value={prodDesc}
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
                                    value={sizes[0]}
                                    required
                                />
                            </li>
                            {sizeInputs}
                        </ul>
                    </div>
                </form>

                <div className="flex items-end mb-[50px]">
                    <div className="w-2/5 pr-[25px]"></div>
                    <button
                        onClick={() => {
                            add_size();
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
                                    value={paperTypes[0]}
                                    required
                                />
                            </li>
                            {paperInputs}
                        </ul>
                    </div>
                </form>

                <div className="flex mb-[20px]">
                    <div className="w-2/5 pr-[25px]"></div>
                    <button
                        onClick={() => {
                            add_type();
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
                                            // value={rows == null ? 0 : rows[0].size}
                                        />
                                    </div>
                                    <div className="flex w-1/3 justify-center">
                                        <input
                                            type="text"
                                            className="w-1/2 border border-black rounded-sm"
                                            // value={rows.length > 0 ? 0 : rows[0].quantity}
                                        />
                                    </div>
                                    <div className="flex w-1/3 justify-center">
                                        <input
                                            type="text"
                                            className="w-1/2 border border-black rounded-sm"
                                            // value={rows.length > 0 ? 0 : rows[0].price}
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
                            add_row( {index: rowInputs.length} );
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
                            window.location.reload(false);
                        }}
                    >
                        Discard Changes
                    </button>
                    <button
                        className="font-bold text-[14px] border px-[20px] py-1 bg-green-500"
                        onClick={() => {
                            getURLS().then(() => {
                                window.location.reload(false);
                            });
                        }}
                    >
                        Save
                    </button>
                    <button
                        className="font-bold text-[14px] border px-[20px] py-1 bg-red-500"
                        onClick={() => {}}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </>
    );
}

export default Edit_Product;
