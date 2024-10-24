import { AiOutlineGlobal } from "react-icons/ai";
import {
  BsCalendar2Fill,
  BsFillPinMapFill,
  BsFlagFill,
  BsTagsFill,
} from "react-icons/bs";
import { PiBankBold } from "react-icons/pi";
import { calculateTimeLeft } from "../../utils/convert_date";

const HackathonInfo = () => {
  return (
    <>
      <div className="bg-white rounded-sm py-2 border border-gray-300">
        <div className="py-3 px-5">
          <div className="text-white bg-[#21a196] rounded py-1.5 px-4 mr-6 w-fit">
            <li> {calculateTimeLeft("2024-12-01")}</li>
          </div>

          <div className="font-medium my-2">Deadline</div>
          <div>13 thg 11, 2024 @ 8:00am</div>
        </div>
        <div className=" border-t border-gray-200 py-3 px-5">
          <div className="flex font-light items-center">
            <div className="flex items-center">
              <div className="flex items-start text-sm mr-10">
                {location === "Online" ? (
                  <AiOutlineGlobal className="mr-2 mt-0.5" />
                ) : (
                  <BsFillPinMapFill className="mr-2 mt-0.5" />
                )}
                <h6 className="line-clamp-1">{"Online"}</h6>
              </div>
              <div className="flex items-start text-sm">
                <PiBankBold className="mr-2 mt-0.5" />
                <h6 className="line-clamp-1">{"Public"}</h6>
              </div>
            </div>
          </div>
          <div className="flex font-light mt-3 text-sm">
            <div className="mr-6">
              <strong className="font-semibold">${1000}</strong> in prizes
            </div>
            <div className="">
              <strong className="font-semibold">{1000}</strong> participants
            </div>
          </div>
        </div>
        <div className=" border-t border-gray-200 py-3 px-5">
          <div className="flex items-center">
            <BsFlagFill className="text-gray-700 mr-3" />
            <div className="rounded-full border border-blue-500 pl-2 pr-2 mr-3 py-1 text-blue-500 text-sm line-clamp-1">
              {"organization"}
            </div>
          </div>
          <div className="flex items-center mt-3">
            <BsCalendar2Fill className="text-gray-700 mr-3" />
            <div className=" text-gray-700 text-sm">
              {"Jun 17 - Jul 15, 2023"}
            </div>
          </div>
          <div className="flex  mt-3 ">
            <BsTagsFill className="text-gray-700 mr-2 mt-2 " />
            <div className="flex flex-wrap">
              {["Beginner Friendly", "Low code", "Web"].map((item) => {
                return (
                  <>
                    <div className="rounded-[3px] bg-blue-50 px-3 py-1 text-blue-700 text-sm my-1 mr-2">
                      {item}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HackathonInfo;
