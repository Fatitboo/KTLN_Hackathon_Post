import React, { useEffect, useState } from "react";
import { PiMapPin } from "react-icons/pi";
import { BiBookmark, BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";
import { BsBriefcase } from "react-icons/bs"
import { LiaPhoneSolid } from "react-icons/lia"
import { CiMail } from "react-icons/ci";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailUserAction, resetSuccessAction, updateAvtiveCorByAdminAction } from "../../../../redux/slices/users/usersSlices";
import { CgArrowLeft } from "react-icons/cg";
import { LoadingComponent } from "../../../../components";
import { getAllProjectsUser } from "../../../../redux/slices/projects/projectsSlices";
import ProjectItem from "./ProjectItem";
import Swal from "sweetalert2";
// import "./style.css"

function CompanyProfileAdmin() {
    const { id } = useParams();
    const navigate  = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProjectsUser({ id: id }))
        dispatch(getDetailUserAction(id))
    }, [dispatch])
    const storeData = useSelector(store => store?.users);
    const projects = useSelector((state) => state.projects.projectsOfCor)
    console.log(projects)
    const { loading, appErr, seletedUser, isSuccessUpd } = storeData;
    const [sltCor, setSltCor] = useState({ ...seletedUser })
    const [isActive, setIsActive] = useState(seletedUser?.isActive)

    const convertDate = (tt) => {
        const date = new Date(tt);
        // Lấy thông tin ngày, tháng, năm
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Thêm '0' phía trước nếu tháng là số đơn
        const day = String(date.getDate()).padStart(2, '0'); // Thêm '0' phía trước nếu ngày là số đơn

        // Tạo chuỗi ngày theo định dạng 'yyyy-MM-dd'
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    }
    useEffect(() => {
        setSltCor({ ...seletedUser })
    }, [seletedUser])
    const handleUpdateActiveOrg = async (id, active) => {
        Swal.fire({
            title: `Confirm ${active}`,
            text: `Are you sure you want to ${active} this organizer?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(updateAvtiveCorByAdminAction(id))
            }
        });
    }
    useEffect(() => {
        if (isSuccessUpd) {
            dispatch(resetSuccessAction());
            Swal.fire({
                title: "Updated!",
                text: "This active status of organizer has been updated.",
                icon: "success",
                confirmButtonColor: '#3085d6'
            })
            setIsActive(prev=>!prev)
        }
    }, [isSuccessUpd])
    const convertAddress = (string)=>{
        var str = 'Not infor'
        if(string.includes('Thành phố ')){
            str = string.slice(10)
        }
        if(string.includes('Tỉnh ')){
            str = string.slice(5)
        }
        return str
    }
    return (<>
        {loading && <LoadingComponent />}
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>

        <div className="px-[40px] pt-[10px] grid grid-cols-12 gap-4 min-h-[200px] bg-[#f2f7fb] items-center">
            <div className="col-span-8 pr-[30px] relative">
                <div onClick={()=>navigate(-1)} className="absolute -top-12 left-0 cursor-pointer">
                    <CgArrowLeft size={30} />
                </div>
                {/* quick info  */}
                <></>
                <div className="flex text-[#696969] mb-8">

                    <div>
                        <img src={sltCor?.avatar?.fileUrl ?? 'https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F1-1.png&w=128&q=75'} alt="" className="w-20 h-20 rounded-full" />
                    </div>
                    <div className="ml-5">
                        <div>
                            <h2 className="text-[26px] leading-[35px] text-[#202124] font-medium">{sltCor?.fullName}</h2>
                        </div>
                        <div className="flex flex-row text-[14px] font-light  my-[8px]">
                            <span className="flex flex-row items-center mr-4"><PiMapPin className="w-[18px] h-[18px] " />{sltCor?.address ? `${sltCor?.address?.district}, ${convertAddress(sltCor?.address?.province)}` : 'Not infomation'}</span>
                            <span className="flex flex-row items-center mr-4"><BsBriefcase className="w-[18px] h-[18px] mr-1" />{sltCor?.fields ? `${sltCor?.fields[0]}/ ${sltCor?.fields[1]}` : 'Not infomation'}</span>
                            <span className="flex flex-row items-center mr-4"><LiaPhoneSolid strokeWidth={0.01} className="w-[22px] h-[22px] mr-1" />{sltCor?.phoneNumber ?? 'Not infomation'}</span>
                            <span className="flex flex-row items-center mr-4"><CiMail className="w-[22px] h-[22px] mr-1" />{sltCor?.website ?? 'Not infomation'}</span>
                        </div>
                        {/* skills */}
                        <div className="flex flex-row">
                            <div className="py-[5px] px-5 rounded-[20px] bg-[#d3e1f5] text-sm text-[#1967d2] mr-[10px]"><span>Open Projects - {sltCor?.projects?.length ?? 0}</span></div>
                            <div className="py-[5px] px-5 rounded-[20px] bg-orange-200 text-sm text-orange-700 mr-[10px]"><span>Open Vacancies - {sltCor?.vacancies?.length ?? 0}</span></div>
                        </div>
                    </div>
                </div>
                <></>
            </div>
            <div className="col-span-4">
                <div className="flex flex-row-reverse mb-5">

                    {
                        isActive ?
                            <div onClick={() => handleUpdateActiveOrg(sltCor?.userId, 'block')} className="flex items-center justify-center h-[53px] box-border bg-red-600 px-[18px] py-[8px] w-[130px] rounded-[8px] text-[#fff] hover:bg-red-700 cursor-pointer">
                                <span className="text-[15px] leading-none font-[400]">Block</span>
                            </div>
                            : <div onClick={() => handleUpdateActiveOrg(sltCor?.userId, 'unblock')} className="flex items-center justify-center h-[53px] box-border bg-blue-600 px-[18px] py-[8px] w-[130px] rounded-[8px] text-[#fff] hover:bg-blue-800 cursor-pointer">
                                <span className="text-[15px] leading-none font-[400]">Active</span>
                            </div>
                    }

                </div>
            </div>
        </div>
        <div className="mx-[40px] -pt-10">
            <div className="static grid grid-cols-12 gap-4 m-auto box-border">
                {/* left infomation */}
                <div className="col-span-8 pr-[30px] bg-white p-6 rounded-lg">
                    {/* Description  */}
                    <></>
                    <div>
                        <h4 className="text-lg leading-6 text-[#202124] mb-5 font-semibold">About Organizer</h4>
                        <p className="text-[#696969] text-base mb-6 font-normal leading-8">
                            {sltCor?.description ?? 'Not infomation'}
                        </p>
                    </div>
                    <></>

                    {/* Video description */}
                    <></>
                    <div>
                    </div>
                    <></>

                    {/* project of organizer info */}
                    <></>
                    <div>
                        <h4 className="text-lg leading-6 text-[#202124] mb-5 font-semibold">Projects Of Organizer</h4>
                        <div className="mt-5">
                            {
                                projects?.map((item, index) => {
                                    return <ProjectItem key={index} props={item} fullName={sltCor?.fullName} />;
                                })
                            }
                        </div>

                    </div>
                    <></>
                </div>
                {/* category */}
                <div className="col-span-4">

                    <div className="p-6 bg-[white] rounded-lg mb-[30px]">
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Primary industry:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-medium">{sltCor?.fields?.[0] ?? 'Not infomation'}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Company size:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-medium">{sltCor?.teamSize ?? 'Not infomation'}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Founded in:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-medium">{convertDate(sltCor?.dayOfBirth)}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Phone:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-medium">{sltCor?.phoneNumber ?? 'Not infomation'}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Email:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-medium">{sltCor?.email ?? 'Not infomation'}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Location:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-medium">{sltCor?.address ? `${sltCor?.address?.district}, ${sltCor?.address?.province}` : 'Not infomation'}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Social media:</span>
                            <div className="flex flex-row items-center">
                                <div className="w-7 h-7 flex justify-end items-center">
                                    <BiLogoFacebook color="dimgray" className="cursor-pointer">
                                        <a href={sltCor?.fbLink}></a>
                                    </BiLogoFacebook>
                                </div>
                                <div className="w-7 h-7 flex justify-end items-center">
                                    <BiLogoInstagram color="dimgray" className="cursor-pointer">
                                        <a href={sltCor?.insLink}></a>
                                    </BiLogoInstagram>
                                </div>
                                <div className="w-7 h-7 flex justify-end items-center">
                                    <BiLogoTwitter color="dimgray" className="cursor-pointer">
                                        <a href={sltCor?.twLink}></a>
                                    </BiLogoTwitter>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[53px]">
                            <a href="www.udemy.com" className="flex items-center justify-center rounded-lg text-center text-[#1967d2] h-full w-full link text-[15px] leading-none font-[400] bg-[rgba(25,103,210,.15)] cursor-pointer px-[18px] py-[8px]">{sltCor?.website ?? 'Not found'}</a>
                        </div>
                    </div>
                    <div>
                        <div className="p-6 bg-[#FFF] rounded-lg mb-[30px]">
                            <span className="text-[#202124] text-[18px] font-semibold ">Company Fields</span>
                            <div className="flex  flex-wrap mt-[30px]">
                                {
                                    (sltCor?.fields ?? ['Not information']).map((item, index) =>
                                        <div key={index} className="mr-[10px] mb-[10px]">
                                            <div className="bg-[#F5F6FC] text-[#696969] py-[5px] px-5 text-[14px] leading-[19px] rounded">{item}</div>
                                        </div>)
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default CompanyProfileAdmin;