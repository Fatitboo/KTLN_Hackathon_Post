import { useEffect, useState } from "react";
import { CustomButton, TextInput,LoadingComponent } from "../../../components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgArrowLeft } from "react-icons/cg";
import { updateOccupationAction } from "../../../redux/slices/occupations/occupationsSlices";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AiFillExclamationCircle } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";
function EditOccupation() {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [listMajor, setListMajor] = useState([{ id: '', name: '' }]);
    const { register, handleSubmit, setValue, unregister, formState: { errors } } = useForm({ mode: 'onChange' });
    const onSubmit = (data) => {
        Swal.fire({
            title: "Confirm Update",
            text: "Do you want to update this item?",
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
                    occupationId: data.id,
                    occupationName: data.occupationName,
                    listMajor: [...resultArray]
                };
                console.log(occupation);
                dispatch(updateOccupationAction(occupation));
            }
        });
    }
    // get store state redux
    const occupations = useSelector(store => store?.occupations);
    const { loading, appErr, isSuccess = false } = occupations;

    useEffect(() => {
        if (isSuccess) {
            Swal.fire({
                title: "Updated!",
                text: "This item has been updated.",
                icon: "success",
                confirmButtonColor: '#3085d6'
            }).then(result => {
                if (result.isConfirmed) nav('/Admin/occupation-management');
            });

        }
    }, [isSuccess])

    useEffect(() => {
        const list = [];
        (state.occupation.listMajor).forEach((item, index) => {
            if (index === 0) {
                list.push({ id: '0', name: item })
            }
            else {
                list.push({ id: uuidv4(), name: item })
            }
        })
        setListMajor([...list]);
        setValue('occupationName', state.occupation.occupationName);
        setValue('field0', state.occupation.listMajor[0]);
        setValue('id', state?.occupation.occupationId);
    }, [])
    const handleAddMajor = () => {
        setListMajor(prev => [...prev, { id: uuidv4(), name: '' }]);
    }
    const handleDeleteMajor = (deleteId) => {
        const newList = listMajor.filter((item) => {
            return item.id !== deleteId;
        })
        // console.log('cc')
        setListMajor(newList);
        unregister('field' + deleteId);
    }

    return (
        <div className="px-10 pb-0">
            {loading && <LoadingComponent />}
            {/* Start title of page  */}
            <Link to='/Admin/occupation-management' className="mb-8 flex items-center ">
                <CgArrowLeft fontSize={30} />
                {/* <h3 className="font-normal text-2xl text-gray-900 ml-2 leading-10">Back</h3> */}
            </Link>

            <div className="flex flex-wrap mx-3 mt-3 ">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <div className="relative rounded-lg mb-8 bg-white min-h-[600px] shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="relative">

                            {/* Input form create/ update skill information */}
                            <div className="relative flex text-left flex-col bg-transparent px-16 py-8">
                                <div className="text-xl font-medium mb-5 text-gray-700">Edit Occupation</div>

                                <form onSubmit={handleSubmit(onSubmit)} className="w-full max" >
                                    <div className="w-full flex flex-col">
                                        <div className="mr-6 w-full h-32">
                                            <input type="text" disabled name="id" hidden  {...register('id')} />
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
                                            <div className="grid grid-cols-2 ">
                                                {listMajor.map((item, index) => (
                                                    <div key={index === 0 ? '0' : item.id} className="flex ml-20 w-8/12 my-1">
                                                        <div className="relative mt-2 mr-3 ">
                                                            <input defaultValue={item.name} type="text" {...register(`field${index === 0 ? index : item.id}`, {
                                                                required: "This field is required!",
                                                            })} name={`field${index === 0 ? index : item.id}`} className="block bg-[#f0f5f7] focus:bg-white  text-base w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" style={{ borderColor: `${errors[`field${index}`] ? "#a9252b" : ""}`, outlineColor: `${errors[`field${index}`] ? "#a9252b" : ""}` }} placeholder="Ex: Communication" />
                                                            {errors[`field${index === 0 ? index : item.id}`] && <span className='flex flex-row items-center text-sm text-[#a9252b] mt-2'><AiFillExclamationCircle className="mr-1" />{"This field is required!"}</span>}
                                                        </div>
                                                        <div onClick={() => handleDeleteMajor(index === 0 ? index : item.id)}>
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
                                                    <CustomButton isDisable={loading} type={'Submit'} title="Update Occupation" containerStyles="text-blue-600 py-1.5 mt-8 px-3 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
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

export default EditOccupation;