import { CustomButton, TextInput } from "../../../components";
import { AiFillExclamationCircle, AiOutlineSearch} from "react-icons/ai";
import { LiaTrashAltSolid } from "react-icons/lia";
import { CiEdit } from 'react-icons/ci';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createNewSkillAction, deleteSkillAction, getAllSkillsAction, updateSkillAction } from '../../../redux/slices/skills/skillsSlices';
import {LoadingComponent} from "../../../components";
import { useForm } from "react-hook-form";

function Skills() {
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({ mode: 'onChange' });

    const [isUpdate, setIsUpdate] = useState(false);
    const [isAdding, setIsAdding] = useState(false);


    const onSubmitAdd = (data) => {
        const skillData = {
            skillName: data?.skillName,
            description: data?.des
        };
        dispatch(createNewSkillAction(skillData));
        reset();
    };
    const onSubmitUpdate = (data) => {
        const skillData = {
            skillId:data?.id,
            skillName: data?.skillNameU,
            description: data?.desU
        };
        dispatch(updateSkillAction(skillData));
    };
    useEffect(() => {
        dispatch(getAllSkillsAction())
    }, []);
    const skills = useSelector(store => store?.skills);
    const { loading, skillsList, appErr } = skills


    const handleEditClick = (item) => {
        setValue('skillNameU', item.skillName);
        setValue('desU', item.description ?? '');
        setValue('id', item.skillId);
        setIsUpdate(true);
        setIsAdding(false);
    }
    const handleDeleteItem = (id) => {
        dispatch(deleteSkillAction(id));
    }
    const changeAddLayout = () => {
        setIsUpdate(false)
        reset();
        setIsAdding(prev => !prev);
    }
    const cancleClick = () => {
        reset();
        setIsUpdate(false);
        setIsAdding(false);
    }
    return (
        <div className="px-10 pb-0">
            {loading && <LoadingComponent />}
            {/* Start title of page  */}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Skills Management!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>

            </div>

            <div className="flex flex-wrap mx-3 mt-3">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="relative">

                            {/* Input form create/ update skill information */}
                            <div className="relative flex text-left flex-col bg-transparent px-9 py-5">
                                <div className="text-lg font-medium ">Skill informations:</div>

                                {isAdding ?
                                    <form onSubmit={handleSubmit(onSubmitAdd)} className="w-full max" >
                                        <div className=" grid grid-cols-2 w-full grid-flow-row gap-10">
                                            <div className="grid-flow-col ">
                                                <div className="mb-6">
                                                    <label htmlFor="skillName" className="block leading-8 text-gray-900 ">Skill name:</label>
                                                    <div className="relative mt-2  ">
                                                        <TextInput type={'text'} register={register("skillName", {
                                                            required: "skillName is required!",
                                                        })}
                                                            error={errors.skillName ? errors.skillName.message : ""} name='skillName' containerStyles="text-[#05264e] text-base w-full tw-bg-white" placeholder="Ex: Communication" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <CustomButton type={'Submit'} title="Add" containerStyles="text-blue-600 py-1.5 px-3 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                                                </div>
                                            </div>
                                            <div className="grid-flow-col ">
                                                <div >
                                                    <label htmlFor="des" className="block leading-6 text-gray-900 ">Description:</label>
                                                    <div className="relative mt-5 rounded-md shadow-sm ">
                                                        <textarea rows={4} type="text" name="des" {...register('des')} id="des" className="block bg-[#f9fbfc] focus:bg-white text-base w-full rounded-md border-0 min-h-max whitespace-normal  py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-6" placeholder="Ex: Communication" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </form> :
                                    isUpdate ?
                                        <form onSubmit={handleSubmit(onSubmitUpdate)} className="w-full max" >
                                            <div className=" grid grid-cols-2 w-full grid-flow-row gap-10">
                                                <div className="grid-flow-col ">
                                                    <input type="text" disabled name="id" hidden  {...register('id')}/>
                                                    <div className="mb-6">
                                                        <label htmlFor="skillNameU" className="block leading-8 text-gray-900 ">Skill name:</label>
                                                        <div className="relative mt-2  ">
                                                            <TextInput type={'text'} register={register("skillNameU", {
                                                                required: "skillName is required!",
                                                            })}
                                                                error={errors.skillNameU ? errors.skillNameU.message : ""} name='skillNameU' containerStyles="text-[#05264e] text-base w-full tw-bg-white" placeholder="Ex: Communication" />
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="mr-3">
                                                            <CustomButton type={'Submit'} title="Update" containerStyles="text-blue-600 py-1.5 px-3 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                                                        </div>
                                                        <div onClick={cancleClick}>
                                                            <CustomButton title="Cancel" containerStyles="text-red-600 py-1.5 px-3 focus:outline-none hover:bg-red-700 hover:text-white rounded-md text-base border border-red-600" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid-flow-col ">
                                                    <div >
                                                        <label htmlFor="desU" className="block leading-6 text-gray-900 ">Description:</label>
                                                        <div className="relative mt-5 rounded-md shadow-sm ">
                                                            <textarea rows={4} type="text" name="desU" {...register('desU')} id="desU" className="block bg-[#f9fbfc] focus:bg-white text-base w-full rounded-md border-0 min-h-max whitespace-normal  py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-6" placeholder="Ex: Communication" />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </form> :
                                        <></>
                                }

                            </div>
                            {appErr && <span className='flex flex-row items-center text-base text-[#a9252b] mt-2 ml-8'><AiFillExclamationCircle className="mr-1" />{appErr}</span>}

                            {/* start header + search */}
                            <div className="relative flex justify-between items-center flex-wrap bg-transparent px-8 py-5">
                                <div className="flex ">
                                    <div className="relative mr-4">
                                        <form action="#" method="post"  >
                                            <div className="relative mb-0 leading-6">
                                                <AiOutlineSearch fontSize={22} color="#a7a9ad" className="absolute l-3  h-11 justify-center ml-2 text-center z-10 " />
                                                <input type='search' name="search-field" id="search-field" placeholder="Search" className="focus:bg-white relative mt-2 block w-72 border pt-1 pb-1 pl-10 h-10 pr-5 text-sm bg-[#f0f5f7] rounded-md" />
                                            </div>
                                        </form>
                                    </div>
                                    <div onClick={() => changeAddLayout()}>
                                        {
                                            isAdding ?
                                                <CustomButton title="Cancel" containerStyles="text-red-600 h-10 px-3 mt-2 focus:outline-none hover:bg-red-700 hover:text-white rounded-md text-base border border-red-600" />
                                                :
                                                <CustomButton title="Add skill" containerStyles="text-blue-600 h-10 px-3 mt-2 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                                        }
                                    </div>
                                </div>
                                <div className="flex ">
                                    <div className="mr-1">Skill: </div> <span>  {skillsList.length}</span>
                                </div>
                            </div>
                            {/* table list skill information */}
                            <div className="px-6 relative">
                                <div className="overflow-y-hidden overflow-x-auto">
                                    <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0">
                                        <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                                            <tr className="w-full">
                                                <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left pl-6" >Skill Name</th>
                                                <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left  ">Description</th>
                                                <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left ">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                (skillsList.filter(item => item)).map((item, index) => (
                                                    <tr key={item.skillId} className="relative border-b border-solid border-[#ecedf2] w-full text-base min-h-[64px] hover:bg-[#f4f2f2] ">
                                                        <td >
                                                            <div className="text-left pl-6 py-3">{item.skillName}</div>
                                                        </td>
                                                        <td >
                                                            <div className="text-left py-3 text-ellipsis w-64 line-clamp-2">{item.description}</div>
                                                        </td>
                                                        <td>
                                                            <div className="py-3">
                                                                <ul className="list-none flex relative item-center ">

                                                                    <li className="list-none relative mr-3 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#278646] hover:text-white">
                                                                        <button onClick={() => handleEditClick(item)} > <CiEdit fontSize={20} /> </button>
                                                                    </li>
                                                                    <li className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#ce3e37] hover:text-white">
                                                                        <button onClick={()=> handleDeleteItem(item.skillId)}> <LiaTrashAltSolid fontSize={20} /> </button>
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

export default Skills;