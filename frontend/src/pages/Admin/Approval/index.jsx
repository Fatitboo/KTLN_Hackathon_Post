import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProjectsAdmin,
  resetSuccessAction,
} from "../../../redux/slices/projects/projectsSlices";
import {
  ComboBox,
  LoadingComponent,
  PaginationButtons,
} from "../../../components";
import { AiOutlineSearch } from "react-icons/ai";
import ProjectItem from "./ProjectItem";
import Swal from "sweetalert2";
const listItemCbb = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "Pending",
  },
  {
    id: 3,
    name: "Wait Payment",
  },
  {
    id: 4,
    name: "Approved",
  },
  {
    id: 5,
    name: "Rejected",
  },
  {
    id: 6,
    name: "Blocked",
  },
];
function Approval() {
  const dispatch = useDispatch();
  const [projectList, setProjectList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [filterKeyWord, setFilterKeyWord] = useState("");

  useEffect(() => {
    dispatch(getAllProjectsAdmin());
  }, [dispatch]);
  const storeData = useSelector((store) => store?.projects);
  const { loading, appErr, isSuccess, projectsAdmin, isSuccessUpd } = storeData;

  const onFilterlistPostedCbb = (filterValue) => {
    if (filterValue.name === "All") {
      setProjectList([...projectsAdmin]);
    }
    if (filterValue.name === "Pending") {
      setProjectList([
        ...projectsAdmin.filter((item) => item?.project?.status === "pending"),
      ]);
    }
    if (filterValue.name === "Rejected") {
      setProjectList([
        ...projectsAdmin.filter((item) => item?.project?.status === "rejected"),
      ]);
    }
    if (filterValue.name === "Wait Payment") {
      setProjectList([
        ...projectsAdmin.filter(
          (item) => item?.project?.status === "waitPayment"
        ),
      ]);
    }
    if (filterValue.name === "Approved") {
      setProjectList([
        ...projectsAdmin.filter((item) => item?.project?.status === "approved"),
      ]);
    }
    if (filterValue.name === "Blocked") {
      setProjectList([
        ...projectsAdmin.filter((item) => item?.project?.status === "blocked"),
      ]);
    }
  };
  useEffect(() => {
    setPages([
      ...projectList
        .filter(
          (item) =>
            (item?.project?.projectName)
              .toLowerCase()
              .includes(filterKeyWord.toLowerCase()) ||
            (item?.corName).toLowerCase().includes(filterKeyWord.toLowerCase())
        )
        .slice(currentPage * 10, (currentPage + 1) * 10),
    ]);
  }, [currentPage, projectList, filterKeyWord]);
  useEffect(() => {
    if (isSuccess) {
      dispatch(resetSuccessAction());
      setProjectList([...projectsAdmin]);
      setPages([
        ...projectsAdmin.slice(currentPage * 10, (currentPage + 1) * 10),
      ]);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessUpd) {
      Swal.fire({
        title: "Success!",
        text: "This item has been updated.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      dispatch(resetSuccessAction());
      setProjectList([...projectsAdmin]);
      setPages([
        ...projectsAdmin.slice(currentPage * 10, (currentPage + 1) * 10),
      ]);
    }
  }, [isSuccessUpd]);
  return (
    <div className="px-10 pb-0">
      {/* Start title of page  */}
      {/* {loading && <LoadingComponent />} */}

      <div className="mb-8">
        <div className="font-medium text-3xl text-gray-900 mb-2 leading-10">
          All Projects!
        </div>
        <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">
          Ready to jump back in?
        </div>
      </div>

      {/* Start main content  to display something*/}
      <div className="flex flex-wrap mx-3 mt-3">
        <div className="max-w-full px-3 pt-3 shrink-0 w-full">
          <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
            <div className="relative w-full">
              {/* Start header of content */}
              <div className="relative flex justify-between items-center flex-wrap bg-transparent px-8 py-5">
                <div className="flex">
                  <div className="relative mr-4">
                    <form action="#" method="post">
                      <div className="relative mb-0">
                        <AiOutlineSearch
                          fontSize={22}
                          color="#a7a9ad"
                          className="absolute l-3 t-0 h-10 justify-center ml-2 text-center z-10 "
                        />
                        <input
                          onChange={(e) => setFilterKeyWord(e.target.value)}
                          type="search"
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
                      filterValueSelected={onFilterlistPostedCbb}
                    />
                  </div>
                </div>
                <div className="flex ">
                  <div className="mr-1">Total projects: </div>{" "}
                  <span>
                    {" "}
                    {pages.length} / {projectList.length}
                  </span>
                </div>
              </div>

              {/* Start table */}
              <div className="px-6 relative">
                <div className="overflow-y-hidden overflow-x-auto">
                  <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0 ">
                    <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                      <tr className="w-full">
                        <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left w-3/12 pl-5">
                          Originazer Name
                        </th>
                        <th className="relative text-[#3a60bf] font-normal py-6 text-base px-0 text-left w-3/12 ">
                          Project Name
                        </th>
                        <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left w-1/12 ">
                          Participants
                        </th>
                        <th className="relative text-[#3a60bf] font-normal py-6 text-base  w-2/12 text-center ">
                          Upload date
                        </th>
                        <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left  w-3/24">
                          Status
                        </th>
                        <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left ">
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
                              </tr>
                            );
                          })
                        : pages?.map((item, index) => (
                            <ProjectItem item={item} key={index} />
                          ))}
                    </tbody>
                  </table>
                  <div className="list-none mt-10 flex items-center justify-center mb-4">
                    <PaginationButtons
                      totalPages={projectList.length / 10}
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

export default Approval;
