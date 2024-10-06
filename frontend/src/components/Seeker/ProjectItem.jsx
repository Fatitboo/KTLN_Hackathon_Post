import React from "react";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {PiSuitcaseSimpleThin} from 'react-icons/pi';
import {BiTimeFive} from 'react-icons/bi';
import { FlashIcon } from "../../assets/icons";
import CustomButton from "../CustomButton";

const ProjectItem = ({ corAvatar, corName, corAddress, projectName, projectTime, projectCreateTimeLeft, projectContent, projectSkills, projectFee, projectFeeUnit}) => {
    return (
        <>
            <div>
                <div>
                    <div className="hover:transition-all hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:bg-[#FFF] rounded-lg border-[1px] border-[#e0e6f7] bg-[#f8faff] px-[10px] pt-[5px] pb-[20px]">
                        
                        {/* Company */}
                        <div className="flex flex-row px-[10px] pt-[30px] pb-[15px]">
                            {corAvatar && <div className="w-[67px] h-[52px] pr-[15px]">{corAvatar}</div>}
                            <div className="flex flex-col">
                                <a href="" className="text-[18px] leading-[26px] text-[#05264e] font-bold">{corName}</a>
                                <span className="text-[#a0abb8] text-[12px] flex flex-row items-center"><HiOutlineLocationMarker color="#a0abb8" strokeWidth={"1.5px"} className="w-[14px] h-[14px] mb-1 mr-1"/>{corAddress}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <h6><a href="" className="text-[#05264e] font-bold hover:text-[#3c65f5]">{projectName}</a></h6>
                        </div>

                        {/* Category */}
                        <div className="flex flex-row items-center mt-[6px]">
                            <span className="text-[#a0abb8] text-[12px] flex flex-row items-center"><PiSuitcaseSimpleThin color="#a0abb8" strokeWidth={"1.5px"} className="mr-[2px] mb-[2px]"/>{projectTime}</span>
                            <div className="w-3"></div>
                            <span className="text-[#a0abb8] text-[12px] flex flex-row items-center"><BiTimeFive color="#a0abb8" strokeWidth={"0.05px"} className="mr-[2px] mb-[2px]"/>{projectCreateTimeLeft}</span>
                        </div>

                        {/* Content */}
                        <div className="mt-[15px]">
                            <p className="text-[#4f5e64] text-[14px] leading-[1.75]">{projectContent}</p>
                        </div>

                        {/* Skill */}
                        
                        <div className="mt-[30px] flex flex-row flex-wrap">
                            {
                                projectSkills.map((item, index) => {
                                    return <div key={index} className="hover:text-[#3C65F5] leading-none text-[#4F5E64] bg-[#EFF3FC] px-[10px] py-[7px] rounded text-[12px] mr-[5px] cursor-pointer">{item}</div>;
                                })
                            }
                        </div>

                        {/* Price and Apply */}
                        <div className="flex flex-row justify-between mt-[30px]">
                            <div>
                                <span className="text-[#3c65f5] text-[22px] font-bold">
                                    {projectFee}
                                </span>
                                <span className="text-[#6C757D] text-[14px]">
                                    /{projectFeeUnit}
                                </span>
                            </div>
                            <div><CustomButton containerStyles="px-[10px] py-[12px] bg-[#e0e6f7] text-[12px] text-[#3c65f5] rounded-[4px] hover:text-[#e0e6f7] hover:bg-[#3c65f5] hover:duration-200 leading-none" title={"Apply Now"}/></div>
                        </div>
                    </div>
                    
                </div>
               
            </div>
        </>
    );
};
export default ProjectItem;

