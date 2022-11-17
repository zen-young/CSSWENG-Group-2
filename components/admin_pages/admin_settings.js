
function Admin_Settings() {
    return (
        <>
            <div className="flex bg-[#282828] w-full h-[100px] items-center">
                <p className="text-[26px] text-white ml-[25px] font-semibold">Admin Settings</p>
            </div>

            <form action="">
                <div className="flex-row px-[50px] py-[50px]">
                    <label
                        htmlFor="email"
                        className="block text-[20px] font-bold mb-[10px]"
                    >
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="w-full rounded-sm border border-black block mb-[25px] p-3"
                    />

                    <label
                        htmlFor="username"
                        className="block text-[20px] font-bold mb-[10px]"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="w-full rounded-sm border border-black block mb-[25px] p-3"
                    />

                    <label
                        htmlFor="currentpass"
                        className="block text-[20px] font-bold mb-[10px]"
                    >
                        Current Password
                    </label>
                    <input
                        type="text"
                        name="currentpass"
                        id="currentpass"
                        className="w-full rounded-sm border border-black block mb-[25px] p-3"
                    />

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
                    />

                    <div className="flex justify-end">
                        <button className="px-[20px] py-[10px] bg-green-400 rounded-md text-[20px] text-black font-bold">
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Admin_Settings;