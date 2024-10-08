import { React, useEffect, useState } from 'react';
import { RadioGroup } from "@headlessui/react";
import { BsCheck } from 'react-icons/bs';
import { AiFillExclamationCircle } from 'react-icons/ai';

export default function CustomRadioBtnRecommendsx({ label, listItem, filterValueChecked, error, type, rules, name, selectedItem }) {
    const [selected, setSelected] = useState(selectedItem ? selectedItem : { recommendId: -1, recommendName: '', duration: '', fields: [], recommendType: '' })
    useEffect(() => {
        filterValueChecked(selected)

    }, [selected])

    useEffect(() => {
        if (selectedItem) setSelected(selectedItem)

    }, [selectedItem])
    return (
        <>
            <p className='block leading-8 text-gray-900 text-base font-semibold' style={{ color: `${error ? "#a9252b" : ""}` }}>{label}</p>
            <div name={name} type={type} rules={rules} value={selected?.value} className='relative cursor-default'>
                <ul className='mt-2 z-10 rounded-md'>
                    {
                        listItem.map((item, index) => {
                            return (
                                <li key={index} value={index} onClick={() => { setSelected(item); }} className='flex items-center justify-between py-1 px-5 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90'>
                                    <div className={`flex flex-row items-center w-[100%] cursor-pointer mt-1 border-2 ${selected?.recommendId === item.recommendId ? "border-blue-700" : "border-gray-300"}`}>
                                        <div className='mr-3 ml-5'>
                                            <div className="relative h-7 flex items-center">
                                                <div className="absolute bg-[#FFF] border border-[#808082] w-[18px] h-[18px] rounded-[10px]" style={{ borderColor: `${error ? "#a9252b" : "#808082"}` }} color="#FFF"></div>
                                                <div className={`${selected?.recommendId === item?.recommendId ? "" : "hidden"} flex items-center justify-center absolute bg-[#1967d2] w-[18px] h-[18px] rounded-[10px]`} color="#FFF"><BsCheck color="#FFF" /></div>
                                            </div>
                                        </div>
                                        <div className=' mb-3 ml-8 mt-3'>
                                            <div className='flex mr-10 '>

                                                <div className='font-bold'>{item?.recommendType === 'vacancy' ? 'Vacancy: ' : 'Project: '}</div>
                                                <span className="ml-2 text-base select-none font-medium ">{item?.recommendName}</span>
                                            </div>
                                            <div className='flex mt-2 text-sm'>
                                                <div className='flex mr-20 '>
                                                    <div className='mr-1.5'>Type: </div>
                                                    <div>{item?.recommendType}</div>
                                                </div>
                                                <div className='flex mr-10 '>
                                                    <div className='mr-1.5'>Duration: </div>
                                                    <div>{item?.duration}</div>
                                                </div>

                                            </div>
                                            <div className='flex  items-start mt-3 text-sm'>
                                                <div className='mr-1.5'>Requirement: </div>
                                                <div className="flex flex-wrap line-clamp-2  w-full items-start overflow-y-auto h-[30px] text-ellipsis">
                                                    {
                                                        (item?.fields ?? ['Not information']).map((i, index) => {
                                                            return <div key={index} className="mr-2 whitespace-nowrap bg-blue-300 px-2 rounded-md">{i} </div>
                                                        })
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}