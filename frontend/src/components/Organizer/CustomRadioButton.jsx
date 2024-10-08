import {React, useEffect, useState} from 'react';
import { RadioGroup } from "@headlessui/react";
import { BsCheck } from 'react-icons/bs';
import { AiFillExclamationCircle } from 'react-icons/ai';

export default function CustomRadioButton({label, listItem, filterValueChecked, error, type, rules, name, selectedItem}){
    const [selected, setSelected] = useState(selectedItem ? selectedItem : {id: -1, name: '', value: false})
    useEffect(()=>{
        filterValueChecked(selected)
    
      },[selected])

      useEffect(()=>{
        if(selectedItem) setSelected(selectedItem)
    
      },[selectedItem])
    return (
        <>
            <p className='block leading-6 text-gray-900 text-base font-semibold' style={{color: `${error ? "#a9252b": ""}`}}>{label}</p>
            <div name={name} type={type} rules={rules} value={selected?.value} className='relative cursor-default'>
                <ul className='mt-2 z-10 rounded-md'>
                    {
                        listItem.map((item, index) => {
                            return (
                                <li key={index} value={index} onClick={() => {setSelected(item);}} className='flex items-center justify-between py-0 px-5 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90'>
                                    <div className="flex flex-row items-center cursor-pointer">
                                        <div>
                                            <div className="relative h-7 flex items-center">
                                                <div className="absolute bg-[#FFF] border border-[#808082] w-[18px] h-[18px] rounded-[10px]" style={{borderColor: `${error ? "#a9252b" : "#808082"}`}} color="#FFF"></div>
                                                <div className={`${selected?.id === item.id ? "": "hidden"} flex items-center justify-center absolute bg-[#1967d2] w-[18px] h-[18px] rounded-[10px]`} color="#FFF"><BsCheck color="#FFF"/></div>
                                            </div>
                                        </div>
                                        <span className="pl-7 text-base select-none text-[#696969]">{item.name}</span>
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