import {backgroundSearch, banner_1, banner_2, WeAreHiringLeft, WeAreHiringRight, Corporation_1, Corporation_2, ControlCard, Statictical, NewsLetterLeft, NewsLetterRight, BgLetter} from '../../../assets/images';
import { BagIcon, KeyboardIcon, TopBannerIcon, BottomBannerIcon, HeadPhone, TickIcon} from '../../../assets/icons';
import { AiOutlineSearch } from "react-icons/ai";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import './style.css';
import CustomButton from '../../../components/CustomButton';
import ProjectMajorItem from '../../../components/Seeker/ProjectMajorItem';
import ProjectItem from '../../../components/Seeker/ProjectItem';
import CorporateItem from '../../../components/Seeker/CorporateItem';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const dataCategory = [
    {
        icon: <img src={HeadPhone}/>,
        title: "Marketing",
        content: 158
    },
    {
        icon: <img src={HeadPhone}/>,
        title: "Sale Report",
        content: 196
    },
    {
        icon: <img src={HeadPhone}/>,
        title: "Software",
        content: 158
    },
    {
        icon: <img src={HeadPhone}/>,
        title: "Business Analyst",
        content: 158
    },
    {
        icon: <img src={HeadPhone}/>,
        title: "Content Creator",
        content: 100
    },
    {
        icon: <img src={HeadPhone}/>,
        title: "NNNNNNNNNNN",
        content: 100
    },
]
const projects = [
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAddress: "New York, US",
        projectName: "UI / UX Designer fulltime",
        projectTime: "3 months",
        projectCreateTimeLeft: "4 minutes ago", 
        projectContent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur", 
        projectSkills: ["Adobe XD", "Figma", "Photoshop"],
        projectFee: "$800",
        projectFeeUnit: "Hour"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAddress: "New York, US",
        projectName: "UI / UX Designer fulltime",
        projectTime: "3 months",
        projectCreateTimeLeft: "4 minutes ago", 
        projectContent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur", 
        projectSkills: ["Adobe XD", "Figma", "Photoshop"],
        projectFee: "$800",
        projectFeeUnit: "Hour"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAddress: "New York, US",
        projectName: "UI / UX Designer fulltime",
        projectTime: "3 months",
        projectCreateTimeLeft: "4 minutes ago", 
        projectContent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur", 
        projectSkills: ["Adobe XD", "Figma", "Photoshop"],
        projectFee: "$800",
        projectFeeUnit: "Hour"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAddress: "New York, US",
        projectName: "UI / UX Designer fulltime",
        projectTime: "3 months",
        projectCreateTimeLeft: "4 minutes ago", 
        projectContent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur", 
        projectSkills: ["Adobe XD", "Figma", "Photoshop"],
        projectFee: "$800",
        projectFeeUnit: "Hour"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAddress: "New York, US",
        projectName: "UI / UX Designer fulltime",
        projectTime: "3 months",
        projectCreateTimeLeft: "4 minutes ago", 
        projectContent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur", 
        projectSkills: ["Adobe XD", "Figma", "Photoshop"],
        projectFee: "$800",
        projectFeeUnit: "Hour"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAddress: "New York, US",
        projectName: "UI / UX Designer fulltime",
        projectTime: "3 months",
        projectCreateTimeLeft: "4 minutes ago", 
        projectContent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur", 
        projectSkills: ["Adobe XD", "Figma", "Photoshop"],
        projectFee: "$800",
        projectFeeUnit: "Hour"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAddress: "New York, US",
        projectName: "UI / UX Designer fulltime",
        projectTime: "3 months",
        projectCreateTimeLeft: "4 minutes ago", 
        projectContent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur", 
        projectSkills: ["Adobe XD", "Figma", "Photoshop"],
        projectFee: "$800",
        projectFeeUnit: "Hour"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAddress: "New York, US",
        projectName: "UI / UX Designer fulltime",
        projectTime: "3 months",
        projectCreateTimeLeft: "4 minutes ago", 
        projectContent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur", 
        projectSkills: ["Adobe XD", "Figma", "Photoshop"],
        projectFee: "$800",
        projectFeeUnit: "Hour"
    }
]
const corporations = [
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25
    }
]
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className='flex justify-start items-center mr-2 hover:opacity-80' onClick={onClick}>
            <div className='flex justify-center items-center w-10 h-10 rounded-full bg-[#e6ecff] cursor-pointer'>
                <BiChevronLeft className='fill-[#98A4BF] w-6 h-6' />
            </div> 
        </div>
    );
}
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className='flex justify-start items-center ml-2 hover:opacity-80' onClick={onClick}>
            <div className='flex justify-center items-center w-10 h-10 rounded-full bg-[#e6ecff] cursor-pointer'>
                <BiChevronRight className='fill-[#98A4BF] w-6 h-6' />
            </div> 
        </div>
    );
}
const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow />
};
function Home() {
    return (<>
        {/* Searching Jobs By Keyword*/}
        <></>
            <div>
                <div className=" grid grid-cols-12 gap-3 w-full h-full bg-no-repeat bg-cover pt-12 pl-15 pr-65 pb-20" style={{backgroundImage: `url(${backgroundSearch})`}}>
                    <div className='col-span-8 pt-12 pl-44 pr-44 pb-20'>
                        {/* Introduce */}
                        <h1 className='text-5xl font-bold leading-[60px]'>The  
                            <span className='relative text-[#3c65f5] ml-2'>Easiest Way<span className='absolute left-0 -bottom-[6px] opacity-10 bg-[#3c65f5] h-[25px] w-full'></span>
                            </span> to 
                            <br />Get Find Your New Project
                        </h1>

                        <p className='text-[18px] text-[#4f5e64] mt-5'>
                            Each month, more than 3 million job seekers turn to
                            website in their search for work, making over 140,000
                            applications every single day
                        </p>

                        {/* Search Box */}
                        <div className='inline-block bg-[#fff] shadow-[0_18px_40px_rgba(25,15,9,0.1)] rounded-lg w-full p-[10px] mt-10'>
                            <form className='flex w-full'>
                                <div className='flex w-full max-w-[180px]'>
                                    <select className='align-middle bg-no-repeat bg-[length:18px_18px] bg-left pl-5 pr-8 mr-2 outline-none' style={{backgroundImage: `url(${BagIcon})`}}>
                                        <option value="0">Industry</option>
                                        <option value="1">Software</option>
                                        <option value="2">Finance</option>
                                    </select>
                                </div>
                                <div className='flex w-full max-w-[180px]'>
                                    <select className='align-middle bg-no-repeat bg-[length:18px_18px] bg-left pl-5 pr-8 mr-2  outline-none' style={{backgroundImage: `url(${BagIcon})`}}>
                                        <option value="0">VietNam</option>
                                        <option value="1">Campuchia</option>
                                        <option value="2">ThaiLan</option>
                                    </select>  
                                </div>                                  
                                <input type="text" placeholder="Your keyword... " className='w-[154px] bg-no-repeat bg-[length:18px_18px] bg-left py-[10px] pl-8 pr-5 mr-2 outline-none' style={{backgroundImage: `url(${KeyboardIcon})`}}></input>
                                <CustomButton title={"Search"} iconRight={<AiOutlineSearch className='w-5 h-5'/>} isLeft={true} containerStyles={"w-[122px] h-[50px] bg-[#3c65f5] py-[10px] pl-[15px] pr-[34px] text-[14px] rounded-lg text-[#fff] "}>
                                
                                </CustomButton>
                            </form> 
                        </div>

                         {/* Popula Search */}
                        <div className='mt-14'>
                            <strong className='text-[#4F5E64] text-[14px]'>Popular searches:</strong>
                            <a href="" className='text-[#4F5E64] text-[14px] mr-[5px] ml-[2px] underline underline-offset-1'>Designer,</a>
                            <a href="" className='text-[#4F5E64] text-[14px] mr-[5px] ml-[2px] underline underline-offset-1'>Web Designer,</a>
                            <a href="" className='text-[#4F5E64] text-[14px] mr-[5px] ml-[2px] underline underline-offset-1'>Mobile Developer,</a>
                            <a href="" className='text-[#4F5E64] text-[14px] mr-[5px] ml-[2px] underline underline-offset-1'>Digital Marketing</a>
                        </div>

                    </div>

                    <div className='col-span-4'>
                        <div className='block'>
                            <div className='relative h-full min-h-[540px] py-16'>
                                <div className='absolute top-[10%] -left-[150px] hero-thumb-animation_1'>
                                    <img alt="jobBox" src={banner_1}></img>
                                </div>
                                <div className='absolute bottom-0 right-[120px] hero-thumb-animation_2'>
                                    <img  alt="jobBox" src={banner_2}/>
                                </div>
                                <div className='absolute top-[21%] right-[220px] hero-thumb-animation_3'>
                                    <img  alt="jobBox" src={TopBannerIcon}/>
                                </div>
                                <div className='absolute hero-thumb-animation_3 bottom-[8%] -left-[80px]'>
                                    <img  alt="jobBox" src={BottomBannerIcon}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <></>

        {/* Searching Jobs By Category */}
        <></>
            <div>
                {/* Title */}
                <div>
                    <h1 className='text-4xl text-[#05264e] font-bold text-center mb-[10px]'>Browse by category</h1>
                    <h3 className='text-lg text-[#66789c] font-[500] text-center'>Find the project that&apos;s perfect for you. about 800+ new projects everyday</h3>
                </div>
                <div className='mt-11'>
                    <div className='mx-[4%] box-border'>
                        <Slider {...settings} className='flex'>
                            {
                                dataCategory.map((item, index) => {
                                    return <ProjectMajorItem key={index} icon={item.icon} title={item.title} projectNumber={item.content}/>
                                })
                            }
                        </Slider>
                    </div>
                </div>
                
            </div>
        <></>

        <div className='h-[70px]'></div>

        {/* Banner jobs of the day */}
        <></>
            <div className='flex justify-center box-border'>
                <div className='flex max-w-[85%] h-[156px] mx-10 box-border p-2 border border-[#e0e6f7] shadow-[0_10px_20px_-5px_rgba(10,42,105,.06)] rounded items-center'>
                        <img src={WeAreHiringLeft} alt="Image" className='w-[150px] h-[120px]'/>
                        <div className='flex flex-col ml-6'>
                            <span className='text-[#a0abb8] text-base tracking-[2px] font-bold'>WE ARE</span>
                            <span className='text-[#05264e] text-[49px] leading-none tracking-[1px] font-bold'>HIRING</span>
                        </div>
                        <div className='px-5 pt-7'>
                            <div className="text-lg leading-6 text-[#66789c] font-[500]">Let’s <span className="text-[#05264e]">Work</span> Together<br></br> &amp; <span className="text-[#05264e]">Explore</span> Opportunities</div>
                            </div>
                        <div className='px-5 pt-8'>
                            <CustomButton title={"Apply now"} iconRight={<img src={TickIcon}/>} isLeft={true} containerStyles={"box-border bg-[#3c65f5] px-[18px] py-[8px] text-[14px] rounded-[4px] text-[#fff] hover:bg-[#05264e]"}>
                                    
                            </CustomButton>
                        </div>
                        <img src={WeAreHiringRight} alt="Image" />
                </div>
            </div>
        <></>

        <div className='h-20'></div>
        {/* Jobs of the days */}
        <></>
            <div className='mx-[8%]'>
                {/* Title */}
                <div>
                    <h1 className='text-4xl text-[#05264e] font-bold text-center mb-[10px]'>Projects of the day</h1>
                    <h3 className='text-lg text-[#66789c] font-[500] text-center'>Search and connect with the right candidates faster.</h3>
                </div>
                <div className='mt-11'>
                    <div className='box-border flex flex-row justify-center'>
                        {
                            dataCategory.map((item, index) => {
                                return <ProjectMajorItem key={index} type={"small"} icon={item.icon} title={item.title} projectNumber={item.content}/>
                            })
                        }
                    </div>
                </div>
                <div className='grid grid-cols-4 gap-4 mt-14'>
                    {
                        projects.map((item, index) => {
                            return <ProjectItem key={index} corAvatar={item.corAvatar} corName={item.corName} corAddress={item.corAddress} projectName={item.projectName} projectTime={item.projectTime} projectCreateTimeLeft={item.projectCreateTimeLeft} projectContent={item.projectContent} projectSkills={item.projectSkills} projectFee={item.projectFee} projectFeeUnit={item.projectFeeUnit} />
                        })
                    }
                </div>
            </div>
        <></>

        <div className='h-[130px]'></div>
        {/* Statistic Overview About App */}
        <></>
            <div className='grid grid-cols-2 gap-4 mx-[65px] mb-28'>
                <div className='flex items-center justify-center'>
                    <div>
                        <div className='relative'>
                            <img className='absolute -z-10 -top-[70px] -left-[185px]' src={Statictical} alt="" />
                            <img className='absolute -z-10 -bottom-[170px] -right-[170px]' src={ControlCard} alt="" />
                            <img src={Corporation_2} className='rounded-[32px] w-[520px] h-[470px]' alt="" />
                        </div>
                    </div>
                </div>
                <div className='py-[40px] pl-[60px] pr-[40px]'>
                    <span className='text-[32px] leading-10 font-bold text-[#a0abb8]'>Millions Of Projects</span>
                    <h1 className='text-5xl font-bold leading-[60px] w-[103%]'>Find The One That&apos;s<span className='relative text-[#3c65f5] ml-2'><br/>Right<span className='absolute left-0 -bottom-[6px] opacity-10 bg-[#3c65f5] h-[25px] w-full'></span>
                        </span> For You
                    </h1>
                    <div className='mt-[40px] pr-[50px]'><p className='text-[#4f5e64]'>
                        Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 600,000 companies worldwide. The right job is out there.
                    </p></div>
                    <div className='mt-12'>
                        <a href="#" className='bg-[#3c65f5] rounded-[8px] text-[#FFF] hover:bg-[#05264e] py-[15px] px-[25px]'>Search Projects</a>
                        <a href="#" className='underline underline-offset-1 hover:text-[#3c65f5] ml-7 text-[#4f5e64]'>Learn more</a>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-8 mx-10 mt-16'>
                <div>
                    <h1 className='text-[#3c65f5] text-6xl font-bold text-center'>25 K+</h1>
                    <h2 className='text-[#05264e] text-2xl font-bold text-center'>Completed Cases</h2>
                    <p className='text-[#4f5e64] text-base mt-2 text-center px-8'>We always provide people a
                                                                        complete solution upon focused of
                                                                        any business</p>
                </div>
                <div>
                    <h1 className='text-[#3c65f5] text-6xl font-bold text-center'>17 +</h1>
                    <h2 className='text-[#05264e] text-2xl font-bold text-center'>Our Office</h2>
                    <p className='text-[#4f5e64] text-base mt-2 text-center px-8'>We always provide people a
                                                                        complete solution upon focused of
                                                                        any business</p>
                </div>
                <div>
                    <h1 className='text-[#3c65f5] text-6xl font-bold text-center'>86 +</h1>
                    <h2 className='text-[#05264e] text-2xl font-bold text-center'>Skilled People</h2>
                    <p className='text-[#4f5e64] text-base mt-2 text-center px-8'>We always provide people a
                                                                        complete solution upon focused of
                                                                        any business</p>
                </div>
                <div>
                    <h1 className='text-[#3c65f5] text-6xl font-bold text-center'>28 +</h1>
                    <h2 className='text-[#05264e] text-2xl font-bold text-center'>CHappy Clients</h2>
                    <p className='text-[#4f5e64] text-base mt-2 text-center px-8'>We always provide people a
                                                                        complete solution upon focused of
                                                                        any business</p>
                </div>
            </div>
        <></>

        {/* Statistic Top recuite */}
        <></>
            <div className='mx-[8%] mt-[112px]'>
                {/* Title */}
                <div>
                    <h1 className='text-4xl text-[#05264e] font-bold text-center mb-[10px]'>Top Recruiters</h1>
                    <h3 className='text-lg text-[#66789c] font-[500] text-center'>Discover your next career move, freelance gig, or internship</h3>
                </div>
                <div className='mt-11'>
                    <div className='box-border flex flex-row justify-center'>
                        {
                            dataCategory.map((item, index) => {
                                return <ProjectMajorItem key={index} type={"small"} icon={item.icon} title={item.title} projectNumber={item.content}/>
                            })
                        }
                    </div>
                </div>
                <div className='grid grid-cols-5 gap-4 mt-14'>
                    {
                        corporations.map((item, index) => {
                            return <CorporateItem key={index} corAvatar={item.corAvatar} corName={item.corName} corAddress={item.corAddress} corAvgStar={item.corAvgRate} corAmountRate={item.corAmountRate} corAmountProjects={item.corAmountProjects}/>
                        })
                    }
                </div>
            </div>    
        <></>

        {/* Statistic Jobs by location */}
        <></>
                    
        <></>

        {/* News and Blog */}
        <></>
                    
        <></>

        {/* Send feedback */}
        <></>
            <div className='mx-[8%] my-[50px]'>
                <div className='flex flex-row pt-[57px] pb-[96px] bg-no-repeat bg-cover justify-between px-11' style={{backgroundImage: `url(${BgLetter})`}}>
                    <img src={NewsLetterLeft} alt="" />
                    <div className='w-full mx-20'>
                        <h2 className='text-center text-white text-[37px] font-semibold leading-[44px]'>New Things Will Always <br />Update Regularly</h2>
                        <div className='bg-white p-[10px] inline-flex w-full items-center rounded-[10px] mt-10 justify-between'>
                            <div className='flex flex-row items-center'>
                                <MdOutlineMailOutline className='w-[42px] h-[42px] ml-[15px] fill-[#66789c]'/>
                                <input className='p-[15px] pl-[10px] outline-none' type="text" placeholder="Enter your email here"/>
                            </div>
                            <CustomButton title={"Subcribe"} iconRight={<img src={TickIcon}/>} isLeft={true} containerStyles={"box-border bg-[#3c65f5] pl-[20px] pr-[26px] py-[18px] text-[14px] rounded-[6px] text-[#fff] hover:bg-[#05264e]"}>
                                    
                            </CustomButton>
                        </div>
                    </div>
                    <img src={NewsLetterRight} alt="" />
                </div>
            </div>
        <></>
    </>);
}

export default Home;