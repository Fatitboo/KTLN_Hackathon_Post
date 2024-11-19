import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  oAuthWithGithubAction,
  resetSuccessAction,
} from "../../../redux/slices/users/usersSlices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function LoginGithubSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeData = useSelector((store) => store.users);
  const { loading, appErr, userAuth } = storeData;
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log("🚀 ~ useEffect ~ code:", code);

    if (code) {
      try {
        dispatch(oAuthWithGithubAction(code));
      } catch (error) {
        console.error("Login failed:", error);
        dispatch(resetSuccessAction());
        Swal.fire({
          title: "Login failed!",
          text: "Login failed, please try again.",
          confirmButtonText: "OK",
          icon: "error",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/user-auth/login");
          }
        });
      }
    }
  }, []);
  useEffect(() => {
    if (userAuth) {
      if (userAuth?.user?.isVerify) {
        if (userAuth?.user?.isActive) {
          if (userAuth?.user?.userType.includes("seeker")) {
            if (userAuth?.user?.isSetPersionalSetting) {
              navigate("/");
            } else {
              navigate("/setting-recommend");
            }
          }
          if (userAuth?.user?.userType.includes("admin")) {
            navigate("/Admin");
          }
        }
      }
    }
  }, [navigate, userAuth]);
  return (
    <>
      <div className="w-full h-[70vh] flex pt-24 items-center flex-col relative">
        <img
          src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-5.svg"
          alt="img"
          className="absolute top-[20%] right-[20%] transition-all duration-[4000] ease-linear delay-[3000] animate-pulse "
        />
        <img
          src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-3.svg"
          alt="img"
          className="absolute bottom-0 left-40 "
        />

        <div className="w-[418px] flex items-center flex-col">
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/free-lock-1851239-1569128.png"
            alt=""
            width={"50%"}
          />
          <div className="text-[60px] text-blue-800 font-bold mt-3 mb-2 ">
            Please wait...
          </div>
          <div>Processing GitHub login...</div>
          {/* <Link className="mt-5 w-full" to={'/'}>
                    <CustomButton title={'Go to home'} containerStyles={'bg-[#3c65f5] focus:bg-[#05264e]  w-full py-4 pl-5 pr-5 rounded flex justify-center items-center text-white mb-3'} />
                </Link> */}
        </div>
      </div>
    </>
  );
}

export default LoginGithubSuccess;
