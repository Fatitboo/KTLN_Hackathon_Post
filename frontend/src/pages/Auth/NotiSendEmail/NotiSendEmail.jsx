import { Link } from "react-router-dom";
import { CustomButton } from "../../../components";

function NotiSendEmail() {
    return (<>
        <div className="w-full h-[70vh] flex pt-24 items-center flex-col relative">
            <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-5.svg" alt="img" className="absolute top-[20%] right-[20%] transition-all duration-[4000] ease-linear delay-[3000] animate-pulse " />
            <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-3.svg" alt="img" className="absolute bottom-0 left-40 " />

            <div className="w-[418px] flex items-center flex-col">
                <img src="https://cdn1.iconfinder.com/data/icons/messaging-applications-user-interface-2/96/Artboard_28-1024.png" alt="" width={'50%'} />
                <div className="text-sm text-blue-700">Send Email Successfully!</div>
                <div className="text-4xl font-bold mt-3 mb-2">Check your Email</div>
                <div className="text-sm mb-2 text-[#6c757d] text-center px-4">Please check your email, which is registered to this account. We have just sent an email to handle your request</div>

                <div className="mt-5 w-full">
                    <CustomButton title={'Go to home'} containerStyles={'bg-[#3c65f5] focus:bg-[#05264e]  w-full py-4 pl-5 pr-5 rounded flex justify-center items-center text-white mb-3'} />
                </div>
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

export default NotiSendEmail;