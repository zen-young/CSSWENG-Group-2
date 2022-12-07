import Header_Live_Preview from "../Header_LivePreview";
import { db } from "../../../firebaseConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { createElement, useEffect, useState } from "react";

import RichTextEditor from "../Rich Text Editor/RichText";

function Order_Page() {

    const [order, setOrder] = useState("")
    const [add, setAdd] = useState("")
    const [editorVal, setEditorVal] = useState()

    function saveChanges(){
        var docRef = doc(db, "website_information", "order_page")

        updateDoc(docRef, {
            additional_information: editorVal,
            order_confirmation: order
        }).then(() => {
            alert("Success")
            window.location.reload(false)
        })

    }

    function getData(){
        var docRef = doc(db, "website_information", "order_page")

        getDoc(docRef).then((res) =>{
            var data = res.data()
            setOrder(data.order_confirmation);
            setEditorVal(data.additional_information)
        })
    }


    useEffect(() => {
        getData()
    }, [])
    
    return (
        <>
            <Header_Live_Preview title="Order Page" />

            <div className="flex-col w-full h-auto bg-gray-100 pl-[40px] py-[25px] pr-[40px]">

                <p className="mt-5 mb-2 font-bold text-[20px]">Order Confirmation -
                    <span className="italic font-normal text-[16px]"> Describes how the details order page will be sent</span>
                </p>
                <input
                    type="text"
                    className="w-full py-2 px-2 border border-black rounded-md mb-5"
                    value={order}
                    onChange={(e) => {setOrder(e.target.value)}}
                />

                <p className="mt-5 mb-2 font-bold text-[20px]">Additional Information -
                    <span className="italic font-normal text-[16px]">  
                        Any additional details the customer should send alongside the order form
                    </span>
                </p>

                <RichTextEditor 
                    id='rte' 
                    value={editorVal}
                    onChange={setEditorVal}
                    className="border border-black h-[300px] overflow-auto" 
                />
                {editorVal}
                <div className="flex justify-end mt-32">
                    <button 
                        className="text-[20px] font-bold bg-green-500 py-2 px-5 rounded-md place-self-end self-end"
                        onClick={() => {saveChanges()}}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </>
    );
}

export default Order_Page;
