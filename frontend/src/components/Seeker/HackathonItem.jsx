import { LogoOrgExample } from "../../assets/images";
import { AiOutlineGlobal } from "react-icons/ai";
import { MdNavigateNext } from "react-icons/md";
import { BsCalendar2Fill, BsFillPinMapFill, BsFlagFill, BsTagsFill } from "react-icons/bs";

const HackathonItem = ({
  title,
  location,
  prizes,
  participants,
  imageHackthon,
  isFeature = true,
  isExtended = true,
  period,
  organization,
  startDate,
  endDate,
  isManagedByDevpost,
  themes,
}) => {
    function convertTagsToArray(tagsStr){
        // Loại bỏ dấu ngoặc đơn đầu và cuối, sau đó tách chuỗi thành mảng
        const cleanedStr = tagsStr.replace(/[\[\]']/g, '').trim();
        const tagsArray = cleanedStr.split(',').map(tag => tag.trim());
        
        return tagsArray;
      }
    function calculateTimeLeft(endDateStr) {
        const endDate = new Date(endDateStr);
        const now = new Date();
      
        // Tính toán thời gian còn lại (millisecond)
        const timeLeftMs = endDate.getTime() - now.getTime();
      
        // Nếu thời gian là số âm, trả về "expired"
        if (timeLeftMs < 0) {
          return "Expired";
        }
      
        // Chuyển đổi thời gian còn lại sang ngày
        const daysLeft = Math.floor(timeLeftMs / (1000 * 60 * 60 * 24));
        const weeksLeft = Math.floor(daysLeft / 7);
        const monthsLeft = Math.floor(daysLeft / 30);
      
        // Trả về theo số tháng, tuần hoặc ngày
        if (monthsLeft > 0) {
          return `about ${monthsLeft} month(s) left`;
        } else if (weeksLeft > 0) {
          return `about ${weeksLeft} week(s) left`;
        } else {
          return `about ${daysLeft} day(s) left`;
        }
      }
  return (
    <>
      <div className="relative group">
        <div className="flex">
          {isFeature && (
            <div className="bg-black text-white flex items-center justify-items-center pt-8">
              <div className="text-xs w-5 px-0 font-bold -rotate-90">
                FEATURE
              </div>
            </div>
          )}
          <div
            className={`flex-1 grid gap-3 ${
              isExtended ? "grid-cols-6" : "grid-cols-4"
            } border bg-white shadow-sm ${
              isFeature
                ? "hover:border-black"
                : "border-l-4 border-l-[#21a196] hover:border-[#21a196] pl-5"
            } border-gray-200 cursor-pointer transition-transform duration-500 transform`}
          >
            <div className={`col-span-1  w-full py-5 pl-5 `}>
              <img src={ imageHackthon || LogoOrgExample} alt="" className="shadow-md"/>
            </div>
            <div className="col-span-3  py-5 px-4  font-semibold ">
              <h3 className="line-clamp-1">{title}</h3>
              <div className="flex font-light mt-4 text-xs items-center">
                <div className="text-white bg-[#21a196] rounded-full py-1.5 px-4 mr-6">
                  <li> {calculateTimeLeft(endDate)}</li>
                </div>
                <div className="flex items-start text-sm">
                  {location==='Online' ? <AiOutlineGlobal className="mr-2 mt-0.5" /> : <BsFillPinMapFill className="mr-2 mt-0.5" /> }
                  <h6 className="line-clamp-1">{location}</h6>
                </div>
              </div>
              <div className="flex font-light mt-6 text-sm">
                <div className="py-1.5 mr-6">
                  <strong className="font-semibold">{prizes}</strong> in prizes
                </div>
                <div className="py-1.5 ">
                  <strong className="font-semibold">{participants}</strong> participants
                </div>
              </div>
            </div>
            {isExtended && (
              <>
                <div className="col-span-2 border-l border-gray-200 py-5 pl-6">
                  <div className="flex items-center">
                    <BsFlagFill className="text-gray-700 mr-3" />
                    <div className="rounded-full border border-blue-500 px-3 py-1 text-blue-500 text-sm">
                      {organization}
                    </div>
                  </div>
                  <div className="flex items-center mt-3">
                    <BsCalendar2Fill className="text-gray-700 mr-3" />
                    <div className=" text-gray-700 text-sm">
                      {period}
                    </div>
                  </div>
                  <div className="flex items-start mt-3 ">
                    <BsTagsFill className="text-gray-700 mr-2 mt-2 w-10" />
                    <div className="flex flex-wrap">
                      {[...(convertTagsToArray(themes)||[])].map((item) => {
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
              </>
            )}
          </div>
        </div>
        {/* The right tag  when hover*/}
        <div
          className={`absolute z-0 inset-y-0 ${
            isExtended ? "right-3" : "right-0"
          } flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-0 transform group-hover:translate-x-full`}
        >
          <div
            className={`${
              isFeature ? "bg-black" : "bg-[#21a196]"
            }  text-white py-2 h-full rounded-e-sm flex items-center`}
          >
            <MdNavigateNext className="h-8 w-8" />
          </div>
        </div>
        {/* The left tag when hover */}
        <div className="absolute z-0 inset-y-0 left-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-0 transform group-hover:-translate-x-full">
          <div
            className={`${
              isFeature ? "" : "bg-[#21a196] w-[2px]"
            }  text-white h-full rounded-s-sm flex items-center `}
          ></div>
        </div>
      </div>
    </>
  );
};
export default HackathonItem;
