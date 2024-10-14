import { IoArrowBackOutline, IoArrowForward } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CustomComboBox, TextInput } from "../../../../components";
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/video.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/paragraph_style.min.js';
import 'froala-editor/js/plugins/markdown.min.js';
import { useForm } from "react-hook-form";
import VacancyItem from "../../../Seeker/ProjectInfo/VacancyItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getVacancyCor } from "../../../../redux/slices/vacancies/vacanciesSlices";
import { HiPlus } from "react-icons/hi";
import { createProject, getProjectSingle, setValueSuccess, updateProject } from "../../../../redux/slices/projects/projectsSlices";
import { CustomLoader, VacancyItemLoader } from "../../../../components/Loader";
import { IoIosClose } from "react-icons/io";
import baseUrl from "../../../../utils/baseUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function UpdateProject() {
    const period = [{ id: 1, name:"month(s)", value: 30}, { id: 2, name: "week(s)", value: 7}, { id: 3, name: "day(s)", value: 1}, { id: 4, name:"year(s)", value: 365},]
    const rates = [{ id: 1, name:"per hour"}, { id: 2, name: "per day"}, { id: 3, name: "per week"}, { id: 4, name: "per month"}, { id: 5, name: "per year"}]
    const id = useParams()
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({ mode: 'onChange' });
    const project = useSelector((state) => state.projects.project?.project)
    const loadingPr = useSelector((state) => state.projects.loading)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let vacancies = useSelector((state) => state.vacancies.complete)
    let isSuccessUD = useSelector((state) => state.projects.isSuccessUD)
    let user = useSelector((state) => state.users.userAuth.user)
    const [selected, setSelected] = useState([])
    const [value, setValueDes] = useState([])
    const [dateValue, setDateValue] = useState("")    
    const [durationType, setDurationType] = useState(period[0])    
    const [occupations, setOccupations] = useState([])
    const [occupationSelected, setOccupationSelected] = useState([])
    const [spin, setSpin] = useState(false);
    const loading = useSelector((state) => state.vacancies.loading)
    const loadingUD = useSelector((state) => state.projects.loadingUD)
    const inputBox = useRef();
    
    useEffect(() => {
        dispatch(getVacancyCor())
    }, [])

    useEffect(() => {
        if(id) dispatch(getProjectSingle(id))
    }, [id])

    useEffect(() => {
        if(vacancies && project){
            let listVC = []
            const list = project.vacancies
            for(var item of list){
                const vacancy = vacancies.find(i => i.vacancyId === item)
                if(vacancy) listVC.push(vacancy) 
            }
            setSelected(listVC)
        }
    }, [vacancies, project])

    useEffect(() => {
        if(project){
            setValue("projectName", project?.projectName)
            setValue("duration", project?.duration)
            setValue("budget", project?.budget)
            setValue("maxParticipants", project?.maxParticipants)

            setValue("fbLink", project?.fbLink)
            setValue("twLink", project?.twLink)
            setValue("lkLink", project?.lkLink)
            setValue("insLink", project?.insLink)
            
            const du = period.find((item) => item.name === project.period) 
            du && setDurationType(du)
            project.occupations && setOccupationSelected(project.occupations)
            setValueDes(project.description)
            setDateValue(project.startDate)

        }
    }, [project])

    useEffect(() => {
        if(isSuccessUD){
            dispatch(setValueSuccess(false))
            navigate("/Organizer/manage-project")
        }
    }, [isSuccessUD])

    const validateForm = (data) => {
        if(Number(data.duration) < 1){
            window.scrollTo({top: 0, behavior: 'smooth'});
            notify("warning", "Please select at least one field for project!");
            return false;
        }
        return true
    }

    const onSubmitForm = (data) => {
        const main = {
            ...data, 
            description: value, 
            userId: user.userId, 
            startDate: dateValue,
            vacancies: selected.map(item => item.vacancyId),
            period: durationType.name,
            occupations: occupationSelected
        }
        if(validateForm(main)){
            console.log(main)
        }
        //dispatch(updateProject({"value": main, "id": id.id}))
    }

    const handleChangeDate = (e) => {
        setDateValue(e.target.value)
    }
    const filterValuePeriod = (e) => {
        setDurationType(e)
    }

    const calculateBudgetAndParticipants = (list, selectDuration) => {
        const duration = Number(getValues("duration"))

        const newBudget = list.reduce((acc, itemVacancy) => {
            let salary = itemVacancy.salaryFirst
            if(itemVacancy.salarySecond !== 0){
                salary = (salary + itemVacancy.salarySecond) / 2
            }
    
            switch(itemVacancy.salaryRate){
                case rates[0]:
                    salary = salary * 24 
                    break;
                case rates[1]:
                    break;
                case rates[2]:
                    salary = salary / 7
                    break;
                case rates[3]:
                    salary = salary / 30
                    break;
                case rates[4]:
                    salary = salary / 365
                    break;
            }

            return acc + salary * itemVacancy.maxRequired * duration * selectDuration.value
        }, 0)

        if(newBudget)
            setValue("budget", newBudget)
        else
            setValue("budget", 0)

        setValue("maxParticipants", list.reduce((acc, item) => acc + item.maxRequired, 0))
    }

    const fetchDataOccupation = (value) => {
        if (value === '')
        {
            setOccupations([])
        }
        else{
            setSpin(true)
            
            axios.get(`${baseUrl}/api/v1/occupations/search-occupation/${value}`, {
                headers: {
                    'Authorization': 'Bearer ' + user?.token
                }
            })
            .then(response => {
                // const occus = response.data.reduce((ar, item) => ar.concat(item.listMajor), [])
                const occus = response.data.map((item) => item.occupationName)
                setOccupations([...occus]);
                setSpin(false)
            })
            .catch(error => {
                console.error(error);
            });
        }
    }

    const notify = (type, message) => toast(message, { type: type });

    return (
        <div className="px-10 pb-0">
            <ToastContainer />
        {/* Start title of page  */}
        <div className="mb-8">
            <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10 flex flex-row items-center">
                <div onClick={() => {setValueSuccess(false); navigate("/Organizer/manage-project")}}>
                    <IoArrowBackOutline style={{marginRight: '5px', marginTop: '1px'}} size={30}/>
                </div>
                Update Projects!</h3>
            <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>
        </div>

        {/* Start main content  to display something*/}
        <div className="flex flex-wrap mx-3 mt-3">
            <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                    <div className="relative w-full">
                        {/* Start table */}
                        <div className="px-6 relative mx-5 py-6">
                            <form onSubmit={handleSubmit(onSubmitForm)}>
                                <div className="overflow-y-hidden overflow-x-auto">
                                    <div>
                                        {
                                            loadingPr ? <CustomLoader type={"title-input"}/> :
                                            <TextInput name={"projectName"} register={register("projectName", {
                                                required: "Project name is required!",
                                            })} error={errors.projectName ? errors.projectName.message : ""} label="Project Name*"  type="text" value={project?.projectName}/>

                                        }
                                    </div>
                                    <div className="grid grid-cols-4 gap-7 items-start justify-between mt-5">
                                        <div className="col-span-1">
                                            {
                                                loadingPr ? <CustomLoader type={"title-input"}/> :
                                                <div>
                                                    <p className="block leading-8 text-gray-900 font-medium mb-1">Start date*</p>
                                                    <input onChange={handleChangeDate} value={dateValue} className="w-full block bg-[#f9fbfc] focus:bg-white text-base outline-1 shadow-s rounded-md py-2 pl-5 pr-5 text-gray-900 border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8" type="date" />
                                                </div>
                                            }
                                        </div>
                                        <div className="col-span-2">
                                            {
                                                loadingPr ? <CustomLoader type={"title-input"}/> :
                                                <TextInput name={"duration"} register={register("duration", {
                                                    required: "Duration is required!",
                                                    onChange: (e) => {if(!e.target.value.match(/^\d+$/)) setValue("duration", e.target.value.substring(0, e.target.value.length - 1)); calculateBudgetAndParticipants(selected, durationType)},
                                                    valueAsNumber: true,
                                                })} error={errors.duration ? errors.duration.message : ""} label="Duration*" type="text" />
                                            }
                                        </div>
                                        <div className="col-span-1">
                                            {
                                                loadingPr ? <CustomLoader type={"title-input"}/> :
                                                <div>
                                                    <p className="block leading-8 text-gray-900 font-medium mb-[6px]">Period*</p>
                                                    <CustomComboBox listItem={period} name="showBy" filterValueSelected={filterValuePeriod} selectItem={durationType} placeHolder={'Select an options.'}/>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-7  mt-5">
                                        <div>
                                            {
                                                loadingPr ? <CustomLoader type={"title-input"}/> :
                                                <TextInput name={"maxParticipants"} readOnly register={register("maxParticipants", {
                                                    required: "Max participants is required!",
                                                    onChange: (e) => { setValue("maxParticipants", e.target.value.substring(0, e.target.value.length - 1))},
                                                })} error={errors.maxParticipants ? errors.maxParticipants.message : ""} label="Max Participants" type="text" />
                                            }
                                        </div>
                                        <div>
                                            {
                                                loadingPr ? <CustomLoader type={"title-input"}/> :
                                                <TextInput name={"budget"} readOnly register={register("budget", {
                                                    required: "Budget is required!",
                                                    valueAsNumber: true,
                                                    onChange: (e) => { if(!e.target.value.match(/^\d+$/)) {setValue("budget", e.target.value.substring(0, e.target.value.length - 1)); }}
                                                })} error={errors.budget ? errors.budget.message : ""} label="Budget($)" type="text"/>
                                            }
                                        </div>
                                        <div className="col-span-2">
                                            {
                                                loadingPr ? <CustomLoader type={"title-input"}/> :
                                                <div>
                                                    <p className="block leading-8 text-gray-900 font-medium mb-[6px]">Fields</p>   
                                                    <div tabIndex={0} onBlur={() => setOccupations([])} className={`relative flex flex-row gap-1 flex-wrap items-center w-full bg-white focus:bg-white focus:border-gray-900 text-base shadow-sm rounded-md pl-5 py-2 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}>
                                                        {
                                                            occupationSelected?.map((item, index) => {
                                                                return <div key={index} className='flex flex-row items-center rounded-[4px] gap-1 bg-[#1967d3] text-white p-1 h-8'>
                                                                    <div className='whitespace-nowrap'>{item}</div>
                                                                    <div className='cursor-pointer' onClick={() => setOccupationSelected(occupationSelected.filter(i => i != item))}>
                                                                        <IoIosClose />
                                                                    </div>
                                                                </div>
                                                            })
                                                        }
                                                        <div className='flex-1'>
                                                            <input
                                                                type="text"
                                                                ref={inputBox}
                                                                onBlur={(e) => e.stopPropagation()}
                                                                onChange={(e) => fetchDataOccupation(e.target.value)}
                                                                className={`min-w-5 w-full block focus:outline-none bg-white focus:bg-white text-base shadow-sm rounded-md pr-5 text-gray-900 border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                                                            />                                                        
                                                        </div>
                                                        
                                                        {spin ? <svg className="absolute right-1 animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="#cccccc" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg> : null}
                                                    </div>
                                                    <div  className='relative' style={{visibility: occupations.length === 0 ? 'collapse' : 'visible'}}>
                                                        <div className='border mt-1 rounded overflow-auto absolute z-10 w-full max-h-56'>
                                                            {
                                                                occupations.map((item, index) => {
                                                                    return <div onClick={() => {!occupationSelected.includes(item) && setOccupationSelected([...occupationSelected, item]); inputBox.current.value = ""; setOccupations([])}} key={index} className={`hover:bg-[#eef1f2]  block focus:outline-none bg-white focus:bg-white text-base shadow-sm py-2.5 pl-5 pr-5 text-gray-90 placeholder:text-gray-400 sm:text-base sm:leading-8 cursor-pointer`}>{item}</div>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <p className="block leading-8 text-gray-900 font-medium mb-1">Vacancies</p>
                                        <div className="mt-5 flex flex-row gap-x-3">
                                            <div className="w-1/2">
                                                <p className="block leading-8 text-gray-900 font-medium mb-1">Selected list</p>
                                                <div className="h-[500px] overflow-auto">
                                                    {
                                                        loading?
                                                        [1, 2 ,3].map((item, index)=> {
                                                            return (
                                                                <div key={index}>
                                                                    <VacancyItemLoader/>
                                                                </div>
                                                            )
                                                        })
                                                        :
                                                        selected?.map((item, index) => {
                                                            return <div key={index} className="relative">
                                                                <div className="absolute top-6 right-5">
                                                                    <div className="text-sm text-center cursor-pointer text-[white] hover:bg-[#0146a6] bg-[#1967d3] flex items-center leading-7 font-normal rounded-lg " onClick={() => {calculateBudgetAndParticipants(selected.filter(i => i.vacancyId !== item.vacancyId), durationType); setSelected(selected.filter(i => i.vacancyId !== item.vacancyId));}}>
                                                                        <div className="m-1 mx-2">Remove</div>
                                                                    </div>
                                                                </div>
                                                                <VacancyItem props={item} isAvatar={false} isEditProject={true}/>
                                                            </div>                  
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className="w-1/2" >
                                                <p className="block leading-8 text-gray-900 font-medium mb-1">Your Vacancies</p>
                                                <div className="h-[500px] overflow-auto">
                                                    {
                                                        loading?
                                                        [1, 2 ,3].map((item, index)=> {
                                                            return (
                                                                <div key={index}>
                                                                    <VacancyItemLoader/>
                                                                </div>
                                                            )
                                                        })
                                                        :
                                                        vacancies?.filter((item) => !item.post && item.approvalStatus === "pending")?.map((item, index) => {
                                                            return <div key={index} className="relative">
                                                                {
                                                                    selected.find(i => i.vacancyId === item.vacancyId) ? null :
                                                                        <div className="absolute top-6 right-5">
                                                                            <div className="text-sm text-center cursor-pointer text-[white] hover:bg-[#0146a6] bg-[#1967d3] flex items-center leading-7 font-normal rounded-lg "  onClick={() => {if(!selected.find(i => i.vacancyId === item.vacancyId)); calculateBudgetAndParticipants([...selected, item], durationType); setSelected([...selected, item])}}>
                                                                                <HiPlus className='relative m-2 text-xl text-center ' />
                                                                            </div>
                                                                        </div>                                                                    
                                                                }
                                                                <VacancyItem props={item} isAvatar={false} isEditProject={true}/>
                                                            </div>                  
                                                        })
                                                    }
                                                </div>
                                            </div>
                                    </div>
                                    </div>
                                    {
                                        loadingPr ? <CustomLoader type={"title-paragraph"}/> :
                                        <div>
                                            <p className="block leading-8 text-gray-900 font-medium">Project descriptions*</p>
                                            <FroalaEditor
                                                model={value}
                                                onModelChange={( event, editor ) => {setValueDes(event)}}
                                                config={{
                                                    placeholderText: 'Provide a comprehensive job description, outlining the roles, responsibilities, qualifications, and any additional information relevant to the job.',    
                                                    charCounterCount: true,
                                                    toolbarButtons: {
                                                        moreParagraph: {
                                                            buttons: ['formatUL', "outdent", 'indent']
                                                        },
                                                        moreText: {
                                                            buttons: ['bold', 'italic', 'underline', 'fontSize'],
                                                        },
                                                        moreRich: {
                                                            buttons: ['insertImage', 'insertVideo', 'insertTable']
                                                        },
                                                        moreMisc:{
                                                            buttons: ['undo', 'redo']
                                                        }
                                                    },
                                                    height: 250,
                                                    heightMin: 250,
                                                    resizable: true,
                                                    wordCounter: true,
                                                    wordCounterLabel: "words",
                                                    wordCounterBbCode: false,
                                                    wordCounterTimeout: 0,
                                                }}
                                            />
                                        </div>
                                    }
                                    <div className="grid grid-cols-2 gap-x-7 mt-5">
                                        <div>
                                        {
                                            loadingPr ? <CustomLoader type={"title-input"}/> :
                                            <TextInput name='fbLink' register={register("fbLink")} type='text' label='Facebook' placeholder='www.facebook.com/Nguyenvana' styles='bg-[#f0f5f7]' value={project?.fbLink}/>
                                        }
                                        </div>
                                        <div>
                                        {
                                            loadingPr ? <CustomLoader type={"title-input"}/> :
                                            <TextInput name='twLink' register={register("twLink")} type='text' label='Twitter' placeholder='www.twitter.com/@Nguyenvana' styles='bg-[#f0f5f7]' value={project?.twLink}/>
                                        }
                                        </div>
                                        <div>
                                        {
                                            loadingPr ? <CustomLoader type={"title-input"}/> :
                                            <TextInput name='lkLink'  register={register("lkLink")} type='text' label='Linkedin' placeholder='www.linkedin.com/Nguyenvana' styles='bg-[#f0f5f7]' value={project?.lkLink}/>
                                        }
                                        </div>
                                        <div>
                                        {
                                            loadingPr ? <CustomLoader type={"title-input"}/> :
                                            <TextInput name='insLink'  register={register("insLink")} type='text' label='Instagram' placeholder='www.instagram.com/Nguyenvana' styles='bg-[#f0f5f7]'value={project?.insLink} />
                                        }
                                        </div>
                                    </div>
                                        <div className="h-7"></div>
                                        
                                    
                                    
                                    <div>
                                        <div className="flex justify-end mt-10">
                                            <button className="flex-row w-52 text-sm text-center justify-center px-4 p-3 text-[white] hover:bg-[#0146a6] bg-[#1967d3] flex items-center leading-7 font-bold rounded-lg " type="submit" >
                                            {
                                                loadingUD ?
                                                    <svg className="right-1 animate-spin h-6 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                                        <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                                        <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg> 
                                                :
                                                    <div className="flex flex-row items-center">
                                                        Start Update
                                                        <IoArrowForward size={20} className="ml-2 mt-1"/>
                                                    </div>                                                
                                            }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default UpdateProject;