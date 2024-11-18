import React from "react";

const ParticipantItem = ({userAvatar, firstName, surName, position}) => {
    return (
        <>
            <div>
                <div className="flex flex-row items-center p-2 rounded-[10px] bg-[#fff] border border-[#ecedf2] hover:shadow-[0_7px_18px_rgba(64,79,104,.05)] mb-2 cursor-pointer">
                    <div className="w-10 h-10 rounded-full ml-1">
                        <img src={userAvatar} className="w-full h-full rounded-full" alt="" />
                    </div>
                    <div className="ml-3">
                        <div>
                            <h3 className="text-base leading-6 text-[#202124] font-semibold">{firstName} {surName}</h3>
                        </div>
                        <div className=" text-sm text-[#1967d2]">
                            {position}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ParticipantItem;

