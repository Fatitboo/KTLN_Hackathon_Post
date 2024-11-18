import React, { useState } from 'react'
import { BiTimeFive } from 'react-icons/bi'
import { GoHourglass } from 'react-icons/go'
import { IoChevronDownOutline } from 'react-icons/io5'
import { PiTargetLight } from 'react-icons/pi'
import baseUrl from '../../../utils/baseUrl'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { FiLock } from 'react-icons/fi'
import Swal from 'sweetalert2'
import { updateVacancyStatus } from '../../../redux/slices/vacancies/vacanciesSlices'
import { Link } from 'react-router-dom'
import { LiaEyeSolid } from 'react-icons/lia'

export const VacProj = ({ item }) => {
    let [dropDownTags, setDropDownTags] = useState(false)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [reports, setReports] = useState(null)
    const [moreDetail, setMoreDetail] = useState(false)
    const storeData = useSelector(store => store?.users);
    const { userAuth } = storeData;
    const apiPrefix = 'api/v1/skills';
    const handleGetReports = async () => {
        try {
            setLoading(true);
            if (!dropDownTags) {
                if (!reports) {
                    if (item?.vacProId) {
                        const config = {
                            headers: {
                                Authorization: `Bearer ${userAuth?.user?.token}`,
                                'Content-Type': 'multipart/form-data',
                            },
                        };
                        const formData = new FormData();
                        formData.append('isVacancy', item?.isVacancy)
                        const res = await axios.post(`${baseUrl}/${apiPrefix}/get-all-report-var/${item?.vacProId}`, formData, config);

                        if (res.data) {
                            console.log(res.data.reports)
                            setReports(res.data.reports)
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
    const handleRejectVacancy = (id) => {
        // dispatch(deleteOccupationAction(id));
        Swal.fire({
            title: "Confirm Block",
            text: "Are you sure you want to block this vacancy?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Block"
        }).then((result) => {
            if (result.isConfirmed) {
                const dt = {
                    id: id,
                    status: 'blocked'
                }
                dispatch(updateVacancyStatus(dt))
            }
        });
    }
    return (
        <tr>
            <td colSpan={2} className="p-7 rounded-[10px] border overflow-hidden border-[#ecedf2] hover:shadow-[0_7px_18px_rgba(64,79,104,.05)]  mb-[30px]">
                <div  className="flex flex-row">
                    <div>
                        <div className="w-[50px] h-[50px] rounded-lg bg-slate-400">
                            <img src={item?.avt} className="w-full h-full" alt="Logo" />
                        </div>
                    </div>
                    <div className="ml-6 w-full">
                        <h4 className="text-[18px] text-[#202124] hover:text-[#1967d2] leading-6 font-medium">
                            <a href="#">{item?.vacProName}</a>
                        </h4>
                        <div className='flex justify-between w-full'>
                            <div className="flex flex-row items-center mt-2">
                                <div className="mr-3 bg-[rgba(25,103,210,.15)] text-[#1967d2] rounded-3xl flex">
                                    <span className="text-[13px] px-[20px] py-[5px] leading-none">{item?.orgName}</span>
                                </div>
                                <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                    <BiTimeFive className="w-[18px] h-[18px] mr-[5px]" />
                                    {`${item?.createdAt[2]}/${item?.createdAt[1]}/${item?.createdAt[0]}`}
                                </div>
                                <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                    <GoHourglass className=" h-[18px] mr-[5px]" />
                                    {item?.duration} {item?.isVacancy ? '' : 'weeks'}
                                </div>
                                <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                    <PiTargetLight className="w-[18px] h-[18px] mr-[5px]" />
                                    {item?.address}
                                </div>
                            </div>
                            <div className='pr-[9%] flex'>
                                <div className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#5f86e9] hover:text-white">
                                    <Link to={`/Admin/manage-vacancy/${item.vacProId}`}> <LiaEyeSolid fontSize={18} /> </Link>
                                </div>
                                <FiLock onClick={() => handleRejectVacancy(item?.vacProId)} size={24} color='red' className='cursor-pointer' />
                            </div>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                            {item?.fields?.map((item, index) => {

                                return (
                                    <div key={index} className={`mr-3 
                                            ${index % 3 === 0 ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                            : index % 3 === 1 ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                                : "bg-[rgba(52,168,83,.15)] text-[#34a853]"} rounded-3xl flex
                                        `}>
                                        <span className="text-[13px] px-[20px] py-[5px] leading-none">{item}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="mt-3 overflow-hidden w-full min-h-[60px]">
                            <p className={`bg-transparent w-[96%] ${moreDetail ? '' : 'limitline5'}`} dangerouslySetInnerHTML={{ __html: item?.des }}>
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col mt-3">
                        <input type="checkbox" className="peer" checked={dropDownTags} hidden onChange={() => { }} />
                        <div className="flex flex-row  items-center justify-between p-2 px-5 transition-all duration-500 cursor-pointer   peer-checked:rounded-es-none peer-checked:rounded-ee-none"
                            onClick={handleGetReports}>
                            <div className="flex flex-row items-top mr-3">
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap">
                                    {item?.reports?.length} reports
                                </div>
                            </div>
                            {
                                loading ? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                    <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="#2d2d2d" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                    :
                                    <div className="h-full self-start mt-[2px] cursor-pointer">
                                        <input type="checkbox" className="peer" hidden onChange={() => { }} checked={dropDownTags} />
                                        <IoChevronDownOutline size={22} className='transition-transform duration-500 rotate-0 peer-checked:rotate-180' />
                                    </div>
                            }
                        </div>
                        <div className={`overflow-auto no-scrollbar mx-4  bg-transparent border-t-0 gap-y-2 transition-all duration-500 ease-in-out max-h-0 opacity-0 peer-checked:max-h-[500px] peer-checked:opacity-100`}>
                            <div className="my-1  flex flex-col ">
                                {
                                    reports?.map((item, index) => {
                                        return <div key={index} className=" relative p-4 grid grid-cols-12 border-b border-gray-200 bg-[#f6faff]">
                                            <div className='col-span-1 '>
                                                <img src={item?.avatar} alt="" className='rounded-full w-2/3' />
                                            </div>
                                            <div className='col-span-11 text-[14px]'>
                                                <div className='font-medium text-[16px]'>{item?.orgName}</div>
                                                <div className='text-xs text-gray-600'>{`${item?.createdAt[2]}/${item?.createdAt[1]}/${item?.createdAt[0]}`}</div>
                                                <div className='flex mt-2'>
                                                    <div className='mr-1 font-medium'>Report of type: </div>
                                                    <div>{item?.reportType}</div>
                                                </div>
                                                <div className='flex mt-2 '>
                                                    <div className='mr-1 font-medium'>Additional Infor:</div>
                                                    <div>{item?.additionalInformation}</div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </div>

            </td>
        </tr>
    )
}
