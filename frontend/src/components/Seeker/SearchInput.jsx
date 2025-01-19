import { AiOutlineSearch } from "react-icons/ai";
import CustomButton from "../CustomButton";

const SearchInput = ({
  btnText,
  textPlaceholder,
  searchTerm,
  setSearchTerm,
  handleSearch,
}) => {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <div className="max-xl:block flex mt-10 items-center flex-row mr-5">
        <form className="flex-1  flex bg-[#fff] shadow-[0_18px_40px_rgba(25,15,9,0.1)] rounded-sm border border-gray-400 p-1 mr-5 items-center">
          <AiOutlineSearch className="w-5 h-5 ml-2 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={textPlaceholder || "Find your next Hackathons..... "}
            className="w-full bg-no-repeat rounded-sm bg-left py-1 pl-8 pr-5 mr-10 outline-none"
          ></input>
        </form>
        <CustomButton
          onClick={handleSearch}
          title={btnText || "Search hackathon"}
          containerStyles="bg-blue-600 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
        />
      </div>
    </>
  );
};
export default SearchInput;
