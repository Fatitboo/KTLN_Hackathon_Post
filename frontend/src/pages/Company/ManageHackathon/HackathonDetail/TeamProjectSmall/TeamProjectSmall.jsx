import { BsFillHeartFill } from "react-icons/bs";
import { defaultAvt } from "../../../../../assets/images";
import { FaTags } from "react-icons/fa6";
import { CustomCheckBox } from "../../../../../components";

const TeamProjectSmall = ({ props, select }) => {
  return (
    <>
      <div className="max-w-xs bg-white border border-gray-300 rounded-sm hover:shadow-md">
        <div>
          <div className="px-2 h-16 flex flex-row gap-2 relative">
            <div className="relative top-3">
              <div className="w-12 h-12 absolute">
                <img
                  src={props?.thumnailImage}
                  className="w-full h-full text-xs font-bold rounded-full"
                />
              </div>
              {select && (
                <div className="w-12 h-12 bg-slate-600 bg-opacity-70 rounded-full absolute flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    checked={select}
                  />
                </div>
              )}
            </div>
            <div className="relative left-12 w-[80%] self-center">
              <h3 className="text-base font-semibold line-clamp-1">
                {props?.projectTitle}
              </h3>
              <p className="text-gray-600 line-clamp-2 italic text-sm">
                {props?.tagLine}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-1 flex justify-between p-2 bg-gray-100 align-bottom">
          <div className="line-clamp-1">{props?.teamName}</div>
          <div className="flex -space-x-2 ">
            {props?.createdBy?.map((item) => {
              return (
                <img
                  key={item._id}
                  className="w-6 h-6 rounded-full border-2 border-white"
                  src={item.avatar ?? imgUser}
                  alt="User 1"
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamProjectSmall;
