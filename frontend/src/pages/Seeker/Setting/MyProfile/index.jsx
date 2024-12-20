import { useDispatch, useSelector } from "react-redux";
import {
  CustomButton,
  TextInput,
  LoadingComponent,
} from "../../../../components";
import { useEffect, useState } from "react";
import {
  getUserProfileAction,
  resetSuccessAction,
  updateUserAction,
} from "../../../../redux/slices/users/usersSlices";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { defaultAvt } from "../../../../assets/images";

function MyProfile() {
  const dispatch = useDispatch();
  const [errImg, setErrImg] = useState(null);
  const [uProfile, setUProfile] = useState({});
  const [loading2, setLoading] = useState(false);
  const [fileThumnail, setFileThumnail] = useState(null);
  const storeData = useSelector((store) => store?.users);
  const notify = (type, message) => toast(message, { type: type });
  const { register, handleSubmit, setValue } = useForm({ mode: "onChange" });
  const { userProfile, loading, appErr, isSuccess, isSuccessUpd } = storeData;

  const onSubmitInfo = (data) => {
    const dt = {
      updateType: "profile_user",
      fullname: data.fullname,
      bio: data.bio,
      linkedinLink: data.linkedinLink,
      facebookLink: data.facebookLink,
      githubLink: data.githubLink,
      address: data.address,
      dob: data.dob,
    };
    console.log(dt);
    dispatch(updateUserAction(dt));
  };
  useEffect(() => {
    dispatch(
      getUserProfileAction({
        getType: "all",
        getBy: "id",
      })
    );
  }, []);

  useEffect(() => {
    if (isSuccessUpd) {
      dispatch(
        getUserProfileAction({
          getType: "all",
          getBy: "id",
        })
      );
      dispatch(resetSuccessAction());
      notify("success", "Update user profile successfully!");
    }
  }, [isSuccessUpd]);

  useEffect(() => {
    setUProfile({ ...userProfile });
    console.log("🚀 ~ useEffect ~ userProfile:", userProfile);
    setFileThumnail(userProfile?.avatar);
    setValue("fullname", userProfile?.fullname);
    setValue("email", userProfile?.email);
    setValue("dob", convertDate(userProfile?.dob));
    setValue("address", userProfile?.address);
    setValue("bio", userProfile?.bio);
    setValue("facebookLink", userProfile?.facebookLink);
    setValue("linkedinLink", userProfile?.linkedinLink);
    setValue("githubLink", userProfile?.githubLink);
  }, [userProfile]);

  const convertDate = (tt) => {
    const date = new Date(tt);

    // Lấy thông tin ngày, tháng, năm
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Thêm '0' phía trước nếu tháng là số đơn
    const day = String(date.getDate()).padStart(2, "0"); // Thêm '0' phía trước nếu ngày là số đơn

    // Tạo chuỗi ngày theo định dạng 'yyyy-MM-dd'
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const handleUpdateAvt = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const rs = await uploadImageFromLocalFiles({ file });
      dispatch(updateUserAction({ updateType: "avatar", avatar: rs.url }));
      setLoading(false);
    }
  };

  const uploadImageFromLocalFiles = async ({ file }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "upload_audio"); // Set this in your Cloudinary dashboard

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dvnxdtrzn/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data;

      // return uploadUrls;
    } catch (error) {
      console.error("Error uploading image::", error);
    }
  };

  return (
    <div className="px-32 pb-10 pt-16">
      {/* Start title of page  */}
      {loading && <LoadingComponent />}
      <ToastContainer />
      <div className="pb-5 border-b border-gray-300">
        <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">
          Profile info!
        </h3>
        <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">
          This information will appear on your public HackathonPost profile
        </div>
      </div>
      <div className="flex flex-wrap">
        <form
          className="max-w-full pt-3 w-full"
          onSubmit={handleSubmit(onSubmitInfo)}
        >
          <div className="relative  mb-8 bg-white  max-w-full pt-1 shrink-0 w-full">
            <div className=" font-medium text-base mr-8">My photo </div>
            <div className="relative pt-3">
              <div className="  mb-8 pb-4 border-b border-solid border-[#f1f3f7]">
                <div className="flex items-end">
                  <div className="relative flex items-end ">
                    <img
                      src={fileThumnail ?? defaultAvt}
                      alt="avt"
                      className="w-[120px] border rounded-full"
                    />
                    <input
                      onChange={(e) => handleUpdateAvt(e)}
                      type="file"
                      name="attachment"
                      accept="image/*"
                      id="upload"
                      hidden
                      className="opacity-0 absolute hidden overflow-hidden h-0 w-0 z-[-1]"
                    />
                    <label
                      htmlFor="upload"
                      className="flex items-center justify-center flex-col cursor-pointer ml-4 h-[30px] w-[150px] rounded  border-dashed m-0 border-[2px] border-[#ced4e1]  "
                    >
                      Browse Image
                    </label>
                  </div>
                  <div className="text-sm font-normal text-[#696969] ml-2 flex items-end mb-1.5">
                    Max file size is 5MB And Suitable files are .jpg & .png
                  </div>
                </div>
                {errImg && (
                  <span className="flex flex-row items-center text-base text-[#a9252b] mt-4 ">
                    <AiFillExclamationCircle className="mr-1" />
                    {errImg}
                  </span>
                )}
              </div>

              <div className="relative">
                {appErr && (
                  <span className="flex flex-row items-center text-base text-[#a9252b] mt-2 ml-8">
                    <AiFillExclamationCircle className="mr-1" />
                    {appErr}
                  </span>
                )}

                <div className="grid grid-cols-2 pb-4 gap-5">
                  <div className="px-1">
                    <TextInput
                      value={uProfile?.fullname}
                      name="fullname"
                      register={register("fullname")}
                      type="text"
                      label="Full Name"
                      placeholder="Nguyen Van Phat"
                      styles="bg-[#f0f5f7]"
                    />
                  </div>

                  <div className="px-1">
                    <TextInput
                      value={uProfile?.email}
                      name="email"
                      register={register("email")}
                      readOnly={true}
                      type="email"
                      label="Email"
                      placeholder="vanphat@gmail.com"
                      styles="bg-[#f0f5f7]"
                    />
                  </div>
                  <div className="px-1">
                    <TextInput
                      name="addres"
                      value={userProfile?.address}
                      register={register("address")}
                      type="text"
                      label="Address"
                      placeholder="..."
                      styles="bg-[#f0f5f7]"
                    />
                  </div>
                  <div className="px-1">
                    <label
                      htmlFor="dob"
                      className="block leading-8 text-gray-900 font-medium"
                    >
                      Date of birth
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm ">
                      <input
                        defaultValue={convertDate(uProfile?.dob)}
                        type="date"
                        {...register("dob")}
                        name="dob"
                        id="dob"
                        className="block bg-white focus:bg-white text-base w-full rounded-sm border-0 py-1 px-3 text-gray-900 ring-1 ring-inset focus:ring-4 focus:ring-[#8DB3FB] ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative  max-w-full pt-1 shrink-0 w-full">
            <div className="font-medium text-3xl  mr-8">Social Network</div>
            <div className="relative pt-3">
              <div className="relative">
                <div className="grid grid-cols-2 gap-5">
                  <div className="px-1 ">
                    <TextInput
                      name="githubLink"
                      value={uProfile?.githubLink}
                      register={register("githubLink")}
                      type="text"
                      label="Github"
                      placeholder="www.Github.com/Nguyenvana"
                      styles="bg-[#f0f5f7]"
                    />
                  </div>
                  <div className="px-1 ">
                    <TextInput
                      name="facebookLink"
                      value={uProfile?.facebookLink}
                      register={register("facebookLink")}
                      type="text"
                      label="Facebook"
                      placeholder="www.facebook.com/@Nguyenvana"
                      styles="bg-[#f0f5f7]"
                    />
                  </div>
                  <div className="px-1 ">
                    <TextInput
                      name="linkedinLink"
                      value={uProfile?.linkedinLink}
                      register={register("linkedinLink")}
                      type="text"
                      label="Linkedin"
                      placeholder="www.linkedin.com/Nguyenvana"
                      styles="bg-[#f0f5f7]"
                    />
                  </div>
                  <div className="px-1 ">
                    <TextInput
                      name="bio"
                      value={uProfile?.bio}
                      register={register("bio")}
                      type="text"
                      label="Website"
                      placeholder="www.Website.com/Nguyenvana"
                      styles="bg-[#f0f5f7]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative mt-5 max-w-full pt-1 shrink-0 w-full">
            <div className="grid grid-cols-2 gap-5">
              {loading ? (
                <CustomButton
                  isDisable={loading}
                  title={"Loading..."}
                  containerStyles="text-blue-600 justify-center w-[50%] flex py-2 px-4 mb-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-sm text-base border border-blue-600"
                />
              ) : (
                <CustomButton
                  isDisable={loading}
                  type={"Submit"}
                  title={"Save changes"}
                  containerStyles="text-blue-600 justify-center w-[50%] flex py-2 px-4 mb-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-sm text-base border border-blue-600"
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default MyProfile;
