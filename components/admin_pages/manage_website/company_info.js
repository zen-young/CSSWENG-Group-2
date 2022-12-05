import React, { useEffect, useState } from 'react';
import Header_Live_Preview from '../Header_LivePreview';

import { db, storage } from "../../../firebaseConfig";
import { uuidv4 } from "@firebase/util";
import { getDoc, doc, updateDoc} from 'firebase/firestore';
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';

function Company_Info() {

    const [company_name, setCompanyName] = useState("")
    const [company_desc, setCompanyDesc] = useState("")
    const [company_img_url, setImgUrl] = useState("")
    const [img_file, setImgFile] = useState("")
    const [message, setMessage] = useState("")

    function getData(){

        var ref = doc(db, "website_information", "company_information")
        var x = getDoc(ref).then((res) => {
            if(res.exists()){
                var data = res.data()
                setCompanyName(data.company_name)
                setCompanyDesc(data.company_description)
                setImgUrl(data.company_logo)
            }
        })
    }

    function saveChanges(){

        var docref = doc(db, "website_information", "company_information");

        const uid = uuidv4();
        const filename = "images/" + img_file.name + "_" + uid;
        const storageRef = ref(storage, filename);

        uploadBytesResumable(storageRef, img_file).then((uploadResult) => {

            getDownloadURL(uploadResult.ref).then((url) => {
                updateDoc(docref, {
                    company_name: company_name,
                    company_description: company_desc,
                    company_logo: url,
                }).then(() => {
                    alert("Success");
                    window.location.reload(false)
                });
            })
        })
    }

    function handleImageUpload(e){
        setMessage("");

        let file = e.target.files;
        for (let i = 0; i < file.length; i++) {
            const fileType = file[i]["type"];
            const validTypes = ["image/gif", "image/jpeg", "image/png"];

            if (validTypes.includes(fileType)) {
                setImgFile(file[i]);
                setImgUrl(URL.createObjectURL(file[i]));
            } else {
                setMessage(
                    "Only Images of Type JPEG, PNG, and GIF are accepted"
                );
            }
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Header_Live_Preview title="Company Information" />

            <div className="flex-col w-full h-auto bg-gray-100 pl-[40px] py-[25px] pr-[40px]">
                <p className="text-[24px] font-bold mb-4">Company Name</p>

                <input
                    type="text"
                    className="w-full py-2 px-2 border border-black rounded-md mb-5"
                    defaultValue={company_name}
                />

                <div className='flex gap-5 mb-4 align-bottom'>
                    <p className="text-[24px] font-bold">Company Logo</p>
                    <p className='my-auto text-red-500'>{message}</p>
                </div>

                <div className='border border-black w-[150px] h-[150px] ml-5 mb-5'>
                    <img src={company_img_url} alt="" className='w-full h-full'/>
                </div>

                <div className="relative w-fit h-fit mb-5 ml-3 px-5 border border-black rounded-md align-middle bg-gray-300">
                    <input
                        type="file"
                        className="absolute w-full h-full opacity-0 z-10"
                        onChange={handleImageUpload}
                    />
                    <p className="text-center text-[20px] font-bold w-fit mx-auto">
                        Upload Image
                    </p>
                </div>

                <p className="text-[24px] font-bold mb-4">
                    Company Description -{" "}
                    <span className="text-[16px] italic font-normal">
                        The information displayed in the About Us Page
                    </span>
                </p>

                <textarea
                    rows={10}
                    className="w-full p-4 rounded-md mb-[30px] border border-black whitespace-pre-wrap"
                    defaultValue={company_desc}
                    onChange={(e) => {
                        setCompanyDesc(e.target.value)
                    }}
                />
                <div className="flex justify-end">
                    <button 
                        className="text-[20px] font-bold bg-green-500 py-2 px-5 rounded-md place-self-end self-end"
                        onClick={() => {
                            saveChanges()
                        }}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </>
    );
}

export default Company_Info;