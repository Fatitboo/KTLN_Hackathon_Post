import { Link } from "react-router-dom";
import { CustomButton } from "../../../components";

function unAuthoPage() {
    return (<>
        <div className="w-full h-[70vh] flex pt-24 items-center flex-col relative">
            <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-5.svg" alt="img" className="absolute top-[20%] right-[20%] transition-all duration-[4000] ease-linear delay-[3000] animate-pulse " />
            <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-3.svg" alt="img" className="absolute bottom-0 left-40 " />

            <div className="w-[418px] flex items-center flex-col">
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-lock-1851239-1569128.png" alt="" width={'50%'} />
                <div className="text-[80px] text-blue-800 font-bold mt-3 mb-2 ">401</div>
                <div className="text-sm mb-2 text-[#6c757d] text-center px-4">You are not unauthozied to access this page!</div>

                <div className="mt-5 w-full">
                    <CustomButton title={'Go to home'} containerStyles={'bg-[#3c65f5] focus:bg-[#05264e]  w-full py-4 pl-5 pr-5 rounded flex justify-center items-center text-white mb-3'} />
                </div>
                
            </div>

        </div>
    </>);
}

export default unAuthoPage;