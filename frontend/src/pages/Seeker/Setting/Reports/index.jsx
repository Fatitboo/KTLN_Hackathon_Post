import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { VacProj } from "./VacProj";
import Swal from "sweetalert2";
import { getAllReportsAdminAction } from "../../../../redux/slices/vacancies/vacanciesSlices";
import { LoadingComponent } from "../../../../components";

function ManageReportUser() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [filterKeyWord, setFilterKeyWord] = useState("");
  const storeData = useSelector((store) => store.users);
  const handleGetAll = () => {
    dispatch(getAllReportsAdminAction(storeData?.userAuth?.user?.id));
  };
  useEffect(() => {
    handleGetAll();
  }, []);
  const vacancies = useSelector((store) => store?.vacancies);
  const { loading, vacProList, appErr, isSuccess2, isSuccessUpd } = vacancies;
  useEffect(() => {
    if (isSuccessUpd) {
      dispatch(resetSuccessAction());
      Swal.fire({
        title: "Success!",
        text: "This item has been updated.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    }
  }, [isSuccessUpd]);
  return (
    <div className="px-10 pb-0">
      {loading && <LoadingComponent />}

      <div className="flex flex-wrap mx-3 mt-3">
        <div className="max-w-full pt-3 shrink-0 w-full">
          <div className="relative rounded-lg bg-white shadow max-w-full shrink-0 w-full px-6 py-6">
            <div className="font-medium text-3xl text-gray-900 mb-4 leading-10">
              Manage Reports!
            </div>
            <div className="relative">
              {/* start header + search */}
              <div className="relative flex justify-between items-center flex-wrap bg-transparent px-3 py-5">
                <div className="flex ">
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
                          className="focus:bg-white relative mt-2 block w-72 border pt-1 pb-1 pl-10 h-10 pr-5 text-sm bg-[#f0f5f7] rounded-md"
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex ">
                  <div className="mr-1">Reported hackathons: </div>{" "}
                  <span> {vacProList?.length}</span>
                </div>
              </div>
              {/* table list skill information */}
              <div className="px-2 relative">
                <div className="overflow-y-hidden overflow-x-auto">
                  <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0">
                    <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                      <tr className="w-full">
                        <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left pl-6">
                          Hackathon has been reported
                        </th>

                        <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left "></th>
                      </tr>
                    </thead>
                    <tbody>
                      {vacProList
                        ?.filter(
                          (item) =>
                            item?.hackathonName
                              ?.toLocaleLowerCase()
                              ?.includes(
                                filterKeyWord?.trim()?.toLocaleLowerCase()
                              ) ||
                            item?.hostName
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
                        ?.map((item, index) => (
                          <VacProj
                            handleGetAll={handleGetAll}
                            item={item}
                            key={index}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageReportUser;
