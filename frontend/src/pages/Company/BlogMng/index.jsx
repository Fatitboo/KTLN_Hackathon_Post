import {
  CustomButton,
  LoadingComponent,
  PaginationButtons,
} from "../../../components";
import { AiOutlineSearch } from "react-icons/ai";
import { LiaEyeSolid } from "react-icons/lia";
import { BiPencil, BiPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOccupationsAction } from "../../../redux/slices/occupations/occupationsSlices";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { BsTrash } from "react-icons/bs";
import { CgLock } from "react-icons/cg";

function BlogManagementOr() {
  const dispatch = useDispatch();
  const users = useSelector((store) => store?.users);

  useEffect(() => {
    dispatch(getAllOccupationsAction(users?.userAuth?.user?.id));
  }, []);
  const [filterKeyWord, setFilterKeyWord] = useState("");
  let [currentPage, setCurrentPage] = useState([]);

  const handleDeleteOrBlockOccupation = async (id, status) => {
    Swal.fire({
      title: "Confirm action",
      text: "Are you sure to do?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const pl = {
          isApproval: status,
        };
        try {
          const { data } =
            status !== undefined
              ? await axios.put(`${baseUrl}/api/v1/blogs/${id}`, pl)
              : await axios.delete(`${baseUrl}/api/v1/blogs/${id}`);
          if (data) {
            Swal.fire({
              title: "Success!",
              text: "This blog has been updated.",
              icon: "success",
              confirmButtonText: "OK",
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/Organizer/blog-management";
              }
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Failed!",
            text: "Update failed, please try again.",
            confirmButtonText: "OK",
            icon: "error",
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
          }).then((result) => {
            if (result.isConfirmed) {
              /* empty */
            }
          });
        }
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
                    <Link to={"/Organizer/blog-management/add-blog"}>
                      <CustomButton
                        title="Add"
                        iconRight={<BiPlus fontSize={24} />}
                        containerStyles="text-blue-600 py-1.5 px-3 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600"
                      />
                    </Link>
                  </div>
                </div>
                <div className="flex text-base">
                  <div className="mr-1">Blogs: </div>{" "}
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
                          Blog type
                        </th>

                        <th className="relative text-[#3a60bf] font-medium py-6 text-base text-center w-1/12">
                          Autho
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
                        : occupationsList
                            ?.filter(
                              (item) =>
                                item?.blogTitle
                                  ?.toLocaleLowerCase()
                                  ?.includes(
                                    filterKeyWord?.trim()?.toLocaleLowerCase()
                                  ) ||
                                item?.tagline
                                  ?.toLocaleLowerCase()
                                  ?.includes(
                                    filterKeyWord?.trim()?.toLocaleLowerCase()
                                  )
                            )

                            ?.slice(currentPage * 10, (currentPage + 1) * 10)
                            .map((item, index) => {
                              return (
                                <tr
                                  key={index}
                                  className="relative border-b border-solid border-[#ecedf2] w-full hover:bg-[#f4f2f2] cursor-pointer px-5  "
                                >
                                  <td className="relative pl-5 py-5 font-normal text-base w-4/12">
                                    <div className="mb-0 relative h-16 gap-2 flex flex-row items-center">
                                      {/* <span className="absolute l-0 t-0 w-10">
                                                                        <img src={item.logoProject} className="inline-block max-w-full h-auto align-middle" alt="logo" />
                                                                    </span> */}
                                      <div className="w-12 h-12">
                                        <img
                                          src={item.thumnailImage}
                                          className="w-full h-full"
                                          alt="description of image"
                                        />
                                      </div>
                                      <div>
                                        <div className="font-medium text-md text-ellipsis mb-1 line-clamp-2 ">
                                          {item?.blogTitle}
                                        </div>
                                        <div className="flex font-light text-sm">
                                          {new Date(
                                            item?.create_at
                                          ).toDateString()}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="font-light text-white w-1/12">
                                    <div className="items-center bg-[#00B69B] rounded-full flex justify-center font-semibold w-24">
                                      <div className="mr-1">
                                        {item.isApproval
                                          ? "Approval"
                                          : "Unapproval"}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="font-semibold text-blue-700 w-2/12">
                                    <div className="flex h-full items-center">
                                      <div className="mr-1">
                                        {`${item.blogType}`}
                                      </div>
                                    </div>
                                  </td>

                                  <td className="text-center w-3/12 font-semibold text-gray-700 text-base">
                                    <div className="flex flex-col items-center">
                                      {[
                                        `${item.autho.name} - ${item.autho.title}`,
                                      ]?.map((type, index) => (
                                        <span key={index}>{type} </span>
                                      ))}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="flex">
                                      <div className="list-none flex relative item-center justify-center">
                                        <Link
                                          to={`/Organizer/blog-management/detail-blog/${item?._id}`}
                                          className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#5f86e9] hover:text-white"
                                        >
                                          <LiaEyeSolid fontSize={18} />
                                        </Link>
                                      </div>
                                      {
                                        <div className="list-none flex relative item-center justify-center">
                                          <Link
                                            to={`/Organizer/blog-management/edit-blog/${item?._id}`}
                                            className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#5f86e9] hover:text-white"
                                          >
                                            <BiPencil fontSize={18} />
                                          </Link>
                                        </div>
                                      }

                                      {
                                        <div className="list-none flex relative item-center justify-center">
                                          <div
                                            onClick={() =>
                                              handleDeleteOrBlockOccupation(
                                                item?._id
                                              )
                                            }
                                            className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#5f86e9] hover:text-white"
                                          >
                                            <BsTrash fontSize={18} />
                                          </div>
                                        </div>
                                      }
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                    </tbody>
                  </table>
                  <div className="list-none mt-10 flex items-center justify-center mb-4">
                    <PaginationButtons
                      totalPages={occupationsList?.length / 10}
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

export default BlogManagementOr;
