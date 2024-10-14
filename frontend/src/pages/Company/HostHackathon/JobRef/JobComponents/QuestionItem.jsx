import { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import CustomComboBox from "../../../../../components/Organizer/CustomComboBox";
function QuestionItem({props, onClose, handleChangeText, filterComboBox, filterRadio, filterSelect, handleRequired}) {
    let [question, setQuestion] = useState(props);
    let [selected, setSelected] = useState([]);

    useEffect(() => {
        if(props.selectedItem) setSelected(props.selectedItem);
    }, [props.selectedItem])

    useEffect(() => {
        if(props) setQuestion(props);
    }, [props])

    // Select Box

    const setSelectedValue = (item) => {
        const list = [...selected.filter((i) => i.id !== item.id)]
        if(selected.length === list.length) 
            list.push(props.selectList.find((i) => i.id === item.id))
        setSelected(list)
        filterSelect(list)
    }

    const setRequireValue = (item) => {
        const k = selected.map((i) => i.id === item.id ? {...i, required: !i.required} : {...i})
        setSelected(k)
        filterSelect(k)
    }
    switch (question.type) {
        case 'info':
            // {
            //     type: 'info',
            //     boxType: 'Application question',
            //     question: 'Please list 2-3 dates and time ranges that you could do an interview.',
            //     answerRequire: 'Ask applicants to list some dates and times they could do an interview',
            //     required: true,
            //     dealBreakerBox: true,
            // }
            return ( 
                <>
                    <div className="flex flex-col border border-gray-400 rounded-lg overflow-hidden my-6">
                        <div className="flex flex-row items-center justify-between p-3 bg-[#F3F2F1]">
                            <div className="flex flex-row items-top mr-3">
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap">
                                    {question.boxType}
                                </div>
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap mr-1">
                                    : 
                                </div>
                                <div>
                                    {question.question}
                                </div>
                            </div>
                            <div className="h-full self-start mt-[2px] cursor-pointer" onClick={onClose}>
                                <IoMdClose size={22}/>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between p-3 ">
                            <div className="text-base font-semibold text-[#595959]">
                                {question.answerRequire}
                            </div>
                            {
                                question.dealBreakerBox ? (
                                    <div className="flex flex-row items-center">
                                        <div className='flex items-center justify-between bg-white py-1 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90'>
                                            <div onClick={() => {setQuestion({...question, required: !question.required}); handleRequired()}} style={{borderColor: `${question.required ? '#2557a7' : 'gray'}`}} className="flex flex-row items-center cursor-pointer w-full rounded-md group border p-2">
                                                <div>
                                                    <div className="relative h-7 flex items-center">
                                                        <div className="absolute bg-[#FFF] border border-[#808082] w-[24px] h-[24px] rounded-[5px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                                        <div style={{visibility: question.required ? 'visible' : 'hidden' }} className={`flex items-center justify-center absolute bg-[#2557a7] w-[24px] h-[24px] rounded-[5px]`} color="#FFF"><BsCheck color="#FFF" size={'21px'}/></div>
                                                    </div>
                                                </div>
                                                <span className="pl-9 text-base mb-[1px] select-none text-[#696969] whitespace-nowrap font-semibold" style={{color: `${question.required ? '#2557a7' : 'gray'}`}}>Deal breaker</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : null
                            }
                            
                        </div>
                    </div>
                </>
            );
        case 'text':
            // {
            //     type: 'text',
            //     boxType: 'Application question',
            //     question: 'Do you speak ... ?',
            //     preAnswer: 'Speaks',
            //     required: true,
            //     dealBreakerBox: true,
            // }
            return ( 
                <>
                    <div className="flex flex-col border border-gray-400 rounded-lg overflow-hidden my-6">
                        <div className="flex flex-row items-center justify-between p-3 bg-[#F3F2F1]">
                            <div className="flex flex-row items-top mr-3">
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap">
                                    {question.boxType}
                                </div>
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap mr-1">
                                    : 
                                </div>
                                <div>
                                    {question.question.replace("...", "_________")}
                                </div>
                            </div>
                            <div className="h-full self-start mt-[2px] cursor-pointer" onClick={onClose}>
                                <IoMdClose size={22}/>
                            </div>
                        </div>
                        <div className="flex-nowrap flex box-border items-center justify-between p-3">
                            <div className="flex flex-grow items-center w-auto">
                                <div className="text-base font-semibold text-[#595959] mr-2">
                                    {question.preAnswer}
                                </div>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        value={props?.value}
                                        onChange={handleChangeText}
                                        rules="requiredText|email"
                                        className={`w-full block bg-[#fdfeff] focus:bg-white outline-none hover:border-[#3f73d3] focus:border-[#3f73d3] text-base shadow-sm rounded-md py-1.5 pl-2 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                                    />                                                        
                                </div>
                                {/* {index !== 0 ? <div className="bg-white hover:bg-[#e8f0fe] rounded-md h-full p-3 cursor-pointer" onClick={() => setAddEmail("delete", index)}><AiOutlineClose className="px-1 w-7 h-7" /></div> : null} */}
                            </div>
                            {
                                question.dealBreakerBox ? (
                                    <div className="flex flex-row items-center ml-3">
                                        <div className='flex items-center justify-between bg-white py-1 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90'>
                                            <div onClick={() => {setQuestion({...question, required: !question.required});handleRequired()}} style={{borderColor: `${question.required ? '#2557a7' : 'gray'}`}} className="flex flex-row items-center cursor-pointer w-full rounded-md group border p-2">
                                                <div>
                                                    <div className="relative h-7 flex items-center">
                                                        <div className="absolute bg-[#FFF] border border-[#808082] w-[24px] h-[24px] rounded-[5px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                                        <div style={{visibility: question.required ? 'visible' : 'hidden' }} className={`flex items-center justify-center absolute bg-[#2557a7] w-[24px] h-[24px] rounded-[5px]`} color="#FFF"><BsCheck color="#FFF" size={'21px'}/></div>
                                                    </div>
                                                </div>
                                                <span className="pl-9 text-base mb-[1px] select-none text-[#696969] whitespace-nowrap font-semibold" style={{color: `${question.required ? '#2557a7' : 'gray'}`}}>Deal breaker</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : null
                            }
                            
                        </div>
                    </div>
                </>
            );
        case 'select':
            // {
            //     type: 'select',
            //     boxType: 'Application question',
            //     question: 'Which shift(s) are you available to work?',
            //     preAnswer: 'Available to work the following shift(s):',
            //     selectList: [{id: 1, name: 'Day Shift', required: 'false', dealBreakerBox: 'true'}, {id: 2, name: 'Night Shift', required: 'false', dealBreakerBox: 'true'}, {id: 3, name: 'Overnight Shift', required: 'false', dealBreakerBox: 'true'}],
            //     selectedItem: [{id: 1, name: 'Day Shift'}],
            // }
            return ( 
                <>
                <div className="flex flex-col border border-gray-400 rounded-lg overflow-hidden my-6">
                        <div className="flex flex-row items-center justify-between p-3 bg-[#F3F2F1]">
                            <div className="flex flex-row items-top mr-3">
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap">
                                    {question.boxType}
                                </div>
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap mr-1">
                                    : 
                                </div>
                                <div>
                                    {question.question}
                                </div>
                            </div>
                            <div className="h-full self-start mt-[2px] cursor-pointer" onClick={onClose}>
                                <IoMdClose size={22}/>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between p-3 ">
                            <div className="text-base font-semibold text-[#595959]">
                                {question.preAnswer.replace("...", "_________")}
                            </div>
                        </div>
                        <ul className='mt-2 z-10 rounded-md px-5 pb-5'>
                            {
                                question.selectList.map((item, index) => {
                                    return (
                                        <div key={index} className="flex items-center justify-between">
                                            <li value={index} onClick={() => setSelectedValue(item)} className='flex flex-grow mr-2 items-center justify-between bg-white py-1 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90'>
                                                <div className="flex flex-row items-center cursor-pointer border w-full p-2 rounded-md hover:border-[#3f73d3] group">
                                                    <div className='ml-1'>
                                                        <div className="relative h-7 flex items-center">
                                                            <div className="absolute bg-[#FFF] border border-[#808082] w-[24px] h-[24px] rounded-[5px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                                            <div style={{visibility: `${selected.find((i) => i.id === item.id) ? 'visible' : 'hidden' }`}} className={`flex items-center justify-center absolute bg-[#2557a7] w-[24px] h-[24px] rounded-[5px]`} color="#FFF"><BsCheck color="#FFF" size={'21px'}/></div>
                                                        </div>
                                                    </div>
                                                    <span className="pl-9 text-[17px] select-none text-[#696969]">{item.name}</span>
                                                </div>
                                            </li>
                                            {
                                                item.dealBreakerBox ? (
                                                    <div className="flex flex-row items-center" style={selected.find((i) => i.id === item.id) ? {opacity: 1} : {pointerEvents: 'none', userSelect: 'none', opacity: 0.4}} >
                                                        <div className='flex items-center justify-between bg-white py-1 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90'>
                                                            <div onClick={() => {setRequireValue(item)}} style={{borderColor: `${item.required ? '#2557a7' : 'gray'}`}} className="flex flex-row items-center cursor-pointer w-full rounded-md group border p-2">
                                                                <div>
                                                                    <div className="relative h-7 flex items-center">
                                                                        <div className="absolute bg-[#FFF] border border-[#808082] w-[24px] h-[24px] rounded-[5px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                                                        <div style={{visibility: selected.find((i) => i.id === item.id)?.required ? 'visible' : 'hidden' }} className={`flex items-center justify-center absolute bg-[#2557a7] w-[24px] h-[24px] rounded-[5px]`} color="#FFF"><BsCheck color="#FFF" size={'21px'}/></div>
                                                                    </div>
                                                                </div>
                                                                <span className="pl-9 text-base mb-[1px] select-none text-[#696969] whitespace-nowrap font-semibold" style={{color: `${item.required ? '#2557a7' : 'gray'}`}}>Deal breaker</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : null
                                            }
                                        </div>
                                    )                        
                                })
                            }
                        </ul>
                    </div>
                </>
            );
        case 'radio':
            // {
            //     type: 'radio',
            //     boxType: 'Application question',
            //     question: 'What percentage of the time are you willing to travel for work?',
            //     preAnswer: 'Willing to travel up to ... of the time',
            //     selectList: [{id: 1, name: '25%'}, {id: 2, name: '50%'}, {id: 3, name: '75%'}, {id: 4, name: '100%'}]4
            //     selectedItem: [{id: 1, name: '25%'}]
            //     required: true,
            //     dealBreakerBox: true,
            // }
            return ( 
                <>
                    <div className="flex flex-col border border-gray-400 rounded-lg overflow-hidden my-6">
                        <div className="flex flex-row items-center justify-between p-3 bg-[#F3F2F1]">
                            <div className="flex flex-row items-top mr-3">
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap">
                                    {question.boxType}
                                </div>
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap mr-1">
                                    : 
                                </div>
                                <div>
                                    {question.question}
                                </div>
                            </div>
                            <div className="h-full self-start mt-[2px] cursor-pointer" onClick={onClose}>
                                <IoMdClose size={22}/>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between p-3 ">
                            <div className="text-base font-semibold text-[#595959]">
                                {question.preAnswer.replace("...", "_________")}
                            </div>
                            {
                                question.dealBreakerBox ? (
                                    <div className="flex flex-row items-center">
                                        <div className='flex items-center justify-between bg-white py-1 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90'>
                                            <div onClick={() => {setQuestion({...question, required: !question.required}); handleRequired()}} style={{borderColor: `${question.required ? '#2557a7' : 'gray'}`}} className="flex flex-row items-center cursor-pointer w-full rounded-md group border p-2">
                                                <div>
                                                    <div className="relative h-7 flex items-center">
                                                        <div className="absolute bg-[#FFF] border border-[#808082] w-[24px] h-[24px] rounded-[5px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                                        <div style={{visibility: question.required ? 'visible' : 'hidden' }} className={`flex items-center justify-center absolute bg-[#2557a7] w-[24px] h-[24px] rounded-[5px]`} color="#FFF"><BsCheck color="#FFF" size={'21px'}/></div>
                                                    </div>
                                                </div>
                                                <span className="pl-9 text-base mb-[1px] select-none text-[#696969] whitespace-nowrap font-semibold" style={{color: `${question.required ? '#2557a7' : 'gray'}`}}>Deal breaker</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                        <ul className='rounded-md px-5 flex flex-col gap-2 pb-5'>
                            {
                                question.selectList.map((item, index) => {
                                    return (
                                        <li key={index} value={index} onClick={() => {setSelected([item]); filterRadio(item)}} className='flex cursor-pointer items-center justify-between bg-white py-1 px-5 focus:outline-none text-base text-gray-900 hover:font-normal border hover:opacity-90 rounded-md hover:border-[#3f73d3] group'>
                                            <div className="flex flex-row items-center cursor-pointer mt-1">
                                                <div>
                                                    <div className="relative h-7 flex items-center justify-center">
                                                        <div className="absolute bg-[#FFF] border border-[#808082] w-[20px] h-[20px] rounded-[10px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                                        <div className={`${selected[0]?.id === item.id ? "": "hidden"} flex items-center justify-center absolute bg-[#2557a7] w-[12px] h-[12px] rounded-[10px]`} color="#FFF"></div>
                                                    </div>
                                                </div>
                                                <span className="pl-5 text-base select-none text-[#696969]">{item.name}</span>
                                            </div>
                                        </li>
                                    )                        
                                })
                            }
                        </ul>
                    </div>
                </>
            );
        case 'select-text':
            // {
            //     type: 'select-text',
            //     boxType: 'Application question',
            //     question: 'How many years of ... experience do you have?',
            //     preAnswer: 'At least',
            //     selectList: [{id: 1, name: '1 year'}, {id: 2, name: '2 years'}, {id: 3, name: '3 years'}, {id: 4, name: '4 years'}, {id: 5, name: '5 years'}, {id: 6, name: '6 years'}, {id: 7, name: '7 years'}, {id: 8, name: '8 years'}, {id: 9, name: '9 years'}, {id: 10, name: '10 years'}],
            //     textIndent: '|of|experience',
            //     required: true,
            //     dealBreakerBox: true,
            // }
            return ( 
                <>
                    <div className="flex flex-col border border-gray-400 rounded-lg my-6">
                        <div className="flex flex-row items-center justify-between p-3 rounded-lg bg-[#F3F2F1]">
                            <div className="flex flex-row items-top mr-3">
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap">
                                    {question.boxType}
                                </div>
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap mr-1">
                                    : 
                                </div>
                                <div>
                                    {question.question.replace("...", "_________")}
                                </div>
                            </div>
                            <div className="h-full self-start mt-[2px] cursor-pointer" onClick={onClose}>
                                <IoMdClose size={22}/>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between px-3 pt-3 pb-1">
                            <div className="text-base font-semibold text-[#595959]">
                                {question.preAnswer}
                            </div>
                        </div>
                        <div className="flex-nowrap flex box-border items-center justify-between px-3 pb-3">
                            <div className="flex flex-grow items-center w-auto">
                                <div className="w-full flex flex-nowrap items-center" >
                                    <div className="w-9!" style={{width: '120px'}}>
                                        <CustomComboBox filterValueSelected={filterComboBox} listItem={question.selectList} selectedItem={question.selectList.find(item=>item.id===question.selectedItem[0].id)} placeHolder={"1 year"}/>
                                    </div>
                                    <div className="text-base font-semibold text-[#595959] ml-2 mr-2">
                                        {question.textIndent.split('|')[1]}
                                    </div>
                                    <input
                                        type="text"
                                        value={props?.value}
                                        onChange={handleChangeText}
                                        rules="requiredText|email"
                                        className={`block bg-[#f9fbfc] focus:bg-white outline-none hover:border-[#3f73d3] focus:border-[#3f73d3] text-base shadow-sm rounded-md py-2 pl-2 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                                    />   
                                    <div className="text-base font-semibold text-[#595959] ml-2">
                                        {question.textIndent.split('|')[2]}
                                    </div>                                                     
                                </div>
                                {/* {index !== 0 ? <div className="bg-white hover:bg-[#e8f0fe] rounded-md h-full p-3 cursor-pointer" onClick={() => setAddEmail("delete", index)}><AiOutlineClose className="px-1 w-7 h-7" /></div> : null} */}
                            </div>
                            {
                                question.dealBreakerBox ? (
                                    <div className="flex flex-row items-center ml-3">
                                        <div className='flex items-center justify-between bg-white py-1 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90'>
                                            <div onClick={() => {setQuestion({...question, required: !question.required}); handleRequired()}} style={{borderColor: `${question.required ? '#2557a7' : 'gray'}`}} className="flex flex-row items-center cursor-pointer w-full rounded-md group border p-2">
                                                <div>
                                                    <div className="relative h-7 flex items-center">
                                                        <div className="absolute bg-[#FFF] border border-[#808082] w-[24px] h-[24px] rounded-[5px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                                        <div style={{visibility: question.required ? 'visible' : 'hidden' }} className={`flex items-center justify-center absolute bg-[#2557a7] w-[24px] h-[24px] rounded-[5px]`} color="#FFF"><BsCheck color="#FFF" size={'21px'}/></div>
                                                    </div>
                                                </div>
                                                <span className="pl-9 text-base mb-[1px] select-none text-[#696969] whitespace-nowrap font-semibold" style={{color: `${question.required ? '#2557a7' : 'gray'}`}}>Deal breaker</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : null
                            }
                            
                        </div>
                    </div>
                </>
            );
        case 'long-text':
            // type: 'long-text',
            // boxType: 'Application question',
            // question: 'This is an employer-written question. You can report inappropriate questions to Indeed through the "Report Job" link at the bottom of the job description. " ... "',
            // preAnswer: 'Write your own question to ask applicants. Do not ask questions that are discriminatory, illegal, or otherwise violate the Indeed site rules.',
            // maxCharacters: 900,
            // required: false,
            // dealBreakerBox: true,
            return (
                <>
                    <div className="flex flex-col border border-gray-400 rounded-lg overflow-hidden my-6">
                        <div className="flex flex-row items-center justify-between p-3 bg-[#F3F2F1]">
                            <div className="flex flex-row items-top mr-3">
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap">
                                    {question.boxType}
                                </div>
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap mr-1">
                                    : 
                                </div>
                                <div>
                                    {question.question.replace("...", "_________")}
                                </div>
                            </div>
                            <div className="h-full self-start mt-[2px] cursor-pointer" onClick={onClose}>
                                <IoMdClose size={22}/>
                            </div>
                        </div>
                        <div className="flex-nowrap flex box-border items-center justify-between p-3">
                            <div className="flex flex-col items-center w-auto">
                                <div className="text-base font-semibold text-[#595959] mr-2 mb-2">
                                    {question.preAnswer}
                                </div>
                                <div className="w-full">
                                    <textarea
                                        type="text"
                                        value={props?.value}
                                        onChange={handleChangeText}
                                        style={{lineHeight: 1.5}}
                                        className={`w-full block bg-[#fdfeff] focus:bg-white outline-none hover:border-[#3f73d3] focus:border-[#3f73d3] text-base shadow-sm rounded-md py-1.5 pl-2 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                                    />                                                        
                                </div>
                                {/* {index !== 0 ? <div className="bg-white hover:bg-[#e8f0fe] rounded-md h-full p-3 cursor-pointer" onClick={() => setAddEmail("delete", index)}><AiOutlineClose className="px-1 w-7 h-7" /></div> : null} */}
                            </div>
                        </div>
                        <div className="flex flex-row mx-3 mb-2">
                            <div className="text-[14px] font-semibold text-[#595959] mr-1">
                                Characters remaining: 
                            </div>
                            <div className="text-[14px] font-semibold text-[#595959]">
                                {question.maxCharacters}
                            </div>
                        </div>
                    </div>
                </>
            );
        default:
            return (
                <>
                </>
            );
    }
}

export default QuestionItem;