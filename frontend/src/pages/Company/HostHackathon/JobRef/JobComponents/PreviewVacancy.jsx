import { useEffect } from "react";
import { BiBookmark } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentVacanciesComponent } from "../../../../../redux/slices/vacancies/vacanciesSlices";

function PreviewVacancy() {
    const dispatch = useDispatch()
    const unCompletedVacancy = useSelector((state) => state.vacancies.unCompletedVacancy)
    const vacancyId = useSelector((state) => state.vacancies.vacancyId)
    useEffect(() => {
        vacancyId && dispatch(getCurrentVacanciesComponent(vacancyId))
    }, [])
    return (
        <>
            <div className="height-[100vh] flex flex-1 flex-col rounded-[10px] border border-[#ecedf2] shadow-[0_7px_18px_rgba(64,79,104,.05)] pb-2">
                <div className="px-7 mt-7">
                    <div className="flex flex-col justify-center my-3 mr-4">
                            <span className="text-[22px] text-[#202124] leading-6 font-medium">
                                <a href="#">{unCompletedVacancy?.jobBasic?.jobTitle}</a>
                            </span>
                            <span className="text-[14px] text-[#1967d2] hover:text-[#202124] leading-6 font-medium mt-2">
                                <a href="#" className="underline underline-offset-2">{unCompletedVacancy?.userInfo?.fullName}</a>
                            </span>
                            <span className="text-[gray] mt-1">
                                {unCompletedVacancy?.jobBasic?.location}
                            </span>
                            <div className="flex flex-row mt-6 h-[46px]">
                                <div className="flex items-center justify-center w-1/4 box-border bg-[#1967d3] px-[10px] py-[4px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"  >
                                    {
                                       <span className="text-[15px] leading-none font-bold">Apply now</span>
                                    }
                                    
                                </div>
                                <div className="item flex items-center justify-center w-[52px] rounded-[7px] bg-[rgba(25,103,210,.07)] hover:bg-[rgba(15,30,51,0.07)] ml-5 cursor-pointer opacity-80">
                                    <BiBookmark className="w-full h-full p-[12px] rounded-[7px]" color="#1967d3"/>
                                </div>
                            </div>
                    </div>
                </div>
                <div className="overflow-y-auto px-7">
                    <div className="mt-3">
                        <span className="text-lg leading-6 text-[#202124] mb-3 mt-5 font-semibold">Description</span>
                        <p className="bg-transparent" dangerouslySetInnerHTML={{ __html: unCompletedVacancy?.jobDes?.description }}>
                            </p>
                    </div>
                    {unCompletedVacancy?.jobDes?.skills ? <div className="mt-5">
                        <div className="w-full h-[0.5px] bg-[#d6d6d6] mb-4"></div>
                        <span className="text-lg leading-6 text-[#202124] font-semibold">Skills and Expertise</span>
                        <div className="flex flex-row flex-wrap items-center mt-2 w-3/4">
                            {unCompletedVacancy?.jobDes?.skills?.map((item, index) => {
                                 // ${item.level === "Advanced" ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                        // : item.level === "Medium" ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                        // : "bg-[rgba(249,171,0,.15)] text-[#f9ab00]"} rounded-3xl flex
                                return (
                                    <div key={index} className={`mr-3 
                                        ${item.level === "Advanced" ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                        : item.level === "Medium" ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                        : "bg-[rgba(52,168,83,.15)] text-[#34a853]"} rounded-3xl flex
                                    `}>
                                        <span className="text-[13px] px-[20px] py-[5px] leading-none">{item}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div> : null}
                    <div className="mt-5">
                        <div className="w-full h-[0.5px] bg-[#d6d6d6] mb-4"></div>
                        <span className="text-lg leading-6 text-[#202124] mb-3 mt-5 font-semibold">Activity on this job</span>
                        <div>
                            <div className="flex flex-row text-base">
                                <span className="text-[#6a81a1]">Proposals: </span>
                                <span className="text-[#202124] ml-2">20 to 50</span>
                            </div>
                            <div className="flex flex-row text-base">
                                <span className="text-[#6a81a1]">Last viewed by client: </span>
                                <span className="text-[#202124] ml-2">2 hours ago</span>
                            </div>
                            <div className="flex flex-row text-base">
                                <span className="text-[#6a81a1]">Interviewing: </span>
                                <span className="text-[#202124] ml-2">9</span>
                            </div>
                            <div className="flex flex-row text-base">
                                <span className="text-[#6a81a1]">Invites sent: </span>
                                <span className="text-[#202124] ml-2">30</span>
                            </div>
                            <div className="flex flex-row text-base">
                                <span className="text-[#6a81a1]">Unanswered invites:</span>
                                <span className="text-[#202124] ml-2">11</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PreviewVacancy;