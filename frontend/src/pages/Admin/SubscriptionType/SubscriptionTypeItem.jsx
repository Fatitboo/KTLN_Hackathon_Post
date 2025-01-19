import React, { useState } from "react";
import { LiaEditSolid, LiaEyeSolid, LiaTrashSolid } from "react-icons/lia";

export const SubscriptionTypeItem = ({ item, onOpenModal, handleDelete }) => {
  const [openDetail, setOpenDetail] = useState(false);
  const convertDateFormat = (inputDate) => {
    const date = new Date(inputDate);

    // Lấy giờ và phút
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    // Lấy ngày, tháng, năm
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    // Tạo chuỗi định dạng mong muốn
    const formattedDate = `${hours}:${minutes} ${day}-${month}-${year}`;

    return formattedDate;
  };

  return (
    <React.Fragment>
      <tr className="relative border border-solid border-[#ecedf2] w-full text-base h-[50px] hover:bg-[#f4f2f2] ">
        <td className="w-3/12">
          <div className="text-left pl-3 py-3">#{item?._id?.slice(0, 20)}</div>
        </td>
        <td className="w-2/12">
          <div className="text-left font-light text-[16px] py-3">
            {item?.name}
          </div>
        </td>
        <td className="w-2/12">
          <div className="list-none flex relative item-left ml-10">
            <div className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 hover:bg-[#5f86e9] hover:text-white cursor-pointer">
              <LiaEditSolid fontSize={18} onClick={onOpenModal} />
            </div>
            <div className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 hover:bg-[#5f86e9] hover:text-white cursor-pointer">
              <LiaTrashSolid fontSize={18} onClick={handleDelete} />
            </div>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};
