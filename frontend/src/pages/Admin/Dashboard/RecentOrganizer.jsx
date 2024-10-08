import { BiMap } from "react-icons/bi";
import { CiCalendarDate } from 'react-icons/ci'
import { Link } from "react-router-dom";
function RecentOrganizerRegisted({ item }) {
    return (
        <Link to={`/Admin/user-management/${item.userId}`}  className="relative px-3 py-5 font-normal text-base   cursor-pointer w-full">
            <div className="mb-2 grid grid-cols-5 grid-flow-row h-14 px-3 ">
                <div className="w-full p-1 col-span-1">
                    <img src={item?.avatar?.fileUrl??'https://pic.onlinewebfonts.com/thumbnails/icons_148020.svg'} className="w-full h-auto align-middle" alt="logo" />
                </div>
                <div className="w-full col-span-4 pb-4">
                    <div className="font-medium text-md mb-1 line-clamp-1 w-full">{item?.fullName}</div>
                    <div className="grid grid-cols-2 grid-flow-row w-full">
                        <div className=" font-light text-sm mb-0  col-span-1 flex ">
                            <BiMap className="mt-1 mr-1" />
                            <div className="line-clamp-1 text-ellipsis w-full">{item?.address?.province}</div>
                        </div>
                        <div className=" font-light text-sm mb-0 ml-3 flex col-span-1">
                            <CiCalendarDate className="mt-1 mr-1" />
                            <div className="line-clamp-1 text-ellipsis w-full">{item?.createdAt?item?.createdAt[2]+'/'+item?.createdAt[1]+'/'+item?.createdAt[0]:''}</div>

                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default RecentOrganizerRegisted;