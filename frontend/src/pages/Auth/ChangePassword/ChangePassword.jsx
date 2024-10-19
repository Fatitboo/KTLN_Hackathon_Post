import { useForm } from "react-hook-form";
import { CustomButton, LoadingComponent, TextInput } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  changePasswordAction,
  resetSuccessAction,
} from "../../../redux/slices/users/usersSlices";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useEffect } from "react";
import Swal from "sweetalert2";

function ChangePassword() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    dispatch(changePasswordAction(data));
  };
  const storeData = useSelector((store) => store.users);
  const { loading, appErr, isSuccess } = storeData;
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
  }, [isSuccess]);

  return (
    <>
      <div className="px-32 pb-10 text-sm">
        {loading && <LoadingComponent />}
        {/* Start title of page  */}
        <div className="pb-8 border-b border-gray-300">
          <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">
            Change your password
          </h3>
          <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">
            Passwords must be 8+ characters.?
          </div>
        </div>
        <div className="flex flex-wrap">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-full shrink-0 w-full"
          >
            <div className="relative pt-5 shrink-0 w-full min-h-[600px]">
              <div>
                <div className="font-medium text-lg mb-8">
                  Create a new password
                </div>
                <div className="mb-5 w-[50%]">
                  <TextInput
                    type={"password"}
                    register={register("oldPassword", {
                      required: "Old Password is required",
                    })}
                    error={errors.oldPassword ? errors.oldPassword.message : ""}
                    label="Old Password *"
                    name="oldPassword"
                    containerStyles="text-[#05264e] text-base w-full tw-bg-white"
                    labelStyle="text-[#05264e] text-sm"
                  />
                </div>
                <div className="mb-5 w-[50%]">
                  <TextInput
                    type={"password"}
                    register={register("password", {
                      required: "New Password is required",
                    })}
                    error={errors.password ? errors.password.message : ""}
                    label="New Password *"
                    name="password"
                    containerStyles="text-[#05264e] text-base w-full tw-bg-white"
                    labelStyle="text-[#05264e] text-sm"
                  />
                </div>
                <div className="mb-5 w-[50%]">
                  <TextInput
                    label="Confirm New Password*"
                    type="password"
                    register={register("cPassword", {
                      validate: (value) => {
                        const { password } = getValues();

                        if (password != value) {
                          return "Password do not match";
                        }
                      },
                    })}
                    error={errors.cPassword ? errors.cPassword?.message : ""}
                    name="cPassword"
                    containerStyles="text-[#05264e] text-base w-full tw-bg-white"
                    labelStyle="text-[#05264e] text-sm"
                  />
                </div>
                {appErr && (
                  <span className="flex flex-row items-center text-base text-[#a9252b] mb-5 ">
                    <AiFillExclamationCircle className="mr-1" />
                    {appErr}
                  </span>
                )}
                {loading ? (
                  <CustomButton
                    isDisable={loading}
                    title={"Loading..."}
                    containerStyles={
                      "bg-[#ccc] focus:bg-[#05264e] w-[10%] py-2 rounded flex justify-center items-center text-white mb-3"
                    }
                  />
                ) : (
                  <CustomButton
                    isDisable={loading}
                    type={"Submit"}
                    title={"Update"}
                    containerStyles={
                      "bg-[#3c65f5] focus:bg-[#05264e] w-[10%] py-2 rounded flex justify-center items-center text-white mb-3 hover:bg-blue-700"
                    }
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
