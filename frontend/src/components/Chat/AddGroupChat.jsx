import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { CustomButton } from "..";
import { IoIosClose } from "react-icons/io";

export const AddGroupChat = ({
  setopenReport,
  item,
  isVacancy,
  setReports,
}) => {
  const dispatch = useDispatch();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [groupChatName, setGroupName] = useState(item?.chatName ?? "");
  const [memberUsers, setUsers] = useState(item?.memberUsers ?? []);
  const [listSkillApi, setListSkillApi] = useState([]);
  const [spin, setSpin] = useState(false);
  const inputBox = useRef();
  const fetchDataSkill = (searchTerm, hackathonId, value) => {
    // inputBoxReal.current = value;
    if (value === "") {
      setListSkillApi([]);
    } else {
      setSpin(true);
      const params = new URLSearchParams({
        searchTerm,
        hackathonId,
        searchQuery: value,
      }).toString();

      fetch(`${baseUrl}/api/v1/users/search?${params}`)
        .then((response) => response.json())
        .then((result) => {
          if (result.length == 0) {
            fetchSkillsAI(value);
          }
          const arr = [...result];
          console.log(arr);

          setListSkillApi(arr);
          setSpin(false);
        })
        .catch((error) => console.log("error", error));
    }
  };
  useEffect(() => {
    setUsers(item?.memberUsers ?? []);
    setGroupName(item?.chatName ?? "");
  }, [item]);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchTerm]);
  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchDataSkill("all", "", searchTerm);
    }
  }, [debouncedSearchTerm]);

  const handleUpdateGroupChat = async () => {
    const d = {
      name: groupChatName,
      users: memberUsers.map((item) => item._id),
    };
    console.log("🚀 ~ handleUpdateGroupChat ~ d:", d);

    try {
      const { data } = await axios.post(`${baseUrl}/api/v1/chat/group`, d, {
        withCredentials: true,
      });

      if (data) {
        Swal.fire({
          title: "Successed!",
          text: "This group has been updated.",
          icon: "success",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            setUsers([]);
            setGroupName("");
            setopenReport(null);
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        text: "Created failed, please try again.",
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
  };
  return (
    <div className="w-[600px] rounded-lg bg-white h-auto px-4">
      <div className="flex justify-between border-b border-gray-300 pb-5">
        <div className="font-medium text-xl">Group Chat</div>
        <div
          className="cursor-pointer"
          onClick={() => {
            setopenReport(null);
          }}
        >
          <CgClose size={24} />
        </div>
      </div>
      <div>
        <div className="mt-2">
          <label
            htmlFor="description"
            className="block leading-8 text-gray-900 font-medium "
          >
            Group Chat Name
          </label>
          <div className="relative mt-2 rounded-md shadow-sm ">
            <textarea
              value={groupChatName}
              onChange={(e) => setGroupName(e.target.value)}
              rows={1}
              type="text"
              name="description"
              id="description"
              className="block bg-[#f7f9fa] focus:bg-white text-base w-full rounded-md border-0 py-2.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8"
            />
          </div>
        </div>

        <div className="mt-2">
          <label
            htmlFor="description"
            className="block leading-8 text-gray-900 font-medium "
          >
            Member Users
          </label>
          <div className="relative">
            <div
              tabIndex={0}
              onBlur={() => setListSkillApi([])}
              className={`relative flex flex-row gap-1 flex-wrap items-center w-full bg-white focus:bg-white focus:border-gray-900 text-base shadow-sm rounded-sm pl-5 py-1 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
            >
              {memberUsers?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row items-center rounded gap-1 bg-gray-100 py-1 px-2 text-sm h-8"
                  >
                    <div className="whitespace-nowrap">{item.fullname}</div>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        setSkills(memberUsers.filter((i) => i._id != item._id))
                      }
                    >
                      <IoIosClose />
                    </div>
                  </div>
                );
              })}
              <div className="flex-1 ">
                <input
                  type="text"
                  ref={inputBox}
                  placeholder={"Input email user"}
                  onBlur={(e) => e.stopPropagation()}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`min-w-5 w-full block focus:outline-none bg-white  focus:bg-white text-base  rounded-md pr-5 text-gray-900 border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                />
              </div>

              {spin ? (
                <svg
                  className="absolute right-1 animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="#cccccc"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
            </div>
            <div
              className="relative"
              style={{
                visibility: listSkillApi.length === 0 ? "collapse" : "visible",
              }}
            >
              <div className="border mt-1 rounded overflow-auto absolute z-10 w-full max-h-56">
                {listSkillApi.map((item, index) => {
                  return (
                    <div
                      onClick={() => {
                        !memberUsers.includes(item) &&
                          setUsers([...memberUsers, item]);
                        inputBox.current.value = "";
                        setListSkillApi([]);
                      }}
                      key={index}
                      className={`hover:bg-[#eef1f2]  block focus:outline-none bg-white focus:bg-white text-base shadow-sm py-2 pl-5 pr-5 text-gray-90 placeholder:text-gray-400 sm:text-base sm:leading-8 cursor-pointer`}
                    >
                      <div>
                        <div>{item?.fullname}</div>
                        <div>{item?.email}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          {groupChatName === "" ? (
            <div>
              <CustomButton
                isDisable={true}
                title={"Send"}
                containerStyles="text-white justify-center w-[100%] flex py-2   mb-2 focus:outline-none  hover:text-white rounded-md text-base border  bg-gray-300"
              />
            </div>
          ) : (
            <div onClick={handleUpdateGroupChat}>
              <CustomButton
                title={"Send"}
                containerStyles="text-white justify-center w-[100%] flex py-2   mb-2 focus:outline-none hover:bg-blue-900 hover:text-white rounded-md text-base border border-blue- bg-blue-700"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
