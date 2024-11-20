import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";

import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";
import LoadingComponent from "../Loading";
import CustomButton from "../CustomButton";
import CustomRadioButton from "../Organizer/CustomRadioButton";
import { imgDefaultProject } from "../../assets/images";
import { useForm } from "react-hook-form";
import TextInput from "../TextInput";

export const AskToAddProject = ({
  setopenReport,
  item,
  isVacancy,
  isAddProject,
}) => {
  const { isSuccessRp, loading } = useSelector((store) => store.skills);
  const dispatch = useDispatch();
  const Reportss = [
    {
      id: 0,
      name: "Information that is discriminatory and offensive",
      value: 0,
      type: "none",
    },
    {
      id: 1,
      name: "This is a fake project or vacancy",
      value: 1,
      type: "none",
    },
    {
      id: 2,
      name: "Incorrect information",
      value: 24,
      type: "none",
    },
    {
      id: 3,
      name: "This is advertising, not employment",
      value: 7,
      type: "none",
    },
    {
      id: 4,
      name: "Another",
      value: 14,
      type: "none",
    },
  ];
  const [rpType, setRpType] = useState("");
  const [seletedTag, setSelectedTag] = useState(isAddProject ? "No" : "Yes");
  const [reDes, setRpDes] = useState("");
  function handleCheckReports(e) {
    setRpType(e.name);
  }
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
    // dispatch(loginUserAction(dataLogin));
  };
  return (
    <div className="w-[600px] rounded-lg bg-white h-auto">
      {loading && <LoadingComponent />}
      <div className="flex justify-between  pb-5">
        <div className="font-medium text-2xl text-center">
          Is this project part of a hackathon?
        </div>
        <div className="cursor-pointer" onClick={() => setopenReport(false)}>
          <CgClose size={24} />
        </div>
      </div>
      {!isAddProject && (
        <div className="flex flex-wrap mb-8 -mx-4">
          <div
            onClick={() => {
              setSelectedTag("Yes");
            }}
            className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0"
          >
            <div
              className={`h-full py-12 text-center transition-all cursor-pointer rounded-sm shadow dark:bg-gray-800 ${
                seletedTag === "Yes" ? "bg-gray-100" : ""
              } hover:shadow-lg`}
            >
              <h2 className="mb-4 text-3xl font-bold leading-9 text-[#093E10]  md:text-2xl dark:text-gray-400">
                Yes,
              </h2>
              <div className="text-base  text-gray-500 md:text-lg dark:text-gray-400">
                I'm submitting to a hackathon
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              setSelectedTag("No");
            }}
            className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0"
          >
            <div
              className={`h-full py-12 text-center transition-all border border-gray-50 cursor-pointer rounded-sm shadow dark:bg-gray-800 ${
                seletedTag === "No" ? "bg-gray-100" : ""
              } hover:shadow-lg`}
            >
              <h2 className="mb-4 text-3xl font-bold leading-9 text-blue-700 md:text-2xl dark:text-gray-400">
                No,
              </h2>
              <div className="text-base  text-gray-500 md:text-lg dark:text-gray-400">
                I'm just adding to my porfolio
              </div>
            </div>
          </div>
        </div>
      )}
      {seletedTag === "Yes" ? (
        <div className="min-h-80">
          <div className="text-center text-2xl font-medium">
            SELECT A HACKATHON
          </div>
          <div className="text-gray-300 text-sm mx-5 my-2 text-center">
            You can keep editing your project after you submit it, but you must
            submit to demo / be eligible for prizes.
          </div>
          <div>
            {[1, 2, 3, 4].map((item) => {
              return (
                <>
                  <div className="flex my-1 p-3 hover:bg-gray-100 cursor-pointer">
                    <div className="mr-4">
                      <img
                        src={imgDefaultProject}
                        alt=""
                        className="h-16 w-16"
                      />
                    </div>
                    <div>
                      <div className="font-bold">IMAGINE HACKATHON</div>
                      <div className="text-gray-400 mt-2">Online</div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex ">
            <div className="flex ">
              <CustomButton
                title="Import from github"
                containerStyles="bg-[#0b8510] w-[148px] font-medium text-white py-1 px-2 focus:outline-none hover:bg-blue-500 rounded-sm text-sm border border-blue-600"
              />
            </div>
            <div className="text-sm font-light ml-5">
              Save time by importing your project name, tagline, and README from
              GitHub.
            </div>
          </div>
          <form className="mt-4 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5 w-full">
              <TextInput
                type={"text"}
                register={register("projectName", {
                  required: "Project name is required!",
                })}
                error={errors.projectName ? errors.projectName.message : ""}
                label="What is your project called? *"
                name="projectName"
                containerStyles="text-[#05264e] text-base w-full tw-bg-white"
                labelStyle="text-[#05264e] font-medium"
              />
            </div>
            <div className="w-[1/3]">
              <CustomButton
                // isDisable={loading}
                title={"Save and continue"}
                type={"submit"}
                containerStyles={
                  "bg-[#3c65f5] focus:bg-[#05264e] w-fit py-2 pl-5 pr-5 rounded flex justify-center items-center text-white mb-3"
                }
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
