import React from "react";
import { PiTargetLight } from 'react-icons/pi';
import { MoneyIcon } from "../../../assets/icons";
import { BiCheck } from "react-icons/bi";
import { LiaTrashAltSolid } from "react-icons/lia";
import { BsEye } from "react-icons/bs";
import { MdCancel, MdOutlineCancel } from "react-icons/md";
import { Candidate } from "../../../assets/images";
import { Link } from "react-router-dom";


const Applicants = ({ item }) => {
    return (
        <>
            <div>
                <div className="flex flex-row cursor-pointer p-7 rounded-[10px] border border-[#ecedf2] hover:bg-[#f6faff] hover:shadow-[0_7px_18px_rgba(64,79,104,.05)] mb-[30px]">
                    {
                        item?.avatar ? (
                            <div>
                                <div className="w-[80px] h-[80px] rounded-full  mr-2">
                                    <img src={item?.avatar?.fileUrl} className="w-full h-full rounded-full" alt="Logo" />
                                </div>
                            </div>
                        ) :
                            <div>
                                <div className="w-[80px] h-[80px] rounded-full  mr-2">
                                    <img src={Candidate} className="w-full h-full rounded-lg" alt="Logo" />
                                </div>
                            </div>
                    }

                    <div className="ml-2 w-full">
                        <div className="flex flex-row items-center">
                            <h4 className="text-[18px] text-[#202124] hover:text-[#1967d2] leading-6 font-medium">
                                <a href="#">{item?.fullName}</a>
                            </h4>
                            <div></div>
                        </div>
                        <div>
                            <div className="flex flex-row items-center mt-2 mb-3">
                                {
                                    item?.jobTitle ? (
                                        <div className="mr-3  text-[#1967d2] flex">
                                            <span className="text-[13px]  py-[5px] leading-none">{item?.jobTitle}</span>
                                        </div>
                                    ) : <div className="mr-3  text-[#1967d2] flex">
                                        <span className="text-[13px]  py-[5px] leading-none">{'Not information'}</span>
                                    </div>
                                }
                                <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                    <PiTargetLight className="w-[18px] h-[18px] mr-[5px]" />
                                    {item?.address?.province}
                                </div>

                            </div>
                            <div className="flex w-full justify-between">
                                <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                    <img src={MoneyIcon} className="w-[18px] h-[18px] mr-[5px]" />
                                    {item?.expectSalary} $/hour
                                </div>
                                <div className="flex items-center justify-center">
                                    <Link to={'/Organizer/seeker-profile/' + item?.userId} className="list-none  relative mr-2 bg-[white] border rounded-md border-[#e9ecf9] h-[30px] w-[30px] px-0.5 justify-center items-center flex py-0.5  hover:bg-blue-400 ">
                                        <BsEye fontSize={15} />
                                    </Link>
                                   
                                </div>
                            </div>
                        </div>
                        <div className="mt-3"></div>

                        <div className="flex flex-wrap line-clamp-2 w-[90%] items-start h-[70px] overflow-y-auto no-scrollbar">
                            {item?.skillUsers?.map((item, index) => {
                                return (
                                    <div key={index} className={`mr-1 items-center w-fit
                                        ${item.skillLevel === "Beginner" ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                            : item.skillLevel === "Expert" ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                                : "bg-[rgba(249,171,0,.15)] text-[#f9ab00]"} rounded-3xl flex`}>
                                        <span className="text-[13px] px-[10px] py-[5px] leading-none whitespace-nowrap">{item.skillName}</span>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>
               
            </div>
        </>
    );
};
export default Applicants;

