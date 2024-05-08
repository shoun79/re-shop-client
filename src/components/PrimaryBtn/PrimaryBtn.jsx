
const PrimaryBtn = ({ children }) => {
    return (
        <button className="font-bold py-2 xl:py-3 text-xs md:text-base lg:text-lg xl:text-xl hover:scale-95 duration-300 px-4 lg:px-10 text-white bg-[#D1793E] hover:bg-[#dc600e]">{children}</button>
    );
};

export default PrimaryBtn;