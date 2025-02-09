import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { getAllReportsAdminAction } from "../../../../redux/slices/vacancies/vacanciesSlices";
import { LoadingComponent } from "../../../../components";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import { Link } from "react-router-dom";

function ManageNotificationUser() {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState("all");
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
  const [unreadNotifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          baseUrl + "/api/v1/notifications?isRead=",
          { withCredentials: true }
        ); // Thay bằng URL API của bạn
        console.log("🚀 ~ fetchNotifications ~ response:", response.data);

        setNotifications(response.data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      } finally {
      }
    };

    fetchNotifications();
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
              Manage Notification!
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
                  <div className="mt-2">
                    <select
                      className="p-2 border border-gray-300 rounded-md"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="all">All Types</option>
                      <option value="registration">Registration</option>
                      <option value="update">Update</option>
                      <option value="reminder">Reminder</option>
                    </select>
                  </div>
                </div>
                <div className="flex ">
                  <div className="mr-1">Notifications hackathons: </div>{" "}
                  <span> {unreadNotifications?.length}</span>
                </div>
              </div>
              {/* table list skill information */}
              <div className="px-2 relative">
                <div className="overflow-y-hidden overflow-x-auto">
                  <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0">
                    <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                      <tr className="w-full">
                        <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left pl-6">
                          Notifications
                        </th>

                        <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left "></th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {vacProList
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
                        ))} */}
                      <div className="space-y-4">
                        {loading ? (
                          <p>Loading...</p>
                        ) : (
                          unreadNotifications?.map((noti) => (
                            <div
                              key={noti._id}
                              className={`p-4 border ${
                                noti.read ? "bg-gray-100" : "bg-white"
                              } border-gray-300 rounded-md shadow-sm`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <img
                                    src={noti.sender.avatar}
                                    alt={noti.sender.name}
                                    className="w-8 h-8 rounded-full"
                                  />
                                  <span className="font-semibold">
                                    {noti.sender.name}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                  {new Date(noti.create_at).toLocaleString()}
                                </span>
                              </div>
                              <h2 className="mt-2 font-medium text-lg">
                                {noti.title}
                              </h2>
                              <p className="text-gray-600 text-sm">
                                {noti.content}
                              </p>
                              <div className="flex space-x-4 mt-2">
                                <Link
                                  to={noti?.additionalData?.linkDetails}
                                  className="text-blue-600"
                                >
                                  View detail hackathon
                                </Link>
                                {noti?.additionalData?.linkInvite && (
                                  <Link to={noti?.additionalData?.linkInvite}>
                                    <div className="bg-green-800 text-white px-2">
                                      Accept invitation
                                    </div>
                                  </Link>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
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

export default ManageNotificationUser;
