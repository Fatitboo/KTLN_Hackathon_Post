import { CustomButton, LoadingComponent } from "../../../components";
import { AiFillExclamationCircle, AiOutlineSearch } from "react-icons/ai";
import { LiaTrashAltSolid } from "react-icons/lia";
import { CiEdit } from 'react-icons/ci'
import { BiPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOccupationsAction } from "../../../redux/slices/occupations/occupationsSlices";
import Swal from 'sweetalert2'
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

function OccupationManagement() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getAllOccupationsAction())
    }, []);
    const users = useSelector(store => store?.users);
    const [filterKeyWord, setFilterKeyWord] = useState('');

    const handleDeleteOccupation = async (id) => {
        // dispatch(deleteOccupationAction(id));
        Swal.fire({
            title: "Confirm Delete",
            text: "Are you sure you want to delete this item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { userAuth } = users;
                // http call 
                const config = {
                    headers: {
                        Authorization: `Bearer ${userAuth?.user?.token}`,
                        'Content-Type': 'application/json',
                    },
                };
                try {
                    await axios.delete(`${baseUrl}/api/v1/occupations/${id}`, config);
                } catch (error) {
                }
                Swal.fire({
                    title: "Deleted!",
                    text: "This item has been deleted.",
                    icon: "success",
                    confirmButtonColor: '#3085d6'
                }).then(result => {
                    if (result.isConfirmed) dispatch(getAllOccupationsAction());
                });
            }
        });
    }

    const storeData = useSelector(store => store?.occupations);
    const { appErr, occupationsList, loading } = storeData;
    return (
        <div className="px-10 pb-0 text-sm">
            {loading && <LoadingComponent />}
            {/* Start title of page  */}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Occupation Management!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>
            </div>
            <div className="flex flex-wrap mx-3 mt-3">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="relative">

                            {/* start header + search */}
                            <div className="relative flex justify-between items-center flex-wrap bg-transparent px-8 py-5">
                                <div className="flex">
                                    <div className="relative mr-4">
                                        <form action="#" method="post"  >
                                            <div className="relative mb-0 leading-6">
                                                <AiOutlineSearch fontSize={22} color="#a7a9ad" className="absolute l-3  h-11 justify-center ml-2 text-center z-10 " />
                                                <input onChange={(e) => setFilterKeyWord(e.target.value)} type='search' name="search-field" id="search-field" placeholder="Search" className=" relative mt-2 block w-72 border pt-1 pb-1 pl-10 h-10 pr-5 text-sm bg-[#f0f5f7] focus:bg-white  rounded-md" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="mt-[10px]">
                                        <Link to={'/Admin/occupation-management/add-occupation'}>
                                            <CustomButton title="Add" iconRight={<BiPlus fontSize={24} />} containerStyles="text-blue-600 py-1.5 px-3 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex text-base">
                                    <div className="mr-1">Occupations: </div> <span>  {occupationsList.length}</span>
                                </div>
                            </div>
                            {appErr && <span className='flex flex-row items-center text-base text-[#a9252b] mt-2 ml-8'><AiFillExclamationCircle className="mr-1" />{appErr}</span>}
                            {/* table list skill information */}
                            <div className="px-6 relative">
                                <div className="overflow-y-hidden overflow-x-auto">
                                    <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0 text-[15px]">
                                        <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                                            <tr className="w-full ">
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left pl-6 w-2/12">Occupation Name</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left  w-9/12 pl-4">Detail Major</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left pl-8 w-1/12 ">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="w-full">
                                            {
                                                loading ?
                                                    [1, 2, 3, 4, 5, 6].map((item, index) => {
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
                                                                <td className="space-x-4 py-2.5 h-40 px-0.5 w-1/12">
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
                                                                        <div className="space-y-3">
                                                                            <div className="grid grid-cols-3 gap-4">
                                                                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                                            </div>
                                                                            <div className="h-2 bg-slate-200 rounded"></div>
                                                                        </div>
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
                                                    (occupationsList?.filter(item => {
                                                        if (filterKeyWord.toLowerCase() === '') return [...occupationsList]
                                                        else {
                                                            return item?.occupationName?.toLowerCase().includes(filterKeyWord.toLowerCase())
                                                                || (item?.listMajor?.filter(i => i.toLowerCase().includes(filterKeyWord.toLowerCase())))?.length > 0
                                                        }
                                                    }))?.map((item, index) => (
                                                        <tr key={item.occupationId} className="cursor-pointer relative border-b border-l border-r border-solid border-[#ecedf2] w-full text-[15px] min-h-max hover:bg-[#f5f5f5] ">
                                                            <td className="w-2/12">
                                                                <div className="text-ellipsis flex items-start font-medium w-full line-clamp-1 text-left pl-6 py-3">{item?.occupationName}</div>
                                                            </td>
                                                            <td className="w-9/12">
                                                                <div className="flex  w-full  text-left border-l border-r ">
                                                                    {/* <span className="text-blue-700 mr-2 mt-2">[ </span> */}
                                                                    <div className="line-clamp-3 text-ellipsis w-full my-3 flex flex-wrap">
                                                                        {item?.listMajor.map((it, index) => {
                                                                            // if (index === item.listMajor.length - 1) return it+''
                                                                            // return it+',  '
                                                                            return <div key={index} className="w-fit px-2 py-1 rounded-lg bg-blue-100 m-2">{it}</div>
                                                                        })}
                                                                    </div>
                                                                    {/* <span className="text-blue-700 flex items-end mb-2">]</span> */}
                                                                </div>
                                                            </td>
                                                            <td className="w-1/12">
                                                                <div className="py-3 pl-4">
                                                                    <ul className="list-none flex relative item-center ">

                                                                        <li onClick={() => navigate(`/Admin/occupation-management/edit-occupation/${index}`, { state: { occupation: item } })} className="list-none relative mr-3 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#278646] hover:text-white">
                                                                            <div > <CiEdit fontSize={20} /> </div>
                                                                        </li>
                                                                        <li onClick={() => handleDeleteOccupation(item.occupationId)} className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#ce3e37] hover:text-white">
                                                                            <button > <LiaTrashAltSolid fontSize={20} /> </button>
                                                                        </li>

                                                                    </ul>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default OccupationManagement;