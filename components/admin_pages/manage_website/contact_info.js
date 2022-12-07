import { useEffect, useState } from "react";
import Header_Live_Preview from "../Header_LivePreview";


import { db } from "../../../firebaseConfig";
import { getDoc, doc, updateDoc} from 'firebase/firestore';

function Contact_Info() {

    const [header, setHeader] = useState("")
    const [contact_num, setContactNum] = useState("")
    const [company_email, setEmail] = useState("")
    const [company_address, setAddress] = useState("")
    const [service_hrs, setServiceHRS] = useState("")

    const [fb_link, setFb] = useState("")
    const [enableFB, setEnableFB] = useState()

    const [twit_link, setTwit] = useState("");
    const [enableTwit, setEnableTwit] = useState("");

    const [insta_link, setInsta] = useState("");
    const [enableInsta, setEnableInsta] = useState("");

    function getData(){
        var docRef = doc(db, "website_information", "contact_information")
        getDoc(docRef).then((res) => {
            if (res.exists()) {
                var data = res.data();
                setHeader(data.header);
                setContactNum(data.contact_number);
                setEmail(data.email);
                setAddress(data.company_address);
                setServiceHRS(data.service_hours);
                setFb(data.fb)
                setTwit(data.twitter)
                setInsta(data.instagram)
                setEnableFB(data.enableFB)
                setEnableTwit(data.enableTwitter)
                setEnableInsta(data.enableInstagram)
            }
        });
    }

    function saveChanges(){
        var docRef = doc(db, "website_information", "contact_information")
        updateDoc(docRef, {
            header: header,
            contact_number: contact_num,
            email: company_email,
            company_address: company_address,
            service_hours: service_hrs,
            fb: fb_link,
            twitter: twit_link,
            instagram: insta_link,
            enableFB: enableFB,
            enableTwitter: enableTwit,
            enableInstagram: enableInsta
        }).then(() => {
            alert("Success");
            window.location.reload(false)
        });
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Header_Live_Preview title="Contact Information" />

            <div className="flex-col w-full h-auto bg-gray-100 pl-[40px] py-[25px] pr-[40px]">
                <p className="text-[18px] font-bold mb-2">Contact Header</p>
                <input
                    type="text"
                    className="w-full py-2 px-2 border border-black rounded-md mb-5"
                    defaultValue={header}
                    onChange={(e) => {
                        setHeader(e.target.value);
                    }}
                />

                <p className="text-[18px] font-bold mb-2">Contact Number</p>
                <input
                    type="text"
                    className="w-full py-2 px-2 border border-black rounded-md mb-5"
                    defaultValue={contact_num}
                    onChange={(e) => {
                        setContactNum(e.target.value);
                    }}
                />

                <p className="text-[18px] font-bold mb-2">
                    Company Email Address
                </p>
                <input
                    type="text"
                    className="w-full py-2 px-2 border border-black rounded-md mb-5"
                    defaultValue={company_email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />

                <p className="text-[18px] font-bold mb-2">Company Address</p>
                <input
                    type="text"
                    className="w-full py-2 px-2 border border-black rounded-md mb-5"
                    defaultValue={company_address}
                    onChange={(e) => {
                        setAddress(e.target.value);
                    }}
                />

                <p className="text-[18px] font-bold mb-2">Service Hours</p>
                <input
                    type="text"
                    className="w-full py-2 px-2 border border-black rounded-md mb-5"
                    defaultValue={service_hrs}
                    onChange={(e) => {
                        setServiceHRS(e.target.value);
                    }}
                />

                <p className="text-[18px] font-bold mb-2">
                    Social Media Links:{" "}
                </p>
                <div className="flex align-middle gap-3">
                    <input
                        type="checkbox"
                        name=""
                        id=""
                        className="my-auto w-1/12"
                        checked={enableFB}
                        onChange={(e) => {
                            setEnableFB(!enableFB);
                        }}
                    />
                    <p className="text-[18px] font-bold my-auto w-3/12">
                        Facebook:{" "}
                    </p>
                    <input
                        type="text"
                        className="w-full px-2 border border-black rounded-md my-auto "
                        value={fb_link}
                        onChange={(e) => {setFb(e.target.value)}}
                    />
                </div>

                <div className="flex align-middle gap-3">
                    <input
                        type="checkbox"
                        name=""
                        id=""
                        className="my-auto w-1/12"
                        checked={enableTwit}
                        onChange={(e) => {
                            setEnableTwit(!enableTwit);
                        }}
                    />
                    <p className="text-[18px] font-bold my-auto w-3/12">
                        Twitter:{" "}
                    </p>
                    <input
                        type="text"
                        className="w-full px-2 border border-black rounded-md my-auto "
                        value={twit_link}
                        onChange={(e) => {setTwit(e.target.value)}}
                    />
                </div>

                <div className="flex align-middle gap-3 mb-10">
                    <input
                        type="checkbox"
                        name=""
                        id=""
                        className="my-auto w-1/12"
                        checked={enableInsta}
                        onChange={(e) => {
                            setEnableInsta(!enableInsta);
                        }}
                    />
                    <p className="text-[18px] font-bold my-auto w-3/12">
                        Instagram:{" "}
                    </p>
                    <input
                        type="text"
                        className="w-full px-2 border border-black rounded-md my-auto "
                        value={insta_link}
                        onChange={(e) => {setInsta(e.target.value)}}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        className="text-[20px] font-bold bg-green-500 py-2 px-5 rounded-md place-self-end self-end"
                        onClick={() => {
                            saveChanges();
                        }}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </>
    );
}

export default Contact_Info;