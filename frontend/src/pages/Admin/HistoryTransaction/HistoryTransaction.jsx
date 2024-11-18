import React from 'react'
import { ComboBox, LoadingComponent, PaginationButtons } from "../../../components";
import { AiFillExclamationCircle, AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllHistoriesAction, resetSuccessAction } from '../../../redux/slices/skills/skillsSlices';
import { TransactionItem } from './TransactionItem';
function HistoryTransaction() {

    // define dispatch 
    const dispatch = useDispatch();


    // define state
    const [historyList, setHistoryList] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState([]);
    const [filterKeyWord, setFilterKeyWord] = useState('');
    const [filterDay, setFilterDay] = useState(null);
    // func change cbb

    // get histories
    useEffect(() => {
        dispatch(getAllHistoriesAction())
    }, [dispatch])

    // get store
    const storeData = useSelector(store => store?.skills);
    const { appErr, histories, loading, isSuccess } = storeData;
    const checkDate = (dateItem, datePick) => {
        if (datePick === null || datePick.toString() === '') {
            console.log(datePick)
            return true;
        } else {

            // Ngày đã chọn
            var ngayItem = new Date(dateItem);

            // Ngày được chọn
            var ngayDuocChon = new Date(datePick);
            console.log(ngayItem, ngayDuocChon)
            // So sánh
            if (ngayItem.getFullYear() === ngayDuocChon.getFullYear() && ngayItem.getMonth() === ngayDuocChon.getMonth() && ngayItem.getDate() === ngayDuocChon.getDate()) {
                return true
            } else {
                return false
            }
        }

    }
    // check list => update list by filter + paging
    useEffect(() => {
        console.log(filterDay)

        setPages([...histories.filter(item =>
            ((item?.id?.toLowerCase().includes(filterKeyWord.trim().toLowerCase()))
                || (item?.userInfo?.fullName?.trim().toLowerCase().includes(filterKeyWord.trim().toLowerCase())))
            && (checkDate(item?.create_time, filterDay))

        ).slice(currentPage * 10, (currentPage + 1) * 10)
        ])
    }, [currentPage, historyList, filterKeyWord, filterDay])

    // check sucess => reset success
    useEffect(() => {
        if (isSuccess) {
            dispatch(resetSuccessAction())
            setHistoryList([...histories])
            setPages([...histories.slice(currentPage * 10, (currentPage + 1) * 10)])
        }
    }, [isSuccess])
    return (
        <div>
            <div className="px-10 pb-0 text-sm">
                {loading && <LoadingComponent />}
                {/* Start title of page  */}
                <div className="mb-8">
                    <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">History Transactions!</h3>
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
                                            <div  >
                                                <div className="relative mb-0 leading-6">
                                                    <AiOutlineSearch fontSize={22} color="#a7a9ad" className="absolute l-3  h-11 justify-center ml-2 text-center z-10 " />
                                                    <input onChange={(e) => setFilterKeyWord(e.target.value)} type='search' name="search-field" id="search-field" placeholder="Search" className=" relative mt-2 block w-72 border pt-1 pb-1 pl-10 h-10 pr-5 text-sm bg-[#f0f5f7] focus:bg-white  rounded-md" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-40">
                                            <input onChange={(e) => setFilterDay(e.target.value)} type='date' name="search-field" id="search-field" className=" relative mt-2 block w-40 border pt-1 pb-1 pl-4 h-10 pr-5 text-sm bg-[#f0f5f7] focus:bg-white  rounded-md" />

                                        </div>
                                    </div>
                                    <div className="flex text-base">
                                        <div className="mr-1">History transactions: </div> <span>  {pages?.length}</span>
                                    </div>
                                </div>
                                {appErr && <span className='flex flex-row items-center text-base text-[#a9252b] mt-2 ml-8'><AiFillExclamationCircle className="mr-1" />{appErr}</span>}
                                {/* table list skill information */}
                                <div className="px-6 relative">
                                    <div className="overflow-y-hidden overflow-x-auto">
                                        <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0 text-[15px]">
                                            <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                                                <tr className="w-full ">
                                                    <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left  w-3/12 pl-4">Transaction Id</th>
                                                    <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left pl-2 w-3/12">Organizer Name</th>
                                                    <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left  w-2/12 ">Amount</th>
                                                    <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left pl-6 w-2/12">Create time</th>
                                                    <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left pl-12 w-2/12">Action</th>
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

                                                                </tr>
                                                            )
                                                        }) :
                                                        <>
                                                            {([...pages]?.reverse())?.map((item, index) => {
                                                                return <TransactionItem item={item} key={index} />
                                                            })}


                                                        </>
                                                }
                                            </tbody>
                                        </table>
                                        <div className="list-none mt-10 flex items-center justify-center mb-4">
                                            <PaginationButtons
                                                totalPages={historyList.length / 10}
                                                currentPage={currentPage}
                                                setCurrentPage={setCurrentPage}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </div>
    )
}
export default HistoryTransaction;