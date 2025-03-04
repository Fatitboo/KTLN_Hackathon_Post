import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SearchInput from "../../../components/Seeker/SearchInput";
import MultiSelectDropdown from "../../../components/Seeker/MultiSelectDropdown";
import CardProject from "../../../components/Seeker/CardProject";
import { adsBlog, defaultAvt, imgDefaultProject } from "../../../assets/images";
import { useEffect, useMemo, useState } from "react";
import { LoadingComponent, PaginationButtons } from "../../../components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import CardBlog from "../../../components/Seeker/CardBlog";
import {
  resetValue,
  searchBlogs,
} from "../../../redux/slices/occupations/occupationsSlices";
const blogTypes = [
  { id: 7, value: "All", label: "All" },
  { id: 0, value: "Hackathon planning", label: "Hackathon planning" },
  { id: 1, value: "Participant resources", label: "Participant resources" },
  { id: 2, value: "Business impact", label: "Business impact" },
  { id: 3, value: "Customer stories", label: "Customer stories" },
  { id: 4, value: "Guides", label: "Guides" },
  { id: 5, value: "In-person events", label: "In-person events" },
  { id: 6, value: "Webinars", label: "Webinars" },
];
function BrowerBlogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const limit = 12;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [totalPages, setTotalPage] = useState(1);
  let [currentBlogs, setCurrentBlogs] = useState([]);
  const [selectedTags, setSelectedTags] = useState(["All"]);
  let { loading, blogs, isSuccess } = useSelector((state) => state.occupations);
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSearch = () => {
    dispatch(
      searchBlogs({
        page,
        limit: 12,
        searchKeyword: searchTerm,
        selectedTags,
      })
    );
  };

  useEffect(() => {
    handleSearch();
  }, [page, selectedTags]);

  useEffect(() => {
    if (isSuccess) {
      setCurrentBlogs(blogs.data);
      setTotal(blogs?.total);
      setTotalPage(Math.ceil(blogs?.total / limit));
      dispatch(resetValue({ key: "isSuccess", value: false }));
    }
    console.log("🚀 ~ useEffect ~ blogs:", blogs);
  }, [isSuccess]);

  return (
    <>
      {loading && <LoadingComponent />}

      <div className="py-10 px-60 bg-[#f8f4f4] w-full  text-center font-bold items-center justify-between">
        <h1 className="text-5xl font-light mb-2">{"Blog"}</h1>
        <p className="text-lg mb-6 text-ellipsis font-light line-clamp-3">
          {
            "Learn how to run a hackathon and get new ideas, industry insights, and more on the Devpost blog"
          }
        </p>
        <img src={adsBlog} />
      </div>
      <div className="max-xl:px-4 px-60">
        {/* Popular hackthon */}
        <></>
        <div>
          <div className="max-xl:mt-1 gap-4 w-full h-full ">
            <div>
              <div className="">
                <SearchInput
                  btnText={"Search blogs"}
                  textPlaceholder={"Find blogs ... "}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  handleSearch={handleSearch}
                />
              </div>
              <div className=" max-xl:mt-1 mt-5">
                <div className="flex items-center text-sm text-gray-600 font-normal">
                  {/* Interest Tags Section */}
                  <div className="mt-3 mr-10">
                    <div className="mb-4 flex items-center ">
                      <div className=" font-semibold mr-3 ">Tags</div>
                      <MultiSelectDropdown
                        options={blogTypes}
                        setSelectedOptions={setSelectedTags}
                        selectedOptions={selectedTags}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 h-fit w-[600px]">
                    {(
                      selectedTags ?? [
                        "adobe",
                        "c#",
                        "illustrator",
                        "javascript",
                      ]
                    ).map((item, index) => {
                      return (
                        <>
                          <span
                            index={index}
                            className="bg-gray-200 px-4 py-1 text-sm "
                          >
                            {item}
                          </span>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* Title */}
              <div className="flex justify-between items-center text-sm mt-2">
                <dic className="text-gray-600">
                  Showing {currentBlogs.length ?? 0} in {total} blogs
                </dic>
              </div>
              <div className="my-5 grid grid-cols-3 max-md:grid-cols-1 max-xl:grid-cols-2 gap-10">
                {(currentBlogs || []).map((card, index) => (
                  <CardBlog
                    id={card?._id}
                    key={index}
                    blogType={card?.blogType}
                    title={card?.blogTitle}
                    description={card?.tagline}
                    image={card?.thumnailImage || imgDefaultProject}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <></>
        <div className="flex items-center justify-center mt-5">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-sm mr-4 list-none"
          >
            <BsChevronLeft />
          </button>
          {/* <span style={{ margin: "0 10px" }}>
                  Page {page} of {totalPages}
                </span> */}
          <span style={{ margin: "0 10px" }}>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-sm mr-4 list-none"
          >
            <BsChevronRight />
          </button>
        </div>
        {/*  */}
      </div>
    </>
  );
}

export default BrowerBlogs;
