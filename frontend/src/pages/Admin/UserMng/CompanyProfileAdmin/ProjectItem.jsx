import React, { useState } from "react";
import { PiTargetLight } from 'react-icons/pi';
import { GoHourglass } from "react-icons/go";
import { BiTimeFive } from 'react-icons/bi';
import { IoChevronDownOutline } from "react-icons/io5";
import axios from "axios";
import baseUrl from "../../../../utils/baseUrl";
import VacancyItem from "./VacancyItem";
import { Link } from "react-router-dom";

const ProjectItem = ({ props, fullName }) => {
    let [dropDownTags, setDropDownTags] = useState(false)
    const [vacancies, setVacancies] = useState(null)
    const [loading, setLoading] = useState(false)
    const [moreDetail, setMoreDetail] = useState(false)
    const apiPrefix = 'api/v1/projects';
    const handleGetVacancies = async () => {
        try {
            setLoading(true);
            if (!dropDownTags) {
                if (!vacancies) {
                    if (props?.projectId) {
                        const res = await axios.get(`${baseUrl}/${apiPrefix}/get-vacancies-project/${props?.projectId}`);

                        if (res.data) {
                            setVacancies(res.data.vacancies)
                            setDropDownTags(!dropDownTags)
                        }
                    }
                }
                else {
                    setDropDownTags(!dropDownTags)
                }
            }
            else {
                setDropDownTags(false)
            }
            setLoading(false)
        }
        catch (errors) {
            console.log(errors)
            setLoading(false)
        }

    }
    return (
        <>
            <div >
                <div className="p-7 rounded-[4px] border overflow-hidden border-[#ecedf2] hover:shadow-[0_7px_18px_rgba(64,79,104,.05)] hover:bg-[#f6faff] mb-[30px]">
                    <Link to={'/Admin/approval-project/' + props?.projectId} className="flex flex-row">
                        {/* <div>
                            <div className="w-[50px] h-[50px] rounded-lg bg-slate-400">
                                <img src={props?.avatar} className="w-full h-full" alt="Logo"/>
                            </div>
                        </div> */}
                        <div className="ml-6">
                            <h4 className="text-[18px] text-[#202124] hover:text-[#1967d2] leading-6 font-medium">
                                <a href="#">{props?.projectName}</a>
                            </h4>
                            <div className="flex flex-row items-center mt-2">
                                <div className="mr-3 bg-[rgba(25,103,210,.15)] text-[#1967d2] rounded-3xl flex">
                                    <span className="text-[13px] px-[20px] py-[5px] leading-none">{fullName}</span>
                                </div>
                                <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                    <BiTimeFive className="w-[18px] h-[18px] mr-[5px]" />
                                    {props?.startDate?.split("-").reverse().join("/")}
                                </div>
                                <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                    <GoHourglass className="w-[18px] h-[18px] mr-[5px]" />
                                    {props?.duration} {props?.period}
                                </div>
                                <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                    <PiTargetLight className="w-[18px] h-[18px] mr-[5px]" />
                                    {props?.vacancies?.length} vacancies
                                </div>
                            </div>
                            <div className="flex flex-row items-center mt-2">
                                {props?.occupations?.map((item, index) => {
                                    return (
                                        <div key={index} className={`mr-3 
                                            ${index % 3 === 1 ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                                : index % 3 === 2 ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                                    : "bg-[rgba(52,168,83,.15)] text-[#34a853]"} rounded-3xl flex
                                        `}>
                                            <span className="text-[13px] px-[20px] py-[5px] leading-none">{item}</span>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="mt-3 overflow-hidden ">
                                <p className={`bg-transparent ${moreDetail ? '' : 'limitline5'} `} dangerouslySetInnerHTML={{ __html: props?.description }}>
                                </p>
                            </div>
                        </div>
                    </Link>

                    <div>
                        <div className="flex flex-col mt-3">
                            <input type="checkbox" className="peer" checked={dropDownTags} hidden />
                            <div className="flex flex-row border  items-center justify-between p-2 px-5 transition-all duration-500 cursor-pointer hover:bg-[rgba(25,103,210,.15)] bg-[#e6fcff]  peer-checked:rounded-es-none peer-checked:rounded-ee-none"
                                onClick={handleGetVacancies}>
                                <div className="flex flex-row items-top mr-3">
                                    <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap">
                                        {props?.vacancies?.length} open vacancies
                                    </div>
                                </div>
                                {
                                    loading ?
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                            <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="#2d2d2d" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        :
                                        <div className="h-full self-start mt-[2px] cursor-pointer">
                                            <input type="checkbox" className="peer" hidden checked={dropDownTags} />
                                            <IoChevronDownOutline size={22} className='transition-transform duration-500 rotate-0 peer-checked:rotate-180' />
                                        </div>
                                }
                            </div>
                            <div className={`overflow-auto no-scrollbar rounded-ee-lg rounded-es-lg border-gray-400 bg-[#e6fcff]  border-t-0 gap-y-2 transition-all duration-500 ease-in-out max-h-0 opacity-0 peer-checked:max-h-[500px] peer-checked:opacity-100`}>
                                <div className="my-1 gap-1 flex flex-col">
                                    {
                                        vacancies?.map((item, index) => {
                                            return <div key={index} className="mx-1 relative">

                                                <VacancyItem props={item} isAvatar={false} />
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProjectItem;

