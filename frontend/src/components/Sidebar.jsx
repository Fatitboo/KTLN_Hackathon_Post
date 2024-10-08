import { LiaDocker, LiaHomeSolid } from 'react-icons/lia';
import { MdAccessibility, MdOutlineFactCheck, MdOutlinePassword } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { GrWorkshop } from 'react-icons/gr';
import { AiOutlineLogout } from 'react-icons/ai';
import { LuNetwork } from 'react-icons/lu'
import { MdReportGmailerrorred } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { HiPlus } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAction } from '../redux/slices/users/usersSlices';
import {createVacancyId, resetComponent, setValueSuccess} from '../redux/slices/vacancies/vacanciesSlices';
import { BiBookmark } from 'react-icons/bi';
import { PiSuitcaseSimpleDuotone } from 'react-icons/pi';
import { isActiveSidebarAction } from '../redux/slices/skills/skillsSlices';
import { BsClockHistory, BsStar } from 'react-icons/bs';


function Sidebar({user}) {
    const storeData = useSelector(store => store.users)
    const userAuth = storeData?.userAuth?.user;

    const itemStyle = '!mb-2 pr-6 m-0 hover:bg-[#E9EFFB] hover:text-blue-600 rounded-lg';
    const postJobStyle = '!mb-2 pr-6 m-0 bg-[#1967d3] hover:bg-[#0146a6] text-[white] rounded-lg';
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {vacancyId, isSuccess} = useSelector(store => store.vacancies)
    const {isActive} = useSelector(store => store.skills)

    const handleLogout = ()=>{
        dispatch(logoutUserAction())
        window.location.href = '/user-auth/login';
    }

    useEffect(() => {
        if(isSuccess) {
            dispatch(setValueSuccess(false))
            navigate("/Organizer/post-vacancy/jobId=" + vacancyId)
        }
    }, [isSuccess])

    return (
        <aside className="flex justify-center h-full pt-10 bg-white overflow-auto 
                            ease-in duration-300 border-solid border border-[#ecedf2] shadow-lg shadow-gray-300 z-10">
            <div className="fixed">
                {user?.userType === "admin" ?
                    (
                        <div className="relative w-full l-0 m-0 p-0">
                            <div className={classNames(isActive === 'Dashboard' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin" onClick={()=>dispatch(isActiveSidebarAction('Dashboard'))} className="relative text-sm text-center p-3  flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LiaHomeSolid className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Dashboard
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Projects' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin/approval-project" onClick={()=>dispatch(isActiveSidebarAction('Projects'))} className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdOutlineFactCheck className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Manage Projects
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Organizer' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin/user-management" onClick={()=>dispatch(isActiveSidebarAction('Organizer'))} className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <FiUsers className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Manage Organizer
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Manage Vacancy' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('Manage Vacancy'))} to="/Admin/manage-vacancy" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <PiSuitcaseSimpleDuotone className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Manage Vacancy
                                </Link>
                            </div>
                            {/* <div className={classNames(isActive === 'Skills' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('Skills'))} to="/Admin/skills-management"  className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <GrWorkshop className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Skills
                                </Link>
                            </div> */}
                            <div className={classNames(isActive === 'Occupations' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('Occupations'))} to="/Admin/occupation-management" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LuNetwork className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Occupations
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Reports' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('Reports'))} to="/Admin/manage-report" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdReportGmailerrorred className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Manage Reports
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'History' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('History'))} to="/Admin/history-transactions" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <BsClockHistory className='relative mr-4 ml-4 text-2xl text-center ' />
                                    History Transactions
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Change password' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('Change password'))} to="/user-auth/change-password" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdOutlinePassword className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Change password
                                </Link>
                            </div>
                            <div className={ itemStyle}>
                                <div onClick={handleLogout}  className="cursor-pointer relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <AiOutlineLogout className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Logout
                                </div>
                            </div>
                        </div>
                    ) 
                    : user?.userType === "seeker" ? 
                    (
                        <div className="relative w-full l-0 m-0 p-0">
                            <div className={classNames(isActive === 'Dashboard' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('Dashboard'))} to="/Seeker/dashboard" className="relative text-sm text-center p-3  flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LiaHomeSolid className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Dashboard
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'My Profile' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('My Profile'))} to="/Seeker/my-profile" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdOutlineFactCheck className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Edit Profile
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'My Resume' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('My Resume'))} to="/Seeker/my-resume" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <FiUsers className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Edit Resume
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'CV Manager' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('CV Manager'))} to="/Seeker/cv-manager" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <GrWorkshop className='relative mr-4 ml-4 text-2xl text-center ' />
                                    CV Manage
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'ShortListed Organizer' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('ShortListed Organizer'))} to="/Seeker/short-listed-users" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <BiBookmark className='relative mr-4 ml-4 text-2xl text-center ' />
                                    ShortListed Organizer
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Favourite Projects' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('Favourite Projects'))} to="/Seeker/favourite-projects" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LiaDocker className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Favourite Projects
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Favourite Vacancies' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('Favourite Vacancies'))} to="/Seeker/favourite-vacancies" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <BsStar className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Favourite Vacancies
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Applied Jobs' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('Applied Jobs'))} to="/Seeker/applied-jobs" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LuNetwork className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Applied Vacancies
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Change password' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('Change password'))} to="/user-auth/change-password" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdReportGmailerrorred className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Change password
                                </Link>
                            </div>
                            <div className={itemStyle}>
                                <div onClick={handleLogout}  className="cursor-pointer relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <AiOutlineLogout className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Logout
                                </div>
                            </div>
                        </div>
                    )
                    : 
                    (
                        <div className="relative w-full l-0 m-0 p-0">
                            <div className={classNames(isActive === 'Post a job' ? 'bg-[#E9EFFB] text-blue-600' : '', postJobStyle)}>
                                <Link onClick={()=>{dispatch(resetComponent()) ;dispatch(createVacancyId({"userId": userAuth?.userId, "avatar": userAuth?.avatar?.fileUrl, "fullName": userAuth?.fullName}))}} className="relative text-sm text-center p-3  flex items-center leading-7 font-normal rounded-lg ">
                                    <HiPlus className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Post a Vacancy
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Dashboard' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('Dashboard'))} to="/Organizer/dashboard" className="relative text-sm text-center p-3  flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LiaHomeSolid className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Dashboard
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Company Profile' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('Company Profile'))} to="/Organizer/company-profile-edit" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdOutlineFactCheck className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Edit Profile
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Manage Vacancy' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('Manage Vacancy'))} to="/Organizer/manage-vacancy" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <FiUsers className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Manage Vacancy
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Manage Project' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('Manage Project'))} to="/Organizer/manage-project" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <GrWorkshop className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Manage Project
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Interviews' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('Interviews'))} to="/Organizer/interview" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LuNetwork className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Interviews
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Find Seeker' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('Find Seeker'))} to="/Organizer/find-seeker" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdAccessibility className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Find Seeker
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'ShortListed Seeker' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('ShortListed Seeker'))} to="/Organizer/short-listed-users" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <BiBookmark className='relative mr-4 ml-4 text-2xl text-center ' />
                                    ShortListed Seeker
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Change password' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('Change password'))} to="/user-auth/change-password" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdReportGmailerrorred className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Change password
                                </Link>
                            </div>
                            <div className={itemStyle}>
                                <div onClick={handleLogout}  className="cursor-pointer relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <AiOutlineLogout className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Logout
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </aside>
    );
}


export default Sidebar;