import React, { useState } from "react";
import { BiPencil, BiTimeFive, BiTrash } from "react-icons/bi";
import axios from "axios";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import baseUrl from "../../../../utils/baseUrl";

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
            <div className="flex flex-row  items-center justify-between mt-2 text-blue-800">
              <h3 className="text-3xl">{item?.title}</h3>
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
