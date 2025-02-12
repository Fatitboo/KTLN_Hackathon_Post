import React, { useState } from "react";
import { BiPencil, BiTimeFive, BiTrash } from "react-icons/bi";
import { IoChevronDownOutline } from "react-icons/io5";
import { PiTargetLight } from "react-icons/pi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { LiaEyeSolid } from "react-icons/lia";
import { CgLock, CgUnblock } from "react-icons/cg";
import baseUrl from "../../../../utils/baseUrl";
import { CustomButton, TextInput } from "../../../../components";
import { useForm } from "react-hook-form";
import { defaultAvt } from "../../../../assets/images";

export const DiscussionItem = ({
  item,
  setIsGet,
  hackathonId,
  setSelectedDiscussion,
  user,
}) => {
  let [dropDownTags, setDropDownTags] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [moreDetail, setMoreDetail] = useState(false);

  const handleGetComments = async () => {
    try {
      setLoading(true);
      if (!dropDownTags) {
        setDropDownTags(!dropDownTags);
      } else {
        setDropDownTags(false);
      }
      setLoading(false);
    } catch (errors) {
      console.log(errors);
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Confirm delete!",
      text: "Are you sure to delete this.",
      icon: "warning",
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      allowOutsideClick: false,
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios
          .post(`${baseUrl}/api/v1/hackathons/delete-discussion/${id}`, {
            hackathonId,
          })
          .then(
            Swal.fire({
              title: "Delete success!",
              text: "Delete success.",
              confirmButtonText: "OK",
              icon: "success",
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
            }).then((result) => {
              if (result.isConfirmed) {
                setDropDownTags(false);
                setIsGet(true);
              }
            })
          )
          .catch((e) => {
            Swal.fire({
              title: "Delete failed!",
              text: "Delete failed, please try again.",
              confirmButtonText: "OK",
              icon: "error",
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
            }).then((result) => {
              if (result.isConfirmed) {
                /* empty */
              }
            });
          });
      }
    });
  };
  const { register, handleSubmit, setValue } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const onSubmitInfo = (data) => {
    if (!user) {
      Swal.fire({
        title: "Please login!",
        text: "You need to login to register hackathon.",
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        icon: "info",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/user-auth/login");
        }
      });
    } else {
      if (data.comment === "") return;
      else {
        axios
          .post(
            `${baseUrl}/api/v1/hackathons/create-comment-discussion/${item?.discussionId}`,
            {
              userId: user.id,
              title: data.comment,
              hackathonId,
            }
          )
          .then(
            Swal.fire({
              title: "Success!",
              text: "Success.",
              confirmButtonText: "OK",
              icon: "success",
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
            }).then((result) => {
              if (result.isConfirmed) {
                setDropDownTags(false);
                setValue("comment", "");
                setIsGet(true);
              }
            })
          )
          .catch((e) => {
            Swal.fire({
              title: "Delete failed!",
              text: "Delete failed, please try again.",
              confirmButtonText: "OK",
              icon: "error",
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
            }).then((result) => {
              if (result.isConfirmed) {
                /* empty */
              }
            });
          });
      }
    }
  };
  return (
    <tr>
      <td
        colSpan={2}
        className="p-7 rounded-[10px] border overflow-hidden border-[#ecedf2] hover:shadow-[0_7px_18px_rgba(64,79,104,.05)]  mb-[30px]"
      >
        <div className="flex flex-row">
          <div>
            <div className="w-[50px] h-[50px] rounded-lg bg-slate-400">
              <img src={item?.avatar} className="w-full h-full" alt="Logo" />
            </div>
          </div>
          <div className="ml-6 w-full">
            <h4 className="text-[18px] text-[#202124] hover:text-[#1967d2] leading-6 font-medium">
              <Link to={"/Seeker/" + item?.userId}>{item?.userName}</Link>
            </h4>
            <div className="flex justify-between w-full">
              <div className="flex flex-row items-center mt-2">
                <div className="mr-3 bg-[rgba(25,103,210,.15)] text-[#1967d2] rounded-3xl flex">
                  <span className="text-[13px] px-[20px] py-[5px] leading-none">
                    {item?.hostName}
                  </span>
                </div>
                <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                  <BiTimeFive className="w-[18px] h-[18px] mr-[5px]" />
                  {`${new Date(item?.createdAt).toDateString()}`}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mt-2">
              <h3>{item?.title}</h3>
              {item?.comments?.length === 0 && item?.userId === user?.id && (
                <div className="col-span-1 flex">
                  <div
                    onClick={() => {
                      setSelectedDiscussion({
                        title: item?.title,
                        content: item?.content,
                        discussionId: item?.discussionId,
                        isUpdate: true,
                      });
                    }}
                    className="list-none relative mr-2 h-fit py-2 cursor-pointer bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#278646] hover:text-white"
                  >
                    <BiPencil fontSize={18} />{" "}
                  </div>
                  <div
                    onClick={() => handleDelete(item?.discussionId)}
                    className="list-none relative mr-2 h-fit py-2 cursor-pointer bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[red] hover:text-white"
                  >
                    <BiTrash fontSize={18} />{" "}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-3 overflow-hidden w-full min-h-[60px]">
              <p
                className={`bg-transparent w-[96%] ${
                  moreDetail ? "" : "limitline5"
                }`}
                dangerouslySetInnerHTML={{ __html: item?.content }}
              ></p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col mt-3">
            <input
              type="checkbox"
              className="peer"
              checked={dropDownTags}
              hidden
              onChange={() => {}}
            />
            <div
              className="flex flex-row  items-center justify-between p-2 px-5 transition-all duration-500 cursor-pointer   peer-checked:rounded-es-none peer-checked:rounded-ee-none"
              onClick={handleGetComments}
            >
              <div className="flex flex-row items-top mr-3">
                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap">
                  {item?.comments?.length} comment
                </div>
              </div>
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                    className="opacity-75"
                    fill="#2d2d2d"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <div className="h-full self-start mt-[2px] cursor-pointer">
                  <input
                    type="checkbox"
                    className="peer"
                    hidden
                    onChange={() => {}}
                    checked={dropDownTags}
                  />
                  <IoChevronDownOutline
                    size={22}
                    className="transition-transform duration-500 rotate-0 peer-checked:rotate-180"
                  />
                </div>
              )}
            </div>
            <div
              className={`overflow-auto no-scrollbar mx-4  bg-transparent border-t-0 gap-y-2 transition-all duration-500 ease-in-out max-h-0 opacity-0 peer-checked:max-h-[500px] peer-checked:opacity-100`}
            >
              <div className="my-1  flex flex-col ">
                {[...(item?.comments ?? [])].map((i, index) => {
                  // {reports?.map((i, index) => {
                  return (
                    <div
                      key={index}
                      className=" relative p-4 grid grid-cols-12 border-b border-gray-200 bg-[#f6faff]"
                    >
                      <div className="col-span-1 ">
                        <img
                          src={i?.avatar}
                          alt=""
                          className="rounded-full w-2/3"
                        />
                      </div>
                      <div className="col-span-10 text-[14px]">
                        <div className="font-medium text-[16px]">
                          {i?.userName}
                        </div>
                        <div className="text-xs text-gray-600">{`${new Date(
                          i?.createdAt
                        ).toDateString()}`}</div>
                        <div className="flex mt-2">
                          <div>{i?.title}</div>
                        </div>
                      </div>
                      <div className="col-span-1 flex">
                        {/* <div
                          onClick={() => {
                            // setSelectedReport({
                            //   title: item?.title,
                            //   content: item?.content,
                            //   discussionId: item?.discussionId,
                            // });
                          }}
                          className="list-none relative mr-2 h-fit py-2 cursor-pointer bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#278646] hover:text-white"
                        >
                          <BiPencil fontSize={18} />{" "}
                        </div> */}
                        <div
                          onClick={() => handleDelete(i?._id)}
                          className="list-none relative mr-2 h-fit py-2 cursor-pointer bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[red] hover:text-white"
                        >
                          <BiTrash fontSize={18} />{" "}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <form onSubmit={handleSubmit(onSubmitInfo)}>
                  <div className="flex flex-row mt-5">
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white mr-4"
                      src={user?.avatar ?? defaultAvt}
                      alt="User 1"
                    />
                    <div className=" w-full">
                      <TextInput
                        name="comment"
                        register={register("comment")}
                        type="text"
                        placeHolder="Write a comment"
                        styles="bg-[#f0f5f7]"
                      />
                      <CustomButton
                        type={"Submit"}
                        title="Post comment"
                        containerStyles="bg-blue-600 mt-4 font-medium text-white py-2 px-5 focus:outline-none hover:bg-white hover:text-blue-700 rounded-sm text-base border border-blue-600"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};
