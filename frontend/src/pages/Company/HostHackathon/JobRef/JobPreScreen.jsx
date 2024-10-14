
import { useEffect, useState } from "react";
import { JobPreScreenImage } from "../../../../assets/images";
import QuestionItem from "./JobComponents/QuestionItem";
import { IoChevronDownOutline  } from "react-icons/io5";
import QuestionTag from "./JobComponents/QuestionTag";
import { getVacancyComponent, resetComponent, setValueSuccess, updateVacancyComponent } from "../../../../redux/slices/vacancies/vacanciesSlices";
import { useDispatch, useSelector } from "react-redux";
function JobPreScreen({formId, formSubmit, flag, config, content, onDoneSubmit}) {
    const dispatch = useDispatch();
    const {currentJobComponent, vacancyId, isSuccess, location} = useSelector(store => store.vacancies)
    const questionPatterns = [
        {
            tagId: 1,
            tagName: 'Ability to Commute',
            type: 'info',
            boxType: 'Application question',
            question: `Will you be able to reliably commute to ${location} for this vacancy?`,
            answerRequire: 'Applicant should be able to reliably commute.',
            dealBreakerBox: false,
            required: false,
            multi: false,
            answerType: 'binary',
        },
        {
            tagId: 2,
            tagName: 'Education',
            type: 'radio',
            boxType: 'Application question',
            question: 'What is the highest level of education you have completed?',
            preAnswer: 'Minimum education level:',
            selectList: [{id: 1, name: 'High school or equivalent'}, {id: 2, name: 'Associate'}, {id: 3, name: "Bachelor's"}, {id: 4, name: "Master's"}, {id: 5, name: "Doctorate"}],
            selectedItem: [{id: 1, name: 'High school or equivalent'}],
            required: false,
            dealBreakerBox: true,
            multi: false,
            answerType: 'radio',
            result: [{id: 1, name: 'High school or equivalent'}]
        },
        {
            tagId: 3,
            tagName: 'Ability to Relocate',
            type: 'radio',
            boxType: 'Application question',
            question: `Will you be able to relocate to be within reasonable commuting distance from ${location}?`,
            preAnswer: 'Applicant should be able to',
            selectList: [{id: 1, name: 'Relocate before starting work'}, {id: 2, name: 'Relocate with an employer provided relocation package'}],
            selectedItem: [{id: 1, name: 'Relocate before starting work'}],
            required: false,
            dealBreakerBox: true,
            multi: false,
            answerType: 'radio',
            result: [{id: 1, name: 'Relocate before starting work'}],
        },
        {
            tagId: 4,
            tagName: 'Experience',
            type: 'select-text',
            boxType: 'Application question',
            question: 'How many years of ... experience do you have?',
            value: '',
            preAnswer: 'At least',
            selectList: [{id: 1, name: '1 year'}, {id: 2, name: '2 years'}, {id: 3, name: '3 years'}, {id: 4, name: '4 years'}, {id: 5, name: '5 years'}, {id: 6, name: '6 years'}, {id: 7, name: '7 years'}, {id: 8, name: '8 years'}, {id: 9, name: '9 years'}, {id: 10, name: '10 years'}],
            textIndent: '|of|experience',
            selectedItem: [{id: 1, name: '1 year'}],
            required: false,
            dealBreakerBox: true,
            multi: true,
            answerType: 'select',
            result: [{id: 1, name: '1 year'}]
        },
        {
            tagId: 5,
            tagName: 'Interview availability',
            type: 'info',
            boxType: 'Application question',
            question: 'Please list 2-3 dates and time ranges that you could do an interview.',
            answerRequire: 'Ask applicants to list some dates and times they could do an interview',
            dealBreakerBox: true,
            required: false,
            multi: false,
            answerType: 'list-date',
        },
        {
            tagId: 6,
            tagName: 'Language',
            type: 'text',
            value: '',
            boxType: 'Application question',
            question: 'Do you speak ... ?',
            preAnswer: 'Speaks',
            required: false,
            dealBreakerBox: true,
            multi: true,
            answerType: 'binary',
        },
        {
            tagId: 7,
            tagName: 'License/Certification',
            type: 'text',
            value: '',
            boxType: 'Application question',
            question: 'Do you have a valid ... ?',
            preAnswer: 'Valid',
            required: false,
            dealBreakerBox: true,
            multi: true,
            answerType: 'binary',
        },
        {
            tagId: 8,
            tagName: 'Shift availability',
            type: 'select',
            boxType: 'Application question',
            question: 'Which shift(s) are you available to work?',
            preAnswer: 'Available to work the following shift(s):',
            selectList: [{id: 1, name: 'Day Shift', required: false, dealBreakerBox: true}, {id: 2, name: 'Night Shift', required: false, dealBreakerBox: true}, {id: 3, name: 'Overnight Shift', required: false, dealBreakerBox: true}],
            selectedItem: [{id: 1, name: 'Day Shift', required: false, dealBreakerBox: true}],
            multi: false,
            answerType: 'multi-select',
            result: [{id: 1, name: 'Day Shift', required: false, dealBreakerBox: true}]
        },
        {
            tagId: 10,
            tagName: 'Willingness to travel',
            type: 'radio',
            boxType: 'Application question',
            question: 'What percentage of the time are you willing to travel for work?',
            preAnswer: 'Willing to travel up to ... of the time',
            selectList: [{id: 1, name: '25%'}, {id: 2, name: '50%'}, {id: 3, name: '75%'}, {id: 4, name: '100%'}],
            selectedItem: [{id: 1, name: '25%'}],
            required: false,
            dealBreakerBox: true,
            multi: false,
            answerType: 'radio',
            result: [{id: 1, name: '25%'}]
        },
        {
            tagId: 11,
            tagName: 'Create custom question',
            type: 'long-text',
            boxType: 'Application question',
            question: 'This is an employer-written question. You can report inappropriate questions to Indeed through the "Report Job" link at the bottom of the vacancy description. " ... "',
            preAnswer: 'Write your own question to ask applicants. Do not ask questions that are discriminatory, illegal, or otherwise violate the Indeed site rules.',
            maxCharacters: 900,
            required: false,
            dealBreakerBox: true,
            multi: true,
            answerType: 'text',
            value: '',
        }
    ]

    let [questionForms, setQuestionForms] = useState([
        //questionPatterns[0], questionPatterns[2], questionPatterns[4]
    ]);

    let [errors, setErrors] = useState({})
    let [dropDownTags, setDropDownTags] = useState(false)

    let [ErrorMessages, setErrorMessages] = useState({
    })


    function handleSubmit(e) {
        e.preventDefault();
        dispatch(updateVacancyComponent({"id": vacancyId, "value": {"jobPreScreen": questionForms, "flag" : flag}}))
    }

    useEffect(() => {
        if(vacancyId) dispatch(getVacancyComponent({"id":vacancyId, "flag": flag}))
     }, [vacancyId]);

    useEffect(() => {
        if(currentJobComponent){
            if(Array.isArray(currentJobComponent))
                setQuestionForms([...currentJobComponent])
        }
    }, [currentJobComponent]);


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

    function blurElement(e){
    }

    function handleChange(e) {
    }

    //
    function setListQuestionForm(item){
        if(item.multi){
            const newArr = [...questionForms]
            newArr.push(item); 
                setQuestionForms(newArr)
        }
        else{
            if(!questionForms.find(i => i.tagId === item.tagId))
            {
                const newArr = [...questionForms]
                newArr.push(item); 
                setQuestionForms(newArr)
            }
        }
    }

    function removeQuestion(item, index){
        const newArr = [...questionForms]
        newArr.splice(index, 1); 
        setQuestionForms(newArr)
    }

    function handleChangeText (e,  item, index) {
        const newArr = [...questionForms]
        newArr.splice(index, 1, {...item, 'value': e.target.value})
        setQuestionForms([...newArr])
    }

    function filterComboBox(e, item, index){
        const newArr = [...questionForms]
        newArr.splice(index, 1, {...item, 'result': [{...e}], 'selectedItem': [{...e}]})

        setQuestionForms([...newArr])
    }

    function filterRadio(e, item, index){
        const newArr = [...questionForms]
        newArr.splice(index, 1, {...item, 'result': [{...e}], 'selectedItem': [{...e}]})

        setQuestionForms([...newArr])

    }

    function filterSelect(e, item, index){
        const newArr = [...questionForms]
        newArr.splice(index, 1, {...item, 'result': [...e], 'selectedItem': [...e]})

        setQuestionForms([...newArr])
    }

    function handleRequired(item, index){
        const newArr = [...questionForms]
        newArr.splice(index, 1, {...item, 'required': !item.required})

        setQuestionForms([...newArr])
    }
    
    return (  
        <>
            <div>
                <div className="flex flex-row justify-between bg-[#faf9f8] rounded-xl -mx-8">
                    <div className="flex items-center m-8">
                        <span className="text-[#2D2D2D] text-[28px] font-bold">Pre-screen applicants</span>                        
                    </div>
                    <div className="col-span-3 flex mr-8">
                        <img src={JobPreScreenImage} alt="" className="h-52 overflow-hidden"/>
                    </div>
                </div>
                <div className="p-8">
                    <div className="flex flex-row items-center border border-gray-400 rounded-lg p-3">
                        <div className="w-[150px] h-[120px] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-[150px] h-[110px]" viewBox="0 0 150 120" aria-hidden="true">
                                <style></style><defs><linearGradient id="spot-error-4_svg__spot-error-4__paint0_linear" x1="25.066" x2="36.341" y1="64.361" y2="67.969" gradientUnits="userSpaceOnUse"><stop stopColor="#9D2B6B"></stop><stop offset="1" stopColor="#E867A8"></stop></linearGradient><linearGradient id="spot-error-4_svg__spot-error-4__paint1_linear" x1="25.066" x2="36.341" y1="86.996" y2="90.604" gradientUnits="userSpaceOnUse"><stop stopColor="#9D2B6B"></stop><stop offset="1" stopColor="#E867A8"></stop></linearGradient><linearGradient id="spot-error-4_svg__spot-error-4__paint2_linear" x1="44.75" x2="58.248" y1="70.963" y2="75.489" gradientUnits="userSpaceOnUse"><stop stopColor="#9D2B6B"></stop><stop offset="0.767" stopColor="#E867A8"></stop></linearGradient><linearGradient id="spot-error-4_svg__spot-error-4__paint3_linear" x1="44.75" x2="58.248" y1="93.598" y2="98.124" gradientUnits="userSpaceOnUse"><stop stopColor="#9D2B6B"></stop><stop offset="0.767" stopColor="#E867A8"></stop></linearGradient><linearGradient id="spot-error-4_svg__spot-error-4__paint4_linear" x1="64.311" x2="76.772" y1="82.942" y2="85.829" gradientUnits="userSpaceOnUse"><stop stopColor="#9D2B6B"></stop><stop offset="1" stopColor="#E867A8"></stop></linearGradient><linearGradient id="spot-error-4_svg__spot-error-4__paint5_linear" x1="64.311" x2="76.772" y1="105.577" y2="108.464" gradientUnits="userSpaceOnUse"><stop stopColor="#9D2B6B"></stop><stop offset="1" stopColor="#E867A8"></stop></linearGradient><linearGradient id="spot-error-4_svg__spot-error-4__paint6_linear" x1="77.964" x2="90.424" y1="96.698" y2="99.585" gradientUnits="userSpaceOnUse"><stop stopColor="#9D2B6B"></stop><stop offset="1" stopColor="#E867A8"></stop></linearGradient><linearGradient id="spot-error-4_svg__spot-error-4__paint7_linear" x1="77.964" x2="90.424" y1="119.333" y2="122.22" gradientUnits="userSpaceOnUse"><stop stopColor="#9D2B6B"></stop><stop offset="1" stopColor="#E867A8"></stop></linearGradient><filter id="spot-error-4_svg__spot-error-4__filter0_i" width="7.057" height="65.293" x="45.682" y="36.707" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dx="1" dy="1"></feOffset><feGaussianBlur stdDeviation="0.5"></feGaussianBlur><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"></feComposite><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"></feColorMatrix><feBlend in2="shape" result="effect1_innerShadow"></feBlend></filter><filter id="spot-error-4_svg__spot-error-4__filter1_i" width="7.057" height="65.293" x="92.42" y="36.707" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dx="1" dy="1"></feOffset><feGaussianBlur stdDeviation="0.5"></feGaussianBlur><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"></feComposite><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"></feColorMatrix><feBlend in2="shape" result="effect1_innerShadow"></feBlend></filter><filter id="spot-error-4_svg__spot-error-4__filter2_d" width="78.424" height="18.761" x="34.461" y="46.662" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dx="0.5" dy="0.5"></feOffset><feGaussianBlur stdDeviation="0.25"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter><filter id="spot-error-4_svg__spot-error-4__filter3_d" width="78.424" height="18.761" x="34.461" y="69.296" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dx="0.5" dy="0.5"></feOffset><feGaussianBlur stdDeviation="0.25"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter><clipPath id="spot-error-4_svg__spot-error-4__svgClip"><path xmlns="http://www.w3.org/2000/svg" id="spot-error-4_svg__spot-error-4__Mask" fill="#fff" d="M45.682 36.707h6.057v9.955H92.42v-9.955h6.057v9.955h13.084l5.356-1.018 19.316 55.318H98.477V101H92.42v-.038H51.74V101h-6.057v-.038H13.767l13.03-38.197 7.664-1.456V46.662h11.221v-9.955z"></path></clipPath><pattern id="spot-error-4_svg__spot-error-4__texture" width="38" height="32" x="0" y="0" patternTransform="scale(.3)" patternUnits="userSpaceOnUse"><path d="M10 0h1v1h-1V0zm8 0h1v1h-1V0zm15 0h1v1h-1V0zm10 1h1v1h-1V1zm27 0h1v1h-1V1zM6 1h1v1H6V1zm23 0h1v1h-1V1zm2 0h1v1h-1V1zm25 0h1v1h-1V1zm19 0h1v1h-1V1zM3 1h1v1H3V1zm4 1h1v1H7V2zm16 0h1v1h-1V2zm14 0h1v1h-1V2zm8 0h1v1h-1V2zm8 0h1v1h-1V2zm5 0h1v1h-1V2zm10 0h1v1h-1V2zM1 3h1v1H1V3zm3 0h1v1H4V3zm4 0h2v1H8V3zm6 0h1v1h-1V3zm2 0h1v1h-1V3zm9 0h1v1h-1V3zm2 0h2v1h-2V3zm9 0h2v1h-2V3zm6 1h1v1h-1V4zm8 0h1v1h-1V4zm11 0h1v1h-1V4zm4 0h1v1h-1V4zM21 4h1v1h-1V4zm9 0h1v1h-1V4zm7 0h1v1h-1V4zm9 0h1v1h-1V4zm13 1h1v1h-1V5zm11 0h1v1h-1V5zm4 0h1v1h-1V5zM4 5h1v1H4V5zm3 0h1v1H7V5zm5 0h1v1h-1V5zm28 0h1v1h-1V5zm15 1h2v1h-2V6zm10 0h1v1h-1V6zm10 0h1v1h-1V6zM1 6h1v1H1V6zm8 0h1v1H9V6zm16 0h1v1h-1V6zm8 0h1v1h-1V6zm12 0h1v1h-1V6zm2 1h1v1h-1V7zm3 0h1v1h-1V7zm2 0h1v2h-1V7zm3 0h1v1h-1V7zm4 0h1v1h-1V7zM6 7h1v1H6V7zm12 0h1v1h-1V7zm1 0h2v1h-2V7zm7 0h1v1h-1V7zm3 1h1v2h-1V8zm38 0h1v1h-1V8zm7 0h1v1h-1V8zM3 8h1v1H3V8zm4 0h1v1H7V8zm4 0h1v1h-1V8zm4 0h1v1h-1V8zm9 1h1v1h-1V9zm24 0h1v1h-1V9zm3 0h1v1h-1V9zm2 0h1v1h-1V9zm2 0h1v1h-1V9zm13 0h1v1h-1V9zm2 0h1v1h-1V9zm5 1h1v1h-1v-1zm-57 0h1v1h-1v-1zm9 0h1v1h-1v-1zm39 0h1v1h-1v-1zm5 0h2v1h-2v-1zm6 0h2v1h-2v-1zm-65 0h1v1h-1v-1zm4 1h1v1h-1v-1zm12 0h1v1h-1v-1zm3 0h1v1h-1v-1zm1 0h1v1h-1v-1zm9 0h1v1h-1v-1zm3 0h1v1h-1v-1zm2 0h1v1h-1v-1zm12 1h1v2h-1v-2zm5-1h1v1h-1v-1zM6 12h1v1H6v-1zm4 0h1v1h-1v-1zm4 0h1v1h-1v-1zm7 0h1v1h-1v-1zm2 0h1v1h-1v-1zm31 0h1v1h-1v-1zm12 0h1v1h-1v-1zm11 1h1v1h-1v-1zM1 13h1v1H1v-1zm12 0h1v1h-1v-1zm4 0h1v1h-1v-1zm7 0h1v1h-1v-1zm19 0h1v1h-1v-1zm19 0h1v1h-1v-1zm8 1h1v1h-1v-1zM2 14h1v1H2v-1zm20 0h1v1h-1v-1zm4 0h1v1h-1v-1zm5 0h2v1h-2v-1zm10 0h1v1h-1v-1zm-2-2h1v1h-1v-1zm7 2h1v1h-1v-1zm3 0h1v1h-1v-1zm1 1h2v1h-2v-1zm19 0h1v1h-1v-1zm-58 0h1v1h-1v-1zm3 0h1v1h-1v-1zm13 0h2v1h-2v-1zm9 0h1v1h-1v-1zm1-7h1v1h-1V8zm7 7h1v1h-1v-1zm10 1h1v2h-1v-2zm6 0h1v2h-1v-2zm5-1h2v1h-2v-1zm8 1h1v1h-1v-1zM5 16h1v2H5v-2zm8 0h1v1h-1v-1zm35 1h1v2h-1v-2zm4-1h1v1h-1v-1zm4 0h1v1h-1v-1zM2 16h1v1H2v-1zm17 1h1v1h-1v-1zm8 0h1v2h-1v-2zm6 0h1v1h-1v-1zm28 0h2v1h-2v-1zM3 17h1v1H3v-1zm11 0h1v1h-1v-1zm2 0h1v1h-1v-1zm8 1h1v1h-1v-1zm12 0h1v1h-1v-1zm13 0h1v1h-1v-1zm17 0h1v1h-1v-1zm2 0h2v1h-2v-1zm8 0h2v1h-2v-1zM5 18h1v1H5v-1zm6 1h1v1h-1v-1zm15 0h1v1h-1v-1zm32 0h1v1h-1v-1zm2 0h1v1h-1v-1zm13 0h1v1h-1v-1zm-56 0h1v1h-1v-1zm3 0h1v1h-1v-1zm9 1h1v1h-1v-1zm7 0h1v1h-1v-1zm6 0h1v1h-1v-1zm20 0h1v1h-1v-1zm3 0h1v1h-1v-1zm11 0h1v1h-1v-1zM6 20h2v1H6v-1zm6 0h1v1h-1v-1zm23 1h1v1h-1v-1zm11 0h1v1h-1v-1zm7 0h1v1h-1v-1zm11 0h1v1h-1v-1zm7 0h1v1h-1v-1zM5 21h1v1H5v-1zm10 0h1v1h-1v-1zm4 1h1v1h-1v-1zm17 0h1v1h-1v-1zm3 0h1v1h-1v-1zm3 0h1v1h-1v-1zm34 0h1v1h-1v-1zM9 22h1v1H9v-1zm43 0h1v1h-1v-1zm8 0h1v1h-1v-1zm1 1h1v1h-1v-1zm3 0h1v1h-1v-1zm4 0h1v1h-1v-1zM2 24h1v2H2v-2zm27-1h1v1h-1v-1zm6 0h1v1h-1v-1zm5 0h2v1h-2v-1zm6 0h1v1h-1v-1zm11 0h1v1h-1v-1zm15 1h1v1h-1v-1zM4 24h1v1H4v-1zm15 0h1v1h-1v-1zm11 0h1v1h-1v-1zm9 0h1v1h-1v-1zm29 0h1v1h-1v-1zM7 25h1v1H7v-1zm4 0h1v1h-1v-1zm3 0h1v1h-1v-1zm10 0h1v1h-1v-1zm11 0h1v1h-1v-1zm8 1h1v2h-1v-2zm18-1h2v1h-2v-1zm9 0h1v1h-1v-1zm5 0h1v1h-1v-1zm2 1h1v1h-1v-1zm-62 0h1v1h-1v-1zm5 0h1v1h-1v-1zm2 0h1v1h-1v-1zm24 0h1v1h-1v-1zm12 0h1v1h-1v-1zm3 0h1v1h-1v-1zm7 1h1v1h-1v-1zm3 0h1v1h-1v-1zM9 27h1v1H9v-1zm18 0h1v1h-1v-1zm9 0h1v1h-1v-1zm3 0h2v1h-2v-1zm10 0h1v1h-1v-1zm3 1h1v1h-1v-1zm5 0h1v1h-1v-1zm12 0h1v1h-1v-1zm7 0h2v1h-2v-1zM3 28h1v1H3v-1zm20 0h1v1h-1v-1zm3 0h1v1h-1v-1zm2 0h1v1h-1v-1zm19 1h1v1h-1v-1zm13 0h1v1h-1v-1zm1 0h1v1h-1v-1zm10 0h1v1h-1v-1zM8 29h1v1H8v-1zm8 0h2v1h-2v-1zm5 0h1v1h-1v-1zm4 1h1v1h-1v-1zm7 0h1v1h-1v-1zm3 0h1v1h-1v-1zm3 0h1v1h-1v-1zm3 0h1v1h-1v-1zm4 1h1v2h-1v-2zm8 0h1v2h-1v-2zm2-1h1v1h-1v-1zm14 0h1v1h-1v-1zM1 30h1v1H1v-1zm10 1h1v1h-1v-1z" fillRule="evenodd" clipRule="evenodd" fill="#404040"></path><path d="M11 31h2v1h-2v-1zm7 0h1v1h-1v-1zm18 0h1v1h-1v-1zm6 0h1v1h-1v-1zm5 0h1v1h-1v-1zm12 1h1v1h-1v-1zm4 0h1v1h-1v-1z" fillRule="evenodd" clipRule="evenodd" fill="#404040"></path><path d="M63 32h2v1h-2v-1zm9 0h1v1h-1v-1zm5 0h1v1h-1v-1zM8 33h1v2H8v-2zm11-1h1v1h-1v-1zm23 0h1v1h-1v-1zm31 1h1v1h-1v-1zm-49 0h1v1h-1v-1zm6 0h1v1h-1v-1zm13 0h1v1h-1v-1zm6 0h1v1h-1v-1zm4 0h1v1h-1v-1zm18 0h1v1h-1v-1zm-46 1h1v2h-1v-2zm10 0h1v1h-1v-1zm15 0h1v1h-1v-1zm12 0h1v1h-1v-1zm-52 0h1v1h-1v-1zm4 1h1v2h-1v-2zm17-1h1v1h-1v-1zm8 0h1v1h-1v-1zm12 0h1v1h-1v-1zm6 1h1v2h-1v-2zm4-1h1v1h-1v-1zm8 1h1v2h-1v-2zm3 0h1v1h-1v-1zm4 0h1v1h-1v-1zm-64 0h1v1h-1v-1zm10 0h1v1h-1v-1zm2 0h1v1h-1v-1zm40 1h1v1h-1v-1zm-19 0h1v1h-1v-1zm4 0h1v1h-1v-1zm3 0h1v1h-1v-1zm14 0h1v1h-1v-1zm8 0h1v1h-1v-1zM2 37h1v1H2v-1zm31 0h1v1h-1v-1zm2 0h1v1h-1v-1zm4 0h1v1h-1v-1zm25 0h1v1h-1v-1zm7 0h1v1h-1v-1zM5 37h1v1H5v-1zm6 0h1v1h-1v-1zm4 2h1v2h-1v-2zm30-1h1v1h-1v-1zm6 0h2v1h-2v-1zm12 0h1v1h-1v-1zm4 0h1v1h-1v-1zm5 0h1v1h-1v-1zm4 0h1v1h-1v-1zM7 38h1v1H7v-1zm6 1h1v1h-1v-1zm5 0h1v1h-1v-1zm4 0h1v1h-1v-1zm4 0h1v1h-1v-1zm5 0h1v1h-1v-1zm1 0h1v1h-1v-1zm18 1h1v2h-1v-2zm8-1h2v1h-2v-1zm-30 1h1v1h-1v-1zm10 0h1v1h-1v-1zm1 0h1v1h-1v-1zm3 0h1v1h-1v-1zm12 0h1v1h-1v-1zm2 0h1v1h-1v-1zm12 1h1v1h-1v-1zm-58 0h1v1h-1v-1zm15 0h1v1h-1v-1zm7 0h1v1h-1v-1zm2 0h1v1h-1v-1zm4 0h1v1h-1v-1zm15 0h1v1h-1v-1zm2 0h1v1h-1v-1zM2 42h1v1H2v-1zm11 0h1v1h-1v-1zm7 1h1v2h-1v-2zm2-1h1v1h-1v-1zm8 0h1v1h-1v-1zm3 0h1v1h-1v-1zm14 0h1v1h-1v-1zm9 0h1v1h-1v-1zm10 0h1v1h-1v-1zm5 1h1v1h-1v-1zm3 0h1v1h-1v-1zM4 43h1v1H4v-1zm19 0h1v1h-1v-1zm11 0h1v1h-1v-1zm4 0h1v1h-1v-1zm2 0h1v1h-1v-1zm18 1h1v1h-1v-1zm2 0h2v1h-2v-1zm7 0h1v1h-1v-1zm6 0h1v1h-1v-1zM8 44h1v1H8v-1zm4 0h3v1h-3v-1zm6 0h1v1h-1v-1zm10 1h1v1h-1v-1zm9 0h1v1h-1v-1zm10 0h1v2h-1v-2zm2 0h1v1h-1v-1zm6 0h1v1h-1v-1zm22 0h1v1h-1v-1zM1 45h1v1H1v-1z" fillRule="evenodd" clipRule="evenodd" fill="#404040"></path><path d="M28 45h1v1h-1v-1zm29 0h1v1h-1v-1zm2 1h1v1h-1v-1zm-43 0h2v1h-2v-1zm4 0h1v1h-1v-1zm3 0h1v1h-1v-1zm11 0h1v1h-1v-1zm7 1h1v2h-1v-2zm1 0h2v2h-1v-1h-1v-1zm20-1h1v1h-1v-1zm5 1h1v1h-1v-1zm6 0h2v2h-1v-1h-1v-1zM4 47h1v1H4v-1zm22 0h1v1h-1v-1zm11 0h2v1h-2v-1zm11 0h1v1h-1v-1zm3 0h1v1h-1v-1zm12 1h1v1h-1v-1zm3 0h1v1h-1v-1zM6 48h1v1H6v-1zm3 0h2v1H9v-1zm10 0h1v1h-1v-1zm11 0h1v1h-1v-1zm1 1h1v1h-1v-1zm6 0h1v1h-1v-1zm14 0h1v2h-1v-2zm4 0h1v1h-1v-1zM3 49h1v1H3v-1zm5 0h1v1H8v-1zm5 0h1v1h-1v-1zm4 0h1v1h-1v-1zm4 0h1v1h-1v-1zm23 1h1v1h-1v-1zm10 0h1v1h-1v-1zm13 0h1v1h-1v-1zm3 0h1v1h-1v-1zm-60 0h1v1h-1v-1zm19 1h1v2h-1v-2zm9-1h1v1h-1v-1zm14 0h1v1h-1v-1zm17 1h1v1h-1v-1zm-49 1h1v2h-1v-2zm8-1h1v1h-1v-1zm6 0h1v1h-1v-1zm7 0h1v1h-1v-1zm7 0h1v1h-1v-1zm9 1h1v2h-1v-2zm6-1h1v1h-1v-1zM8 52h1v1H8v-1zm15 0h1v1h-1v-1zm17 0h1v1h-1v-1zm4 0h1v1h-1v-1zm16 0h1v1h-1v-1zm13 0h1v1h-1v-1zm4 1h1v1h-1v-1zM2 53h1v1H2v-1zm3 0h1v1H5v-1zm4 0h1v1H9v-1zm6 0h1v1h-1v-1zm16 0h1v1h-1v-1zm8 0h1v1h-1v-1zm8 0h1v1h-1v-1zm11 1h1v1h-1v-1zm16 0h1v1h-1v-1zM6 54h1v1H6v-1zm10 0h1v1h-1v-1zm21 0h1v1h-1v-1zm8 0h1v1h-1v-1zm20 0h1v1h-1v-1zM8 55h1v1H8v-1zm3 2h1v1h-1v-1zm1-2h1v1h-1v-1zm9 0h1v1h-1v-1zm8 0h1v1h-1v-1zm3 0h1v2h-1v-2zm2 0h1v1h-1v-1zm20 0h1v2h-1v-2zM4 55h1v1H4v-1zm11 0h1v1h-1v-1zm29 0h1v1h-1v-1zm31 1h1v2h-1v-2zM3 56h1v1H3v-1zm-1 2h1v1H2v-1zm3-2h1v1H5v-1zm2 2h1v1H7v-1zm0-2h1v1H7v-1zm12 0h1v1h-1v-1zm2 0h1v1h-1v-1zm6 0h1v1h-1v-1zm3 1h1v1h-1v-1zm9 0h2v1h-2v-1zm4 0h1v1h-1v-1zm8 0h1v1h-1v-1zm3 0h1v1h-1v-1zm19 0h1v1h-1v-1zm-57 1h1v1h-1v-1zm6 0h1v1h-1v-1zm26 0h1v1h-1v-1zm15 0h1v1h-1v-1zm2 0h1v1h-1v-1zm-48 0h1v1h-1v-1zm17 0h1v1h-1v-1zm10 0h1v1h-1v-1zm6 1h1v1h-1v-1zm7 0h1v1h-1v-1zm2 0h1v1h-1v-1zm3 0h1v1h-1v-1zm5 0h1v1h-1v-1zm8 0h1v1h-1v-1z" fillRule="evenodd" clipRule="evenodd" fill="#404040"></path></pattern></defs><g id="spot-error-4_svg__spot-error-4__Group" clipPath="url(#spot-error-4_svg__spot-error-4__svgClip)"><path id="spot-error-4_svg__spot-error-4__Vector" fill="#CDC8F5" d="M26.796 62.765l90.121-17.12 19.316 55.317H13.767l13.03-38.197z"></path><g id="spot-error-4_svg__spot-error-4__Rectangle_21608" filter="url(#spot-error-4_svg__spot-error-4__filter0_i)"><path fill="#1D465C" d="M45.682 36.707h6.056V101h-6.056V36.707z"></path></g><g id="spot-error-4_svg__spot-error-4__Rectangle_21609" filter="url(#spot-error-4_svg__spot-error-4__filter1_i)"><path fill="#1D465C" d="M92.42 36.707h6.057V101H92.42V36.707z"></path></g><g id="spot-error-4_svg__spot-error-4__Rectangle_21700" filter="url(#spot-error-4_svg__spot-error-4__filter2_d)"><path fill="#fff" d="M34.461 46.662h77.424v17.761H34.461z"></path></g><g id="spot-error-4_svg__spot-error-4__Rectangle_21970" filter="url(#spot-error-4_svg__spot-error-4__filter3_d)"><path fill="#fff" d="M34.461 69.296h77.424v17.761H34.461z"></path></g><path id="spot-error-4_svg__spot-error-4__Intersect" fill="url(#spot-error-4_svg__spot-error-4__paint0_linear)" d="M47.84 46.662L34.46 60.14V46.66h13.38z"></path><path id="spot-error-4_svg__spot-error-4__Intersect_2" fill="url(#spot-error-4_svg__spot-error-4__paint1_linear)" d="M47.84 69.296l-13.38 13.48v-13.48h13.38z"></path><path id="spot-error-4_svg__spot-error-4__Intersect_3" fill="url(#spot-error-4_svg__spot-error-4__paint2_linear)" d="M43.863 64.422l17.629-17.76h13.653l-17.628 17.76H43.862z"></path><path id="spot-error-4_svg__spot-error-4__Intersect_4" fill="url(#spot-error-4_svg__spot-error-4__paint3_linear)" d="M43.863 87.057l17.629-17.76h13.653l-17.628 17.76H43.862z"></path><path id="spot-error-4_svg__spot-error-4__Intersect_5" fill="url(#spot-error-4_svg__spot-error-4__paint4_linear)" d="M71.17 64.422l17.628-17.76h13.653l-17.628 17.76H71.17z"></path><path id="spot-error-4_svg__spot-error-4__Intersect_6" fill="url(#spot-error-4_svg__spot-error-4__paint5_linear)" d="M71.17 87.057l17.628-17.76h13.653l-17.628 17.76H71.17z"></path><path id="spot-error-4_svg__spot-error-4__Intersect_7" fill="url(#spot-error-4_svg__spot-error-4__paint6_linear)" d="M98.477 64.423l13.408-13.51v13.51H98.477z"></path><path id="spot-error-4_svg__spot-error-4__Intersect_8" fill="url(#spot-error-4_svg__spot-error-4__paint7_linear)" d="M98.477 87.057l13.408-13.509v13.51H98.477z"></path><path fill="url(#spot-error-4_svg__spot-error-4__texture)" d="M45.682 36.707h6.057v9.955H92.42v-9.955h6.057v9.955h13.084l5.356-1.018 19.316 55.318H98.477V101H92.42v-.038H51.74V101h-6.057v-.038H13.767l13.03-38.197 7.664-1.456V46.662h11.221v-9.955z" opacity="0.45" style={{mixBlendMode: 'overlay'}}></path></g>
                            </svg>
                        </div>
                        <div className="flex flex-col text-base">
                            <span className="text-[#2d2d2d] font-bold mb-2">Have to have it? Make it a Deal breaker.</span>
                            <p className="text-[#595959]">
                                We won’t notify you of candidates that don’t meet your <span className="text-[#2d2d2d] font-bold">Deal breaker</span> qualifications. You can review them anytime on your candidate dashboard.
                            </p>
                        </div>
                    </div>
                    <form id={formId} onSubmit={handleSubmit}>
                        {
                            questionForms?.map((item, index) => {
                                return (
                                    <QuestionItem key={index} props={item} filterComboBox={(e) => filterComboBox(e, item, index)} handleChangeText={(e) => handleChangeText(e, item, index)} filterRadio={(e) => filterRadio(e, item, index)} filterSelect={(e) => filterSelect(e, item, index)} handleRequired={() => handleRequired(item, index)} onClose={() => {removeQuestion(item, index)}}/>
                                )
                            })
                        }
                        <div>
                            <div className="flex flex-col my-6">
                                <input type="checkbox" className="peer" onChange={() => {}} checked={dropDownTags} hidden/>
                                <div className="flex flex-row border rounded-lg border-gray-400  items-center justify-between p-3 transition-all duration-500 cursor-pointer bg-[#F3F2F1] hover:bg-[#f3f9ff] hover:border-[#3f73d3] rounded-es-lg rounded-ee-lg peer-checked:rounded-es-none peer-checked:rounded-ee-none"  onClick={() => {setDropDownTags(!dropDownTags)}}>
                                    <div className="flex flex-row items-top mr-3">
                                        <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap">
                                            Browse more questions
                                        </div>
                                    </div>
                                    <div className="h-full self-start mt-[2px] cursor-pointer">
                                        <input type="checkbox" className="peer" onChange={() => {}} hidden checked={dropDownTags}/>
                                        <IoChevronDownOutline size={22} className='transition-transform duration-500 rotate-0 peer-checked:rotate-180'/>
                                    </div>
                                </div>
                                <div className={`overflow-auto no-scrollbar border rounded-ee-lg rounded-es-lg border-gray-400 border-t-0 gap-y-2 transition-all duration-500 ease-in-out max-h-0 opacity-0 peer-checked:max-h-56 peer-checked:opacity-100`}>
                                    <div className="m-4 grid grid-cols-3">
                                        {
                                            questionPatterns?.map((item, index) => {
                                                return (
                                                    <div key={index} className={questionForms.find(i => i.tagId === item.tagId) && !item.multi ? 'opacity-40 select-none cursor-none' : ''}>
                                                        <QuestionTag name={item.tagName} onClick={() => {setListQuestionForm({...item})}}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>    
        </>
    );
}

export default JobPreScreen;