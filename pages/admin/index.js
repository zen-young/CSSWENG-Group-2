import { useEffect } from "react";
import { useRouter } from "next/router";

function Admin() {

    const router = useRouter()

    useEffect(() => {
        router.push("/admin/login")
    })

    return ( 
        <div className="w-full h-screen bg-black">

        </div>
    );
}

export default Admin;