
import { useEffect, useState } from "react";
import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, updateEmail, updatePassword } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../../firebaseConfig"

function Admin_Settings() {

    const Router = useRouter()

    const [currUser, setUser] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPass, setNewPass] = useState('')
    const [repPass, setRepeatPass] = useState('')
    const [message, setMessage] = useState('')

    const [hidden, setHidden] = useState(true)
    const [currPass, setCurrPass] = useState('')
    const [currEmail, setCurrEmail] = useState('')

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        });
    }, [])


    return (
        <>
            <div className="flex bg-[#282828] w-full h-[100px] items-center">
                <p className="text-[26px] text-white ml-[25px] font-semibold">
                    Admin Settings
                </p>
            </div>

            <div className="relative w-full h-full h-min-screen">
                <div
                    className={`absolute w-full h-screen bg-black bg-opacity-90 ${ hidden ? "hidden" : ""}`}
                >
                    <div className="absolute top-1/4 left-1/4 bg-white w-1/2 h-fit rounded-md p-5">
                        <p className="text-[14px]">
                            To change credentials, please re-enter your current
                            <span className="text-red-500"> EMAIL</span> and
                            <span className="text-red-500"> PASSWORD</span>
                        </p>

                        <p className="mt-3">Current Email: </p>
                        <input
                            type="text"
                            className="border border-black rounded-sm"
                            onChange={(e) => {
                                setCurrEmail(e.target.value);
                            }}
                        />

                        <p className="mt-3">Current Password: </p>
                        <input
                            type="password"
                            className="border border-black rounded-sm"
                            onChange={(e) => {
                                setCurrPass(e.target.value);
                            }}
                        />

                        <div className="flex justify-end mt-3">
                            <button
                                className="mr-auto border border-black p-2 rounded-md bg-gray-500 text-white hover:brightness-90"
                                onClick={() => {
                                    setHidden(true);
                                }}
                            >Cancel</button>

                            <button
                                className="border border-black p-2 rounded-md bg-green-400 text-white hover:brightness-90"
                                onClick={() => {
                                    var credetial = EmailAuthProvider.credential(currEmail, currPass)
                                    reauthenticateWithCredential(currUser, credetial).then((cred) => {

                                        var email
                                        if(newEmail.length == 0)
                                            email = currEmail
                                        else
                                            email = newEmail

                                        updateEmail(cred.user, email).then(() => {
                                            updatePassword(cred.user, newPass).then(() => {
                                                alert("Change Success!")
                                                window.location.reload(false)
                                            }).catch((err) => {
                                                alert("Error Occurred, Wrong Email / Password")
                                            })
                                        }).catch((err) => {
                                            alert("Error Occurred, Wrong Email / Password")
                                        })

                                    }).catch((err) => {
                                        console.log(err);
                                    })
                                }}
                            >Confirm Changes</button>
                        </div>
                    </div>
                </div>

                <div className="flex-row px-[50px] py-[25px]">
                    <form action="">
                        <p className="block text-[20px] font-bold mb-[10px]">
                            Current Username / Email
                        </p>
                        <input
                            type="text"
                            className="w-full rounded-sm border border-black block mb-[25px] p-3"
                            value={currUser.email}
                            readOnly
                        />

                        <p className="block text-[20px] font-bold mb-[10px]">
                            New Email
                        </p>
                        <input
                            type={"email"}
                            className="w-full rounded-sm border border-black block mb-[25px] p-3"
                            onChange={(e) => {
                                setNewEmail(e.target.value)
                            }}
                        />

                        <p className="w-full text-[12px] align-top text-center text-red-500">
                            {message}
                        </p>
                        <p className="block text-[20px] font-bold mb-[10px]">
                            Set New Password
                        </p>
                        <input
                            type="password"
                            className="w-full rounded-sm border border-black block mb-[25px] p-3"
                            onChange={(e) => {
                                setNewPass(e.target.value);
                            }}
                        />

                        <p className="block text-[20px] font-bold mb-[10px]">
                            Repeat New Password
                        </p>
                        <input
                            type="password"
                            className="w-full rounded-sm border border-black block mb-[25px] p-3"
                            onChange={(e) => {
                                setRepeatPass(e.target.value);
                            }}
                        />
                    </form>
                    <div className="flex justify-end ">
                        <button
                            disabled={repPass != newPass && newPass.length < 5}
                            className="px-[20px] py-[10px] bg-green-400 rounded-md text-[20px] text-black font-bold hover:brightness-90"
                            onClick={() => {
                                if (newPass != repPass)
                                    setMessage("Repeated Password is not the same.");
                                else if (newPass.length < 8)
                                    setMessage("New Password must atleast be 8 characters")
                                else
                                    setHidden(false);
                            }}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin_Settings;