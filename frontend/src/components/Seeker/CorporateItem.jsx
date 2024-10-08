import React from "react";
import {HiOutlineLocationMarker} from "react-icons/hi";

const CorporateItem = ({ corAvatar, corName, corAddress, corAvgStar, corAmountRate, corAmountProjects}) => {
    return (
        <>
            <div>
                <div>
                    <div className="hover:transition-all hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:bg-[#FFF] rounded-lg border-[1px] border-[#e0e6f7] bg-[#fbfcff] px-[18px] py-[22px]">
                        
                        {/* Company */}
                        <div className="flex flex-row">
                            {corAvatar && <div className="w-[67px] h-[52px] pr-[10px]">{corAvatar}</div>}
                            <div className="flex flex-col">
                                <a href="" className="text-[18px] leading-[26px] text-[#05264e] font-bold">{corName}</a>
                                <div>
                                    {[...Array(5)].map((star, index) => { 
                                        if(index < corAvgStar)
                                            return (         
                                                <span key={index} className="w-5 h-5 text-[18px] leading-none" style={{color: '#ffbd27'}}>&#9733;</span>        
                                            );
                                        return (         
                                            <span key={index} className="w-5 h-5 text-[18px] leading-none" style={{color: '#a0abb8'}}>&#9733;</span>        
                                        );
                                    })}

                                    <span className="text-[#a0abb8] text-xs ml-[8px] font-medium">({corAmountRate})</span>
                                </div> 
                            </div>
                            
                        </div>
                        <div className="flex flex-row justify-between mt-4">
                            <span className="text-[#a0abb8] text-[12px] flex flex-row items-center"><HiOutlineLocationMarker color="#a0abb8" strokeWidth={"1.5px"} className="w-[14px] h-[14px] mb-1 mr-1"/>{corAddress}</span>
                            <span className="text-[#a0abb8] text-[12px] flex flex-row items-center">{corAmountProjects} Open Projects</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CorporateItem;

