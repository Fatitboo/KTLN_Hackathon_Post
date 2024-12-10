import { defaultAvt } from "../../assets/images";
import { FaTags } from "react-icons/fa6";

const ParticipantItem = ({ props }) => {
  return (
    <>
      <div className="border border-gray-200 rounded-sm p-5">
        <div className="flex pb-5 border-b border-gray-100">
          <img src={defaultAvt} alt="" className="rounded-full w-16 mr-5" />
          <div className="flex justify-between flex-1">
            <div className="">
              <div className="flex space-x-4 items-center">
                <div>{props?.name}</div>
                <div className="flex items-center space-x-1 rounded-full h-fit px-2 py-1 text-sm text-gray-500 bg-gray-100">
                  <FaTags className="mr-2" />
                  {props?.settingRecommend?.specialty}
                </div>
              </div>
              <div className="flex text-xs text-gray-400 mt-3 space-x-4">
                <div>{props?.numProjects} PROJECTS</div>
                <div>{props?.numFollows} FOLLOWER</div>
                <div>{props?.numAchiements} ACHIVEMENT</div>
              </div>
            </div>
            <div className="rounded-full h-fit px-2 py-1 border text-sm text-gray-500 border-r-gray-100">
              {props?.status === "had_team"
                ? "Has a team"
                : props?.status === "working_solo"
                ? "Working solo"
                : props?.status === "finding_teamate"
                ? "Finding teamate"
                : "Unknow"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <div className=" uppercase ml-1 my-2 ">Skills</div>
            <div className="flex flex-wrap">
              {props?.settingRecommend?.skills?.map((item) => {
                return (
                  <>
                    <div className="text-xs mr-2 mt-1 bg-gray-100 text-gray-500 rounded-full px-2 py-1">
                      {item}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div>
            <div className=" uppercase ml-1 my-2">Interest</div>
            <div className="flex flex-wrap">
              {props?.settingRecommend?.interestedIn?.map((item) => {
                return (
                  <>
                    <div className="text-xs mr-2 mt-1 bg-gray-100 text-gray-500 rounded-full px-2 py-1">
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

export default ParticipantItem;
