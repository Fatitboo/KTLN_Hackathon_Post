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
export const UpdateItem = ({
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
          .post(`${baseUrl}/api/v1/hackathons/delete-updates/${id}`, {
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

  return (
    <tr>
      <td
        colSpan={2}
        className="p-7 rounded-[10px] border overflow-hidden border-[#ecedf2] hover:shadow-[0_7px_18px_rgba(64,79,104,.05)]  mb-[30px]"
      >
        <div className="flex flex-row">
          <div className="ml-6 w-full">
            <div className="flex justify-between w-full">
              <div className="flex flex-row items-center mt-2">
                <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                  <BiTimeFive className="w-[18px] h-[18px] mr-[5px]" />
                  {`${new Date(item?.createdAt).toDateString()}`}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mt-2">
              <h3>{item?.title}</h3>
              {
                <div className="col-span-1 flex">
                  <div
                    onClick={() => {
                      setSelectedDiscussion({
                        title: item?.title,
                        content: item?.content,
                        discussionId: item?.updateId,
                        isUpdate: true,
                      });
                    }}
                    className="list-none relative mr-2 h-fit py-2 cursor-pointer bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#278646] hover:text-white"
                  >
                    <BiPencil fontSize={18} />{" "}
                  </div>
                  <div
                    onClick={() => handleDelete(item?.updateId)}
                    className="list-none relative mr-2 h-fit py-2 cursor-pointer bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[red] hover:text-white"
                  >
                    <BiTrash fontSize={18} />{" "}
                  </div>
                </div>
              }
            </div>
            <div className="mt-3 overflow-hidden w-full min-h-[60px]">
              <p
                className={`bg-transparent w-[96%] ${
                  moreDetail ? "" : "limitline5"
                }`}
                dangerouslySetInnerHTML={{ __html: item?.content }}
              ></p>
            </div>
            <button
              onClick={() => setMoreDetail((prev) => !prev)}
              className="text-blue-500 underline mt-2"
            >
              {moreDetail ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};
