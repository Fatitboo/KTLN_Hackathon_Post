import { LiaHomeSolid } from "react-icons/lia";
import {
  MdAccessibility,
  MdOutlineFactCheck,
  MdOutlinePassword,
  MdSubscriptions,
  MdTypeSpecimen,
} from "react-icons/md";
import { FiBell, FiUsers } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { AiOutlineLogout } from "react-icons/ai";
import { LuNetwork } from "react-icons/lu";
import { MdReportGmailerrorred } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../redux/slices/users/usersSlices";
import { setValueSuccess } from "../redux/slices/vacancies/vacanciesSlices";
import { isActiveSidebarAction } from "../redux/slices/skills/skillsSlices";
import { BsClockHistory } from "react-icons/bs";

function Sidebar({ user }) {
  const storeData = useSelector((store) => store.users);
  const userAuth = storeData?.userAuth?.user;

  const itemStyle =
    "!mb-1 pr-6 m-0 hover:bg-[#E9EFFB] hover:text-blue-600 rounded-sm";
  const postJobStyle =
    "!mb-1 pr-6 m-0 bg-[#1967d3] hover:bg-[#0146a6] text-[white] rounded-sm";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vacancyId, isSuccess } = useSelector((store) => store.vacancies);
  const { isActive } = useSelector((store) => store.skills);
  const activeStyle =
    "bg-[#4880FF] text-white hover:bg-[#4880FF] hover:text-white";
  const handleLogout = () => {
    dispatch(logoutUserAction(navigate));
    // window.location.href = "/user-auth/login";
  };
  const handleSwitchToSeeker = () => {
    var getUserAuth = JSON.parse(sessionStorage.getItem("userInfo"));
    if (getUserAuth.user.userType.includes("judge")) {
      getUserAuth.user.userType = ["judge"];
    } else {
      getUserAuth.user.userType = [];
    }
    getUserAuth.user.userType.push("seeker");
    sessionStorage.setItem("userInfo", JSON.stringify(getUserAuth));
    window.location.href = "/Seeker-detail/my-porfolio/Projects";
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setValueSuccess(false));
      navigate("/Organizer/post-vacancy/jobId=" + vacancyId);
    }
  }, [dispatch, isSuccess, navigate, vacancyId]);

  return (
    <aside
      className="flex justify-center h-full pt-10 bg-white overflow-auto 
                            ease-in duration-300 border-solid border border-gray-300 shadow-lg shadow-gray-300 z-10"
    >
      <div className="fixed">
        {user?.userType?.includes("admin") ? (
          <div className="relative w-full l-0 m-0 p-0">
            <div
              className={classNames(
                isActive === "Dashboard" ? "bg-[#E9EFFB] text-blue-600" : "",
                itemStyle
              )}
            >
              <Link
                to="/Admin"
                onClick={() => dispatch(isActiveSidebarAction("Dashboard"))}
                className="relative text-sm text-center p-3  flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <LiaHomeSolid className="relative mr-4 ml-4 text-2xl text-center " />
                Dashboard
              </Link>
            </div>
            <div
              className={classNames(
                isActive === "Hackathons" ? "bg-[#E9EFFB] text-blue-600" : "",
                itemStyle
              )}
            >
              <Link
                to="/Admin/manage-hackathons"
                onClick={() => dispatch(isActiveSidebarAction("Hackathons"))}
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <MdOutlineFactCheck className="relative mr-4 ml-4 text-2xl text-center " />
                Manage Hackathons
              </Link>
            </div>
            <div
              className={classNames(
                isActive === "Organizer" ? "bg-[#E9EFFB] text-blue-600" : "",
                itemStyle
              )}
            >
              <Link
                to="/Admin/user-management"
                onClick={() => dispatch(isActiveSidebarAction("Organizer"))}
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <FiUsers className="relative mr-4 ml-4 text-2xl text-center " />
                Manage User
              </Link>
            </div>
            <div
              className={classNames(
                isActive === "SubscriptionType"
                  ? "bg-[#E9EFFB] text-blue-600"
                  : "",
                itemStyle
              )}
            >
              <Link
                onClick={() =>
                  dispatch(isActiveSidebarAction("SubscriptionType"))
                }
                to="/Admin/manage-subscriptions-type"
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <MdTypeSpecimen className="relative mr-4 ml-4 text-2xl text-center " />
                Subscription type
              </Link>
            </div>
            <div
              className={classNames(
                isActive === "Subscription" ? "bg-[#E9EFFB] text-blue-600" : "",
                itemStyle
              )}
            >
              <Link
                onClick={() => dispatch(isActiveSidebarAction("Subscription"))}
                to="/Admin/manage-subscription"
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <MdSubscriptions className="relative mr-4 ml-4 text-2xl text-center " />
                Manage subscription
              </Link>
            </div>
            {/* <div
              className={classNames(
                isActive === "Manage Vacancy"
                  ? "bg-[#E9EFFB] text-blue-600"
                  : "",
                itemStyle
              )}
            >
              <Link
                onClick={() =>
                  dispatch(isActiveSidebarAction("Manage Vacancy"))
                }
                to="/Admin/manage-vacancy"
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <PiSuitcaseSimpleDuotone className="relative mr-4 ml-4 text-2xl text-center " />
                Manage Vacancy
              </Link>
            </div> */}
            {/* <div className={classNames(isActive === 'Skills' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>dispatch(isActiveSidebarAction('Skills'))} to="/Admin/skills-management"  className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <GrWorkshop className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Skills
                                </Link>
                            </div> */}
            <div
              className={classNames(
                isActive === "blog" ? "bg-[#E9EFFB] text-blue-600" : "",
                itemStyle
              )}
            >
              <Link
                onClick={() => dispatch(isActiveSidebarAction("blog"))}
                to="/Admin/blog-management"
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <LuNetwork className="relative mr-4 ml-4 text-2xl text-center " />
                Manage Blogs
              </Link>
            </div>
            <div
              className={classNames(
                isActive === "Reports" ? "bg-[#E9EFFB] text-blue-600" : "",
                itemStyle
              )}
            >
              <Link
                onClick={() => dispatch(isActiveSidebarAction("Reports"))}
                to="/Admin/manage-report"
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <MdReportGmailerrorred className="relative mr-4 ml-4 text-2xl text-center " />
                Manage Reports
              </Link>
            </div>
            <div
              className={classNames(
                isActive === "History" ? "bg-[#E9EFFB] text-blue-600" : "",
                itemStyle
              )}
            >
              <Link
                onClick={() => dispatch(isActiveSidebarAction("History"))}
                to="/Admin/history-transactions"
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <BsClockHistory className="relative mr-4 ml-4 text-2xl text-center " />
                History Transactions
              </Link>
            </div>
            <div
              className={classNames(
                isActive === "Change password"
                  ? "bg-[#E9EFFB] text-blue-600"
                  : "",
                itemStyle
              )}
            >
              <Link
                onClick={() =>
                  dispatch(isActiveSidebarAction("Change password"))
                }
                to="/user-auth/change-password"
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <MdOutlinePassword className="relative mr-4 ml-4 text-2xl text-center " />
                Change password
              </Link>
            </div>
            <div className={itemStyle}>
              <div
                onClick={handleLogout}
                className="cursor-pointer relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <AiOutlineLogout className="relative mr-4 ml-4 text-2xl text-center " />
                Logout
              </div>
            </div>
          </div>
        ) : user?.userType?.includes("organizer") ? (
          <div className="relative w-full l-0 m-0 p-0">
            <div
              className={classNames(
                isActive === "Dashboard" ? activeStyle : "",
                itemStyle
              )}
            >
              <Link
                onClick={() => dispatch(isActiveSidebarAction("Dashboard"))}
                to="/Organizer/dashboard"
                className="relative text-sm text-center p-3  flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <LiaHomeSolid className="relative mr-4 ml-4 text-2xl text-center " />
                Dashboard
              </Link>
            </div>
            <div
              className={classNames(
                isActive === "Company Profile" ? activeStyle : "",
                itemStyle
              )}
            >
              <Link
                onClick={() =>
                  dispatch(isActiveSidebarAction("Company Profile"))
                }
                to="/Organizer/manage-hackathons"
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <MdOutlineFactCheck className="relative mr-4 ml-4 text-2xl text-center " />
                Manage hackathons
              </Link>
            </div>
            <div
              className={classNames(
                isActive === "Manage blog" ? activeStyle : "",
                itemStyle
              )}
            >
              <Link
                onClick={() => dispatch(isActiveSidebarAction("Manage blog"))}
                to="/Organizer/blog-management"
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <FiUsers className="relative mr-4 ml-4 text-2xl text-center " />
                Manage blog
              </Link>
            </div>
            <div
              className={classNames(
                isActive === "Manage Project" ? activeStyle : "",
                itemStyle
              )}
            >
              <Link
                onClick={() =>
                  dispatch(isActiveSidebarAction("Manage Project"))
                }
                // to="/Organizer/manage-project"
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <GrWorkshop className="relative mr-4 ml-4 text-2xl text-center " />
                Wallet
              </Link>
            </div>
            <div
              className={classNames(
                isActive === "Message" ? activeStyle : "",
                itemStyle
              )}
            >
              <Link
                onClick={() => dispatch(isActiveSidebarAction("Message"))}
                to="/Organizer/chat"
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <LuNetwork className="relative mr-4 ml-4 text-2xl text-center " />
                Message
              </Link>
            </div>
            <div
              className={classNames(
                isActive === "Find Seeker" ? activeStyle : "",
                itemStyle
              )}
            >
              <div
                onClick={handleSwitchToSeeker}
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <MdAccessibility className="relative mr-4 ml-4 text-2xl text-center " />
                Switch to Seeker
              </div>
            </div>
            <div className={itemStyle}>
              <div
                onClick={handleLogout}
                className="cursor-pointer relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <AiOutlineLogout className="relative mr-4 ml-4 text-2xl text-center " />
                Logout
              </div>
            </div>
          </div>
        ) : user?.userType?.includes("seeker") ? (
          <div className="relative w-full l-0 m-0 p-0">
            <div
              className={classNames(
                isActive === "My porfolio" ? "bg-[#E9EFFB] text-blue-600" : "",
                itemStyle
              )}
            >
              <Link
                onClick={() => dispatch(isActiveSidebarAction("My porfolio"))}
                to="/Seeker-detail/my-porfolio/Projects"
                className="relative text-sm text-center p-3  flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <LiaHomeSolid className="relative mr-4 ml-4 text-2xl text-center " />
                My porfolio
              </Link>
            </div>
            <div
              className={classNames(
                isActive === "My Profile" ? "bg-[#E9EFFB] text-blue-600" : "",
                itemStyle
              )}
            >
              <Link
                onClick={() => dispatch(isActiveSidebarAction("My Profile"))}
                to="/Seeker/my-profile"
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <MdOutlineFactCheck className="relative mr-4 ml-4 text-2xl text-center " />
                Edit Profile
              </Link>
            </div>
            <div
              className={classNames(
                isActive === "My Resume" ? "bg-[#E9EFFB] text-blue-600" : "",
                itemStyle
              )}
            >
              <Link
                onClick={() => dispatch(isActiveSidebarAction("My Resume"))}
                to="/Seeker/setting-recommend"
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <FiUsers className="relative mr-4 ml-4 text-2xl text-center " />
                Edit recommend
              </Link>
            </div>
            <div
              className={classNames(
                isActive === "reports" ? "bg-[#E9EFFB] text-blue-600" : "",
                itemStyle
              )}
            >
              <Link
                onClick={() => dispatch(isActiveSidebarAction("reports"))}
                to="/Seeker/manage-reports"
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <FiUsers className="relative mr-4 ml-4 text-2xl text-center " />
                Reports
              </Link>
            </div>
            <div
              className={classNames(
                isActive === "notification" ? "bg-[#E9EFFB] text-blue-600" : "",
                itemStyle
              )}
            >
              <Link
                onClick={() => dispatch(isActiveSidebarAction("notification"))}
                to="/Seeker/manage-notification"
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <FiBell className="relative mr-4 ml-4 text-2xl text-center " />
                Notifications
              </Link>
            </div>

            <div
              className={classNames(
                isActive === "Change password"
                  ? "bg-[#E9EFFB] text-blue-600"
                  : "",
                itemStyle
              )}
            >
              <Link
                onClick={() =>
                  dispatch(isActiveSidebarAction("Change password"))
                }
                to="/user-auth/change-password"
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <MdReportGmailerrorred className="relative mr-4 ml-4 text-2xl text-center " />
                Change password
              </Link>
            </div>
            <div className={itemStyle}>
              <div
                onClick={handleLogout}
                className="cursor-pointer relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <AiOutlineLogout className="relative mr-4 ml-4 text-2xl text-center " />
                Logout
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full l-0 m-0 p-0">
            <div
              className={classNames(
                isActive === "JudgeHackathon" ? activeStyle : "",
                itemStyle
              )}
            >
              <Link
                onClick={() =>
                  dispatch(isActiveSidebarAction("JudgeHackathon"))
                }
                to="/Judge/manage-hackathons"
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <LuNetwork className="relative mr-4 ml-4 text-2xl text-center " />
                Judge Hackathons
              </Link>
            </div>
            <div
              className={classNames(
                isActive === "Find Seeker" ? activeStyle : "",
                itemStyle
              )}
            >
              <div
                onClick={handleSwitchToSeeker}
                className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <MdAccessibility className="relative mr-4 ml-4 text-2xl text-center " />
                Switch to Seeker
              </div>
            </div>
            <div className={itemStyle}>
              <div
                onClick={handleLogout}
                className="cursor-pointer relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg "
              >
                <AiOutlineLogout className="relative mr-4 ml-4 text-2xl text-center " />
                Logout
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
