import CustomButton from "../../../components/CustomButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HackathonItem from "../../../components/Seeker/HackathonItem";
import SearchInput from "../../../components/Seeker/SearchInput";
import MultiSelectDropdown from "../../../components/Seeker/MultiSelectDropdown";
import CardProject from "../../../components/Seeker/CardProject";
import { defaultAvt, imgDefaultProject } from "../../../assets/images";
import { useEffect, useMemo, useState } from "react";
import { LoadingComponent, PaginationButtons } from "../../../components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProjects,
  getAllTags,
  resetValue,
} from "../../../redux/slices/projects/projectsSlices";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function BrowerProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const limit = 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [totalPages, setTotalPage] = useState(1);
  let [currentProjects, setCurrentProjects] = useState([]);
  const [selectedTags, setSelectedTags] = useState(["All"]);
  const [withDemoVideos, setWithDemoVideos] = useState(false);
  const [withGallery, setWithGallery] = useState(false);
  const [winnersOnly, setWinnersOnly] = useState(false);
  const [joinHackathon, setJoinHackathon] = useState(false);
  const [sortOption, setSortOption] = useState("Newest");
  let { loading, projects, isSuccess, tags } = useSelector(
    (state) => state.projects
  );
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSearch = () => {
    dispatch(
      getAllProjects({
        page,
        limit: 12,
        searchKeyword: searchTerm,
        withDemoVideos,
        withGallery,
        selectedTags,
        sortOption,
        winnersOnly,
        joinHackathon,
      })
    );
  };

  useEffect(() => {
    handleSearch();
  }, [
    page,
    withDemoVideos,
    withGallery,
    selectedTags,
    sortOption,
    winnersOnly,
    joinHackathon,
  ]);

  useEffect(() => {
    dispatch(getAllTags({ type: "project" }));
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setCurrentProjects(projects.data);
      setTotal(projects?.total);
      setTotalPage(Math.ceil(projects?.total / limit));
      dispatch(resetValue({ key: "isSuccess", value: false }));
    }
    console.log("🚀 ~ useEffect ~ projects:", projects);
  }, [isSuccess]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
    setWithDemoVideos(false);
    setWithGallery(false);
    setSortOption("Newest");
    setPage(1); // Reset về trang đầu tiên
  };

  return (
    <>
      {loading && <LoadingComponent />}

      <div className="py-10 px-60 flex h-40 bg-[#0b4540] w-full text-white text-center font-bold items-center justify-between">
        <h1>Explore projects from Portfolios and hackathons</h1>
        <CustomButton
          title="Add your projects"
          containerStyles="bg-[#21a196] w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base"
        />
      </div>
      <div className="max-xl:px-4 px-60">
        {/* Popular hackthon */}
        <></>
        <div>
          <div className="max-xl:mt-1 gap-4 w-full h-full ">
            <div>
              <div className="">
                <SearchInput
                  btnText={"Search projects"}
                  textPlaceholder={"Find projects ... "}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  handleSearch={handleSearch}
                />
              </div>
              <div className=" max-xl:mt-1 mt-5">
                <div className="flex items-center">
                  <div
                    className="text-blue-600 cursor-pointer"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </div>
                  <div className="ml-6 rounded-[3px] bg-blue-50 px-3 py-1 text-blue-700 text-sm my-1 mr-2"></div>
                </div>
                <div className="grid grid-cols-4 max-xl:grid-cols-2 text-sm text-gray-600 font-normal">
                  <div className="mb-4 ">
                    <div className=" font-semibold mb-2 mt-5">
                      Projects include
                    </div>
                    <label className="my-2 flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={withDemoVideos}
                        onChange={() => setWithDemoVideos(!withDemoVideos)}
                      />
                      <span>With demo videos</span>
                    </label>
                    <label className="my-2 flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={withGallery}
                        onChange={() => setWithGallery(!withGallery)}
                      />
                      <span>With a gallery</span>
                    </label>
                  </div>
                  {/* Status Section */}
                  <div className="mb-4">
                    <div className=" font-semibold mb-2 mt-5">
                      Projects has prizes
                    </div>
                    <label className="my-2 flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={winnersOnly}
                        onChange={() => setWinnersOnly(!winnersOnly)}
                      />
                      <span>Winners only</span>
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    </label>
                    <label className="my-2 flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={joinHackathon}
                        onChange={() => setJoinHackathon(!joinHackathon)}
                      />
                      <span>Joined Hackathon</span>
                      <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    </label>
                  </div>

                  {/* Interest Tags Section */}
                  <div className="mt-3">
                    <div className="mb-4 flex items-center ">
                      <div className=" font-semibold mr-3 ">Tags</div>
                      <MultiSelectDropdown
                        options={tags}
                        setSelectedOptions={setSelectedTags}
                        selectedOptions={selectedTags}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 w-[600px]">
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
              </div>
              {/* Title */}
              <div className="flex justify-between items-center text-sm mt-2">
                <dic className="text-gray-600">
                  Showing {currentProjects.length ?? 0} in {total} projects
                </dic>
                <div className="flex items-center">
                  <div className="mr-3 font-medium">Sort:</div>
                  <div className="flex items-center border border-gray-300 p-3">
                    <CustomButton
                      onClick={() => setSortOption("Newest")}
                      title="Newest"
                      containerStyles="text-blue-600 mb-[2px] font-medium px-2 hover:text-blue-800 text-sm bg-transparent"
                    />
                    <CustomButton
                      title="Popular"
                      onClick={() => setSortOption("Popular")}
                      containerStyles="text-blue-600 mb-[2px] font-medium px-2 hover:text-blue-800 text-sm bg-transparent"
                    />
                  </div>
                </div>
              </div>
              <div className="my-5 grid grid-cols-4 max-xl:grid-cols-2 gap-6">
                {(currentProjects || []).map((card, index) => (
                  <CardProject
                    id={card?._id}
                    key={index}
                    member={card.createdBy}
                    title={card?.projectTitle}
                    description={card?.tagline}
                    image={card?.thumnailImage || imgDefaultProject}
                    imgUser={defaultAvt}
                    isWinner={card.isWinner}
                    votes={card.votes}
                    comments={card.comments}
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

export default BrowerProjects;
