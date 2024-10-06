import { useForm } from "react-hook-form";
import { CustomButton, LoadingComponent, TextInput } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordAction, resetSuccessAction } from "../../../redux/slices/users/usersSlices";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useEffect } from "react";
import Swal from "sweetalert2";

function ChangePassword() {
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors }
    } = useForm({ mode: 'onChange' });
    const onSubmit = (data) => {

        dispatch(changePasswordAction(data))

    };
    const storeData = useSelector(store => store.users)
    const { loading, appErr, isSuccess } = storeData
    useEffect(() => {
        if (isSuccess) {
            dispatch(resetSuccessAction());
            Swal.fire({
                title: "Changed!",
                text: "Your password has been changed.",
                icon: "success",
                confirmButtonColor: "#3085d6",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    reset();
                }
            });
        }
    }, [isSuccess])

    return (
        <>
            <div className="px-10 pb-0 text-sm">
                {loading && <LoadingComponent />}
                {/* Start title of page  */}
                <div className="mb-8">
                    <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Change Password!</h3>
                    <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>
                </div>
                <div className="flex flex-wrap mx-3 mt-3">
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-full px-3 pt-3 shrink-0 w-full">
                        <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full min-h-[600px]">
                            <div className="px-10 py-10">
                                <div className="font-medium text-lg mb-5">Change password</div>
                                <div className="mb-5 w-[50%]">
                                    <TextInput type={'password'} register={register("oldPassword", {
                                        required: 'Old Password is required',
                                    })} error={errors.oldPassword ? errors.oldPassword.message : ""} label='Old Password *' name='oldPassword' containerStyles='text-[#05264e] text-base w-full tw-bg-white' labelStyle='text-[#05264e] text-sm' />
                                </div>
                                <div className="mb-5 w-[50%]">
                                    <TextInput type={'password'} register={register("password", {
                                        required: 'New Password is required',
                                    })} error={errors.password ? errors.password.message : ""} label='New Password *' name='password' containerStyles='text-[#05264e] text-base w-full tw-bg-white' labelStyle='text-[#05264e] text-sm' />
                                </div>
                                <div className="mb-5 w-[50%]">
                                    <TextInput label='Confirm New Password*'
                                        type='password'
                                        register={register("cPassword", {
                                            validate: (value) => {
                                                const { password } = getValues();

                                                if (password != value) {
                                                    return "Password do not match";
                                                }
                                            },
                                        })}
                                        error={
                                            errors.cPassword
                                                ? errors.cPassword?.message
                                                : ""
                                        } name='cPassword' containerStyles='text-[#05264e] text-base w-full tw-bg-white' labelStyle='text-[#05264e] text-sm' />
                                </div>
                                {appErr && <span className='flex flex-row items-center text-base text-[#a9252b] mb-5 '><AiFillExclamationCircle className="mr-1" />{appErr}</span>}
                                {
                                    loading ?
                                        <CustomButton isDisable={loading} title={'Loading...'} containerStyles={'bg-[#ccc] focus:bg-[#05264e] w-[10%] py-4 pl-5 pr-5 rounded flex justify-center items-center text-white mb-3'} />
                                        :
                                        <CustomButton isDisable={loading} type={'Submit'} title={'Update'} containerStyles={'bg-[#3c65f5] focus:bg-[#05264e] w-[10%] py-4 pl-5 pr-5 rounded flex justify-center items-center text-white mb-3 hover:bg-blue-700'} />
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </>
    );
}

export default ChangePassword;