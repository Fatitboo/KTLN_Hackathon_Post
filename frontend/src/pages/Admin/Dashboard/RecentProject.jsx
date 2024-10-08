import { AiOutlineCheckCircle } from "react-icons/ai";
import { LiaEyeSolid, LiaTrashAltSolid } from "react-icons/lia";
import { BiMap } from "react-icons/bi";
import { Link } from "react-router-dom";
function RecentProject({item}) {
    return (
        <tr  className="relative border-b border-solid border-[#ecedf2] w-full hover:bg-[#f4f2f2] cursor-pointer px-3">
            <td className="relative pl-5 py-5 font-normal text-base w-2/12">
                <div className="mb-0 relative h-14 ">
                    <span className="absolute l-0 t-0 w-10">
                        <img src={item?.corLogo} className="inline-block max-w-full h-auto align-middle" alt="logo" />
                    </span>
                    <div className="pl-16  ">
                        <div className="font-medium text-md text-ellipsis mb-1 line-clamp-1 ">{item?.corName}</div>
                        <div className="flex font-light text-sm mb-0"> <BiMap className="mt-1 mr-1" />  {item?.corAddress}</div>
                    </div>
                </div>
            </td>
            <td className=" w-3/12">
                <div className="font-medium text-ellipsis w-full line-clamp-2">{item?.project?.projectName}</div>
            </td>
            <td className="w-2/12">
                <div className="text-center">{item.project?.status}</div>
            </td>
           
            <td className="text-center w-2/12">
                <div>{item?.project?.createdAt?item?.project?.createdAt[2]+'/'+item?.project?.createdAt[1]+'/'+item?.project?.createdAt[0]:''}</div>
            </td>
            <td >
                <div className="pl-2">
                    <ul className="list-none flex relative item-center ">
                        <li  className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#5f86e9] hover:text-white">
                            <Link to={'/Admin/approval-project/'+item?.project?.projectId}> <LiaEyeSolid fontSize={18} /> </Link>
                        </li>
                       
                    </ul>
                </div>
            </td>
        </tr>
    );
}

export default RecentProject;