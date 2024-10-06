import { Link } from "react-router-dom";
import { CustomButton, TextInput, LoadingComponent } from "../../../components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetPassSendTokenAction, resetSuccessAction } from "../../../redux/slices/users/usersSlices";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useEffect } from "react";

function ConfirmUsername() {
    const dispatch  = useDispatch();
    const {register, handleSubmit, formState:{errors}} = useForm({mode:'onChange'});
    const onSubmit = (data)=>{
        console.log(data.username)
        dispatch(resetPassSendTokenAction(data.username));
    }
    const storeData = useSelector(store => store.users)
    const { loading, appErr, isSuccess } = storeData;
    useEffect(()=>{
        if(isSuccess){
            dispatch(resetSuccessAction());
            window.location.href = '/user-auth/noti-send-mail'
        }
    }, [isSuccess])
    return (<>
    {loading && <LoadingComponent/>}
        <div className="w-full h-[70vh] flex pt-24 items-center flex-col relative">
            <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-5.svg" alt="img" className="absolute top-[20%] right-[20%] transition-all duration-[4000] ease-linear delay-[3000] animate-pulse "/>
            <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-3.svg" alt="img" className="absolute bottom-0 left-40 "/>
            <div className="w-[418px] flex items-center flex-col">
                <div className="text-sm text-blue-700">Forgot Password!</div>
                <div className="text-4xl font-bold mt-3 mb-2">Reset Your Password</div>
                <div className="text-sm mb-2 text-[#6c757d] text-center px-4">Enter your username of your account.</div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-full">
                    <div className="mb-5 w-full">
                        <TextInput type={'text'} register={register("username", {
                            required: "Username is required!",
                        })}
                            error={errors.username ? errors.username.message : ""} label='Username *' name='username' containerStyles='text-[#05264e] text-base w-full tw-bg-white' labelStyle='text-[#05264e] text-sm'/>
                    </div>
                    {appErr && <span className='flex flex-row items-center text-sm text-[#a9252b] mt-2 mb-3'><AiFillExclamationCircle className="mr-1" />{appErr}</span>}

                    <CustomButton type={'Submit'}  title={'Continue'}  containerStyles={'bg-[#3c65f5] focus:bg-[#05264e]  w-full py-4 pl-5 pr-5 rounded flex justify-center items-center text-white mb-3'}/>
                </form>
                <div className="flex items-center">
                    <div className="text-[#05264e] text-sm mr-1">Don't have an Account? </div>
                    <Link to={'/user-auth/register'}>
                        <div className="text-sm text-black"> Sign up</div>
                    </Link>
                </div>
            </div>

        </div>
    </>);
}

export default ConfirmUsername;