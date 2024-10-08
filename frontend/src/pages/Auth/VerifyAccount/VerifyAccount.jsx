import { Link, useParams } from "react-router-dom";
import { CustomButton, LoadingComponent } from "../../../components";
import { pleaseWaiting, verifiedSuccessfulImage } from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyAccountAction } from "../../../redux/slices/accountVerication/accountVericationSlices";
import { logoutUserAction } from "../../../redux/slices/users/usersSlices";

function VerifyAccount() {
    const dispatch = useDispatch()
    const { token } = useParams()
    useEffect(() => {
        dispatch(verifyAccountAction(token));
    }, [dispatch, token]);
    const account = useSelector(state => state.account);
    const { loading, appErr, serverErr, isVerified } = account;

    return (<>
        {loading && <LoadingComponent />}

        {isVerified ? <div className="w-full h-[70vh] flex pt-24 items-center flex-col relative">
            <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-5.svg" alt="img" className="absolute top-[20%] right-[20%] transition-all duration-[4000] ease-linear delay-[3000] animate-pulse " />
            <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-3.svg" alt="img" className="absolute bottom-0 left-40 " />

            <div className="w-[418px] flex items-center flex-col">
                <img src={verifiedSuccessfulImage} alt="" width={'50%'} />
                {appErr ? <div className="text-sm text-red-700">{appErr}</div> : <div className="text-sm text-blue-700">Account Verified!</div>}
                <div className="text-4xl font-bold mt-3 mb-2">Login back!</div>
                <div className="text-sm mb-2 text-[#6c757d] text-center px-4">Your account is now verified. Please Logout and login back to see
                    the changes.</div>

                <Link to={'/user-auth/login'} className="mt-5 w-full" >
                    <CustomButton onClick={() => dispatch(logoutUserAction())} title={'Logout'} containerStyles={'bg-[#3c65f5] focus:bg-[#05264e]  w-full py-4 pl-5 pr-5 rounded flex justify-center items-center text-white mb-3'} />
                </Link>

            </div>

        </div> : <div className="h-[800px] flex items-center justify-center">
            
            <img src={pleaseWaiting} alt="" className="w-40"/></div>}
    </>);
}

export default VerifyAccount;