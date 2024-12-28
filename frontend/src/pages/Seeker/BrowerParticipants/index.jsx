import CustomButton from "../../../components/CustomButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HackathonItem from "../../../components/Seeker/HackathonItem";
import SearchInput from "../../../components/Seeker/SearchInput";
import ParticipantItem from "../../../components/Seeker/ParticipantItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRegisteredUsersHackathon,
  resetValue,
} from "../../../redux/slices/hackathons/hackathonsSlices";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { LoadingComponent } from "../../../components";
import { Link, useParams } from "react-router-dom";
import { hackathonTypes, specialties } from "../Setting/SettingRecommend";
import { getAllTags } from "../../../redux/slices/projects/projectsSlices";
import MultiSelectDropdown from "../../../components/Seeker/MultiSelectDropdown";

function BrowerParticipants({ hackathonId }) {
  const { id } = useParams();

  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState(["All"]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const dispatch = useDispatch();
  const limit = 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPage] = useState(1);
  const [participants, setParticipants] = useState([]);
  let { loading, registerUsers, isSuccess } = useSelector(
    (state) => state.hackathons
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showMoreTags, setShowMoreTags] = useState(false);
  const toggleShowMore = () => {
    setShowMoreTags(!showMoreTags);
  };
  const [selectedSort, setSelectedSort] = useState("newest");

  useEffect(() => {
    handleSearch();
  }, [
    page,
    id,
    selectedSpecialties,
    selectedSkills,
    selectedStatuses,
    selectedTags,
    selectedSort,
  ]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  let { tags } = useSelector((state) => state.projects);
  useEffect(() => {
    dispatch(getAllTags({ type: "user", id }));
  }, []);
  const handleSearch = () => {
    dispatch(
      getAllRegisteredUsersHackathon({
        id,
        page,
        limit: 10,
        search: searchTerm,
        specialty: selectedSpecialties,
        skills: selectedSkills,
        status: selectedStatuses,
        interestedIn: selectedTags,
        sort: selectedSort,
      })
    );
  };
  const handleStatusChange = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((item) => item !== status)
        : [...prev, status]
    );
  };

  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialties(
      (prev) =>
        prev.includes(specialty)
          ? prev.filter((item) => item !== specialty) // Remove if already selected
          : [...prev, specialty] // Add if not selected
    );
  };

  useEffect(() => {
    if (isSuccess) {
      setParticipants(registerUsers.data);
      setTotal(parseInt(registerUsers?.total));
      setTotalPage(Math.ceil(parseInt(registerUsers?.total) / limit));
      dispatch(resetValue({ key: "isSuccess", value: false }));
    }
  }, [isSuccess]);
  const clearFilters = () => {
    setSearchTerm("");
    setPage(1);
    setSelectedSort("newest");
    window.location.reload();
  };
  return (
    <>
      {loading && <LoadingComponent />}

      <div>
        <div className="grid grid-cols-12 max-md:grid-cols-1 max-md:mt-1 gap-4 w-full h-full max-md:px-4 px-60">
          <div className="col-span-3 max-md:col-span-1 max-md:mt-1 mt-36 pr-10 max-md:pr-1">
            <div className="flex items-center">
              <div
                className="text-blue-600 cursor-pointer"
                onClick={clearFilters}
              >
                Clear filters
              </div>
            </div>
            <div className="mt-5 text-sm text-gray-600 font-normal">
              <div className="mb-4 ">
                <div className=" font-semibold mb-2 mt-5 uppercase">
                  {" "}
                  Team status
                </div>
                {["working_solo", "finding_teamate", "had_team"].map(
                  (status, index) => (
                    <label
                      key={index}
                      className="my-2 flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox mr-2"
                        onChange={() => handleStatusChange(status)}
                        checked={selectedStatuses.includes(status)}
                      />
                      {status === "working_solo"
                        ? "Working solo"
                        : status === "finding_teamate"
                        ? "Looking for teammate"
                        : "Has team"}
                    </label>
                  )
                )}
              </div>
              {/* Length Section */}
              <div className="mb-4">
                <div className=" font-semibold mb-2 mt-10 uppercase">
                  Specialties
                </div>
                {specialties.map((item, index) => (
                  <label
                    key={index}
                    className="my-2 flex items-center  space-x-2"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox mr-2"
                      onChange={() => handleSpecialtyChange(item)}
                      checked={selectedSpecialties.includes(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>

              {/* Interest Tags Section */}
              <div className="mb-4">
                <div className=" font-semibold mb-2 mt-10 uppercase">
                  Skills
                </div>
                <MultiSelectDropdown
                  options={tags}
                  text={"Selected filter skills"}
                  setSelectedOptions={setSelectedSkills}
                  selectedOptions={selectedSkills}
                />
                <div className="flex flex-wrap gap-2 mt-5">
                  {(selectedSkills ?? ["java"]).map((item, index) => {
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
            </div>
          </div>
          <div className="col-span-9 max-md:col-span-1 pl-5 pb-5">
            <div className="">
              <SearchInput
                textPlaceholder={"Search participants by name,..."}
                btnText={"Search participant"}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
              />
            </div>
            {/* Title */}
            <div className="flex justify-between items-center text-sm mt-10">
              <div className="text-gray-600">Showing {total} participants</div>
              <div className="flex items-center">
                <div className="mr-3 font-medium">Sort:</div>
                <div className="flex items-center border border-gray-300 p-3">
                  <CustomButton
                    onClick={() => setSelectedSort("newest")}
                    title="Newest"
                    containerStyles="text-blue-600 mb-[2px] font-medium px-2 hover:text-blue-800 text-sm bg-transparent"
                  />
                  <CustomButton
                    onClick={() => setSelectedSort("projects")}
                    title="Projects"
                    containerStyles="text-blue-600 mb-[2px] font-medium px-2 hover:text-blue-800 text-sm bg-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              {participants.map((item, index) => {
                return (
                  <div className="my-6" key={index}>
                    <Link to={`/Seeker-detail/${item?.userId._id}/Projects`}>
                      <ParticipantItem props={item} />
                    </Link>
                  </div>
                );
              })}
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
    </>
  );
}

export default BrowerParticipants;
