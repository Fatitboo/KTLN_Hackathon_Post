import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ComboBox, PaginationButtons } from "../../../components";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllHackathons,
  resetValue,
  updateHackathonComponent,
} from "../../../redux/slices/hackathons/hackathonsSlices";
import { LiaEyeSolid } from "react-icons/lia";
import Swal from "sweetalert2";
import { CgLock, CgUnblock } from "react-icons/cg";
const listItemCbb = [
  {
    id: 1,
    name: "All",
    value: null,
  },
  {
    id: 2,
    name: "Online",
    value: true,
  },
  {
    id: 3,
    name: "Offline",
    value: false,
  },
];
function ManageHackathonsAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [selectId, setSelectedId] = useState();
  let [currentHackathons, setCurrentHackathons] = useState([]);
  let [currentPage, setCurrentPage] = useState([]);
  let { loading, hackathons, isSuccessUD, loadingUpdate } = useSelector(
    (state) => state.hackathons
  );

  useEffect(() => {
    dispatch(getAllHackathons());
  }, []);
  useEffect(() => {
    if (hackathons) {
      setCurrentHackathons(hackathons);
    }
  }, [hackathons]);

  useEffect(() => {
    if (isSuccessUD) {
      setCurrentHackathons(
        hackathons.map((item) =>
          item._id !== selectId ? { ...item } : { ...item, block: !item.block }
        )
      );
      dispatch(resetValue({ key: "isSuccessUD", value: false }));
      Swal.fire({
        title: "Success",
        text: `${
          currentHackathons.find((item) => item._id === selectId)?.block
            ? "Unblock"
            : "Block"
        } hackathon success`,
        confirmButtonText: "OK",
        icon: "success",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          /* empty */
        }
      });
    }
  }, [isSuccessUD]);

  const onFilterValueSelected = (filterValue) => {
    setCurrentHackathons(
      filterValue.value == null
        ? hackathons
        : hackathons.filter((item) => item.isPublished === filterValue.value)
    );
  };

  const handleSearch = (e) => {
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
    dispatch(
      updateHackathonComponent({
        id: item._id,
        hackathon: { block: !item?.block },
      })
    );
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
                        : currentHackathons
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
                                          to={`/Organizer/manage-hackathons/${item?._id}/overview`}
                                          className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#5f86e9] hover:text-white"
                                        >
                                          <LiaEyeSolid fontSize={18} />
                                        </Link>
                                        <li
                                          className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#ce3e37] hover:text-white"
                                          onClick={() => {
                                            setSelectedId(item?._id);
                                            handleDeleteProject(item);
                                          }}
                                        >
                                          <button>
                                            {loadingUpdate &&
                                            item?._id === selectId ? (
                                              <svg
                                                className="right-1 animate-spin h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="white"
                                                viewBox="0 0 24 24"
                                              >
                                                <circle
                                                  className="opacity-0"
                                                  cx="12"
                                                  cy="12"
                                                  r="10"
                                                  stroke="white"
                                                  strokeWidth="4"
                                                ></circle>
                                                <path
                                                  className="opacity-90"
                                                  fill="white"
                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                              </svg>
                                            ) : item?.block ? (
                                              <CgUnblock fontSize={18} />
                                            ) : (
                                              <CgLock fontSize={18} />
                                            )}
                                          </button>
                                        </li>
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

export default ManageHackathonsAdmin;
