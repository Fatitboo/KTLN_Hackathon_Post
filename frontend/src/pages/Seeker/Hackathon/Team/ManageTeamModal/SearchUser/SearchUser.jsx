import { defaultAvt } from "@/assets/images";

const SearchUser = ({ props, value }) => {
  return (
    <>
      <div className="w-full grid grid-cols-2 items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <div className="w-10 h-10">
            <img
              src={props?.avatar ?? defaultAvt}
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div>
            <div>{props?.fullname}</div>
            <div>{props?.email}</div>
          </div>
        </div>
        {/* <div className="w-10"></div> */}
        <div className="flex flex-row-reverse gap-1 flex-wrap">
          {props?.settingRecommend?.skills?.map((item, index) => {
            return (
              <div
                key={index}
                className={`bg-slate-200 px-1 rounded-[4px] ${
                  item.toLowerCase().includes(value.toLowerCase()) &&
                  "bg-yellow-500"
                }`}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchUser;
