

import { getDoc, collection, query, where, doc, getDocs, updateDoc } from "firebase/firestore"; 
import { db } from "../../../firebaseConfig";
import { useEffect, useState } from "react";
import Header_Live_Preview from "../Header_LivePreview";
import { IconCircleX } from "@tabler/icons";

function Home_Page(){

    //Uploaded images
    const [images, setImages] = useState([]);

    //List of featured products
    const [featProducts, setFeatProducts] = useState([])
    const [prodNames, setProdNames] = useState([])

    const [featURLS, setFeatURLS] = useState([]);
    const [featURLSCopy, setfeatURLCopy] = useState([]);
    const [newUrls, setNewUrls] = useState([]);
    const [message, setMessage] = useState("")

    function getData(){
        var ref = doc(db, "website_information", "home_page")
        var x = getDoc(ref).then((res) => {
            if(res.exists()){
                var data = res.data()
                setProdNames(data.featured_products)
                setFeatURLS(data.promotional_imgs)
                setfeatURLCopy(data.promotional_imgs)
            }
        })

        var arr = []
        getDocs(query(collection(db, "products"), where("featured", "==", true))).then((products) => {
            products.forEach(element => {
                arr.push(element.data())
            });
            setFeatProducts(arr)
        })
    }

    function handleImageUpload(e) {
        setMessage("");

        let file = e.target.files;
        for (let i = 0; i < file.length; i++) {
            const fileType = file[i]["type"];
            const validTypes = ["image/gif", "image/jpeg", "image/png"];

            if (validTypes.includes(fileType)) {
                setImages((images) => [...images, file[i]]);
                setNewUrls((newUrls) => [
                    ...newUrls,
                    URL.createObjectURL(file[i]),
                ]);
            } else {
                setMessage(
                    "Only Images of Type JPEG, PNG, and GIF are accepted"
                );
            }
        }
    }

    function removeImage(index) {

        let arrLen1 = featURLS.length
        let arrLen2 = newUrls.length
        
        if(index < arrLen1 && arrLen1 > 0){
            setFeatURLS((featURLS) => featURLS.filter((img_url, i) => i !== index))
            if(arrLen1 - 1 == 0)
                setFeatURLS([])
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

    function removeFromFeatured(productName){
        var arr = []
        getDocs(query(collection(db, "products"), where("name", "==", productName))).then((products) => {
            products.forEach(element => {
                arr.push(element.id)
            });

            var id = arr[0];
            updateDoc(doc(db, "products", id), {
                featured: false
            }).then(() => {
                getData()
            }).catch((err) => {
                console.log(err)
            })
        })
    }

    function saveChanges(){

    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Header_Live_Preview title="Home Page" />
            <p className="w-2/5 text-[20px] align-top pl-10 mt-10 font-bold">
                Promotional Images:
            </p>
            <div className="mx-auto w-11/12 bg-black h-[1px] mb-10" />
            <div
                id="images_collection"
                className="flex w-full gap-5 overflow-auto ml-5 mb-10"
            >
                <p>{message}</p>
                <div className="flex flex-nowrap gap-2 overflow-auto">
                    {featURLS.concat(newUrls).map((url, key) => {
                        return (
                            <div key={key + 1} className="relative">
                                <IconCircleX
                                    onClick={() => {
                                        removeImage(key);
                                    }}
                                    className="mdi mdi-close absolute right-1 cursor-pointer bg-red-400 rounded-full"
                                />

                                <img
                                    className="h-[150px] w-[200px] rounded-md cursor-pointer"
                                    src={url}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="relative h-[100px] w-[150px] justify-center bg-gray-100 rounded-md border-2 border-black border-dotted cursor-pointer hover:brightness-90">
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
                        className="max-h-[50px] m-auto cursor-pointer"
                    />
                    <p className="w-full text-center font-bold text-[12px] cursor-pointer">
                        Add Image
                    </p>
                </div>
            </div>

            <div className="flex justify-end mt-10">
                <button 
                    className="text-[20px] font-bold bg-green-500 py-2 px-5 rounded-md place-self-end self-end mr-10 hover:brightness-90"
                    onClick={() => {saveChanges()}}
                >
                    Save Changes
                </button>
            </div>
            
            <p className="w-2/5 text-[20px] align-top pl-10 mt-10 font-bold">
                Featured Products:
            </p>
            <div className="mx-auto w-11/12 bg-black h-[1px] mb-10" />
            {featProducts.map((val, index) => {
                return (
                    <div key={index} className="flex mx-10 mb-5 bg-gray-100 border border-gray-200 py-5 px-5 gap-5 shadow-lg">
                        <div className="w-fit">
                            <img src={val.image_urls[0]} alt="" className="w-[100px] h-[75px]" />
                        </div>
                        <p className="text-bold w-full my-auto font-bold text-[20px]">
                            {val.name}
                        </p>
                        <button 
                            className="w-2/5 h-fit bg-red-500 px-5 py-2 text-[12px] text-white font-semibold my-auto hover:brightness-90"
                            onClick={() => {
                                removeFromFeatured(val.name)    
                            }}
                        >
                            Remove From Featured
                        </button>
                    </div>
                );
            })}
        </>
    );
}

export default Home_Page