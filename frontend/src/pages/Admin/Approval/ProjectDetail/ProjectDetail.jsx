import React, { useEffect, useState } from "react";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiLogoLinkedin,
  BiTimeFive,
} from "react-icons/bi";
import { PiTargetLight } from "react-icons/pi";
import { GoHourglass } from "react-icons/go";
import { AiOutlineSetting } from "react-icons/ai";
import { CalendarIcon, ExpiryIcon, SalaryIcon } from "../../../../assets/icons";
// import ParticipantItem from "../../../Seeker/ProjectInfo/ParticipantItem";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProjectSingle,
  updateProjectStatus,
} from "../../../../redux/slices/projects/projectsSlices";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomLoader,
  SmallItemLoader,
  VacancyItemLoader,
} from "../../../../components/Loader";
import VacancyItem from "../VacancyItem";
import Swal from "sweetalert2";

function ProjectDetailAdmin() {
  const id = useParams();
  const dispatch = useDispatch();
  const [projectStatus, setProjectStatus] = useState("");
  const project = useSelector((state) => state.projects.project?.project);
  const vacancies = useSelector((state) => state.projects.project?.vacancies);
  const loading = useSelector((state) => state.projects.loading);
  let user = useSelector((state) => state.users.userAuth.user);

  useEffect(() => {
    if (id) dispatch(getProjectSingle(id));
  }, [id]);
  useEffect(() => {
    if (project) {
      setProjectStatus(project?.status);
    }
  }, [project]);

  const handleUpdateStatusProject = (status, action) => {
    // dispatch(deleteOccupationAction(id));
    Swal.fire({
      title: "Confirm " + action,
      text: `Are you sure you want to ${action} this project?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: action,
    }).then((result) => {
      if (result.isConfirmed) {
        const dt = {
          id: id.id,
          status: status,
        };
        setProjectStatus(status);
        dispatch(updateProjectStatus(dt));
      }
    });
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="mb-8 px-10">
        <div className="font-medium text-3xl text-gray-900 mb-2 leading-10 flex items-center">
          <ArrowLeftIcon
            className="h-8 cursor-pointer mr-2"
            onClick={() => navigate(-1)}
          />
          Project Info!
        </div>
      </div>
      <div className="mx-[3%] bg-white p-7">
        <div className="static grid grid-cols-12 gap-4 m-auto box-border">
          {/* left infomation */}
          <div className="col-span-8 pr-[30px]">
            {/* quick info  */}
            <></>
            <div className="flex text-[#696969] mb-12">
              <div className="ml-0">
                <div>
                  {loading ? (
                    <div className="animate-pulse h-[35px] w-[500px] bg-slate-200 rounded-full col-span-2"></div>
                  ) : (
                    <div className="text-[26px] leading-[35px] text-[#202124] font-medium">
                      {project?.projectName}
                    </div>
                  )}
                </div>
                {loading ? (
                  <div className="animate-pulse h-6 w-[300px] bg-slate-200 rounded-full col-span-2 my-[8px]"></div>
                ) : (
                  <div className="flex flex-row text-[14px] font-thin my-[8px]">
                    <span className="mr-7 text-[#1967d2]">{user.fullName}</span>
                    <span className="flex flex-row items-center mr-7">
                      <BiTimeFive className="w-[18px] h-[18px] mr-1" />
                      {project?.duration} months
                    </span>
                    <span className="flex flex-row items-center mr-7">
                      <GoHourglass className="w-[18px] h-[18px] mr-1" />
                      {project?.startDate
                        .split("-")
                        .reverse()
                        .reduce(
                          (total, item) =>
                            total !== "" ? total + "/" + item : total + item,
                          ""
                        )}
                    </span>
                    <span className="flex flex-row items-center mr-7">
                      <PiTargetLight className="w-[22px] h-[22px] mr-1" />
                      {vacancies?.length} vacancies
                    </span>
                  </div>
                )}
                {/* skills */}
                {loading ? (
                  <div className="animate-pulse h-6 mt-3 w-[200px] bg-slate-200 rounded-full col-span-2 my-[8px]"></div>
                ) : (
                  <div className="flex flex-row">
                    <div className="py-[5px] px-5 rounded-[20px] bg-[#d3e1f5] text-sm text-[#1967d2] mr-[10px]">
                      <span>App</span>
                    </div>
                    <div className="py-[5px] px-5 rounded-[20px] bg-[#d3e1f5] text-sm text-[#1967d2] mr-[10px]">
                      <span>Digital</span>
                    </div>
                    <div className="py-[5px] px-5 rounded-[20px] bg-[#d3e1f5] text-sm text-[#1967d2] mr-[10px]">
                      <span>Design</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <></>

            {/* Description  */}
            <></>
            {loading ? (
              <CustomLoader type={"title-paragraph"} />
            ) : (
              <div>
                <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">
                  Project description
                </h4>
                <p
                  className="text-[#696969] text-[15px] mb-6"
                  dangerouslySetInnerHTML={{ __html: project?.description }}
                ></p>
              </div>
            )}
            <></>

            {/* Video description */}
            <></>
            {/* <div>
                            <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">Candidates About</h4>
                            <img src="https://superio-nextjs.netlify.app/images/resource/job-post-img.jpg" alt="" />
                        </div> */}
            <></>
            {/* Share to social */}
            <></>
            {/* <div>
                            <div className="flex flex-row items-center mt-6">
                                <h4 className="text-base leading-6 text-[#202124] font-semibold">Share this project</h4>
                                <a href="https://www.facebook.com/" className="flex flex-row items-center bg-[#3b5998] py-[10px] px-[25px] text-[14px] ml-[12px] rounded-lg">
                                    <BiLogoFacebook color="#fff" className="w-5 h-5"/>
                                    <span className="text-[#fff] ml-1">Facebook</span>
                                </a>
                                <a href="https://www.linkedin.com" className="flex flex-row items-center bg-[#007bb5] py-[10px] px-[25px] text-[14px] ml-[9px] rounded-lg">
                                    <BiLogoLinkedin color="#fff" className="w-5 h-5"/>
                                    <span className="text-[#fff] ml-1">Linked in</span>
                                </a>
                                <a href="https://www.instagram.com" className="flex flex-row items-center bg-[#ea3ca4] py-[10px] px-[25px] text-[14px] ml-[9px] rounded-lg">
                                    <BiLogoInstagram color="#fff" className="w-5 h-5"/>
                                    <span className="text-[#fff] ml-1">Instagram</span>
                                </a>
                            </div>
                        </div> */}
            <></>

            {/* Project vacancy */}
            <></>
            <div className="mt-12">
              <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">
                Project vacancies
              </h4>
              <div>
                {loading
                  ? [1, 2, 3].map((item, index) => {
                      return (
                        <div key={index}>
                          <VacancyItemLoader />
                        </div>
                      );
                    })
                  : vacancies?.map((item, index) => {
                      return <VacancyItem key={index} props={item} />;
                    })}
              </div>
            </div>
            <></>
          </div>

          {/* category */}
          <div className="col-span-4">
            <div className="grid grid-flow-row grid-cols-3 gap-6 mb-3">
              {projectStatus === "waitPayment" ? (
                <>
                  <div></div>
                  <div></div>
                  <div
                    onClick={() =>
                      handleUpdateStatusProject("rejected", "Reject")
                    }
                    className="flex items-center justify-center h-[53px] box-border bg-red-50 px-[18px] w-full rounded-[8px] text-red-600 border border-red-600 hover:text-white hover:bg-red-600 cursor-pointer"
                  >
                    <span className="text-[15px] leading-none font-[400]">
                      Reject
                    </span>
                  </div>
                </>
              ) : projectStatus === "rejected" ? (
                <>
                  <div></div>
                  <div></div>
                  <div
                    onClick={() =>
                      handleUpdateStatusProject("waitPayment", "Accept")
                    }
                    className="flex items-center justify-center h-[53px] box-border bg-blue-700 px-[18px] w-full rounded-[8px] text-[#fff] hover:bg-blue-900 cursor-pointer"
                  >
                    <span className="text-[15px] leading-none font-[400]">
                      Accept
                    </span>
                  </div>
                </>
              ) : projectStatus === "pending" ? (
                <>
                  <div></div>
                  <div
                    onClick={() =>
                      handleUpdateStatusProject("rejected", "Reject")
                    }
                    className="flex items-center justify-center h-[53px] box-border bg-red-50 px-[18px] w-full rounded-[8px] text-red-600 border border-red-600 hover:text-white hover:bg-red-600 cursor-pointer"
                  >
                    <span className="text-[15px] leading-none font-[400]">
                      Reject
                    </span>
                  </div>
                  <div
                    onClick={() =>
                      handleUpdateStatusProject("waitPayment", "Accept")
                    }
                    className="flex items-center justify-center h-[53px] box-border bg-blue-700 px-[18px] w-full rounded-[8px] text-[#fff] hover:bg-blue-900 cursor-pointer"
                  >
                    <span className="text-[15px] leading-none font-[400]">
                      Accept
                    </span>
                  </div>
                </>
              ) : projectStatus === "approved" ? (
                <>
                  <div></div>
                  <div></div>
                  <div
                    onClick={() =>
                      handleUpdateStatusProject("blocked", "Block")
                    }
                    className="flex items-center justify-center h-[53px] box-border bg-gray-700 px-[18px] w-full rounded-[8px] text-[#fff] hover:bg-gray-900 cursor-pointer"
                  >
                    <span className="text-[15px] leading-none font-[400]">
                      Block
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div></div>
                  <div></div>
                  <div
                    onClick={() =>
                      handleUpdateStatusProject("approved", "Approve")
                    }
                    className="flex items-center justify-center h-[53px] box-border bg-green-700 px-[18px] w-full rounded-[8px] text-[#fff] hover:bg-green-900 cursor-pointer"
                  >
                    <span className="text-[15px] leading-none font-[400]">
                      Approve
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
              {loading ? (
                <SmallItemLoader />
              ) : (
                <div className="flex flex-row mb-[30px]">
                  <div className="min-w-[50px]">
                    <img src={CalendarIcon} alt="Calendar" />
                  </div>
                  <div>
                    <div className="text-4 text-[#202124] leading-[22px] font-semibold">
                      Date posted:
                    </div>
                    <span className="text-[15px] text-[#363636]">
                      {project?.startDate
                        .split("-")
                        .reverse()
                        .reduce(
                          (total, item) =>
                            total !== "" ? total + "/" + item : total + item,
                          ""
                        )}
                    </span>
                  </div>
                </div>
              )}
              {loading ? (
                <SmallItemLoader />
              ) : (
                <div className="flex flex-row mb-[30px]">
                  <div className="min-w-[50px]">
                    <img src={ExpiryIcon} alt="Calendar" />
                  </div>
                  <div>
                    <div className="text-4 text-[#202124] leading-[22px] font-semibold">
                      Duration:
                    </div>
                    <span className="text-[15px] text-[#363636]">
                      {project?.duration}
                    </span>
                  </div>
                </div>
              )}

              {loading ? (
                <SmallItemLoader />
              ) : (
                <div className="flex flex-row mb-8">
                  <div className="min-w-[50px]">
                    <img src={SalaryIcon} alt="Calendar" />
                  </div>
                  <div>
                    <div className="text-4 text-[#202124] leading-[22px] font-semibold">
                      Expected budget:
                    </div>
                    <span className="text-[15px] text-[#363636]">
                      ${project?.budget}
                    </span>
                  </div>
                </div>
              )}
              {loading ? (
                <SmallItemLoader />
              ) : (
                <div className="flex flex-row mb-[20px]">
                  <div className="min-w-[50px]">
                    <AiOutlineSetting
                      color="#1967D2"
                      className="w-6 h-6"
                      strokeWidth={0}
                    />
                  </div>
                  <div>
                    <div className="text-4 text-[#202124] leading-[22px] font-semibold">
                      Status:
                    </div>
                    <span className="text-[15px] text-[#363636]">
                      {projectStatus === "pending" ? (
                        <div>
                          <div className="bg-blue-100 mt-2 border-blue-300 border rounded-xl text-center  text-blue-500 w-fit px-1">
                            Pending
                          </div>
                          <div className="text-sm text-purple-700">
                            * This project is awaiting for admin approval!
                          </div>
                        </div>
                      ) : projectStatus === "waitPayment" ? (
                        <div>
                          <div className="bg-orange-100 mt-2 border-orange-300 border rounded-xl text-center  text-orange-500 w-fit px-1">
                            Wait Payment
                          </div>
                          <div className="text-sm text-purple-700">
                            * This project is awaiting for payment to be posted!
                          </div>
                        </div>
                      ) : projectStatus === "rejected" ? (
                        <div>
                          <div className="bg-orange-100 mt-2 border-orange-300 border rounded-xl text-center  text-orange-500 w-fit px-1">
                            Rejected
                          </div>
                          <div className="text-sm text-purple-700">
                            * This project has been rejected for approval but
                            can be edited again!
                          </div>
                        </div>
                      ) : projectStatus === "approved" ? (
                        <div>
                          <div className="bg-green-100 mt-2 border-green-300 border rounded-xl text-center  text-green-500 w-fit px-1">
                            Approved
                          </div>
                          <div className="text-sm text-purple-700">
                            * This project has been paid for and approved!
                          </div>
                        </div>
                      ) : projectStatus === "blocked" ? (
                        <div>
                          <div className="bg-red-100 mt-2 border-red-300 border rounded-xl text-center  text-red-500 w-fit px-1">
                            Blocked
                          </div>
                          <div className="text-sm text-purple-700">
                            * This project has been blocked!
                          </div>
                        </div>
                      ) : (
                        <> </>
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="p-6 bg-[#F5F6FC] rounded-lg flex justify-between items-center mb-[30px]">
                <span className="text-[#202124] text-[18px] font-semibold">
                  Social Media
                </span>
                <div className="flex flex-row items-center">
                  {project?.fbLink ? (
                    <a href={project?.fbLink} target="_blank" rel="noreferrer">
                      <div className="w-7 h-7 flex justify-end items-center">
                        <BiLogoFacebook color="dimgray" />
                      </div>
                    </a>
                  ) : null}
                  {project?.insLink ? (
                    <a href={project?.insLink} target="_blank" rel="noreferrer">
                      <div className="w-7 h-7 flex justify-end items-center">
                        <BiLogoInstagram color="dimgray" />
                      </div>
                    </a>
                  ) : null}
                  {project?.twLink ? (
                    <a href={project?.twLink} target="_blank" rel="noreferrer">
                      <div className="w-7 h-7 flex justify-end items-center">
                        <BiLogoTwitter color="dimgray" />
                      </div>
                    </a>
                  ) : null}
                  {project?.lkLink ? (
                    <a href={project?.lkLink} target="_blank" rel="noreferrer">
                      <div className="w-7 h-7 flex justify-end items-center">
                        <BiLogoLinkedin color="dimgray" />
                      </div>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
            {/* <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                            <span className="text-[#202124] text-[18px] font-semibold">Participants ({participants.length})</span>
                            <div className="mt-3">
                                {
                                    participants.map((item, index) => {
                                        return <ParticipantItem key={index} firstName={item.firstName} surName={item.surName} position={item.position} userAvatar={item.userAvatar}/>
                                    })
                                }
                            </div>
                        </div>
                    </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectDetailAdmin;
