import React from "react";

const ProjectMajorItem = ({ icon, title, projectNumber, type}) => {
    if(type === "small"){
        return (
            <>
                <div className="animate-[all_3s_ease_0s] box-border flex flex-wrap cursor-pointer hover:animate-[wiggle2_0.3s_ease_0s_forwards] flex-row border border-[rgba(6,18,36,.1)] border-solid rounded-lg py-[13px] px-[17px] mx-[4px]">
                    <div className="flex flex-row justify-center align-middle">
                        {icon && <div className="flex justify-center items-center w-[18px] h-[18px] pr-[6px]">
                            {icon}
                           </div>}
                        <p className="text-[12px] text-[#05264e] font-bold
                                    hover:text-[#3c65f5]">{title}</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="animate-[all_3s_ease_0s] my-1 mx-3 box-border flex flex-wrap cursor-pointer hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:duration-300 flex-row border border-[rgba(6,18,36,.1)] border-solid rounded-[12px] py-[22px] px-[18px]">
                <div className="flex flex-col justify-center">
                    {icon && <div className="sw-[52px] h-[42px] pr-[10px]">{icon}</div>}
                </div>
                <div className="flex flex-col justify-center">
                    <h4 className="text-base text-[#05264e] font-bold mb-[3px]
                                    hover:text-[#3c65f5]">{title}</h4>
                    <p className="text-xs text-[#66789c] font-[500] hover:text-[#3c65f5]">{`${projectNumber} Projects Available`}</p>
                </div>
            </div>
        </>
    );
};
export default ProjectMajorItem;

