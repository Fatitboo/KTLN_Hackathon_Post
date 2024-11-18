import React, { useState } from 'react'

export const TransactionItem = ({ item }) => {
    const [openDetail, setOpenDetail] = useState(false)
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
        <React.Fragment>
            <tr className="relative border border-solid   border-[#ecedf2] w-full text-base h-[50px] hover:bg-[#f4f2f2] ">
                <td className='w-3/12'>
                    <div className="text-left pl-3 py-3">#{item?.id?.slice(0, 20)}</div>
                </td>
                <td className='w-3/12'>
                    <div className="pl-2 font-medium text-blue-700 text-left py-3 text-ellipsis w-full line-clamp-2">{item?.userInfo?.fullName}</div>
                </td>
                <td className='w-2/12'>
                    <div className="text-left pl-2 py-3">{item?.transactions?.amount?.total} $</div>
                </td>
                <td className='w-2/12'>
                    <div className="text-left font-light text-[16px] pl-2 py-3">{convertDateFormat(item?.create_time)}</div>
                </td>
                <td className='w-2/12'>
                    <div onClick={() => setOpenDetail(prev => !prev)} className="text-left text-blue-800 font-light text-[15px] pl-10 py-3 cursor-pointer hover:underline">{openDetail?'Less detail':'See detail'}</div>
                </td>
            </tr>
            {
                openDetail &&
                <tr className='h-fit border border-solid border-[#ecedf2] w-full  text-base border-l-2 border-l-blue-700 '>
                    <td colSpan={5} className='py-4'>
                        <div className='py-4 px-10 '>
                            <div className='flex'>
                                <div className='font-bold text-blue-800 mr-3'>Transactions Information: </div>
                                <div className='text-red-800 font-bold'>#{item?.id?.slice(0, 20)}</div>
                            </div>
                            <div className='grid grid-cols-3 gap-5 px-5 mt-5 '>
                                <div className='flex '>
                                    <div className='mr-2'>Organizer Name:  </div>
                                    <div className='text-blue-800 font-medium'>{item?.userInfo?.fullName}</div>
                                </div>
                                <div className='flex '>
                                    <div className='mr-2'>Payment amount:  </div>
                                    <div className='text-blue-800'>{item?.transactions?.amount?.total} $</div>
                                </div>
                                <div className='flex '>
                                    <div className='mr-7'>Payment fee:  </div>
                                    <div className='text-blue-800'>{item?.transactions?.related_resources?.sale?.transaction_fee?.value} $</div>
                                </div>
                                <div className='flex '>
                                    <div className='mr-10 '>Create time:  </div>
                                    <div className='text-blue-800'>{convertDateFormat(item?.create_time)}</div>
                                </div>
                                <div className='flex '>
                                    <div className='mr-2'>Payment method:  </div>
                                    <div className='text-blue-800'>{item?.transactions?.description} </div>
                                </div>
                                <div className='flex '>
                                    <div className='mr-2'>Payment status:  </div>
                                    <div className='text-blue-800'>{item?.transactions?.related_resources?.sale?.state} </div>
                                </div>
                                <div className='flex col-span-3'>
                                    <div className='mr-1'>Payment content:  </div>
                                    <div className='text-blue-800 font-medium'>Pay the posting fee for {item?.vacancy ? ' vacancy ' + item?.vacancy?.vacancyName : ' project ' + item?.project?.projectName} </div>
                                </div>
                            </div>

                            {item?.vacancy ? <>
                                <div className='border border-gray-400 pb-2 mt-5 bg-gray-50'>
                                    <div className='flex mt-2 px-5'>
                                        <div className='text-blue-800 font-bold'>{item?.vacancy?.vacancyName}</div>
                                    </div>
                                    <div className='grid grid-cols-3 gap-3 px-10 mt-3 '>
                                        <div className='flex '>
                                            <div className='mr-2'>Duration:  </div>
                                            <div className='text-blue-800 ml-5'>{item?.vacancy?.hiringTimeline}</div>
                                        </div>
                                        <div className='flex '>
                                            <div className='mr-2'>Location:  </div>
                                            <div className='text-blue-800'>{item?.vacancy?.location === '' ? 'At home' : item?.vacancy?.location} </div>
                                        </div>
                                        <div className='flex '>
                                            <div className='mr-2'>Max required:  </div>
                                            <div className='text-blue-800'>{item?.vacancy?.maxRequired} candidate(s)</div>
                                        </div>
                                        <div className='flex '>
                                            <div className='mr-2'>Create time:  </div>
                                            <div className='text-blue-800'>{`${item?.vacancy?.createdAt[3]}:${item?.vacancy?.createdAt[4]} ${item?.vacancy?.createdAt[2]}-${item?.vacancy?.createdAt[1]}-${item?.vacancy?.createdAt[0]}`}</div>
                                        </div>
                                        <div className='flex '>
                                            <div className='mr-2'>Segment:  </div>
                                            <div className='text-blue-800'>{item?.vacancy?.locationType} </div>
                                        </div>

                                    </div>
                                </div>
                            </>
                                : <>
                                    <div className='border border-gray-400 pb-2 mt-5 bg-gray-50'>
                                        <div className='flex mt-2 px-5'>
                                            <div className='text-blue-800 font-bold'> {item?.project?.projectName}</div>
                                        </div>
                                        <div className='grid grid-cols-3 gap-3 px-10 mt-3 '>
                                            <div className='flex '>
                                                <div className='mr-5'>Start time:  </div>
                                                <div className='text-blue-800 '>{convertDateFormat(item?.project?.startDate)} </div>
                                            </div>
                                            <div className='flex '>
                                                <div className='mr-2'>Duration:  </div>
                                                <div className='text-blue-800 '>{item?.project?.duration} {item?.project?.period}</div>
                                            </div>
                                            <div className='flex '>
                                                <div className='mr-10'>Max participants:  </div>
                                                <div className='text-blue-800'>{item?.project?.maxParticipants} participant(s)</div>
                                            </div>
                                            <div className='flex '>
                                                <div className='mr-2'>Create time:  </div>
                                                <div className='text-blue-800'>{`${item?.project?.createdAt[3]}:${item?.project?.createdAt[4]} ${item?.project?.createdAt[2]}-${item?.project?.createdAt[1]}-${item?.project?.createdAt[0]}`}</div>
                                            </div>
                                            <div className='flex '>
                                                <div className='mr-4'>Budget:  </div>
                                                <div className='text-blue-800'>{item?.project?.budget} $ </div>
                                            </div>
                                            <div className='flex '>
                                                <div className='mr-2'>Number of vacancies:  </div>
                                                <div className='text-blue-800'>{item?.project?.vacancies?.length} vacancies</div>
                                            </div>
                                        </div>
                                        <div className='px-10'>
                                            <div className='text-blue-800 font-bold mt-3 '>Vacancies List: </div>
                                            <div >
                                                {
                                                    item?.project?.vacancies?.map((i, index) => {
                                                        return <>
                                                            <div key={index}>
                                                                <div className='flex px-5 mt-3'>
                                                                    <div className='text-green-800 font-bold'>- {i?.vacancyName}</div>
                                                                </div>
                                                                <div className='grid grid-cols-3 gap-2 px-10 mt-2 '>
                                                                    <div className='flex '>
                                                                        <div className='mr-2'>Duration:  </div>
                                                                        <div className='text-green-800 ml-5'>{i?.hiringTimeline}</div>
                                                                    </div>
                                                                    <div className='flex '>
                                                                        <div className='mr-2'>Location:  </div>
                                                                        <div className='text-green-800'>{i?.location === '' ? 'At home' : i?.location} </div>
                                                                    </div>
                                                                    <div className='flex '>
                                                                        <div className='mr-2'>Max required:  </div>
                                                                        <div className='text-green-800'>{i?.maxRequired} candidate(s)</div>
                                                                    </div>
                                                                    <div className='flex '>
                                                                        <div className='mr-2'>Create time:  </div>
                                                                        <div className='text-green-800'>{`${i?.createdAt[3]}:${i?.createdAt[4]} ${i?.createdAt[2]}-${i?.createdAt[1]}-${i?.createdAt[0]}`}</div>
                                                                    </div>
                                                                    <div className='flex '>
                                                                        <div className='mr-2'>Segment:  </div>
                                                                        <div className='text-green-800'>{i?.locationType} </div>
                                                                    </div>
                                                                    <div className='flex '>
                                                                        <div className='mr-2'>Item payment:  </div>
                                                                        <div className='text-green-800'>{i?.paymentAmount} $</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    })
                                                }
                                            </div>

                                        </div>
                                    </div>

                                </>}
                        </div>
                    </td>
                </tr>
            }
        </React.Fragment>
    )
}
