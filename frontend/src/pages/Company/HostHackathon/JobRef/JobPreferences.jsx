import { AiFillExclamationCircle, AiOutlineClose} from "react-icons/ai";
import { JobRefImage } from "../../../../assets/images";
import { useEffect, useState } from "react";
import { CustomComboBox, TextInput } from "../../../../components";
import { IoMdAdd } from "react-icons/io";
import { BsCheck } from "react-icons/bs";
import { FormErrors, Validate } from './validator'
import { useDispatch, useSelector } from "react-redux";
import { getVacancyComponent, resetComponent, setValueSuccess, updateVacancyComponent } from "../../../../redux/slices/vacancies/vacanciesSlices";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
function JobReferences({formId, formSubmit, flag, config, content, onDoneSubmit}) {
    const dispatch = useDispatch();
    const {currentJobComponent, vacancyId, isSuccess} = useSelector(store => store.vacancies)
    const resumeRequestType = [{ id: 0, name: "Yes, require a CV", value: true}, { id: 1, name: "No, don't ask for a CV", value: false}]
    const hiringTimeline = [{ id: 0, name: "1 to 3 days"}, { id: 1, name: "3 to 7 days"}, { id: 2, name: "1 to 2 weeks"}, { id: 3, name: "2 to 4 weeks"}, { id: 4, name: "More than 4 weeks"},]
    let [errors, setErrors] = useState  ({})
    let [inputsValues, setInputValues] = useState({
            emails: [
                ""
            ],
            emailApply: true,
            emailContact: true,
            resume: {id: -1, name: ''},
            hiringTimeline: {id: -1, name: ''},
        }
    )

    var [ErrorMessages, setErrorMessages] = useState({
        emails_0: "Please enter your email address.",
        resume: "Select the best option to ask candidates about resume.",
        hiringTimeline: "Select the best option to describe hiring timeline.",
    })

    function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = FormErrors(e.target, ErrorMessages)

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){

            for(let i = 0; i < inputsValues?.emails?.length; i++){
                for(let j = i+1; j < inputsValues?.emails?.length; j++){
                    if(inputsValues?.emails[i]?.trim() === inputsValues?.emails[j]?.trim()){
                        notify("warning", "Coincide emails receiver");
                        window.scrollTo({top: 380, behavior: 'smooth'});
                        return false;
                    }
                }
            }
           dispatch(updateVacancyComponent({"id":vacancyId, "value": {"jobRef": inputsValues, "flag" : flag}}))
        }
    }

    useEffect(() => {
        if(vacancyId) dispatch(getVacancyComponent({"id":vacancyId, "flag": flag}))
     }, [vacancyId]);

    useEffect(() => {
        if(isSuccess){
            dispatch(setValueSuccess(false))
            if(config){
                onDoneSubmit()
            }
            else{
                dispatch(resetComponent())
                formSubmit()
            }
        }
    }, [isSuccess])

    useEffect(() => {
        if(currentJobComponent){
            const a = {...currentJobComponent}
            a.emails = currentJobComponent?.emails?.map(i => i)
            setInputValues(a)

        }
    }, [currentJobComponent]);
    const notify = (type, message) => toast(message, { type: type });

    const handleChange = (e, index) => {
        const Element = e.target;
        const validationErrors = Validate(Element, ErrorMessages)
        const name = Element.getAttribute('name');
        var {value} = Element
        value = value || value === "" ? value : Element.getAttribute('value')

        if(errors[name]) delete errors[name]
        setErrors({...errors, ...validationErrors})

        inputsValues.emails[index] = value
        setInputValues({
            ...inputsValues
        })
    }

    function blurElement(e){
        const validationErrors = Validate(e.target, ErrorMessages)
        const name = e.target.getAttribute('name');
        if(errors[name]) delete errors[name]
        setErrors({...errors, ...validationErrors})
    }

    function setAddEmail(type, index){
        if(type === "add"){
            const newArr = [...inputsValues.emails]
            newArr.push(""); 
            setInputValues({...inputsValues, emails: newArr})
            setErrorMessages({...ErrorMessages, [`emails_${newArr.length - 1}`]: "Please enter your email address."})
        }
        else{
            const newArr = [...inputsValues.emails]
            newArr.splice(index, 1); 
            setInputValues({...inputsValues, emails: newArr})
            delete ErrorMessages[`emails_${newArr.length}`]
            delete errors[`emails_${newArr.length}`]
            setErrorMessages({...ErrorMessages})
        }
    }

    const onSelectedChange = (e, name) => {
        setInputValues({
            ...inputsValues, [name] : e.id === -1 ? { id: -1, name: '', des: ''} : e
        })

        if(errors[name]) delete errors[name]
        setErrors({...errors})
    }

    const getFirstErrorEmail = () => {
        return Object.keys(errors).filter(item => item.includes("emails"))[0]
    }
    return (  
        <>
            {
                config ? null :
                    <div className="flex flex-row justify-between bg-[#faf9f8] rounded-xl -mx-8">
                        <div className="flex items-center m-8">
                            <span className="text-[#2D2D2D] text-[28px] font-bold">Set preferences</span>                        
                        </div>
                        <div className="col-span-3 flex mr-8">
                            <img src={JobRefImage} alt="" className="h-52 overflow-hidden"/>
                        </div>
                    </div>
            }
            <div className="p-8">
                <form id={formId} onSubmit={handleSubmit}>
                    <div>
                        <></>
                            {
                                config ? null :
                                <p className='block leading-8 text-gray-900 text-xl font-bold mb-6'>Communication preferences</p>
                            }
                            {(content?.includes("emails") || config === undefined) && 
                            <div>
                                <p className='block leading-8 text-gray-900 text-base font-semibold' style={{color: `${errors[getFirstErrorEmail()] ? "#a9252b": ""}`}}>Send daily updates to*</p>
                                {

                                    inputsValues ? inputsValues.emails?.map((item, index) => {
                                        return (
                                            <div key={index} className="flex flex-row items-center gap-1 w-full justify-between mt-2">
                                                <div className="w-full">
                                                    <input
                                                        type="text"
                                                        name={`emails_${index}`}
                                                        rules="requiredText|email"
                                                        onBlur={blurElement}
                                                        value={inputsValues.emails[index]}
                                                        onChange={(e) => handleChange(e, index)}
                                                        style={{borderColor: `${errors[`emails_${index}`] ? "#a9252b" : ''}`, outlineColor: `${errors[`emails_${index}`] ? "#a9252b" : ''}`}}
                                                        className={`w-full block bg-[#f9fbfc] focus:bg-white text-base shadow-sm rounded-md py-2.5 pl-5 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                                                    />                                                        
                                                </div>
                                                {index !== 0 ? <div className="bg-white hover:bg-[#e8f0fe] rounded-md h-full p-3 cursor-pointer" onClick={() => setAddEmail("delete", index)}><AiOutlineClose className="px-1 w-7 h-7" /></div> : null}
                                            </div>
                                        )
                                    }) : null
                                }
                                {getFirstErrorEmail() && <span className='flex flex-row items-center text-sm text-[#a9252b] mt-2'><AiFillExclamationCircle className="mr-1"/>{errors[getFirstErrorEmail()]}</span>}
                                <div className="flex">
                                    <div className="flex flex-row gap-1 items-center text-base font-semibold cursor-pointer text-[#2557a7] hover:text-[#203250] mt-5" onClick={() => setAddEmail("add")}>
                                        <IoMdAdd className="w-6 h-6"/>
                                        Add email
                                    </div>
                                </div>
                            </div>
                        }
                        {(content?.includes("emailApply") || config === undefined) && 
                        <div>
                            <p className='block leading-8 text-gray-900 text-base font-semibold'>Let we updates you about this vacancy</p>
                            <li onClick={() => {setInputValues({...inputsValues, emailApply: !inputsValues.emailApply})}} className='flex items-center justify-between bg-white py-1 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90'>
                                <div className={`flex flex-row items-center cursor-pointer ${!(content?.includes("emailApply") || config === undefined) && 'my-10'} w-full rounded-md group`}>
                                    <div className='ml-1'>
                                        <div className="relative h-7 flex items-center">
                                            <div className="absolute bg-[#FFF] border border-[#808082] w-[24px] h-[24px] rounded-[5px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                            <div style={{visibility: inputsValues.emailApply ? 'visible' : 'hidden' }} className={`flex items-center justify-center absolute bg-[#2557a7] w-[24px] h-[24px] rounded-[5px]`} color="#FFF"><BsCheck color="#FFF" size={'21px'}/></div>
                                        </div>
                                    </div>
                                    <span className="pl-9 text-[17px] select-none text-[#696969]">Plus, send an individual email update each time someone applies.</span>
                                </div>
                            </li>
                        </div>
                        }
                        {(content?.includes("emailContact") || config === undefined) && 
                        <div>
                            <p className='block leading-8 text-gray-900 text-base font-semibold'>Let potential candidates contact you about this vacancy</p>
                            <li onClick={() => {setInputValues({...inputsValues, emailContact: !inputsValues.emailContact})}} className='flex items-center justify-between bg-white py-1 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90 mt-1'>
                                <div className="flex flex-row items-center cursor-pointer w-full rounded-md group">
                                    <div className='ml-1'>
                                        <div className="relative h-7 flex items-center">
                                            <div className="absolute bg-[#FFF] border border-[#808082] w-[24px] h-[24px] rounded-[5px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                            <div style={{visibility: inputsValues.emailContact ? 'visible' : 'hidden' }} className={`flex items-center justify-center absolute bg-[#2557a7] w-[24px] h-[24px] rounded-[5px]`} color="#FFF"><BsCheck color="#FFF" size={'21px'}/></div>
                                        </div>
                                    </div>
                                    <span className="pl-9 text-[17px] select-none text-[#696969]">By email to the address provided</span>
                                </div>
                            </li>
                        </div>
                        }
                        {(content?.includes("resume") || config === undefined) && 
                        <div>
                            {config ? null :<hr className="block h-1 bg-[rgb(212, 210, 208)] my-6"/>}
                            <></>
                                {config ? null :<p className='block leading-8 text-gray-900 text-xl font-bold mb-6'>Application preferences</p>}
                                <CustomComboBox label="Ask potential candidates for a curriculum vitae (CV)?" selectItem={currentJobComponent?.resume} type="select" rules="requiredCbb" placeHolder="Select an option" name="resume" listItem={resumeRequestType} filterValueSelected={(e) => onSelectedChange(e, "resume")} error={errors.resume} onblur={blurElement}></CustomComboBox>
                            <></>
                        </div>
                        }   
                        {(content?.includes("hiringTimeline") || config === undefined) && 
                            <div>
                                {config ? null : <hr className="block h-1 bg-[rgb(212, 210, 208)] my-6"/>}
                                <></>
                                {config ? null : <p className='block leading-8 text-gray-900 text-xl font-bold mb-6'>Hire Settings</p>}
                                    <CustomComboBox label="Hiring timeline for this vacancy*" selectItem={currentJobComponent?.hiringTimeline} type="select" rules="requiredCbb" placeHolder="Select an option" name="hiringTimeline" listItem={hiringTimeline} filterValueSelected={(e) => onSelectedChange(e, "hiringTimeline")} error={errors.hiringTimeline} onblur={blurElement}></CustomComboBox>
                                <></>
                            </div>
                        }
                    </div>
                </form>
            </div>   
        </>
    );
}

export default JobReferences;