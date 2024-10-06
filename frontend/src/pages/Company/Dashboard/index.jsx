import { LiaStar } from "react-icons/lia";
import Applicants from "./Applicants";
import { ComboBox, LoadingComponent } from "../../../components";
import ProjectChart from "../../Admin/Dashboard/ProjectChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDataStatisticalAction, resetSuccessAction } from "../../../redux/slices/users/usersSlices";
import { IoBagHandleOutline, IoCodeWorkingOutline, IoDocumentTextOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { PiBagSimpleLight, PiSuitcaseSimpleDuotone } from "react-icons/pi";
import { isActiveSidebarAction } from "../../../redux/slices/skills/skillsSlices";
const cbb = [
    {
        id: 6,
        name: 'Last 6 Months'
    },
    {
        id: 12,
        name: 'Last 12 Months'
    },
    {
        id: 24,
        name: 'Last 24 Months'
    },
]


function DashboardCompany() {
    const dispatch = useDispatch();
    const [dataViews, setDataView] = useState([])
    const [currentLastMonths, setCurrentLastMonths] = useState(6)
    const [noti, setNoti] = useState([])
    const onFilterValueSelected = (filterValue) => {
        setCurrentLastMonths(filterValue.id)
    }
    useEffect(() => {
        dispatch(getDataStatisticalAction());
    }, [dispatch])
    const storeData = useSelector(store => store?.users);
    const { viewsProfile, isSuccess, appErr, loading, shortListed, postedProjects, postedVacancies, notification, recentApplicants } = storeData;
    useEffect(() => {
        if (isSuccess) {
            dispatch(resetSuccessAction());
            setNoti([...notification ?? []])
            var dt = [];
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            if (month >= currentLastMonths) {
                for (var i = currentLastMonths; i--; i >= 0) {
                    const obj = {
                        name: (month - i) + '/' + year,
                        views: 0
                    }

                    viewsProfile?.forEach(item => {
                        const arr = item?.viewsId?.split('/');
                        if (parseInt(arr[0]) === month - i && parseInt(arr[1]) === year) {
                            obj.views = item?.numOfViews;
                        }
                    })
                    dt.push({ ...obj })
                }
            }
            else {
                for (var i = currentLastMonths; i--; i >= 0) {
                    const obj = {
                        name: (month - i <= 0 ? month - i + 12 : month - i) + '/' + (month - i <= 0 ? year - 1 : year),
                        views: 0
                    }

                    viewsProfile?.forEach(item => {
                        const arr = item?.viewsId?.split('/');
                        if (parseInt(arr[0]) === (month - i <= 0 ? month - i + 12 : month - i) && parseInt(arr[1]) === (month - i <= 0 ? year - 1 : year)) {
                            obj.views = item?.numOfViews;
                        }
                    })
                    dt.push({ ...obj })
                }
            }
            setDataView([...dt])
            const now = month + year + ''

        }
    }, [isSuccess])
    useEffect(() => {
        var dt = [];
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        console.log(month)
        if (month >= currentLastMonths) {
            for (var i = currentLastMonths; i--; i >= 0) {
                const obj = {
                    name: (month - i) + '/' + year,
                    views: 0
                }
                viewsProfile?.forEach(item => {
                    const arr = item?.viewsId?.split('/');
                    if (parseInt(arr[0]) === month - i && parseInt(arr[1]) === year) {
                        obj.views = item?.numOfViews;
                    }
                })
                dt.push({ ...obj })
            }
        }
        else {
            for (var i = currentLastMonths; i--; i >= 0) {
                const obj = {
                    name: (month - i <= 0 ? month - i + 12 : month - i) + '/' + (month - i <= 0 ? year - 1 : year),
                    views: 0
                }
                viewsProfile?.forEach(item => {
                    const arr = item?.viewsId?.split('/');
                    if (parseInt(arr[0]) === (month - i <= 0 ? month - i + 12 : month - i) && parseInt(arr[1]) === (month - i <= 0 ? year - 1 : year)) {
                        obj.views = item?.numOfViews;
                    }
                })
                dt.push({ ...obj })
            }
        }
        setDataView([...dt])

    }, [currentLastMonths])
    const displayNoti = (content) => {
        // Name has been applied to NameVacancy 
        const arrNoti = []
        if (content.includes('has been applied to')) {
            const arr = content.split('has been applied to')
            console.log(arr)
            arrNoti[0] = arr[0];
            arrNoti[1] = 'has been applied to';
            arrNoti[2] = arr[1];
            return arrNoti;
        }
        // Admin has been approved the 
        if (content.includes('has been approval')) {
            const arr = content.split('has been approval')
            arrNoti[0] = arr[0];
            arrNoti[1] = 'has been approval';
            arrNoti[2] = arr[1];
            return arrNoti;
        }
        if (content.includes('has been rejected')) {
            const arr = content.split('has been rejected')
            arrNoti[0] = arr[0];
            arrNoti[1] = 'has been rejected';
            arrNoti[2] = arr[1];
            return arrNoti;
        }
        if (content.includes('has been waitPayment')) {
            const arr = content.split('has been waitPayment')
            arrNoti[0] = arr[0];
            arrNoti[1] = 'has been accepted';
            arrNoti[2] = arr[1];
            return arrNoti;
        }
        const arr = content.split('has been')
        arrNoti[0] = arr[0];
        arrNoti[1] = 'has been';
        arrNoti[2] = arr[1];
        return arrNoti;
    }
    return (
        <div className="px-10 pb-0">
            {loading && <LoadingComponent />}

            {/* Start title of page  */}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Dashboard Home!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">This is Dashboard </div>

            </div>

            <div className="grid grid-cols-4 gap-5 mb-5">
                <Link to={'/Organizer/manage-vacancy'} onClick={() => dispatch(isActiveSidebarAction('Manage Vacancy'))} className="bg-white h-[120px] rounded-lg shadow flex p-6 cursor-pointer">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[rgba(25,103,210,.1)] h-[80px] w-[80px] text-[#1967d2] flex items-center place-content-center'>
                            <IoBagHandleOutline fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl text-[#1967d2]'>{postedVacancies}</span>
                        <span className='text-sm text-[#202124]'>Posted Vacancies</span>
                    </div>
                </Link>
                <Link to={'/Organizer/interview'} className="bg-white h-[120px] rounded-lg shadow flex p-6 cursor-pointer">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[rgba(217,48,37,.1)] h-[80px] w-[80px] text-[#d93025] flex items-center place-content-center'>
                            <IoDocumentTextOutline fontSize={40} className="text-[#d93025]" />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl   text-[#d93025]'>{recentApplicants?.length}</span>
                        <span className='text-sm text-[#202124]'>Applicants</span>
                    </div>
                </Link>
                <Link to={'/Organizer/manage-project'} onClick={() => dispatch(isActiveSidebarAction('Manage Project'))} className="bg-white h-[120px] rounded-lg shadow flex p-6 cursor-pointer">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[rgba(249,171,0,.1)] h-[80px] w-[80px] text-[#f9ab00] flex items-center place-content-center'>
                            <IoCodeWorkingOutline fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl  text-[#f9ab00] '>{postedProjects}</span>
                        <span className='text-sm text-[#202124]'>Posted Projects</span>
                    </div>
                </Link>
                <Link to={'/Organizer/short-listed-users'} onClick={() => dispatch(isActiveSidebarAction('ShortListed Seeker'))} className="bg-white h-[120px] rounded-lg shadow flex p-6 cursor-pointer">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[rgba(52,168,83,.1)] h-[80px] w-[80px] text-[#34a853] flex items-center place-content-center'>
                            <LiaStar fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl text-[#34a853]  '>{shortListed}</span>
                        <span className='text-sm text-[#202124]'>Shortlist Seekers</span>
                    </div>
                </Link>
            </div>


            <div className="flex flex-wrap mt-3">
                <div className="max-w-full pt-3 shrink-0 w-full grid grid-cols-6 grid-flow-row gap-5 ">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pt-1 shrink-0 col-span-4 pr-2 pb-4" >
                        <div className='mx-7 pt-6 font-bold '>Your profile Views</div>
                        <div className=' flex mb-6 ml-4 mt-2' >
                            <span className='mt-3 ml-3 mr-2'>Sort By: </span>
                            <div className="w-52">
                                <ComboBox listItem={cbb} filterValueSelected={onFilterValueSelected} />
                            </div>
                        </div>
                        <ProjectChart data={dataViews} />
                    </div>
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pt-1 col-span-2 shrink-0 ">
                        <div className='mx-5 pt-6 font-bold '>Notifications</div>
                        <div className="pr-4 pl-5 mt-4 overflow-auto h-[470px] no-scrollbar">
                            {
                                ([...noti]?.reverse())?.map((item, index) => {
                                    return <div key={index} className="flex mt-2 mb-6 ">
                                        <div className="flex items-start">
                                            <div className={`rounded-full p-2 mr-4 mt-1.5 ${index % 2 === 0 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}><PiSuitcaseSimpleDuotone /></div>
                                            <div className="flex flex-wrap ">
                                                <div className="font-medium  flex flex-nowrap mr-1 text-sm ">{displayNoti(item?.contentNoti)[0]} </div>
                                                <div className="font-normal flex-wrap flex mr-1 text-sm text-gray-500 ">{displayNoti(item?.contentNoti)[1]} </div>
                                                <div className="font-normal text-blue-700 flex flex-wrap mr-1 text-sm " >{displayNoti(item?.contentNoti)[2]} </div>

                                                <div className="font-normal flex-wrap flex mr-1 text-sm text-gray-500 ">at {`${item?.notiTime[3]}:${item?.notiTime[4]} ${item?.notiTime[2]}/${item?.notiTime[1]}/${item?.notiTime[0]}`}</div>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap mt-3">
                <div className="max-w-full  shrink-0 w-full grid grid-cols-4 grid-flow-row gap-5 ">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pt-1 shrink-0 col-span-4 w-full px-8">
                        <div className='pt-6 px-4 font-bold mt-4'>Recent Applicants: </div>
                        <div className="relative overflow-y-hidden overflow-x-hidden rounded-md mb-8 pt-8 px-4 bg-white border-0 text-sm h-fit w-full" >
                            {
                                recentApplicants?.map((item, index) => {
                                    return <>
                                        <div>
                                            <div className="flex font-medium mb-4 text-base">
                                                <div>Vacancy: </div>
                                                <div className="text-blue-800 ml-2">{item?.vacancyName}</div>
                                            </div>
                                            <div className=" grid grid-cols-2 gap-x-8 w-full">
                                                {item?.applicants?.map((i, idx)=>{
                                                    return <Applicants key={idx} item={i} />
                                                })}
                                            </div>
                                        </div>
                                    </>;
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DashboardCompany;