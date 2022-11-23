
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { async } from "@firebase/util";

function Admin_Settings() {

    const auth = getAuth()
    const user = auth.currentUser;
    console.log(user)

    const [newEmail, setNewEmail] = useState('')
    const [newPass, setNewPass] = useState('')
    const [repPass, setRepeatPass] = useState('')
    const [message, setMessage] = useState()

    useEffect(() => {
        if(newPass.length > 0 && newPass != repPass){
            setMessage("New Password and Repeated Password must be the same")
        }
        else{
            setMessage("")
        }
    })

    async function updateUser(){
        
    }

    return (
        <>
            <div className="flex bg-[#282828] w-full h-[100px] items-center">
                <p className="text-[26px] text-white ml-[25px] font-semibold">
                    Admin Settings
                </p>
            </div>

            <form action="">
                <div className="flex-row px-[50px] py-[25px]">
                    <label
                        htmlFor="email"
                        className="block text-[20px] font-bold mb-[10px]"
                    >
                        Username / Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="w-full rounded-sm border border-black block mb-[25px] p-3"
                        value={user.email}
                        readOnly
                    />

                    {/* <label
                        htmlFor="username"
                        className="block text-[20px] font-bold mb-[10px]"
                    >
                        Username / Email:
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="w-full rounded-sm border border-black block mb-[25px] p-3"
                    /> */}

                    <label
                        htmlFor="currentpass"
                        className="block text-[20px] font-bold mb-[10px]"
                    >
                        Current Password:
                    </label>
                    <input
                        type="text"
                        name="currentpass"
                        id="currentpass"
                        className="w-full rounded-sm border border-black block mb-[25px] p-3"
                        value={user.prov}
                    />

                    <p className="w-full text-[12px] align-top text-center text-red-500">
                        {message}
                    </p>
                    <label
                        htmlFor="newpass"
                        className="block text-[20px] font-bold mb-[10px]"
                    >
                        New Password
                    </label>
                    <input
                        type="text"
                        name="newpass"
                        id="newpass"
                        className="w-full rounded-sm border border-black block mb-[25px] p-3"
                        onChange={(e) => {
                            setNewPass(e.target.value);
                        }}
                    />

                    <label
                        htmlFor="repeatpass"
                        className="block text-[20px] font-bold mb-[10px]"
                    >
                        Repeat New Password
                    </label>
                    <input
                        type="text"
                        name="repeatpass"
                        id="repeatpass"
                        className="w-full rounded-sm border border-black block mb-[25px] p-3"
                        onChange={(e) => {
                            setRepeatPass(e.target.value);
                        }}
                    />

                    <div className="flex justify-end">
                        <button 
                            className="px-[20px] py-[10px] bg-green-400 rounded-md text-[20px] text-black font-bold hover:brightness-90"
                            onClick={() => {}}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Admin_Settings;