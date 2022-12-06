import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Quill_Editor() {
    const [value, setValue] = useState("");

    const modules = {
        toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]    

    return (
        <ReactQuill 
            theme="snow" 
            value={value} 
            onChange={setValue}
            modules={modules}
            formats={formats}
            className="h-auto min-h-[300px] flex-1 flex-col border border-black overflow-hidden"
        />
    );
}

export default Quill_Editor