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

function BrowerParticipants({ hackathonId }) {
  const { id } = useParams();
  const specializes = [
    {
      id: 1,
      name: "Full-stack developer",
      quantity: 82,
    },
    {
      id: 2,
      name: "Front-end developer",
      quantity: 45,
    },
    {
      id: 3,
      name: "Mobile developer",
      quantity: 12,
    },
    {
      id: 4,
      name: "Designer",
      quantity: 34,
    },
    {
      id: 5,
      name: "Data scientist",
      quantity: 31,
    },
    {
      id: 6,
      name: "Back-end developer",
      quantity: 12,
    },
    {
      id: 7,
      name: "Business",
      quantity: 9,
    },
    {
      id: 8,
      name: "Product manager",
      quantity: 2,
    },
    {
      id: 9,
      name: "Android app developer",
      quantity: 1,
    },
  ];
  const skills = [
    {
      name: "Javascript",
      quantity: 10,
    },
    {
      name: "Python",
      quantity: 3,
    },
    {
      name: "Java",
      quantity: 10,
    },
    {
      name: "react",
      quantity: 10,
    },
    {
      name: "html",
      quantity: 10,
    },
  ];

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

  useEffect(() => {
    dispatch(getAllRegisteredUsersHackathon({ id, page, limit: 10 }));
  }, [page, id]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  const handleSearch = () => {
    dispatch(
      getAllRegisteredUsersHackathon({
        id,
        page,
        limit: 10,
        search: searchTerm,
      })
    );
  };
  useEffect(() => {
    if (isSuccess) {
      setParticipants(registerUsers.data);
      setTotal(parseInt(registerUsers?.total));
      setTotalPage(Math.ceil(parseInt(registerUsers?.total) / limit));
      dispatch(resetValue({ key: "isSuccess", value: false }));
    }
    console.log("🚀 ~ useEffect ~ registerUsers:", registerUsers);
  }, [isSuccess]);
  return (
    <>
      {loading && <LoadingComponent />}

      <div>
        <div className="grid grid-cols-12 max-md:grid-cols-1 max-md:mt-1 gap-4 w-full h-full max-md:px-4 px-60">
          <div className="col-span-3 max-md:col-span-1 max-md:mt-1 mt-36 pr-10 max-md:pr-1">
            <div className="flex items-center">
              <div className="text-blue-600">Clear filters</div>
              <div className="ml-6 rounded-[3px] bg-blue-50 px-3 py-1 text-blue-700 text-sm my-1 mr-2">
                {2}
              </div>
            </div>
            <div className="mt-5 text-sm text-gray-600 font-normal">
              <div className="mb-4 ">
                <div className=" font-semibold mb-2 mt-5 uppercase"> Teams</div>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Working solo</span>
                </label>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Looking for teammates</span>
                </label>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Has a team</span>
                </label>
              </div>
              {/* Length Section */}
              <div className="mb-4">
                <div className=" font-semibold mb-2 mt-10 uppercase">
                  Specialties
                </div>
                {specializes.map((item, index) => {
                  return (
                    <>
                      <label
                        key={index}
                        className="my-2 flex items-center  space-x-2"
                      >
                        <input type="checkbox" className="form-checkbox" />
                        <div className="flex items-center flex-1 justify-between">
                          <span>{item?.name}</span>
                          <div className="p-1 bg-gray-100 text-xs">
                            {item.quantity}
                          </div>
                        </div>
                      </label>
                    </>
                  );
                })}
              </div>

              {/* Interest Tags Section */}
              <div className="mb-4">
                <div className=" font-semibold mb-2 mt-10 uppercase">
                  Skills
                </div>
                {skills.map((item, index) => {
                  return (
                    <>
                      <label
                        key={index}
                        className="my-2 flex items-center  space-x-2"
                      >
                        <input type="checkbox" className="form-checkbox" />
                        <div className="flex items-center flex-1 justify-between">
                          <span>{item.name}</span>
                          <div className="p-1 bg-gray-100 text-xs">
                            {item.quantity}
                          </div>
                        </div>
                      </label>
                    </>
                  );
                })}
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
              <dic className="text-gray-600">Showing {total} participants</dic>
              <div className="flex items-center">
                <div className="mr-3 font-medium">Sort:</div>
                <div className="flex items-center border border-gray-300 p-3">
                  <CustomButton
                    title="Newest"
                    containerStyles="text-blue-600 mb-[2px] font-medium px-2 hover:text-blue-800 text-sm bg-transparent"
                  />
                  <CustomButton
                    title="Projects"
                    containerStyles="text-blue-600 mb-[2px] font-medium px-2 hover:text-blue-800 text-sm bg-transparent"
                  />
                  <CustomButton
                    title="Followers"
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
