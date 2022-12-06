import Quill from "./quill";


function Home_Page(){

    const [images, setImages] = useState([]);

    const [productURLS, setProdURLS] = useState([]);
    const [productURLSCopy, setProdURLCopy] = useState([]);
    const [newUrls, setNewUrls] = useState([]);

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

    return (
        <>
            <Header_Live_Preview title="Home Page" />
            <p>Promotional Images</p>
            
        </>
    );
}

export default Home_Page