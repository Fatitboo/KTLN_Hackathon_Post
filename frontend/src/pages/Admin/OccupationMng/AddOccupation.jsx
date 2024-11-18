import { useEffect, useState } from "react";
import { CustomButton, TextInput,LoadingComponent } from "../../../components";
import { CgArrowLeft } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { createNewOccupationAction } from "../../../redux/slices/occupations/occupationsSlices";
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'

function AddOccupation() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [listMajor, setListMajor] = useState([{ id: '', name: '' }]);
    const { register, handleSubmit, unregister, reset, formState: { errors } } = useForm({ mode: 'onChange' });
    const onSubmit = (data) => {
        Swal.fire({
            title: "Confirm Add",
            text: "Do you want to add this item?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                const resultArray = [];
                Object.keys(data).forEach(key => {
                    if (key.includes('field')) {
                        resultArray.push(data[key]);
                    }
                });
                const occupation = {
                    occupationName: data.occupationName,
                    listMajor: [...resultArray]
                };
                console.log(occupation);
                dispatch(createNewOccupationAction(occupation));
            }
        });

    }
    const occupations = useSelector(store => store?.occupations);
    const { loading, appErr, isSuccess = false } = occupations
    useEffect(() => {
        if (isSuccess) {
            Swal.fire({
                title: "Added!",
                text: "This item has been added.",
                icon: "success",
                confirmButtonColor: '#3085d6'
            }).then(result => {
                if (result.isConfirmed) nav('/Admin/occupation-management');
            });

        }
    }, [isSuccess])
    const handleAddMajor = () => {
        setListMajor(prev => [...prev, { id: uuidv4(), name: '' }])
    }
    const handleDeleteMajor = (deleteId) => {
        const newList = listMajor.filter((item) => {
            return item.id !== deleteId;
        })
        setListMajor(newList);
        unregister('field' + deleteId);
    }

    return (
        <div className="px-10 pb-0">
            {loading && <LoadingComponent/>}
            {/* Start title of page  */}
            <Link to='/Admin/occupation-management' className="mb-8 flex items-center ">
                <CgArrowLeft fontSize={30} />
                {/* <h3 className="font-normal text-2xl text-gray-900 ml-2 leading-10">Back</h3> */}
            </Link>
            <div className="flex flex-wrap mx-3 mt-3 ">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <div className="relative rounded-lg mb-8 bg-white  shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="relative">
                            {/* Input form create/ update skill information */}
                            <div className="relative flex text-left flex-col bg-transparent px-20 py-10">
                                <div className=" font-medium mb-5 text-xl text-gray-700">Add Occupation:</div>

                                <form onSubmit={handleSubmit(onSubmit)} className="w-full " >
                                    <div className="w-full flex flex-col">
                                        <div className="mr-6 w-full h-32">
                                            <label htmlFor="occupationName" className="block leading-6 text-gray-900 text-base">Occupation name:</label>
                                            <div className="relative mt-2  ">
                                                <TextInput type={'text'} register={register("occupationName", {
                                                    required: "Occupation Name is required!",
                                                })}
                                                    error={errors.occupationName ? errors.occupationName.message : ""} name='occupationName' containerStyles="text-[#05264e] text-base w-full tw-bg-white" placeholder="Ex: Communication" />
                                            </div>
                                            {appErr && <span className='flex flex-row items-center text-base text-[#a9252b] mt-2 ml-8'><AiFillExclamationCircle className="mr-1" />{appErr}</span>}
                                        </div>
                                        <div className="min-h-[300px] h-fit">
                                            <div className="flex mb-4 items-center">
                                                <div>
                                                    List detail Majors:
                                                </div>
                                                <div>
                                                    <CustomButton title="Add Major" onClick={handleAddMajor} containerStyles="ml-3 text-green-600 py-1 px-3 focus:outline-none hover:bg-green-700 hover:text-white rounded-md text-base border border-green-600" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {listMajor.map((item, index) => (
                                                    <div key={item.id} className="flex ml-20 w-8/12 my-1">
                                                        <div className="relative mt-2 mr-3 ">
                                                            <input type="text" {...register(`field${item.id}`, {
                                                                required: "This field is required!",
                                                            })} name={`field${item.id}`} className="block bg-[#f0f5f7] focus:bg-white  text-base w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" style={{ borderColor: `${errors[`field${index}`] ? "#a9252b" : ""}`, outlineColor: `${errors[`field${index}`] ? "#a9252b" : ""}` }} placeholder="Ex: Communication" />
                                                            {errors[`field${item.id}`] && <span className='flex flex-row items-center text-sm text-[#a9252b] mt-2'><AiFillExclamationCircle className="mr-1" />{"This field is required!"}</span>}
                                                        </div>
                                                        <div onClick={() => handleDeleteMajor(item.id)}>
                                                            <CustomButton title="Delete" containerStyles="text-red-600 py-1 mt-[9px] px-3 focus:outline-none hover:bg-red-700 hover:text-white rounded-md text-base border border-red-600" />
                                                        </div>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                        <div className="flex justify-end mr-10">
                                            {
                                                loading ?
                                                    <CustomButton isDisable={loading} title="Loading..." containerStyles="text-blue-600 py-1.5 mt-8 px-3 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                                                    :
                                                    <CustomButton isDisable={loading} type={'Submit'} title="Add Occupation" containerStyles="text-blue-600 py-1.5 mt-8 px-3 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                                            }
                                        </div>
                                    </div>
                                </form>
                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default AddOccupation;