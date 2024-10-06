import { ComboBox, LoadingComponent } from '../../../components'
import UserChart from './UserChart';
import RecentProject from './RecentProject'
import RecentOrganizerRegisted from './RecentOrganizer';
import { Link } from 'react-router-dom';
import { IoDocumentTextOutline, IoCalculatorOutline, IoTabletPortraitOutline } from 'react-icons/io5';
import { LiaEyeSolid, LiaStar, LiaTrashAltSolid } from 'react-icons/lia';
import ProjectChartAdmin from './ProjectChartAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getDataStatisticalAdminAction, resetSuccessAction } from '../../../redux/slices/users/usersSlices';
import { BiMap, BiPackage } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { isActiveSidebarAction } from '../../../redux/slices/skills/skillsSlices';
import RevenueChart from './RevenueChart';
import { CiMoneyBill } from 'react-icons/ci';
import { MdOutlineMoneyOffCsred } from 'react-icons/md';
import { NewTabIcon } from '../../../assets/icons';


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

function Dashboard() {
    const dispatch = useDispatch();
    const [dataViews, setDataView] = useState([])
    const [currentLastMonths, setCurrentLastMonths] = useState(6)
    const [dayRvnOfmonth, setDayOfMonth] = useState([])
    const [monthYear, setmonthYear] = useState('')
    const [totalrevenue, settotalrevenue] = useState(0)

    const [cbbRevenue, setCbbRevenue] = useState(() => {
        const monthYear = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
        return [{ id: 1, name: monthYear }]
    })
    const onFilterValueSelected = (filterValue) => {
        setCurrentLastMonths(filterValue.id)
    }
    const onFilterValueRevenueSelected = (filterValue) => {
        const arr = filterValue.name.split(" ");

        setmonthYear(filterValue.name)
        if (arr[0] === 'December') getDaysOfMonth(parseInt(arr[1]), 12)
        if (arr[0] === 'November') getDaysOfMonth(parseInt(arr[1]), 11)
        if (arr[0] === 'October') getDaysOfMonth(parseInt(arr[1]), 10)
        if (arr[0] === 'September') getDaysOfMonth(parseInt(arr[1]), 9)
        if (arr[0] === 'August') getDaysOfMonth(parseInt(arr[1]), 8)
        if (arr[0] === 'July') getDaysOfMonth(parseInt(arr[1]), 7)
        if (arr[0] === 'June') getDaysOfMonth(parseInt(arr[1]), 6)
        if (arr[0] === 'May') getDaysOfMonth(parseInt(arr[1]), 5)
        if (arr[0] === 'AprilApril') getDaysOfMonth(parseInt(arr[1]), 4)
        if (arr[0] === 'March') getDaysOfMonth(parseInt(arr[1]), 3)
        if (arr[0] === 'February') getDaysOfMonth(parseInt(arr[1]), 2)
        if (arr[0] === 'January') getDaysOfMonth(parseInt(arr[1]), 1)

    }
    useEffect(() => {
        dispatch(getDataStatisticalAdminAction());
    }, [dispatch])
    const storeData = useSelector(store => store?.users);
    const { viewsProfile, isSuccess, appErr, loading, numProjects, recentOrganizers, histories, recentProjects, recentVacancies, numSeekers, numOrganizers, numVacancies } = storeData;
    useEffect(() => {
        if (isSuccess) {
            dispatch(resetSuccessAction());
            var dt = [];
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            if (month >= currentLastMonths) {
                for (var i = currentLastMonths; i--; i >= 0) {
                    const obj = {
                        name: (month - i) + '/' + year,
                        projects: 0
                    }
                    viewsProfile?.forEach(item => {
                        const arr = item?.viewsId?.split('/');
                        if (parseInt(arr[0]) === month - i && parseInt(arr[1]) === year) {
                            obj.projects = item?.numOfViews;
                        }
                    })
                    dt.push({ ...obj })
                }
            }
            else {
                for (var i = currentLastMonths; i--; i >= 0) {
                    const obj = {
                        name: (month - i <= 0 ? month - i + 12 : month - i) + '/' + (month - i <= 0 ? year - 1 : year),
                        projects: 0
                    }

                    viewsProfile?.forEach(item => {
                        const arr = item?.viewsId?.split('/');
                        if (parseInt(arr[0]) === (month - i <= 0 ? month - i + 12 : month - i) && parseInt(arr[1]) === (month - i <= 0 ? year - 1 : year)) {
                            obj.projects = item?.numOfViews;
                        }
                    })
                    dt.push({ ...obj })
                }
            }

            setDataView([...dt])
            const arrCbb = getUniqueMonthsAndYears(histories);

            const rv = [...arrCbb].reverse()
            var revCbb = []
            rv?.forEach((item, index) => {
                revCbb.push({ id: index, name: item })
            })
            const d = new Date();
            setCbbRevenue([...revCbb])

            getDaysOfMonth(d.getFullYear(), d.getMonth() + 1);
        }
    }, [isSuccess])
    useEffect(() => {
        var dt = [];
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        if (month >= currentLastMonths) {
            for (var i = currentLastMonths; i--; i >= 0) {
                const obj = {
                    name: (month - i) + '/' + year,
                    projects: 0
                }
                viewsProfile?.forEach(item => {
                    const arr = item?.viewsId?.split('/');
                    if (parseInt(arr[0]) === month - i && parseInt(arr[1]) === year) {
                        obj.projects = item?.numOfViews;
                    }
                })
                dt.push({ ...obj })
            }
        }
        else {
            for (var i = currentLastMonths; i--; i >= 0) {
                const obj = {
                    name: (month - i <= 0 ? month - i + 12 : month - i) + '/' + (month - i <= 0 ? year - 1 : year),
                    projects: 0
                }
                viewsProfile?.forEach(item => {
                    const arr = item?.viewsId?.split('/');
                    if (parseInt(arr[0]) === (month - i <= 0 ? month - i + 12 : month - i) && parseInt(arr[1]) === (month - i <= 0 ? year - 1 : year)) {
                        obj.projects = item?.numOfViews;
                    }
                })
                dt.push({ ...obj })
            }
        }
        setDataView([...dt])

    }, [currentLastMonths])
    const getUniqueMonthsAndYears = (list) => {
        const uniqueMonthsAndYears = new Set();
        // Lặp qua từng đối tượng trong danh sách
        var tt = 0;
        list?.forEach((item) => {
            // Lấy tháng và năm từ trường create_time
            const monthYear = new Date(item.create_time).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
            tt += parseFloat(item?.transactions?.amount?.total)
                - parseFloat(item?.transactions?.related_resources?.sale?.transaction_fee?.value)
            // Thêm vào Set để loại bỏ trùng lặp
            uniqueMonthsAndYears.add(monthYear);
        });
        settotalrevenue(tt.toFixed(2))
        // Chuyển từ Set thành mảng để trả về
        return Array.from(uniqueMonthsAndYears);
    };
    const getDaysOfMonth = (year, month) => {

        const daysInMonth = new Date(year, month, 0).getDate();
        var daysOfM = [];
        for (let day = 1; day <= daysInMonth; day++) {
            daysOfM.push({ name: day, revenue: 0 });

        }

        histories?.forEach((it, index) => {
            const d = new Date(it.create_time)
            if (d.getMonth() + 1 === month && d.getFullYear() === year) {
                daysOfM[d.getDate() - 1].revenue += parseFloat(it?.transactions?.amount?.total)
                    - parseFloat(it?.transactions?.related_resources?.sale?.transaction_fee?.value)
            }
        })

        setDayOfMonth([...daysOfM])
    };
    const totalRevnueMonth = () => {
        var tt = 0;
        dayRvnOfmonth?.forEach(it => {
            tt += it.revenue
        })
        return tt.toFixed(2);
    }
    const convertDateFormat = (inputDate) => {
        const date = new Date(inputDate);

        // Lấy giờ và phút
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);

        // Lấy ngày, tháng, năm
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();

        // Tạo chuỗi định dạng mong muốn
        const formattedDate = `${hours}:${minutes} ${day}-${month}-${year}`;

        return formattedDate;
    };
    return (
        <div className="px-10 pb-0">
            {loading && <LoadingComponent />}

            {/* Start title of page  */}
            <div className="mb-8">
                <div className="font-medium text-3xl text-gray-900 mb-2 leading-10">Hi, Admin!</div>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">This is Dashboard </div>

            </div>

            <div className="grid grid-cols-4 gap-5 mb-5">
                <div className="bg-white h-[120px] rounded-lg shadow flex p-6 cursor-pointer">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[rgba(25,103,210,.1)] h-[80px] w-[80px] text-[#1967d2] flex items-center place-content-center'>
                            <CiMoneyBill fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl text-[#1967d2]'>{totalrevenue} $</span>
                        <span className='text-sm text-[#202124]'>Total Revenue</span>
                    </div>
                </div>
                <Link to="/Admin/user-management" onClick={() => dispatch(isActiveSidebarAction('Organizer'))} className="bg-white h-[120px] rounded-lg shadow flex p-6 cursor-pointer">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[rgba(217,48,37,.1)] h-[80px] w-[80px] text-[#d93025] flex items-center place-content-center'>
                            <IoCalculatorOutline fontSize={40} className="text-[#d93025]" />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl   text-[#d93025]'>{numOrganizers}</span>
                        <span className='text-sm text-[#202124]'>Total Organizers</span>
                    </div>
                </Link>
                <Link to="/Admin/approval-project" onClick={() => dispatch(isActiveSidebarAction('Projects'))} className="bg-white h-[120px] rounded-lg shadow flex p-6 cursor-pointer">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[rgba(249,171,0,.1)] h-[80px] w-[80px] text-[#f9ab00] flex items-center place-content-center'>
                            <IoTabletPortraitOutline fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl  text-[#f9ab00] '>{numProjects}</span>
                        <span className='text-sm text-[#202124]'>Total Projects</span>
                    </div>
                </Link>
                <Link onClick={() => dispatch(isActiveSidebarAction('Manage Vacancy'))} to="/Admin/manage-vacancy" className="bg-white h-[120px] rounded-lg shadow flex p-6 cursor-pointer">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[rgba(52,168,83,.1)] h-[80px] w-[80px] text-[#34a853] flex items-center place-content-center'>
                            <LiaStar fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl text-[#34a853]  '>{numVacancies}</span>
                        <span className='text-sm text-[#202124]'>Total Vacancies</span>
                    </div>
                </Link>
            </div>


            <div className="flex flex-wrap mt-3">
                <div className="max-w-full pt-3 shrink-0 w-full grid grid-cols-4 grid-flow-row gap-5 ">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pt-1 shrink-0 col-span-3 pr-2 pb-4" >
                        <div className='mx-7 pt-6 font-bold '>Number of Projects</div>
                        <div className=' flex mb-6 ml-4 mt-2' >
                            <span className='mt-3 ml-3 mr-2'>Sort By: </span>
                            <div className="w-52">
                                <ComboBox listItem={cbb} filterValueSelected={onFilterValueSelected} />
                            </div>
                        </div>
                        <ProjectChartAdmin data={dataViews} />
                    </div>
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pt-1 shrink-0 h-[540px]">
                        <UserChart sk={numSeekers} cor={numOrganizers} />
                    </div>
                </div>
            </div>
            <div className=" mt-3 pt-3 px-2 relative rounded-lg mb-8 bg-white shadow max-w-full grid grid-cols-10 gap-5">
                <div className='col-span-7 pt-3'>
                    <div className='flex items-center justify-between mb-8'>
                        <div className='flex mt-3'>
                            <div className='ml-7 font-medium '>Revenue of {monthYear} : </div>
                            <div className='ml-2  font-medium '>{totalRevnueMonth()}$ </div>
                        </div>
                        <div className=' flex  ml-4 items-center' >
                            <span className='mt-3 ml-3 mr-2'>Order By: </span>
                            <div className="w-44">
                                <ComboBox listItem={cbbRevenue} filterValueSelected={onFilterValueRevenueSelected} />
                            </div>
                        </div>
                    </div>
                    <RevenueChart data={dayRvnOfmonth} />
                </div>
                <div className='col-span-3'>
                    <div className='mx-7 pt-6 font-bold '>Recent Transactions</div>
                    <div className="pr-2 pl-10 mt-4 overflow-auto h-[470px] no-scrollbar">
                        {
                            ([...histories]?.reverse())?.map((item, index) => {
                                return <div key={index} className="flex mt-2 pb-4 border-l border-dashed border-green-200">
                                    <div className="flex items-start relative pb-4">
                                        <div className={`rounded-full p-2 absolute top-0 left-[-17px] ${index % 2 === 0 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}><MdOutlineMoneyOffCsred /></div>
                                        <div className="flex flex-wrap ml-6">
                                            <div className="font-medium  flex flex-nowrap mr-1 text-sm ">{item?.userInfo ? item?.userInfo?.fullName : ''} </div>
                                            <div className="font-normal flex-wrap flex mr-1 text-sm text-gray-500 ">{'has been paid the amount '} </div>
                                            <div className="font-normal text-blue-700 flex flex-wrap mr-1 text-sm " >{(parseFloat(item?.transactions?.amount?.total)
                                                - parseFloat(item?.transactions?.related_resources?.sale?.transaction_fee?.value)).toFixed(2)} $ </div>

                                            <div className="font-normal flex-wrap flex mr-1 text-sm text-gray-500 ">at {convertDateFormat(item?.create_time)}</div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap mt-3">
                <div className="max-w-full  shrink-0 w-full grid grid-cols-4 grid-flow-row gap-5 ">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pt-3 shrink-0 col-span-3 px-2">
                        <div className='pt-3 px-4 font-medium text-lg pb-4'>Recent Projects: </div>
                        <table className="relative overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0 text-sm h-fit">
                            <thead className="bg-[#f5f7fc] color-white w-full border-b border-solid border-[#ecedf2]">
                                <tr className='w-full'>
                                    <th className="relative text-[#3a60bf] font-normal py-6 text-sm text-left w-4/12 pl-5 pr-0">Organizer Name</th>
                                    <th className="relative text-[#3a60bf] font-normal py-6 text-sm px-0 text-left w-3/12">Project Name</th>
                                    <th className="relative text-[#3a60bf] font-normal py-6 text-sm text-left px-5 w-2/12">Status</th>
                                    <th className="relative text-[#3a60bf] font-normal py-6 text-sm  w-2/12 text-center px-3">Upload date</th>
                                    <th className="relative text-[#3a60bf] font-normal py-6 text-sm text-left ">Action</th>
                                </tr>
                            </thead>
                            <tbody className='w-full'>
                                {loading ?
                                    [1, 2, 3, 4].map((item, index) => {
                                        return (
                                            <tr key={index} className="animate-pulse relative shadow rounded-md p-4 w-full mx-auto gap-2">
                                                <td className="space-x-4 py-2.5 px-0.5 w-full flex items-center">
                                                    {/* <div className="rounded-full bg-slate-200 h-12 w-12"></div> */}
                                                    <div className="flex-1 space-y-6 py-1">
                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                        <div className="space-y-3">
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                            </div>
                                                            <div className="h-2 bg-slate-200 rounded"></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="space-x-4 py-2.5 px-0.5 w-1/12">
                                                    {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                                    <div className="flex-1 space-y-6 py-1">
                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                        <div className="space-y-3">
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                            </div>
                                                            <div className="h-2 bg-slate-200 rounded"></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="space-x-4 py-2.5 px-0.5 w-1/12">
                                                    {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                                    <div className="flex-1 space-y-6 py-1">
                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                        <div className="space-y-3">
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                            </div>
                                                            <div className="h-2 bg-slate-200 rounded"></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="space-x-4 py-2.5 px-0.5 w-[14%]">
                                                    {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                                    <div className="flex-1 space-y-6 py-1">
                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                        <div className="space-y-3">
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                            </div>
                                                            <div className="h-2 bg-slate-200 rounded"></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="space-x-4 py-2.5 px-0.5 w-1/12">
                                                    {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                                    <div className="flex-1 space-y-6 py-1">
                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                        <div className="space-y-3">
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                            </div>
                                                            <div className="h-2 bg-slate-200 rounded"></div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }) :
                                    recentProjects?.map((item, index) => (
                                        <RecentProject key={index} item={item} />
                                    ))}

                            </tbody>
                        </table>
                    </div>
                    <div className="relative rounded-lg mb-8 bg-white shadow w-full pt-1 shrink-0 overflow-hidden">
                        <div className='pt-3 px-6 font-medium text-lg '>Recent Registed Organizer: </div>
                        <div className='w-full'>
                            {loading ?
                                [1, 2, 3, 4].map((item, index) => {
                                    return (
                                        <div key={index} className="animate-pulse relative shadow rounded-md p-4 w-full mx-auto gap-2">

                                            <div className="space-x-4 py-2.5 px-0.5 w-[500px]">
                                                {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                                <div className="flex-1 space-y-6 py-1">
                                                    <div className="h-2 bg-slate-200 rounded"></div>
                                                    <div className="space-y-3">
                                                        <div className="grid grid-cols-3 gap-4">
                                                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                        </div>
                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                }) :
                                recentOrganizers?.map((item, index) => (
                                    <RecentOrganizerRegisted key={index} item={item} />
                                ))}

                        </div>
                    </div>
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pt-2 shrink-0 col-span-4 px-2">
                        <div className='pt-3 px-4 font-medium text-lg pb-4'>Recent Vacancies: </div>
                        <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0 px-5">
                            <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                                <tr className="w-full">
                                    <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-3/12 pl-5 ">Vacancy Name</th>
                                    <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-2/12 ">Project Name</th>
                                    <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-2/12 ">Created & Duration</th>
                                    <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-3/24 ">Max Required</th>
                                    <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-3/24">Status</th>
                                    <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-3/24">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ?
                                    [1, 2, 3, 4].map((item, index) => {
                                        return (
                                            <tr key={index} className="animate-pulse relative shadow rounded-md p-4 w-full mx-auto gap-2">
                                                <td className="space-x-4 py-2.5 px-0.5 w-full flex items-center">
                                                    {/* <div className="rounded-full bg-slate-200 h-12 w-12"></div> */}
                                                    <div className="flex-1 space-y-6 py-1">
                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                        <div className="space-y-3">
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                            </div>
                                                            <div className="h-2 bg-slate-200 rounded"></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="space-x-4 py-2.5 px-0.5 w-1/12">
                                                    {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                                    <div className="flex-1 space-y-6 py-1">
                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                        <div className="space-y-3">
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                            </div>
                                                            <div className="h-2 bg-slate-200 rounded"></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="space-x-4 py-2.5 px-0.5 w-1/12">
                                                    {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                                    <div className="flex-1 space-y-6 py-1">
                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                        <div className="space-y-3">
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                            </div>
                                                            <div className="h-2 bg-slate-200 rounded"></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="space-x-4 py-2.5 px-0.5 w-[14%]">
                                                    {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                                    <div className="flex-1 space-y-6 py-1">
                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                        <div className="space-y-3">
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                            </div>
                                                            <div className="h-2 bg-slate-200 rounded"></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="space-x-4 py-2.5 px-0.5 w-1/12">
                                                    {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                                    <div className="flex-1 space-y-6 py-1">
                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                        <div className="space-y-3">
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                            </div>
                                                            <div className="h-2 bg-slate-200 rounded"></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="space-x-4 py-2.5 px-0.5 w-1/12">
                                                    {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                                    <div className="flex-1 space-y-6 py-1">
                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                        <div className="space-y-3">
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                            </div>
                                                            <div className="h-2 bg-slate-200 rounded"></div>
                                                        </div>
                                                    </div>
                                                </td>

                                            </tr>
                                        )
                                    }) :
                                    recentVacancies?.map((item, index) => {
                                        return (
                                            <tr key={index} className="relative border-b border-solid border-[#ecedf2] w-full hover:bg-[#f4f2f2] cursor-pointer px-5  ">
                                                <td className="relative pl-5 py-5 font-normal text-base w-3/12">
                                                    <div className="mb-0 relative h-16 ">

                                                        <div className="pl-2">
                                                            <div className="font-medium text-md text-ellipsis mb-1 line-clamp-2 ">{item.vacancyName}</div>
                                                            <div className="flex font-light text-sm mb-0">
                                                                <div className="flex mr-3">
                                                                    <BiPackage className="mt-1 mr-1" /> {item?.locationType}
                                                                </div>
                                                                <div className="flex">
                                                                    <BiMap className="mt-1 mr-1" />  {item?.location}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="w-2/12">
                                                    {item?.project ? <a target="_blank" onClick={() => navigate("/Admin/approval-project/" + item?.project)} className="bg-green-100 border-green-300 border rounded-xl text-left cursor-pointer text-green-500 w-fit flex flex-row items-center justify-center self-center  gap-1">
                                                        <div>In project</div>
                                                        <img src={NewTabIcon} className="w-3 h-3 text-green-500" color="#22c55e" />
                                                    </a> : <div className="font-light text-sm text-red-500 text-ellipsis w-full line-clamp-2 text-left">{'Not belong to any project'}  </div>}
                                                </td>
                                                <td className="pl-9 w-2/12 font-light text-gray-700 text-base">
                                                    <div>{item?.createdAt ? `${item?.createdAt[2]}/${item?.createdAt[1]}/${item?.createdAt[0]}` : ''}</div>
                                                    <div>{item?.hiringTimeline ?? '1 to 2 weeks'}</div>
                                                </td>
                                                <td className="font-light text-blue-700 w-1/24  ">
                                                    <div className="flex h-full items-center pl-8">
                                                        <div className="mr-1">{item.maxRequired ?? 0}</div>
                                                    </div>
                                                </td>

                                                <td className="w-3/24">
                                                    {
                                                        item?.approvalStatus === 'pending' ?
                                                            <div>
                                                                <div className="bg-blue-100 mt-2 border-blue-300 border rounded-xl text-center  text-blue-500 w-fit px-1">
                                                                    Pending
                                                                </div>
                                                            </div>
                                                            : item?.approvalStatus === 'waitPayment' ?
                                                                <div>
                                                                    <div className="bg-orange-100  mt-2 border-orange-300 border rounded-xl text-center  text-orange-500 w-fit px-1">
                                                                        Wait Payment
                                                                    </div>
                                                                </div>
                                                                : item?.approvalStatus === 'rejected' ?
                                                                    <div>
                                                                        <div className="bg-orange-100 mt-2 border-orange-300 border rounded-xl text-center  text-orange-500 w-fit px-1">
                                                                            Rejected
                                                                        </div>
                                                                    </div>
                                                                    : item?.approvalStatus === 'approved' ?
                                                                        <div>
                                                                            <div className="bg-green-100 mt-2 border-green-300 border rounded-xl text-center  text-green-500 w-fit px-1">
                                                                                Approved
                                                                            </div>
                                                                        </div>
                                                                        : item?.approvalStatus === 'blocked' ?
                                                                            <div>
                                                                                <div className="bg-red-100 mt-2 border-red-300 border rounded-xl text-center  text-red-500 w-fit px-1">
                                                                                    Blocked
                                                                                </div>
                                                                            </div>
                                                                            : <>  </>
                                                    }
                                                </td>

                                                <td className="w-3/24" >
                                                    <div className="pl-2">
                                                        <ul className="list-none flex relative item-center ">
                                                            <li className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#5f86e9] hover:text-white">
                                                                <Link to={`/Admin/manage-vacancy/${item.vacancyId}`}> <LiaEyeSolid fontSize={18} /> </Link>
                                                            </li>

                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;