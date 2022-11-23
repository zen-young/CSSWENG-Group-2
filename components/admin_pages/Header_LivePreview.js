
function Header_Live_Preview(props) {
    return (
        <div className="flex bg-[#282828] w-full h-[100px] items-center">
            <p className="text-[26px] text-white ml-[25px] font-semibold">
                {props.title}
            </p>
            <button className="ml-auto mr-10 py-2 px-5 bg-cyan-400 hover:brightness-90 rounded-sm font-bold text-[14px]">
                Live Preview
            </button>
        </div>
    );
}

export default Header_Live_Preview;