import React, { useEffect, useState } from 'react';
import Header_Live_Preview from '../Header_LivePreview';

import { db, storage } from "../../../firebaseConfig";
import { uuidv4 } from "@firebase/util";
import { getDoc, doc, updateDoc} from 'firebase/firestore';
import { getDownloadURL, uploadBytesResumable, ref, deleteObject } from 'firebase/storage';

import RichTextEditor from '../Rich Text Editor/RichText';

function Company_Info() {

    const [company_name, setCompanyName] = useState("")
    const [company_desc, setCompanyDesc] = useState("")
    const [company_img_url, setImgUrl] = useState("")
    const [company_img_urlCopy, setCopy] = useState("")
    const [img_file, setImgFile] = useState("")
    const [message, setMessage] = useState("")

    const [btnDisabled, setDisabled] = useState(false)

    function getData(){

        var ref = doc(db, "website_information", "company_information")
        var x = getDoc(ref).then((res) => {
            if(res.exists()){
                var data = res.data()
                setCompanyName(data.company_name)
                setCompanyDesc(data.company_description)
                setImgUrl(data.company_logo)
                setCopy(data.company_logo)
            }
        })
    }

    function saveChanges(){

        var docref = doc(db, "website_information", "company_information");

        const uid = uuidv4();
        const filename = "images/" + img_file.name + "_" + uid;
        const storageRef = ref(storage, filename);

        if(company_img_url != company_img_urlCopy){
            uploadBytesResumable(storageRef, img_file).then((uploadResult) => {
                getDownloadURL(uploadResult.ref).then((url) => {
                    updateDoc(docref, {
                        company_name: company_name,
                        company_description: company_desc,
                        company_logo: url,
                    }).then(() => {
                        if(company_img_urlCopy != "")
                            deleteObject(ref(storage, company_img_urlCopy)).then(() => {
                                alert("Success");
                                window.location.reload(false);
                            }).catch((err) => {
                                console.log(err)
                            })
                        else{
                            alert("Success");
                            window.location.reload(false);
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }).catch((err) => {
                        console.log(err)
                })
            })
        }
        else{
            updateDoc(docref, {
                company_name: company_name,
                company_description: company_desc,
                company_logo: company_img_url,
            }).then(() => {
                alert("Success");
                window.location.reload(false);
            }).catch((err) => {
                console.log(err)
            })
        }
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

                <RichTextEditor 
                    id='rte' 
                    value={company_desc}
                    onChange={setCompanyDesc}
                    className="border border-black h-[300px] overflow-auto mb-20" 
                />

                <div className="flex justify-end">
                    <button 
                        className="text-[20px] font-bold bg-green-500 py-2 px-5 rounded-md place-self-end self-end"
                        disabled={btnDisabled}
                        onClick={() => {
                            setDisabled(true)
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