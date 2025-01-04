import {
  CustomButton,
  LoadingComponent,
  PaginationButtons,
} from "../../../components";
import { AiFillExclamationCircle, AiOutlineSearch } from "react-icons/ai";
import { LiaTrashAltSolid } from "react-icons/lia";
import { CiEdit } from "react-icons/ci";
import { BiPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOccupationsAction } from "../../../redux/slices/occupations/occupationsSlices";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

function BlogManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllOccupationsAction());
  }, []);
  const users = useSelector((store) => store?.users);
  const [filterKeyWord, setFilterKeyWord] = useState("");
  let [currentBlogs, setCurrentBlogs] = useState([]);
  let [currentPage, setCurrentPage] = useState([]);

  const handleDeleteOccupation = async (id) => {
    // dispatch(deleteOccupationAction(id));
    Swal.fire({
      title: "Confirm Delete",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { userAuth } = users;
        // http call
        const config = {
          headers: {
            Authorization: `Bearer ${userAuth?.user?.token}`,
            "Content-Type": "application/json",
          },
        };
        try {
          await axios.delete(`${baseUrl}/api/v1/occupations/${id}`, config);
        } catch (error) {}
        Swal.fire({
          title: "Deleted!",
          text: "This item has been deleted.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) dispatch(getAllOccupationsAction());
        });
      }
    });
  };

  const storeData = useSelector((store) => store?.occupations);
  const { appErr, occupationsList, loading } = storeData;
  return (
    <div className="px-10 pb-0 text-sm">
      {loading && <LoadingComponent />}

      <div className="flex flex-wrap mx-3 mt-3">
        <div className="max-w-full px-3 pt-3 shrink-0 w-full">
          <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-6 py-6 shrink-0 w-full">
            <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">
              Blog Mangement!
            </h3>
            <div className="relative">
              {/* start header + search */}
              <div className="relative flex justify-between items-center flex-wrap bg-transparent px-3 py-5">
                <div className="flex">
                  <div className="relative mr-4">
                    <form action="#" method="post">
                      <div className="relative mb-0 leading-6">
                        <AiOutlineSearch
                          fontSize={22}
                          color="#a7a9ad"
                          className="absolute l-3  h-11 justify-center ml-2 text-center z-10 "
                        />
                        <input
                          onChange={(e) => setFilterKeyWord(e.target.value)}
                          type="search"
                          name="search-field"
                          id="search-field"
                          placeholder="Search"
                          className=" relative mt-2 block w-72 border pt-1 pb-1 pl-10 h-10 pr-5 text-sm bg-[#f0f5f7] focus:bg-white  rounded-md"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="mt-[10px]">
                    <Link to={"/Admin/blog-management/add-blog"}>
                      <CustomButton
                        title="Add"
                        iconRight={<BiPlus fontSize={24} />}
                        containerStyles="text-blue-600 py-1.5 px-3 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600"
                      />
                    </Link>
                  </div>
                </div>
                <div className="flex text-base">
                  <div className="mr-1">Occupations: </div>{" "}
                  <span> {occupationsList.length}</span>
                </div>
              </div>
              {/* {appErr && (
                <span className="flex flex-row items-center text-base text-[#a9252b] mt-2 ml-8">
                  <AiFillExclamationCircle className="mr-1" />
                  {appErr}
                </span>
              )} */}
              {/* table list skill information */}
              <div className="relative">
                <div className="overflow-y-hidden overflow-x-auto">
                  <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0 ">
                    <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                      <tr className="w-full">
                        <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-4/12 pl-5 ">
                          Blog Name
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
                        : currentBlogs
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
                      totalPages={currentBlogs?.length / 10}
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

export default BlogManagement;
