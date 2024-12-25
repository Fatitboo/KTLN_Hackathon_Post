import CustomButton from "../../../components/CustomButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import HackathonItem from "../../../components/Seeker/HackathonItem";
import { data_popular } from "../../../utils/data_hackathon";
import SearchInput from "../../../components/Seeker/SearchInput";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllHackathonsSeeker,
  resetValue,
} from "../../../redux/slices/hackathons/hackathonsSlices";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { LoadingComponent } from "../../../components";
import { hackathonTypes } from "../Setting/SettingRecommend";
import MultiSelectDropdown from "../../../components/Seeker/MultiSelectDropdown";
import { getAllTags } from "../../../redux/slices/projects/projectsSlices";

function BrowerHackathons() {
  const dispatch = useDispatch();
  const limit = 10;
  const location = useLocation();
  const { state } = location;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [totalPages, setTotalPage] = useState(1);
  let [currentHackathons, setCurrentHackathons] = useState([]);
  let { loading, hackathonsSeeker, isSuccess } = useSelector(
    (state) => state.hackathons
  );
  const [searchTerm, setSearchTerm] = useState(state?.searchTerm ?? "");
  const [showMoreTags, setShowMoreTags] = useState(false);
  const toggleShowMore = () => {
    setShowMoreTags(!showMoreTags);
  };
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedLength, setSelectedLength] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedHost, setSelectedHost] = useState(["All"]);
  const [selectedSort, setSelectedSort] = useState("recently_added");
  let { tags } = useSelector((state) => state.projects);
  useEffect(() => {
    dispatch(getAllTags({ type: "hackathon" }));
  }, []);
  useEffect(() => {
    handleSearch();
  }, [
    page,
    selectedLocations,
    selectedStatus,
    selectedLength,
    selectedTags,
    selectedHost,
    selectedSort,
  ]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  const handleSearch = () => {
    dispatch(
      getAllHackathonsSeeker({
        page,
        limit: 10,
        search: searchTerm,
        selectedLocations,
        selectedStatus,
        selectedLength,
        selectedTags,
        selectedHost,
        selectedSort,
      })
    );
  };
  useEffect(() => {
    if (isSuccess) {
      setCurrentHackathons(hackathonsSeeker.data);
      setTotal(hackathonsSeeker?.total);
      setTotalPage(Math.ceil(hackathonsSeeker?.total / limit));
      dispatch(resetValue({ key: "isSuccess", value: false }));
    }
  }, [isSuccess]);
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLocations([]);
    setSelectedStatus([]);
    setSelectedTags([]);
    setSelectedHost([]);
    setSelectedSort("recently_added");
    setPage(1); // Reset về trang đầu tiên
    window.location.reload();
  };
  return (
    <>
      <></>
      {loading && <LoadingComponent />}
      <div className=" h-40 flex items-center justify-center  bg-[#0b4540] text-white text-center font-bold">
        <h1>Join the world's best online and in-person hackathons</h1>
      </div>
      {/* Popular hackthon */}
      <></>
      <div>
        <div className="grid grid-cols-12 max-md:grid-cols-1 max-md:mt-1 gap-4 w-full h-full max-md:px-4 px-60">
          <div className="col-span-3 max-md:col-span-1 max-md:mt-1 mt-36">
            <div className="flex items-center">
              <div
                className="text-blue-600 cursor-pointer"
                onClick={clearFilters}
              >
                Clear filters
              </div>
            </div>
            <div className="mt-5 text-sm text-gray-600 font-normal">
              <div className="flex items-center">
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Match my eligibility</span>
                </label>
                <div className="text-blue-600 ml-10 cursor-pointer">Update</div>
              </div>
              <div className="mb-4 ">
                <div className="font-semibold mb-2 mt-5">Location</div>
                <label className="my-2 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="Online"
                    onChange={(e) =>
                      setSelectedLocations((prev) =>
                        e.target.checked
                          ? [...prev, e.target.value]
                          : prev.filter((loc) => loc !== e.target.value)
                      )
                    }
                  />{" "}
                  <span>Online</span>
                </label>
                <label className="my-2 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="In-person"
                    onChange={(e) =>
                      setSelectedLocations((prev) =>
                        e.target.checked
                          ? [...prev, e.target.value]
                          : prev.filter((loc) => loc !== e.target.value)
                      )
                    }
                  />{" "}
                  <span>In-person</span>
                </label>
              </div>
              {/* Status Section */}
              <div className="mb-4">
                <div className=" font-semibold mb-2 mt-10">Status</div>
                {["Upcoming", "Open", "Ended"].map((status) => (
                  <label
                    key={status}
                    className="my-2 flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      value={status}
                      className="form-checkbox mr-2"
                      onChange={(e) =>
                        setSelectedStatus((prev) =>
                          e.target.checked
                            ? [...prev, e.target.value]
                            : prev.filter((s) => s !== e.target.value)
                        )
                      }
                    />
                    {status}
                    <span
                      className={`w-2 h-2 rounded-full ${
                        status === "Upcoming"
                          ? "bg-orange-500"
                          : status === "Open"
                          ? "bg-teal-500"
                          : "bg-gray-500"
                      } `}
                    ></span>
                  </label>
                ))}
              </div>

              {/* Interest Tags Section */}
              <div className="mb-4">
                <div className=" font-semibold mb-2 mt-10">Interest tags</div>
                {hackathonTypes
                  .slice(0, Math.ceil((hackathonTypes.length * 1) / 2))
                  .map((tag) => (
                    <label
                      key={tag}
                      className="my-2 flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        value={tag}
                        className="form-checkbox mr-2"
                        onChange={(e) =>
                          setSelectedTags((prev) =>
                            e.target.checked
                              ? [...prev, e.target.value]
                              : prev.filter((t) => t !== e.target.value)
                          )
                        }
                      />
                      {tag}
                    </label>
                  ))}

                {showMoreTags && (
                  <div>
                    {/* Hiển thị thêm các tag khác */}
                    {hackathonTypes
                      .slice(Math.ceil((hackathonTypes.length * 1) / 2))
                      .map((tag) => (
                        <label
                          key={tag}
                          className="my-2 flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            value={tag}
                            className="form-checkbox mr-2"
                            onChange={(e) =>
                              setSelectedTags((prev) =>
                                e.target.checked
                                  ? [...prev, e.target.value]
                                  : prev.filter((t) => t !== e.target.value)
                              )
                            }
                          />
                          {tag}
                        </label>
                      ))}
                  </div>
                )}

                <button className="text-blue-500 mt-2" onClick={toggleShowMore}>
                  {showMoreTags
                    ? "Show less"
                    : `Show more (${Math.ceil(
                        (hackathonTypes.length * 1) / 2
                      )})`}
                </button>
              </div>

              {/* Host Section */}
              <div className="mb-4">
                <div className=" font-semibold mb-2 mt-10">Host</div>
                <MultiSelectDropdown
                  options={tags}
                  text={"Selected filter hosts"}
                  setSelectedOptions={setSelectedHost}
                  selectedOptions={selectedHost}
                />
                <div className="flex flex-wrap gap-2 mt-5">
                  {(selectedHost ?? ["Google"]).map((item, index) => {
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
          <div className="col-span-9 max-md:col-span-1 pl-5 pb-5">
            <div className="">
              <SearchInput
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
              />
            </div>
            {/* Title */}
            <div className="flex justify-between items-center text-sm mt-10">
              <div className="text-gray-600">
                Showing {currentHackathons.length ?? 10} hackathons of {total}
              </div>
              <div className="flex items-center">
                <div className="mr-3 font-medium">Sort:</div>
                <div className="flex items-center border border-gray-300 p-3">
                  <CustomButton
                    onClick={() => setSelectedSort("relevant")}
                    title="Most relevant"
                    containerStyles="text-blue-600 mb-[2px] font-medium px-2 hover:text-blue-800 text-sm bg-transparent"
                  />
                  <CustomButton
                    onClick={() => setSelectedSort("submission_date")}
                    title="Submission date"
                    containerStyles="text-blue-600 mb-[2px] font-medium px-2 hover:text-blue-800 text-sm bg-transparent"
                  />
                  <CustomButton
                    onClick={() => setSelectedSort("recently_added")}
                    title="Recently added"
                    containerStyles="text-blue-600 mb-[2px] font-medium px-2 hover:text-blue-800 text-sm bg-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              {(currentHackathons || []).map((hackathon, index) => {
                return (
                  <div key={hackathon?._id} className="my-6">
                    <Link to={`/Hackathon-detail/${hackathon?._id}/overview`}>
                      <HackathonItem
                        id={hackathon?._id}
                        startDate={hackathon?.submissions?.start}
                        endDate={hackathon?.submissions?.deadline}
                        themes={hackathon.hackathonTypes}
                        organization={hackathon?.hostName}
                        period={hackathon.period}
                        title={hackathon?.hackathonName}
                        isExtended={true}
                        isFeature={index % 2 === 0 ? true : false}
                        location={hackathon.location}
                        prizes={`${hackathon?.prizeCurrency ?? "$"} ${
                          hackathon?.prizes[0]?.cashValue ?? 1000
                        }`}
                        participants={hackathon?.registerUsers?.length ?? 0}
                        imageHackthon={hackathon?.thumbnail}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <></>
      {/* <div className="flex items-center justify-center">
        <CustomButton
          title="View all hackathons"
          containerStyles="bg-blue-600 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
        />
      </div> */}
      {/* Pagination Controls */}
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
    </>
  );
}

export default BrowerHackathons;
