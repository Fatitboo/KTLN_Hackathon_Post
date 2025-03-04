import { Link, useNavigate } from "react-router-dom";
import { CustomButton, TextInput, LoadingComponent } from "../../../components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  oAuthWithGoogleAction,
  registerUserAction,
  resetSuccessAction,
} from "../../../redux/slices/users/usersSlices";
import { AiFillExclamationCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import { IconGithub } from "../../../assets/icons";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import clientId from "../../../utils/clientGoogleId";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    const dataRegister = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirm_password: data.cPassword,
      userType: "seeker",
      googleAccountId: 0,
      githubAccountId: 0,
    };
    dispatch(registerUserAction(dataRegister));
  };
  const storeData = useSelector((store) => store.users);
  const { loading, appErr, isSuccess, registered, userAuth } = storeData;

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetSuccessAction());
      Swal.fire({
        title: "Registed Successfuly!",
        text: "Please verify your email and login again!",
        confirmButtonText: "Login",
        icon: "success",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/user-auth/login");
        }
      });
    }
  }, [dispatch, isSuccess, navigate]);
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

      <GoogleOAuthProvider clientId={clientId}>
        <div className="w-full  flex pt-24 items-center flex-col ">
          <img
            src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-1.svg"
            alt="img"
            className="absolute top-[20%] right-[20%] transition-all duration-[4000] ease-linear delay-[3000] animate-pulse z-[-100]"
          />
          <img
            src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-2.svg"
            alt="img"
            className="absolute bottom-0 left-40 z-[-100]"
          />
          <div className="w-[418px] flex items-center flex-col">
            <div className="text-sm text-blue-700">Register!</div>
            <div className="text-4xl font-bold mt-3 mb-2">
              Start for free Today
            </div>
            <div className="text-sm mb-4 text-[#6c757d]">
              Access to all features. No credit card required.
            </div>
            {/* <CustomButton
              title={"Sign up with Google"}
              onClick={handleLogin}
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
            <div className="flex items-center gap-3">
              <GoogleLogin
                text="Sign up with Google"
                onSuccess={handleSuccess}
                onError={() => alert("Google Login Failed")}
              />
              <CustomButton
                title={"Sign up with GitHub"}
                containerStyles={
                  "flex justify-center py-2 rounded items-center text-sm  items-center border border-[#ccc] w-[210px] px-2 my-5"
                }
              >
                <img src={IconGithub} alt="logo Github" className="mr-1 w-5" />
              </CustomButton>
            </div>

            <div className="flex w-full items-center ">
              <div className="h-[0.5px] w-[32%] bg-[#ccc]"></div>
              <div className="w-[45%] flex justify-center font-light text-[#05264e] text-base">
                Or sign up with Email
              </div>
              <div className="h-[0.5px] w-[33%] bg-[#ccc]"></div>
            </div>
            <form className="mt-2 w-full" onSubmit={handleSubmit(onSubmit)}>
              {/* <div className="w-full flex items-center justify-center py-4">
              <div
                onClick={() => setAccountType("seeker")}
                className={`flex cursor-pointer mr-1 px-4 py-3 rounded outline-none ${
                  accountType === "seeker"
                    ? "bg-[#1d4fd862] text-blue-900 font-semibold"
                    : "bg-white border border-blue-400"
                }`}
              >
                Seeker Account
              </div>
              <div
                onClick={() => setAccountType("organizer")}
                className={`flex cursor-pointer px-4 py-3 rounded outline-none ${
                  accountType !== "seeker"
                    ? "bg-[#1d4fd862] text-blue-900 font-semibold"
                    : "bg-white border border-blue-400"
                }`}
              >
                Organizer Account
              </div>
            </div> */}
              <div className="mb-5 w-full">
                <TextInput
                  type={"text"}
                  register={register("fullname", {
                    required: "Full Name is required",
                  })}
                  error={errors.fullname ? errors.fullname.message : ""}
                  placeholder={`${"Nguyen Van A"}`}
                  label={`${"Full Name *"}`}
                  name="fullname"
                  containerStyles="text-[#05264e] text-base w-full tw-bg-white"
                  labelStyle="text-[#05264e] text-sm"
                />
              </div>

              <div className="mb-5 w-full">
                <TextInput
                  type={"email"}
                  register={register("email", {
                    required: "Email is required!",
                  })}
                  error={errors.email ? errors.email.message : ""}
                  placeholder="vananguyen@gmail.com"
                  label="Email *"
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
              <div className="mb-3 w-full">
                <TextInput
                  label="Confirm Password"
                  placeholder="Password"
                  type="password"
                  register={register("cPassword", {
                    validate: (value) => {
                      const { password } = getValues();

                      if (password != value) {
                        return "Passwords do no match";
                      }
                    },
                  })}
                  error={errors.cPassword ? errors.cPassword?.message : ""}
                  name="cPassword"
                  containerStyles="text-[#05264e] text-base w-full tw-bg-white"
                  labelStyle="text-[#05264e] text-sm"
                />
              </div>

              <div className="flex justify-between items-center mb-5 ">
                <div className="flex items-center z-50">
                  <input
                    type="checkbox"
                    name="agreePolicy"
                    id="agreePolicy"
                    className="h-5 w-5 mr-1 "
                  />
                  <label htmlFor="agreePolicy">
                    Agree our terms and policy
                  </label>
                </div>
                <Link to={"/"}>
                  <div className="text-[#6c757d] text-sm">Learn more</div>
                </Link>
              </div>
              {registered?.message && (
                <span className="flex flex-row items-center text-sm text-[#2537a9] mt-2 mb-3">
                  <AiFillExclamationCircle className="mr-1" />
                  {registered?.message}
                </span>
              )}

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
                    "bg-[#ccc] focus:bg-[#05264e] w-full py-4 pl-5 pr-5 rounded flex justify-center items-center text-white mb-3"
                  }
                />
              ) : (
                <CustomButton
                  isDisable={loading}
                  type={"Submit"}
                  title={"Submit & Register"}
                  containerStyles={
                    "bg-[#3c65f5] focus:bg-[#05264e] w-full py-4 pl-5 pr-5 rounded flex justify-center items-center text-white mb-3"
                  }
                />
              )}
            </form>
            <div className="flex items-center ">
              <div className="text-[#05264e] text-sm mr-1">
                Already have an account?
              </div>
              <Link to={"/user-auth/login"}>
                <div className="text-sm text-black"> Sign in</div>
              </Link>
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default Register;
