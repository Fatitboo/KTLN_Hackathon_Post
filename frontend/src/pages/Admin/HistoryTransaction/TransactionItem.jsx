import React, { useState } from "react";

export const TransactionItem = ({ item }) => {
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
        <td className="w-3/12">
          <div className="pl-2 font-medium text-blue-700 text-left py-3 text-ellipsis w-full line-clamp-2">
            {item?.userId?.fullname}
          </div>
        </td>
        <td className="w-2/12">
          <div className="text-left pl-2 py-3">{item?.price / 1000} $</div>
        </td>
        <td className="w-2/12">
          <div className="text-left font-light text-[16px] pl-2 py-3">
            {convertDateFormat(item?.create_at)}
          </div>
        </td>
        <td className="w-2/12">
          <div
            onClick={() => setOpenDetail((prev) => !prev)}
            className="text-left text-blue-800 font-light text-[15px] pl-10 py-3 cursor-pointer hover:underline"
          >
            {openDetail ? "Less detail" : "See detail"}
          </div>
        </td>
      </tr>
      {openDetail && (
        <tr className="h-fit border border-solid border-[#ecedf2] w-full  text-base border-l-2 border-l-blue-700 ">
          <td colSpan={5} className="py-4">
            <div className="py-4 px-10 ">
              <div className="flex">
                <div className="font-bold text-blue-800 mr-3">
                  Transactions Information:{" "}
                </div>
                <div className="text-red-800 font-bold">
                  #{item?._id?.slice(0, 20)}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5 px-5 mt-5 ">
                <div className="flex ">
                  <div className="mr-2">Organizer Name: </div>
                  <div className="text-blue-800 font-medium">
                    {item?.userId?.fullname?.toUpperCase()}
                  </div>
                </div>
                <div className="flex ">
                  <div className="mr-2">Payment amount: </div>
                  <div className="text-blue-800">{item?.price / 1000} $</div>
                </div>
                <div className="flex ">
                  <div className="mr-7">Payment fee: </div>
                  <div className="text-blue-800">1.3 $</div>
                </div>
                <div className="flex ">
                  <div className="mr-10 ">Create time: </div>
                  <div className="text-blue-800">
                    {convertDateFormat(item?.create_at)}
                  </div>
                </div>
                <div className="flex ">
                  <div className="mr-2">Payment method: </div>
                  <div className="text-blue-800">MOMO</div>
                </div>
                <div className="flex ">
                  <div className="mr-2">Payment status: </div>
                  <div className="text-blue-800">SUCCESS</div>
                </div>
                <div className="flex col-span-3">
                  <div className="mr-1">Payment content: </div>
                  <div className="text-blue-800 font-medium">
                    Pay for basic account
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};
