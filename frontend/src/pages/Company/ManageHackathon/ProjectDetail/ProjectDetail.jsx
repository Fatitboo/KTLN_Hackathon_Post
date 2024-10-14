import React, { useEffect } from "react";
import {BiBookmark, BiLogoFacebook, BiLogoInstagram, BiLogoTwitter, BiLogoLinkedin, BiTimeFive} from "react-icons/bi";
import {PiTargetLight} from 'react-icons/pi';
import {GoHourglass} from "react-icons/go";
import {AiOutlineSetting} from 'react-icons/ai';
import { Candidate } from "../../../../assets/images";
import { CalendarIcon, ExpiryIcon, SalaryIcon } from "../../../../assets/icons";
import VacancyItem from "../../../Seeker/ProjectInfo/VacancyItem";
import ParticipantItem from "../../../Seeker/ProjectInfo/ParticipantItem";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getParticipantsProject, getProjectSingle } from "../../../../redux/slices/projects/projectsSlices";
import { useDispatch, useSelector } from "react-redux";
import { CustomLoader, SmallItemLoader, VacancyItemLoader } from "../../../../components/Loader";

function ProjectDetail() {

    const id = useParams()
    const dispatch = useDispatch()

    const project = useSelector((state) => state.projects.project?.project)
    const vacancies = useSelector((state) => state.projects.project?.vacancies)
    const loading = useSelector((state) => state.projects.loading)  
    let user = useSelector((state) => state.users.userAuth.user)
    const projectparticipants = useSelector(state => state.projects?.projectparticipants)


    useEffect(() => {
        if(id) {
            dispatch(getProjectSingle(id))
            dispatch(getParticipantsProject(id))
        }
    }, [id])

    const navigate = useNavigate()
    return (<>
        <div className="mb-8 px-10" >
            <div className="font-medium text-3xl text-gray-900 mb-2 leading-10 flex items-center">
                <ArrowLeftIcon className="h-8 cursor-pointer mr-2" onClick={() => navigate(-1)} />
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
                                    {
                                        loading ? <div className="animate-pulse h-[35px] w-[500px] bg-slate-200 rounded-full col-span-2"></div> :
                                        <div className="text-[26px] leading-[35px] text-[#202124] font-medium">{project?.projectName}</div>

                                    }
                                </div>
                                    {
                                        loading ? 
                                        <div className="animate-pulse h-6 w-[300px] bg-slate-200 rounded-full col-span-2 my-[8px]"></div>
                                        :<div className="flex flex-row text-[14px] font-thin my-[8px]">
                                            <span className="mr-7 text-[#1967d2]">{user.fullName}</span>
                                            <span className="flex flex-row items-center mr-7"><BiTimeFive className="w-[18px] h-[18px] mr-1"/>{project?.startDate.split("-").reverse().reduce((total, item) => total !== "" ? total + "/" + item : total + item, "")}</span>
                                            <span className="flex flex-row items-center mr-7"><GoHourglass className="w-[18px] h-[18px] mr-1"/>{project?.duration} months</span>
                                            <span className="flex flex-row items-center mr-7"><PiTargetLight className="w-[22px] h-[22px] mr-1"/>{vacancies?.length} vacancies</span>
                                        </div>
                                    }
                                {/* skills */}
                                {
                                        loading ? 
                                        <div className="animate-pulse h-6 mt-3 w-[200px] bg-slate-200 rounded-full col-span-2 my-[8px]"></div>
                                        : <div className="flex flex-row">
                                            {
                                                project?.occupations?.map((item, index) => {
                                                    return <div key={index} className="py-[5px] px-5 rounded-[20px] bg-[#d3e1f5] text-sm text-[#1967d2] mr-[10px]"><span>{item}</span></div>
                                                })
                                            }
                                        </div>
                                }
                            </div>  
                        </div>
                    <></>

                    {/* Description  */}
                    <></>
                        {
                            loading ? <CustomLoader type={"title-paragraph"}/> :
                            <div>
                                <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">Project description</h4>
                                <p className="text-[#696969] text-[15px] mb-6" dangerouslySetInnerHTML={{ __html: project?.description }}>

                                </p>
                            </div>
                        }
                    <></>

                    {/* Video description */}
                    <></>
                        <div>
                            <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">Candidates About</h4>
                            {/* <img src="https://superio-nextjs.netlify.app/images/resource/job-post-img.jpg" alt="" /> */}
                        </div>
                    <></>
                    {/* Share to social */}
                    <></>
                        <div>
                            {
                                !loading ? <div className="flex flex-row items-center mt-6">
                                            <h4 className="text-base leading-6 text-[#202124] font-semibold">Share this project</h4>
                                            <div className="flex flex-row">
                                                {
                                                    project?.fbLink ?  <a href={project?.fbLink} className="flex flex-row items-center bg-[#3b5998] py-[10px] px-[20px] text-[14px] ml-[12px] rounded-lg">
                                                        <BiLogoFacebook color="#fff" className="w-5 h-5"/>
                                                        <span className="text-[#fff] ml-1">Facebook</span>
                                                    </a> :null
                                                }

                                                {
                                                    project?.lkLink ?  <a href={project?.lkLink} className="flex flex-row items-center bg-[#007bb5] py-[10px] px-[20px] text-[14px] ml-[9px] rounded-lg">
                                                        <BiLogoLinkedin color="#fff" className="w-5 h-5"/>
                                                        <span className="text-[#fff] ml-1">Linked in</span>
                                                    </a> :null
                                                }

                                                {
                                                    project?.insLink ?  <a href={project?.insLink} className="flex flex-row items-center bg-[#ea3ca4] py-[10px] px-[20px] text-[14px] ml-[9px] rounded-lg">
                                                        <BiLogoInstagram color="#fff" className="w-5 h-5"/>
                                                        <span className="text-[#fff] ml-1">Instagram</span>
                                                    </a> :null
                                                }
                                                {
                                                    project?.twLink ?  <a href={project?.twLink} className="flex flex-row items-center bg-[#357cd3] py-[10px] px-[20px] text-[14px] ml-[9px] rounded-lg">
                                                        <BiLogoTwitter color="#fff" className="w-5 h-5"/>
                                                        <span className="text-[#fff] ml-1">Twitter</span>
                                                    </a> :null
                                                }
                                            </div>
                                        </div>: 
                                 <div className="flex flex-row items-center mt-6 gap-3">
                                    <div className="animate-pulse h-[20px] w-[150px] bg-slate-200 rounded-lg col-span-2"></div>
                                    <div className="animate-pulse h-[35px] w-[150px] bg-slate-200 rounded-lg col-span-2"></div>
                                    <div className="animate-pulse h-[35px] w-[150px] bg-slate-200 rounded-lg col-span-2"></div>
                                    <div className="animate-pulse h-[35px] w-[150px] bg-slate-200 rounded-lg col-span-2"></div>
                                    <div className="animate-pulse h-[35px] w-[150px] bg-slate-200 rounded-lg col-span-2"></div>
                                </div> 
                            }
                            
                        </div>
                    <></>
                    
                    {/* Project vacancy */}
                    <></>
                        <div className="mt-12">
                            <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">Project vacancies</h4>
                            <div>
                                {
                                    loading?
                                    [1, 2 ,3].map((item, index)=> {
                                        return (
                                            <div key={index}>
                                                <VacancyItemLoader/>
                                            </div>
                                        )
                                    })
                                    :
                                    vacancies?.map((item, index) => {
                                        return <Link key={index} to={`/Organizer/vacancy-info/${item.vacancyId}`}>
                                            <VacancyItem props={item}/>
                                        </Link>
                                    })
                                }
                            </div>
                        </div>
                    <></>
                </div>


                {/* category */}
                <div className="col-span-4">
                    <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                        {
                            loading ? <SmallItemLoader/>: 
                            <div className="flex flex-row mb-[30px]">
                                <div className="min-w-[50px]">
                                    <img src={CalendarIcon} alt="Calendar" />
                                </div>
                                <div>
                                    <div className="text-4 text-[#202124] leading-[22px] font-semibold">Date posted:</div>
                                    <span className="text-[15px] text-[#363636]">{project?.startDate.split("-").reverse().reduce((total, item) => total !== "" ? total + "/" + item : total + item, "")}</span>
                                </div>
                            </div>
                        }
                        {
                            loading ? <SmallItemLoader/>:     
                            <div className="flex flex-row mb-[30px]">
                                <div className="min-w-[50px]">
                                    <img src={ExpiryIcon} alt="Calendar" />
                                </div>
                                <div>
                                    <div className="text-4 text-[#202124] leading-[22px] font-semibold">Duration:</div>
                                    <span className="text-[15px] text-[#363636]">{project?.duration}</span>
                                </div>
                            </div>
                        }
                        {
                            loading ? <SmallItemLoader/>: 
                            <div className="flex flex-row mb-[30px]">
                                <div className="min-w-[50px]">
                                    <AiOutlineSetting color="#1967D2" className="w-6 h-6" strokeWidth={0}/>
                                </div>
                                <div>
                                    <div className="text-4 text-[#202124] leading-[22px] font-semibold">Status:</div>
                                    <span className="text-[15px] text-[#363636]">{project?.status}</span>
                                </div>
                            </div>
                        }
                        {
                            loading ? <SmallItemLoader/>: 
                            <div className="flex flex-row">
                                <div className="min-w-[50px]">
                                    <img src={SalaryIcon} alt="Calendar" />
                                </div>
                                <div>
                                    <div className="text-4 text-[#202124] leading-[22px] font-semibold">Expected budget:</div>
                                    <span className="text-[15px] text-[#363636]">${project?.budget}</span>
                                </div>
                            </div>
                        }
                    </div>
                    <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg flex justify-between items-center mb-[30px]">
                            <span className="text-[#202124] text-[18px] font-semibold">Social Media</span>
                            <div className="flex flex-row items-center">
                                {
                                    project?.fbLink? 
                                        <a href={project?.fbLink} target="_blank" rel="noreferrer">
                                            <div className="w-7 h-7 flex justify-end items-center">
                                                <BiLogoFacebook color="dimgray"/>
                                            </div>
                                        </a> : null
                                }
                                {
                                    project?.insLink? 
                                        <a href={project?.insLink} target="_blank" rel="noreferrer">
                                            <div className="w-7 h-7 flex justify-end items-center">
                                                <BiLogoInstagram color="dimgray"/>
                                            </div>
                                        </a> : null
                                }
                                {
                                    project?.twLink? 
                                        <a href={project?.twLink} target="_blank" rel="noreferrer">
                                            <div className="w-7 h-7 flex justify-end items-center">
                                                <BiLogoTwitter color="dimgray"/>
                                            </div>
                                        </a> : null
                                }
                                {
                                    project?.lkLink? 
                                        <a href={project?.lkLink} target="_blank" rel="noreferrer">
                                            <div className="w-7 h-7 flex justify-end items-center">
                                                <BiLogoLinkedin color="dimgray"/>
                                            </div>
                                        </a> : null
                                }
                            </div>
                        </div>  
                    </div>
                    <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                            <span className="text-[#202124] text-[18px] font-semibold">Participants ({projectparticipants.length})</span>
                            <div className="mt-3">
                                {
                                    projectparticipants.map((item, index) => {
                                        return <ParticipantItem type={'Organizer'} key={index} item={item} firstName={item?.fullName} position={item?.jobTitle ?? 'Not information'} userAvatar={item?.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </>);
}

export default ProjectDetail;