import { Link, useLocation, useNavigate } from "react-router-dom";
import { CustomButton, TextInput, LoadingComponent } from "../../../components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAction,
  oAuthWithGoogleAction,
  resetSuccessAction,
  resetUserAuthAction,
} from "../../../redux/slices/users/usersSlices";
import { AiFillExclamationCircle } from "react-icons/ai";
import { lockAccount } from "../../../assets/images";
import { IconGithub } from "../../../assets/icons";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import clientId from "../../../utils/clientGoogleId";
import Swal from "sweetalert2";

function Login() {
  const [accountType, setAccountType] = useState("seeker");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangeCheckbox = () => {
    setAccountType((prev) => {
      if (prev === "admin") {
        return "seeker";
      } else {
        return "admin";
      }
    });
  };
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    const dataLogin = {
      email: data.email,
      password: data.password,
      userType: accountType,
    };
    dispatch(loginUserAction(dataLogin));
  };
  const storeData = useSelector((store) => store.users);
  const { loading, appErr, userAuth } = storeData;
  const [isBlock, setIsBlock] = useState(false);

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
  const handleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse; // Google OAuth token
    try {
      dispatch(oAuthWithGoogleAction(credential));
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
          /* empty */
        }
      });
    }
  };
  return (
    <>
      {loading && <LoadingComponent />}
      {!isBlock ? (
        <GoogleOAuthProvider clientId={clientId}>
          <div className="w-full flex pt-24 items-center flex-col">
            <img
              src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-4.svg"
              alt="img"
              className="absolute top-[20%] right-[20%] transition-all duration-[4000] ease-linear delay-[3000] animate-pulse "
            />
            <img
              src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-3.svg"
              alt="img"
              className="absolute -z-10 bottom-0 left-40 "
            />
            <div className="w-[418px] flex items-center flex-col">
              <div className="text-sm text-blue-700">Welcome back!</div>
              <div className="text-4xl font-bold mt-3 mb-2">Member Login</div>
              <div className="text-sm mb-8 text-[#6c757d]">
                Access to all features. No credit card required.
              </div>
              {/* <CustomButton
                title={"Sign in with Google"}
                containerStyles={
                  "flex justify-center py-3 rounded items-center font-medium border border-[#ccc] w-full mb-5"
                }
              >
                <img
                  src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/template/icons/icon-google.svg"
                  alt="logo Google"
                  className="mr-1"
                />
              </CustomButton> */}
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => alert("Google Login Failed")}
              />
              <CustomButton
                title={"Sign up with GitHub"}
                containerStyles={
                  "flex justify-center py-3 rounded items-center font-medium border border-[#ccc] w-full mb-5"
                }
              >
                <img src={IconGithub} alt="logo Github" className="mr-1 w-5" />
              </CustomButton>
              <div className="flex w-full items-center ">
                <div className="h-[0.5px] w-[32%] bg-[#ccc]"></div>
                <div className="w-[35%] flex justify-center font-light text-[#05264e] text-base">
                  Continue with
                </div>
                <div className="h-[0.5px] w-[33%] bg-[#ccc]"></div>
              </div>
              <form className="mt-2 w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5 w-full">
                  <TextInput
                    type={"text"}
                    register={register("email", {
                      required: "Email is required!",
                    })}
                    error={errors.email ? errors.email.message : ""}
                    placeholder="nguyenvana"
                    label="Email*"
                    name="email"
                    containerStyles="text-[#05264e] text-base w-full tw-bg-white"
                    labelStyle="text-[#05264e] text-sm"
                  />
                </div>
                <div className="mb-3 w-full">
                  <TextInput
                    type={"password"}
                    register={register("password", {
                      required: "Password is required",
                    })}
                    error={errors.password ? errors.password.message : ""}
                    label="Password *"
                    name="password"
                    placeholder="***********"
                    containerStyles="text-[#05264e] text-base w-full tw-bg-white"
                    labelStyle="text-[#05264e] text-sm"
                  />
                </div>

                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center ">
                    <input
                      type="checkbox"
                      checked={accountType === "admin"}
                      name="isAdmin"
                      id="isAdmin"
                      className="h-5 w-5 mr-1 "
                      onChange={handleChangeCheckbox}
                    />
                    <label htmlFor="isAdmin" className="mb-1">
                      Login as a Admin?
                    </label>
                  </div>
                  <Link to={"/user-auth/confirm-username"}>
                    <div className="text-[#6c757d] text-sm cursor-pointer">
                      Forgot Password
                    </div>
                  </Link>
                </div>
                {appErr && (
                  <span className="flex flex-row items-center text-sm text-[#a9252b] mt-2 mb-3">
                    <AiFillExclamationCircle className="mr-1" />
                    {appErr}
                  </span>
                )}

                {loading ? (
                  <CustomButton
                    isDisable={loading}
                    title={"Loading..."}
                    containerStyles={
                      "bg-[#3c65f5] focus:bg-[#05264e] w-full py-4 pl-5 pr-5 rounded flex justify-center items-center text-white mb-3"
                    }
                  />
                ) : (
                  <CustomButton
                    isDisable={loading}
                    title={"Login"}
                    type={"submit"}
                    containerStyles={
                      "bg-[#3c65f5] focus:bg-[#05264e] w-full py-4 pl-5 pr-5 rounded flex justify-center items-center text-white mb-3"
                    }
                  />
                )}
              </form>
              <div className="flex items-center mb-80">
                <div className="text-[#05264e] text-sm mr-1">
                  Don't have an Account?{" "}
                </div>
                <Link to={"/user-auth/register"}>
                  <div className="text-sm text-black"> Sign up</div>
                </Link>
              </div>
            </div>
          </div>
        </GoogleOAuthProvider>
      ) : (
        <div className="w-full  flex pt-20 items-center flex-col">
          <div className="w-[50%] rounded-xl bg-[#f5f7fc] flex justify-between p-10 items-center mb-16">
            <div className="text-[35px] font-medium text-gray-600">
              Your account is block
            </div>
            <div className="w-[25%]">
              <img src={lockAccount} alt="lockAccount" />
            </div>
          </div>
          <div className=" w-[50%] border-t border-b  border-gray-200 p-16">
            <div className="text-gray-500">
              <div className="mb-4">
                <strong>
                  FindProject has noticed an issue with your organizer account.
                </strong>
                This may include insufficient account information or unusual
                login activity. <br />
              </div>
              <div className="mb-4">
                Any active vacancie or projects so potential seeker cannot
                apply.{" "}
              </div>
              <div className="mb-4">
                To restore your account, please contact our email -{" "}
                <span className="underline text-blue-700">
                  FindProject@gmail.com
                </span>{" "}
                to be supported.
              </div>
              <div className="">
                During this process, you'll asked to answer some questions to
                make sure that you represent a legitimate organizer.{" "}
              </div>
            </div>
          </div>
          <div className=" w-[50%]  border-b  border-gray-200 pt-16 px-16 mb-16">
            <div className="text-gray-500 mb-16">
              <div className="mb-4">
                <strong>Login another account to use our service.</strong>
              </div>
              <div className="mb-4">
                <Link
                  to={"/user-auth/login"}
                  onClick={() => {
                    dispatch(resetUserAuthAction());
                    setIsBlock(false);
                  }}
                >
                  <strong>Login?</strong> Or register new account
                </Link>
                <Link
                  to={"/user-auth/register"}
                  onClick={() => {
                    dispatch(resetUserAuthAction());
                    setIsBlock(false);
                  }}
                >
                  <strong>Sign up?</strong>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
