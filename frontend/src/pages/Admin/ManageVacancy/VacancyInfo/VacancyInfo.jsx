import React, { useEffect, useState } from "react";
import { CalendarIcon, ExpiryIcon, SalaryIcon } from "../../../../assets/icons";
import { BiMoney, BiPackage } from "react-icons/bi";
import { PiTargetLight } from 'react-icons/pi';
import { GoHourglass, GoLocation } from "react-icons/go";
import { AiOutlineSetting } from 'react-icons/ai';
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { ToastContainer, toast } from "react-toastify";
import { LoadingComponent } from "../../../../components";
import { Candidate } from "../../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllApplicantVacancy, getAllParticipantsVacancy, getVacancyInfoDetail, resetSuccessAction, updateVacancyStatus } from "../../../../redux/slices/vacancies/vacanciesSlices";
import { BsClock } from "react-icons/bs";
import { CustomLoader, SmallItemLoader, VacancyItemLoader } from "../../../../components/Loader";
import Swal from "sweetalert2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import axios from "axios";
import { IoChevronDownOutline } from "react-icons/io5";
import baseUrl from "../../../../utils/baseUrl";

function VacancyInfoAdmin() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [dropDownTags, setDropDownTags] = useState(false)
    const [reports, setReports] = useState(null)
    const [moreDetail, setMoreDetail] = useState(false)
    const [sltVacancy, setSltVacancy] = useState({});
    const [loadingRp, setLoading] = useState(false)
    const [apvStt, setApvStt] = useState('')
    const storeData = useSelector(store => store?.vacancies);
    const { loading, appErr, vacancyInfo, isSuccess2, applicants, loadingGAA, isSuccessAL,
        participants, loadingACAP, loadingRMAP, loadingBLMB, loadingRCMB, loadingDLBL, isSuccessUpd } = storeData;
    const notify = (type, message) => toast(message, { type: type });
    useEffect(() => {
        dispatch(getVacancyInfoDetail(id))
    }, [dispatch])
    useEffect(() => {
        if (isSuccess2) {
            dispatch(resetSuccessAction());
            dispatch(getAllApplicantVacancy(id));
            dispatch(getAllParticipantsVacancy(id))
            setApvStt(vacancyInfo?.approvalStatus)
            setSltVacancy({ ...vacancyInfo });
        }
    }, [isSuccess2])
    const pickHours = (ip) => {
        var str = '- ' + ip
        if (ip === 'Part-time') {
            if (sltVacancy?.timeType === 'Range') {
                str += ': ' + sltVacancy?.timeFirst + ' - ' + sltVacancy?.timeSecond + ' hours/per week'
            }
            if (sltVacancy?.timeType === 'Fixed hours') {
                str += ': ' + sltVacancy?.timeFirst + ' hours/per week'
            }
            if (sltVacancy?.timeType === 'Maximum') {
                str += ': ' + 'No more than ' + sltVacancy?.timeFirst + ' hours/per week'
            }
            if (sltVacancy?.timeType === 'Minimum') {
                str += ': ' + 'No less than ' + sltVacancy?.timeFirst + ' hours/per week'
            }
        }
        if (ip === 'Temporary') {
            str += ': ' + sltVacancy?.timeLength + ' ' + sltVacancy?.timePeriod;
        }
        return str;
    }
    const pickSalary = () => {
        var str = ''
        if (sltVacancy?.salaryType === 'Range') {
            str += sltVacancy?.salaryFirst + ' - ' + sltVacancy?.salarySecond + '$ ' + sltVacancy?.salaryRate
        }
        if (sltVacancy?.salaryType === 'Exact amount') {
            str += sltVacancy?.salaryFirst + ' ' + sltVacancy?.salaryRate + '$ '
        }
        if (sltVacancy?.salaryType === 'Maximum amount') {
            str += 'No more than ' + sltVacancy?.salaryFirst + '$ ' + sltVacancy?.salaryRate
        }
        if (sltVacancy?.salaryType === 'Starting amount') {
            str += 'Starting amount ' + sltVacancy?.salaryFirst + '$ ' + sltVacancy?.salaryRate
        }
        return str;
    }
    const handleRejectVacancy = (id) => {
        // dispatch(deleteOccupationAction(id));
        Swal.fire({
            title: "Confirm Rejected",
            text: "Are you sure you want to reject this vacancy?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Rejected"
        }).then((result) => {
            if (result.isConfirmed) {
                const dt = {
                    id: id,
                    status: 'rejected'
                }
                setApvStt('rejected')
                dispatch(updateVacancyStatus(dt))
            }
        });
    }
    const handleApprovalVacancy = (id) => {
        Swal.fire({
            title: "Confirm accept",
            text: "Are you sure you want to accept this vacancy?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Accept"
        }).then((result) => {
            if (result.isConfirmed) {
                const dt = {
                    id: id,
                    status: 'waitPayment'
                }
                setApvStt('waitPayment')
                dispatch(updateVacancyStatus(dt))
            }
        });
    }
    const handleBlockVacancy = (id) => {
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
                setApvStt('blocked')
                dispatch(updateVacancyStatus(dt))
            }
        });
    }
    const handleOpenBlockVacancy = (id) => {
        // dispatch(deleteOccupationAction(id));
        Swal.fire({
            title: "Confirm Appoval again",
            text: "Are you sure you want to Appoval again this vacancy?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Approval"
        }).then((result) => {
            if (result.isConfirmed) {
                const dt = {
                    id: id,
                    status: 'approved'
                }
                setApvStt('approved')
                dispatch(updateVacancyStatus(dt))
            }
        });
    }
    const storeData1 = useSelector(store => store?.users);
    const { userAuth } = storeData1;
    const apiPrefix = 'api/v1/skills';
    const handleGetReports = async () => {
        try {
            setLoading(true);
            if (!dropDownTags) {
                if (!reports) {
                    if (sltVacancy?.vacancyId) {
                        const config = {
                            headers: {
                                Authorization: `Bearer ${userAuth?.user?.token}`,
                                'Content-Type': 'multipart/form-data',
                            },
                        };
                        const formData = new FormData();
                        formData.append('isVacancy', true)
                        const res = await axios.post(`${baseUrl}/${apiPrefix}/get-all-report-var/${sltVacancy?.vacancyId}`, formData, config);

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
    useEffect(() => {
        if (isSuccessUpd) {
            Swal.fire({
                title: "Success!",
                text: "This item has been updated. Do you want to back to manage vacancies?",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: 'No',
                confirmButtonText: "Yes"
            }).then(result => {
                dispatch(resetSuccessAction());
                if (result.isConfirmed) {
                    navigate(-1)
                }
                else {
                    setSltVacancy({ ...vacancyInfo, approvalStatus: apvStt });
                }
            })
        }
    }, [isSuccessUpd])
    return (<>
        {loading && <LoadingComponent />}
        <ToastContainer />
        {/* Start title of page  */}
        <div className="mb-8 px-10">
            <div className="font-medium text-3xl text-gray-900 mb-2 leading-10 flex items-center">
                <ArrowLeftIcon className="h-8 cursor-pointer mr-2" onClick={() => navigate(-1)} />
                Vacancy Info!
            </div>
        </div>
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
        <div className="px-10 pt-[50px] mx-14  bg-white py-10 rounded-xl shadow">
            <div className="static grid grid-cols-12 gap-4 m-auto box-border">
                {/* left infomation */}
                <div className="col-span-8 pr-[30px]">
                    {/* quick info  */}
                    <></>
                    <div className="flex text-[#696969] mb-12">
                        <div className="w-[100px] h-[100px] rounded-xl">
                            <img src={sltVacancy?.userInfo?.avatar ?? Candidate} className="w-full h-full rounded-xl" alt="" />
                        </div>
                        <div className="ml-5">
                            <div>
                                <div className="text-[24px] leading-[35px] text-[#202124] font-medium">{sltVacancy?.vacancyName}</div>
                            </div>
                            {loading ? <SmallItemLoader /> : <div className="flex flex-row text-[14px] font-thin my-[8px]">
                                <span className="mr-7 text-[#1967d2] font-light">{sltVacancy?.userInfo?.fullName}</span>
                                <span className="flex flex-row items-center mr-7"><BiPackage className="w-[18px] h-[18px] mr-1" />{sltVacancy?.locationType}</span>
                                <span className="flex flex-row items-center mr-7"><GoHourglass className="w-[18px] h-[18px] mr-1" />{sltVacancy?.hiringTimeline ?? 'Not infor'}</span>
                                <span className="flex flex-row items-center mr-7"><PiTargetLight className="w-[22px] h-[22px] mr-1" />{sltVacancy?.maxRequired} required</span>
                            </div>}
                            {/* skills */}
                            <div className="flex flex-row flex-wrap">
                                {
                                    (!sltVacancy.timeRequires ? ['Not information'] : [...sltVacancy.timeRequires]).map((item, index) => {
                                        return <div key={index} className="py-[5px] px-5 rounded-[20px] bg-[#d3e1f5] text-sm text-[#1967d2] mr-[10px] my-1"><span>{item}</span></div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <></>
                    {/* Description  */}
                    <></>
                    {loading ? <CustomLoader type={"title-paragraph"} /> :
                        <div>
                            <h4 className="text-xl leading-6 text-[#202124] mb-5 font-semibold ">Vacancy description</h4>
                            <p className="text-[#696969] text-[15px] mb-6" dangerouslySetInnerHTML={{ __html: sltVacancy?.description }}>

                            </p>
                        </div>
                    }
                    {/* Project vacancy */}
                    <></>
                    <div className="mt-12">
                        <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">Members ({participants?.members ? participants?.members.length : 0})</h4>
                        <div className="flex flex-col gap-3">
                            {
                                loadingGAA ?
                                    [1, 2].map((item, index) => {
                                        return <VacancyItemLoader key={index} />
                                    })
                                    :
                                    participants?.members?.map((item, index) => {
                                        return <div key={index} className="relative">
                                            {item?.isVerify ?
                                                <div className="absolute top-3 left-[-10px] w-[30px] z-10">
                                                    <div className="bg-blue-600 text-white text-sm px-3 py-1 rounded-e w-fit">
                                                        Verified
                                                    </div>
                                                    <svg height="10" width="10">
                                                        <polygon points="0,0 100,0 100,100" fill="rgb(30 64 175)" />
                                                    </svg>
                                                </div>
                                                :
                                                <div className="absolute top-2.5 left-[-10px] w-[30px] z-10">
                                                    <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-e w-fit">
                                                        UnVerified
                                                    </div>
                                                    <svg height="10" width="10" >
                                                        <polygon points="0,0 100,0 100,100" fill="rgb(185 28 28)" />
                                                    </svg>
                                                </div>
                                            }

                                            <div className="col-span-1 border-[0.5px] rounded border-[#ccc] p-4 flex shadow hover:transition-all cursor-pointer hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:bg-[#FFF]">
                                                <img src={item?.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} className="w-[80px] h-[80px] rounded-full my-2 mx-2 shadow"></img>
                                                <div className="my-2 mx-2">
                                                    <div className="font-medium text-base">{item?.fullName ?? 'Not information'}</div>
                                                    <div className="flex my-2">
                                                        <div className="text-blue-700 font-light text-sm mr-3">{item?.jobTitle ?? 'Not information'}</div>
                                                        <span className="text-[#a0abb8] font-light col-span-2 text-sm flex flex-row items-center mb-1 mr-3"><HiOutlineLocationMarker color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1" />{item?.address?.province ?? 'Not infor'}, {item?.address?.country ?? 'not infor'}</span>
                                                        <span className="text-[#a0abb8] font-light text-sm flex flex-row items-center mb-1"><BiMoney color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1" />{item?.expectSalary ? item?.expectSalary + '$/ hour' : 'Not infor'}</span>
                                                    </div>

                                                    <div className="text-[#a0abb8] text-sm flex flex-row items-start w-full pr-6 mt-4">
                                                        <div className="flex flex-wrap line-clamp-2 w-full items-start" >
                                                            {
                                                                (item?.skillUsers ?? [{ skillName: 'Not information', skillLevel: 'Beginner' }]).map((i, index) => {
                                                                    return (
                                                                        <div key={index} className={`mr-3 items-center w-fit
                                                                                    ${i.skillLevel === "Beginner" ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                                                                : i.skillLevel === "Intermediate" ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                                                                    : "bg-[rgba(249,171,0,.15)] text-[#f9ab00]"} rounded-3xl flex`}>
                                                                            <span className="text-[13px] px-[10px] py-[5px] leading-none">{i.skillName}</span>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    })

                            }
                            {(loadingACAP || loadingRCMB) && <VacancyItemLoader />}
                        </div>
                    </div>
                    <div className="mt-12">
                        <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">Applicants ({applicants ? applicants.length : 0})</h4>
                        <div className="flex flex-col gap-3">
                            {
                                loadingGAA ?
                                    [1, 2].map((item, index) => {
                                        return <VacancyItemLoader key={index} />
                                    })
                                    :
                                    applicants?.map((item, index) => {
                                        return <div key={index} className="relative">
                                            {item?.isVerify ?
                                                <div className="absolute top-3 left-[-10px] w-[30px] z-10">
                                                    <div className="bg-blue-600 text-white text-sm px-3 py-1 rounded-e w-fit">
                                                        Verified
                                                    </div>
                                                    <svg height="10" width="10">
                                                        <polygon points="0,0 100,0 100,100" fill="rgb(30 64 175)" />
                                                    </svg>
                                                </div>
                                                :
                                                <div className="absolute top-2.5 left-[-10px] w-[30px] z-10">
                                                    <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-e w-fit">
                                                        UnVerified
                                                    </div>
                                                    <svg height="10" width="10" >
                                                        <polygon points="0,0 100,0 100,100" fill="rgb(185 28 28)" />
                                                    </svg>
                                                </div>
                                            }


                                            <div className="col-span-1 border-[0.5px] rounded border-[#ccc] p-4 flex shadow hover:transition-all cursor-pointer hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:bg-[#FFF]">
                                                <img src={item?.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} className="w-[80px] h-[80px] rounded-full my-2 mx-2 shadow"></img>
                                                <div className="my-2 mx-2">
                                                    <div className="font-medium text-base">{item?.fullName ?? 'Not information'}</div>
                                                    <div className="flex my-2">
                                                        <div className="text-blue-700 font-light text-sm mr-3">{item?.jobTitle ?? 'Not information'}</div>
                                                        <span className="text-[#a0abb8] font-light col-span-2 text-sm flex flex-row items-center mb-1 mr-3"><HiOutlineLocationMarker color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1" />{item?.address?.province ?? 'Not infor'}, {item?.address?.country ?? 'not infor'}</span>
                                                        <span className="text-[#a0abb8] font-light text-sm flex flex-row items-center mb-1"><BiMoney color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1" />{item?.expectSalary ? item?.expectSalary + '$/ hour' : 'Not infor'}</span>
                                                    </div>

                                                    <div className="text-[#a0abb8] text-sm flex flex-row items-start w-full pr-6 mt-4">
                                                        <div className="flex flex-wrap line-clamp-2 w-full items-start" >
                                                            {
                                                                (item?.skillUsers ?? [{ skillName: 'Not information', skillLevel: 'Beginner' }]).map((i, index) => {
                                                                    return (
                                                                        <div key={index} className={`mr-3 items-center w-fit
                                                                                    ${i.skillLevel === "Beginner" ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                                                                : i.skillLevel === "Intermediate" ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                                                                    : "bg-[rgba(249,171,0,.15)] text-[#f9ab00]"} rounded-3xl flex`}>
                                                                            <span className="text-[13px] px-[10px] py-[5px] leading-none">{i.skillName}</span>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    })
                            }
                        </div>
                    </div>
                    <div className="mt-12">
                        <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">Old members ({participants?.oldMembers ? participants?.oldMembers.length : 0})</h4>
                        <div className="flex flex-col gap-3">
                            {
                                loadingGAA ?
                                    [1, 2].map((item, index) => {
                                        return <VacancyItemLoader key={index} />
                                    })
                                    :
                                    participants?.oldMembers?.map((item, index) => {
                                        return <div key={index} className="relative">
                                            {item?.isVerify ?
                                                <div className="absolute top-3 left-[-10px] w-[30px] z-10">
                                                    <div className="bg-blue-600 text-white text-sm px-3 py-1 rounded-e w-fit">
                                                        Verified
                                                    </div>
                                                    <svg height="10" width="10">
                                                        <polygon points="0,0 100,0 100,100" fill="rgb(30 64 175)" />
                                                    </svg>
                                                </div>
                                                :
                                                <div className="absolute top-2.5 left-[-10px] w-[30px] z-10">
                                                    <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-e w-fit">
                                                        UnVerified
                                                    </div>
                                                    <svg height="10" width="10" >
                                                        <polygon points="0,0 100,0 100,100" fill="rgb(185 28 28)" />
                                                    </svg>
                                                </div>
                                            }

                                            <div className="col-span-1 border-[0.5px] rounded border-[#ccc] p-4 flex shadow hover:transition-all cursor-pointer hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:bg-[#FFF]">
                                                <img src={item?.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} className="w-[80px] h-[80px] rounded-full my-2 mx-2 shadow"></img>
                                                <div className="my-2 mx-2">
                                                    <div className="font-medium text-base">{item?.fullName ?? 'Not information'}</div>
                                                    <div className="flex my-2">
                                                        <div className="text-blue-700 font-light text-sm mr-3">{item?.jobTitle ?? 'Not information'}</div>
                                                        <span className="text-[#a0abb8] font-light col-span-2 text-sm flex flex-row items-center mb-1 mr-3"><HiOutlineLocationMarker color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1" />{item?.address?.province ?? 'Not infor'}, {item?.address?.country ?? 'not infor'}</span>
                                                        <span className="text-[#a0abb8] font-light text-sm flex flex-row items-center mb-1"><BiMoney color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1" />{item?.expectSalary ? item?.expectSalary + '$/ hour' : 'Not infor'}</span>
                                                    </div>

                                                    <div className="text-[#a0abb8] text-sm flex flex-row items-start w-full pr-6 mt-4">
                                                        <div className="flex flex-wrap line-clamp-2 w-full items-start" >
                                                            {
                                                                (item?.skillUsers ?? [{ skillName: 'Not information', skillLevel: 'Beginner' }]).map((i, index) => {
                                                                    return (
                                                                        <div key={index} className={`mr-3 items-center w-fit
                                                                                    ${i.skillLevel === "Beginner" ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                                                                : i.skillLevel === "Intermediate" ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                                                                    : "bg-[rgba(249,171,0,.15)] text-[#f9ab00]"} rounded-3xl flex`}>
                                                                            <span className="text-[13px] px-[10px] py-[5px] leading-none">{i.skillName}</span>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    })
                            }
                            {loadingBLMB && <VacancyItemLoader />}
                        </div>
                    </div>
                    <></>

                    <div>
                        <div className="flex flex-col mt-3">
                            <input type="checkbox" className="peer" checked={dropDownTags} hidden onChange={() => { }} />
                            <div className="flex flex-row  items-center justify-between py-2  transition-all duration-500 cursor-pointer   peer-checked:rounded-es-none peer-checked:rounded-ee-none"
                                onClick={handleGetReports}>

                                <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">Reports ({sltVacancy?.reports?.length}) </h4>

                                {
                                    loadingRp ? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
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
                            <div className={`overflow-auto no-scrollbar   bg-transparent border-t-0 gap-y-2 transition-all duration-500 ease-in-out max-h-0 opacity-0 peer-checked:max-h-[500px] peer-checked:opacity-100`}>
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
                </div>


                {/* category */}
                <div className="col-span-4">
                    <div className="grid grid-flow-row grid-cols-3 gap-6 mb-3">

                        {!sltVacancy?.project ? <> {
                            apvStt === 'waitPayment' ?
                                <>
                                    <div></div>
                                    <div></div>
                                    <div onClick={() => handleRejectVacancy(id)} className="flex items-center justify-center h-[53px] box-border bg-red-50 px-[18px] w-full rounded-[8px] text-red-600 border border-red-600 hover:text-white hover:bg-red-600 cursor-pointer">
                                        <span className="text-[15px] leading-none font-[400]">Reject</span>
                                    </div>
                                </>
                                : apvStt === 'rejected' ?
                                    <>
                                        <div></div>
                                        <div></div>
                                        <div onClick={() => handleApprovalVacancy(id)} className="flex items-center justify-center h-[53px] box-border bg-blue-700 px-[18px] w-full rounded-[8px] text-[#fff] hover:bg-blue-900 cursor-pointer">
                                            <span className="text-[15px] leading-none font-[400]">Accept</span>
                                        </div>
                                    </>
                                    : apvStt === 'pending' ?
                                        <>
                                            <div></div>
                                            <div onClick={() => handleRejectVacancy(id)} className="flex items-center justify-center h-[53px] box-border bg-red-50 px-[18px] w-full rounded-[8px] text-red-600 border border-red-600 hover:text-white hover:bg-red-600 cursor-pointer">
                                                <span className="text-[15px] leading-none font-[400]">Reject</span>
                                            </div>
                                            <div onClick={() => handleApprovalVacancy(id)} className="flex items-center justify-center h-[53px] box-border bg-blue-700 px-[18px] w-full rounded-[8px] text-[#fff] hover:bg-blue-900 cursor-pointer">
                                                <span className="text-[15px] leading-none font-[400]">Accept</span>
                                            </div>

                                        </>
                                        : apvStt === 'approved' ? <>
                                            <div></div>
                                            <div></div>
                                            <div onClick={() => handleBlockVacancy(id)} className="flex items-center justify-center h-[53px] box-border bg-gray-700 px-[18px] w-full rounded-[8px] text-[#fff] hover:bg-gray-900 cursor-pointer">
                                                <span className="text-[15px] leading-none font-[400]">Block</span>
                                            </div>
                                        </> : <>
                                            <div></div>
                                            <div></div>
                                            <div onClick={() => handleOpenBlockVacancy(id)} className="flex items-center justify-center h-[53px] box-border bg-green-700 px-[18px] w-full rounded-[8px] text-[#fff] hover:bg-green-900 cursor-pointer">
                                                <span className="text-[15px] leading-none font-[400]">Approve</span>
                                            </div>
                                        </>
                        }</> : <>
                            {
                                apvStt === 'blocked' ? <>
                                    
                                    <div></div>
                                    <div></div>
                                    <div onClick={() => handleOpenBlockVacancy(id)} className="flex items-center justify-center h-[53px] box-border bg-green-700 px-[18px] w-full rounded-[8px] text-[#fff] hover:bg-green-900 cursor-pointer">
                                        <span className="text-[15px] leading-none font-[400]">Approve</span>
                                    </div>
                                </> : <>
                                <div></div>
                                    <div></div>
                                    <div onClick={() => handleBlockVacancy(id)} className="flex items-center justify-center h-[53px] box-border bg-gray-700 px-[18px] w-full rounded-[8px] text-[#fff] hover:bg-gray-900 cursor-pointer">
                                        <span className="text-[15px] leading-none font-[400]">Block</span>
                                    </div>
                                </>
                            }
                        </>}



                    </div>
                    <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                        <div className="text-[#202124] text-[18px] font-semibold mb-4">Vacancy Overview</div>
                        {loading ? <SmallItemLoader /> : <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={CalendarIcon} alt="Calendar" />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Date posted:</div>
                                <span className="text-[15px] text-[#363636]">{sltVacancy?.createdAt ? `${sltVacancy?.createdAt[2]}/${sltVacancy?.createdAt[1]}/${sltVacancy?.createdAt[0]}` : ''}</span>
                            </div>
                        </div>}
                        {loading ? <SmallItemLoader /> : <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={ExpiryIcon} alt="Calendar" />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Expiration date:</div>
                                <span className="text-[15px] text-[#363636]">{sltVacancy?.hiringTimeline}</span>
                            </div>
                        </div>}
                        {loading ? <SmallItemLoader /> : <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <GoLocation color="#1967D2" className="w-6 h-6" strokeWidth={0} />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Location:</div>
                                <span className="text-[15px] text-[#363636]">{sltVacancy?.location}</span>
                            </div>
                        </div>}

                        {loading ? <SmallItemLoader /> : <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <BsClock color="#1967D2" className="w-6 h-6" strokeWidth={0} />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Duration:</div>
                                <div className="text-[15px] text-[#363636]">
                                    {
                                        (!sltVacancy?.timeRequires ? ['Not information'] : [...sltVacancy?.timeRequires]).map((item, index) => {
                                            return <>
                                                <div key={index} >{pickHours(item)}</div>
                                            </>
                                        })
                                    }
                                </div>
                            </div>
                        </div>}
                        {loading ? <SmallItemLoader /> : <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={SalaryIcon} alt="Calendar" />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Salary:</div>
                                <span className="text-[15px] text-[#363636]">{pickSalary()}</span>
                            </div>
                        </div>}
                        {loading ? <SmallItemLoader /> : <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <AiOutlineSetting color="#1967D2" className="w-6 h-6" strokeWidth={0} />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Status:</div>
                                <div className="text-[15px] text-[#363636]">
                                    {
                                        sltVacancy.approvalStatus === 'pending' ?
                                            <div>
                                                <div className="bg-blue-100 mt-2 border-blue-300 border rounded-xl text-center  text-blue-500 w-fit px-1">
                                                    Pending
                                                </div>
                                                <div className="text-sm text-purple-700">* This vacancy is awaiting admin approval!</div>
                                            </div>
                                            : sltVacancy.approvalStatus === 'waitPayment' ?
                                                <div>
                                                    <div className="bg-orange-100 mt-2 border-orange-300 border rounded-xl text-center  text-orange-500 w-fit px-1">
                                                        Wait Payment
                                                    </div>
                                                    <div className="text-sm text-purple-700">* This vacancy is awaiting for payment to be posted!</div>
                                                </div>
                                                : sltVacancy.approvalStatus === 'rejected' ?
                                                    <div>
                                                        <div className="bg-orange-100 mt-2 border-orange-300 border rounded-xl text-center  text-orange-500 w-fit px-1">
                                                            Rejected
                                                        </div>
                                                        <div className="text-sm text-purple-700">* This vacancy has been rejected for approval but can be edited again!</div>
                                                    </div>
                                                    : sltVacancy.approvalStatus === 'approved' ?
                                                        <div>
                                                            <div className="bg-green-100 mt-2 border-green-300 border rounded-xl text-center  text-green-500 w-fit px-1">
                                                                Approved
                                                            </div>
                                                            <div className="text-sm text-purple-700">* This vacancy has been paid for and approved!</div>
                                                        </div>
                                                        : sltVacancy.approvalStatus === 'blocked' ?
                                                            <div>
                                                                <div className="bg-red-100 mt-2 border-red-300 border rounded-xl text-center  text-red-500 w-fit px-1">
                                                                    Blocked
                                                                </div>
                                                                <div className="text-sm text-purple-700">* This vacancy has been blocked!</div>
                                                            </div>
                                                            : <>  </>
                                    }
                                </div>
                            </div>
                        </div>}

                    </div>
                    <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg  justify-between items-center mb-[30px]">
                            <div className="text-[#202124] text-[18px] font-semibold mb-3">Vacancy Skills</div>
                            {loading ? <SmallItemLoader /> :
                                <div className="flex flex-row flex-wrap">
                                    {
                                        (!sltVacancy.skillsRequired ? ['Not required'] : [...sltVacancy.skillsRequired]).map((item, index) => {
                                            return <div key={index} className="py-[3px] px-5 rounded bg-[#e2edf8] text-sm text-[#828281]  mr-[10px] my-1"><span>{item}</span></div>
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                            <span className="text-[#202124] text-[18px] font-semibold">Organizer</span>
                            <div className="mt-4 flex">
                                <div className="w-[50px] h-[50px] rounded-xl mr-4">
                                    <img src={sltVacancy?.userInfo?.avatar ?? Candidate} className="w-full h-full rounded-xl border " alt="" />
                                </div>
                                <div>
                                    <div className="font-medium ">{sltVacancy?.userInfo?.fullName}</div>
                                    <Link to={'/Admin/user-management/' + sltVacancy?.userInfo?.userId} className="font-light text-sm text-blue-700 hover:underline cursor-pointer">View organizer profile</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default VacancyInfoAdmin;