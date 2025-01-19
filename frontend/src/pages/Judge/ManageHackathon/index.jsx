import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  deleteHackathonComponent,
  getAllHackathons,
  resetValue,
} from "../../../redux/slices/hackathons/hackathonsSlices";
import { ComboBox, PaginationButtons } from "../../../components";
import { MdRateReview } from "react-icons/md";

const listItemCbb = [
  { id: 1, name: "All", value: "All" },
  { id: 2, name: "Approved", value: "approved" },
  { id: 3, name: "Pending", value: "pending" },
  { id: 4, name: "WaitPayment", value: "waitPayment" },
  { id: 5, name: "Rejected", value: "rejected" },
  { id: 6, name: "Blocked", value: "blocked" },
];

function ManageJudgeHackathon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [selectId, setSelectedId] = useState();
  let [currentHackathons, setCurrentHackathons] = useState([]);
  let [currentPage, setCurrentPage] = useState([]);
  let { loading, hackathons, hackathonId, isSuccessHost, isSuccessDelete } =
    useSelector((state) => state.hackathons);

  let { userAuth } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllHackathons({ userId: userAuth.user.id, isJudge: true }));
  }, []);
  useEffect(() => {
    if (hackathons) {
      setCurrentHackathons(hackathons);
    }
  }, [hackathons]);

  useEffect(() => {
    if (isSuccessHost) {
      navigate(`/Organizer/host-hackathon/${hackathonId}`);
      dispatch(resetValue({ key: "isSuccessHost", value: false }));
    }
  }, [isSuccessHost]);

  useEffect(() => {
    if (isSuccessDelete) {
      setCurrentHackathons(hackathons.filter((item) => item._id !== selectId));
      dispatch(resetValue({ key: "isSuccessDelete", value: false }));
    }
  }, [isSuccessDelete]);
  const onFilterValueSelected = (filterValue) => {};

  const handleSearch = (e) => {
    console.log(e);
    setCurrentHackathons(
      hackathons.filter(
        (item) =>
          item.hackathonName
            .toLowerCase()
            .trim()
            .includes(e.target.value.toLowerCase().trim()) ||
          item.tagline
            .toLowerCase()
            .trim()
            .includes(e.target.value.toLowerCase().trim()) ||
          item.applyFor
            .toLowerCase()
            .trim()
            .includes(e.target.value.toLowerCase().trim()) ||
          item.hackathonTypes
            .join("")
            .toLowerCase()
            .trim()
            .includes(e.target.value.toLowerCase().trim())
      )
    );
  };

  const handleDeleteProject = (item) => {
    Swal.fire({
      title: `Confirm Delete`,
      text: `Are you sure you want to delete this organizer?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteHackathonComponent({ id: item._id }));
      }
    });
  };

  return (
    <div className="px-10 pb-0">
      {/* Start title of page  */}

      {/* Start main content  to display something*/}
      <div className="flex flex-wrap mt-3">
        <div className="max-w-full pt-3 shrink-0 w-full">
          <div className="relative rounded-lg bg-white shadow max-w-full shrink-0 w-full px-6 py-6">
            <div className="font-medium text-3xl text-gray-900 mb-4 leading-10">
              Manage Hackathons!
            </div>
            <div className="relative w-full">
              {/* Start header of content */}
              <div className="relative flex justify-between items-center flex-wrap bg-transparent mb-2">
                <div className="flex gap-2">
                  <div className="relative">
                    <form action="#" method="post">
                      <div className="relative mb-0">
                        <AiOutlineSearch
                          fontSize={22}
                          color="#a7a9ad"
                          className="absolute l-3 t-0 h-10 justify-center ml-2 text-center z-10 "
                        />
                        <input
                          type="search"
                          onChange={handleSearch}
                          name="search-field"
                          id="search-field"
                          placeholder="Search"
                          className="relative mt-2 block w-72 border pt-1 pb-1 pl-10 h-9 pr-5 text-sm bg-[#f0f5f7] focus:bg-white  rounded-md"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="w-40">
                    <ComboBox
                      listItem={listItemCbb}
                      filterValueSelected={onFilterValueSelected}
                    />
                  </div>
                </div>
                <div className="flex "></div>
              </div>

              {/* Start table */}
              <div className="relative">
                <div className="overflow-y-hidden overflow-x-auto">
                  <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0 ">
                    <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                      <tr className="w-full">
                        <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-4/12 pl-5 ">
                          Hackathon Name
                        </th>
                        <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-[14%]">
                          Status
                        </th>
                        <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-1/12">
                          Apply for
                        </th>
                        <th className="relative text-[#3a60bf] font-medium py-6 text-base w-[14%] text-center">
                          Tagline
                        </th>
                        <th className="relative text-[#3a60bf] font-medium py-6 text-base text-center w-1/12">
                          Theme tags
                        </th>
                        <th className="relative text-[#3a60bf] font-medium py-6 text-base text-center w-2/12">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading
                        ? [1, 2, 3, 4].map((item, index) => {
                            return (
                              <tr
                                key={index}
                                className="animate-pulse relative shadow rounded-md p-4 w-full mx-auto gap-2"
                              >
                                <td className="space-x-4 py-2.5 px-0.5 w-full flex items-center">
                                  {/* <div className="rounded-full bg-slate-200 h-12 w-12"></div> */}
                                  <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                      </div>
                                      <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                  </div>
                                </td>
                                <td className="space-x-4 py-2.5 px-0.5 w-1/12">
                                  {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                  <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                      </div>
                                      <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                  </div>
                                </td>
                                <td className="space-x-4 py-2.5 px-0.5 w-1/12">
                                  {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                  <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                      </div>
                                      <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                  </div>
                                </td>
                                <td className="space-x-4 py-2.5 px-0.5 w-[14%]">
                                  {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                  <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                      </div>
                                      <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                  </div>
                                </td>
                                <td className="space-x-4 py-2.5 px-0.5 w-1/12">
                                  {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                  <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                      </div>
                                      <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                  </div>
                                </td>
                                <td className="space-x-4 py-2.5 px-0.5 w-full">
                                  {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                  <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                      </div>
                                      <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        : [...currentHackathons]
                            ?.reverse()
                            ?.slice(currentPage * 10, (currentPage + 1) * 10)
                            .map((item, index) => {
                              return (
                                <tr
                                  key={index}
                                  className="relative border-b border-solid border-[#ecedf2] w-full hover:bg-[#f4f2f2] cursor-pointer px-5  "
                                >
                                  <td className="relative pl-5 py-5 font-normal text-base w-3/12">
                                    <div className="mb-0 relative h-16 gap-2 flex flex-row items-center">
                                      {/* <span className="absolute l-0 t-0 w-10">
                                                                        <img src={item.logoProject} className="inline-block max-w-full h-auto align-middle" alt="logo" />
                                                                    </span> */}
                                      <div className="w-12 h-12">
                                        <img
                                          src={item.thumbnail}
                                          className="w-full h-full"
                                          alt="description of image"
                                        />
                                      </div>
                                      <div>
                                        <div className="font-medium text-md text-ellipsis mb-1 line-clamp-2 ">
                                          {item.hackathonName}
                                        </div>
                                        <div className="flex font-light text-sm">
                                          {item.update_at.split("T")[0]}{" "}
                                          {item.update_at.split("T")[1]}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="font-light text-white w-1/12">
                                    <div className="items-center bg-[#00B69B] rounded-full flex justify-center font-semibold w-24">
                                      <div className="mr-1">
                                        {item.isPublished
                                          ? "Online"
                                          : "Offline"}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="font-semibold text-blue-700 w-1/12">
                                    <div className="flex h-full items-center">
                                      <div className="mr-1">
                                        {item.applyFor}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-center w-[20%] font-semibold text-gray-700 text-base">
                                    <div className="line-clamp-3 w-full">
                                      {item.tagline}
                                    </div>
                                  </td>
                                  <td className="text-center w-[14%] font-semibold text-gray-700 text-base">
                                    <div className="flex flex-col items-center">
                                      {item.hackathonTypes.map(
                                        (type, index) => (
                                          <span key={index}>#{type} </span>
                                        )
                                      )}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="">
                                      <div className="list-none flex relative item-center justify-center">
                                        <Link
                                          to={`/Judge/judge-hackathons/${item?._id}/judge`}
                                          className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#278646] hover:text-white"
                                        >
                                          <button>
                                            {" "}
                                            <MdRateReview fontSize={18} />{" "}
                                          </button>
                                        </Link>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                    </tbody>
                  </table>
                  <div className="list-none mt-10 flex items-center justify-center mb-4">
                    <PaginationButtons
                      totalPages={currentHackathons?.length / 10}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageJudgeHackathon;
