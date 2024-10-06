import { Fragment, useEffect, useState, useRef } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { AiFillExclamationCircle } from 'react-icons/ai'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CBB({label, listItem, filterValueSelected, error, name, type, onblur, rules, placeHolder, selectItem, styleOuter}) {
  const [selected, setSelected] = useState(selectItem ? selectItem : {id: -1, name: ''})
  const [visible, setVisible] = useState("none")
  const [outline, setOutline] = useState(false)
  
  function toggleStateDropdown(){
    visible === "none" ? setVisible("block") : setVisible("none")
    setOutline(!outline)
  }
  useEffect(()=>{
    filterValueSelected(selected)
    console.log(["Selected"], selected)

  },[selected])

  const dropDownTag = useRef();
  
  return (
    <>
        <p className='block leading-9 mb-1 text-gray-900 text-base font-semibold' style={{color: `${error ? "#a9252b": ""}`}}>{label}</p>
        <div onBlur={onblur} tabIndex={0}>
            <div name={name} type={type} rules={rules} value={selected?.id} onClick={toggleStateDropdown} onBlur={() => {setVisible('none'); setOutline(false);}} tabIndex={-1} className='relative cursor-default'>
                <div className='relative z-[40] w-full cursor-default rounded-md bg-[#f9fbfc] py-3 px-5 text-left text-gray-900 shadow-sm border border-gray-300 focus:bg-white sm:text-base sm:leading-6' style={{borderColor: `${error ? "#a9252b" : outline ? "#2D2D2D" : "rgb(209 213 219)"}`, backgroundColor: `${outline ? 'white': '#f9fbfc'}`}}>
                    <span>{selected?.name}</span>
                    {
                        selected?.id === -1 ?
                        <span>{placeHolder}</span>
                        : null
                    }
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </div>
                <ul ref={dropDownTag} style={{display: `${visible}` }} className='absolute mt-2 z-[50] w-full overflow-y-auto max-h-56 ring-1 ring-black ring-opacity-5 rounded-md'>
                    {
                        listItem?.map((item, index) => {
                            return (
                                <li key={index} value={index} onClick={() => {setSelected(item);}} className='flex flex-row items-center justify-between bg-white py-3 px-5 shadow-lg focus:outline-none text-base hover:bg-[#f3f9ff] text-[#636363]'>
                                    {
                                        item.id === selected?.id ? <>
                                            <div>
                                                <span className='font-bold'>{item.name}</span>
                                                <p className='!text-[#636363] !font-normal'>{item.des}</p>
                                            </div>
                                            <CheckIcon className="h-5 w-5" aria-hidden="true"/></>
                                        : 
                                            <div>
                                                <span>{item.name}</span>
                                                <p className='!text-[#636363] !font-normal'>{item.des}</p>
                                            </div> 
                                    }
                                </li>
                            )                        
                        })
                    }
                </ul>
            </div>
        </div>
        {error && <span className='flex flex-row items-center text-sm text-[#a9252b] mt-2'><AiFillExclamationCircle className="mr-1"/>{error}</span>}
    </>
    
  )
}
