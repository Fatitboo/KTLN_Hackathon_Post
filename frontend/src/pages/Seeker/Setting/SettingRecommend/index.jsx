import { AiFillExclamationCircle } from "react-icons/ai";
import {
  CustomButton,
  LoadingComponent,
  TextInput,
} from "../../../../components";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import {
  changePasswordAction,
  resetSuccessAction,
} from "../../../../redux/slices/users/usersSlices";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import fetchSkillApikey from "../../../../utils/fetchSkillApiKey";
import { IoIosClose } from "react-icons/io";

const SettingHackathonRecommend = () => {
  const specializes = [
    {
      id: 1,
      name: "Full-stack developer",
    },
    {
      id: 2,
      name: "Front-end developer",
    },
    {
      id: 3,
      name: "Mobile developer",
    },
    {
      id: 4,
      name: "Designer",
    },
    {
      id: 5,
      name: "Data scientist",
    },
    {
      id: 6,
      name: "Back-end developer",
    },
    {
      id: 7,
      name: "Business",
    },
    {
      id: 8,
      name: "Product manager",
    },
    {
      id: 9,
      name: "Android app developer",
    },
  ];
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
  const [skills, setSkills] = useState([]);
  const [specialty, setSpecialty] = useState("");
  const specialties = [
    "Full-stack developer",
    "Front-end developer",
    "Back-end developer",
    "Mobile developer",
    "Data scientist",
    "Designer",
    "Product manager",
    "Business",
    "Other",
  ];
  const inputBox = useRef();

  const hackathonTypes = [
    "AR/VR",
    "Beginner Friendly",
    "Blockchain",
    "Communication",
    "Cybersecurity",
    "Databases",
    "Design",
    "DevOps",
    "E-commerce/Retail",
    "Education",
    "Enterprise",
    "Fintech",
    "Gaming",
    "Health",
    "IoT",
    "Lifehacks",
    "Low/No Code",
    "Machine Learning/AI",
    "Mobile",
    "Music/Art",
    "Open Ended",
    "Productivity",
    "Quantum",
    "Robotic Process Automation",
    "Social Good",
    "Voice skills",
    "Web",
  ];
  const [listSkillApi, setListSkillApi] = useState([]);
  const [spin, setSpin] = useState(false);
  const [occupation, setOccupation] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");
  const [interests, setInterest] = useState([]);
  const handleHackathonTypeChange = (value) => {
    setInterest((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };
  const handleSpecialtyChange = (value) => setSpecialty(value);
  var myHeaders = new Headers();
  myHeaders.append("apikey", fetchSkillApikey);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  const fetchDataSkill = (value) => {
    if (value === "") {
      setListSkillApi([]);
    } else {
      setSpin(true);
      fetch("https://api.apilayer.com/skills?q=" + value, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setListSkillApi([...result]);
          setSpin(false);
        })
        .catch((error) => console.log("error", error));
    }
  };
  return (
    <>
      <div className="px-32 pb-10 pt-16 text-sm">
        {/* {loading && <LoadingComponent />} */}
        {/* Start title of page  */}
        <div className="pb-8 border-b border-gray-300">
          <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">
            Preferences & eligibility
          </h3>
          <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">
            This information helps us match you with hackathons and potential
            teammates.
          </div>
        </div>
        <div className="flex flex-wrap">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-full shrink-0 w-full"
          >
            <div className="relative pt-5 pb-5 shrink-0 w-full min-h-[600px] border-b border-gray-200">
              <div>
                <div className="font-medium text-xl mb-5">Preferences</div>
                <div>
                  <div className="mb-6">
                    <div className="block text-base font-medium text-gray-700">
                      * What's your specialty?
                    </div>
                  </div>
                  <div className="flex flex-wrap text-gray-500">
                    {specialties.map((item) => (
                      <div
                        key={item}
                        className={`px-4 py-1 flex items-center cursor-pointer rounded-sm border my-1 mr-2
                ${specialty === item ? " border-blue-900" : "border-gray-300"}
              `}
                        onClick={() => handleSpecialtyChange(item)}
                      >
                        {specialty === item ? (
                          <CheckCircleIcon className="rounded-full bg-gray-200 w-5 h-5 mr-2" />
                        ) : (
                          <div className="rounded-full bg-gray-200 w-5 h-5 mr-2" />
                        )}
                        {item}
                      </div>
                    ))}
                  </div>
                  {specialty === "Other" && (
                    <div className="mb-2 -mt-4 w-[50%]">
                      <TextInput
                        register={register("oldPassword", {
                          required: "Old Password is required",
                        })}
                        placeHolder={"Type your specialty"}
                        error={
                          errors.oldPassword ? errors.oldPassword.message : ""
                        }
                        name="oldPassword"
                        containerStyles="text-[#05264e] text-base w-full tw-bg-white"
                        labelStyle="text-[#05264e] text-sm"
                      />
                    </div>
                  )}
                </div>

                <div className=" my-6">
                  <div className="block text-base font-medium text-gray-700 mb-6">
                    * What are your skills?
                  </div>
                  <div className="relative">
                    <div
                      tabIndex={0}
                      onBlur={() => setListSkillApi([])}
                      className={`relative flex flex-row gap-1 flex-wrap items-center w-full bg-white focus:bg-white focus:border-gray-900 text-base shadow-sm rounded-sm pl-5 py-1 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                    >
                      {skills?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-row items-center rounded gap-1 bg-gray-100 py-1 px-2 text-sm h-8"
                          >
                            <div className="whitespace-nowrap">{item}</div>
                            <div
                              className="cursor-pointer"
                              onClick={() =>
                                setSkills(skills.filter((i) => i != item))
                              }
                            >
                              <IoIosClose />
                            </div>
                          </div>
                        );
                      })}
                      <div className="flex-1 ">
                        <input
                          type="text"
                          ref={inputBox}
                          placeholder={
                            "Input your skills, languages, databases, APIs and other tools."
                          }
                          onBlur={(e) => e.stopPropagation()}
                          onChange={(e) => fetchDataSkill(e.target.value)}
                          className={`min-w-5 w-full block focus:outline-none bg-white  focus:bg-white text-base  rounded-md pr-5 text-gray-900 border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                        />
                      </div>

                      {spin ? (
                        <svg
                          className="absolute right-1 animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="white"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="white"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="#cccccc"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : null}
                    </div>
                    <div
                      className="relative"
                      style={{
                        visibility:
                          listSkillApi.length === 0 ? "collapse" : "visible",
                      }}
                    >
                      <div className="border mt-1 rounded overflow-auto absolute z-10 w-full max-h-56">
                        {listSkillApi.map((item, index) => {
                          return (
                            <div
                              onClick={() => {
                                !skills.includes(item) &&
                                  setSkills([...skills, item]);
                                inputBox.current.value = "";
                                setListSkillApi([]);
                              }}
                              key={index}
                              className={`hover:bg-[#eef1f2]  block focus:outline-none bg-white focus:bg-white text-base shadow-sm py-2 pl-5 pr-5 text-gray-90 placeholder:text-gray-400 sm:text-base sm:leading-8 cursor-pointer`}
                            >
                              {item}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-6">
                    <div className="block text-base font-medium text-gray-700">
                      * What types of hackathons are you interested in?
                    </div>
                  </div>
                  <div className="grid grid-cols-3 text-gray-500">
                    {hackathonTypes.map((item) => (
                      <div
                        key={item}
                        className={`px-4 py-1 flex items-center cursor-pointer rounded-sm border my-1 mr-2
                ${interests === item ? " border-blue-900" : "border-gray-300"}
              `}
                        onClick={() => handleHackathonTypeChange(item)}
                      >
                        {interests.includes(item) ? (
                          <CheckCircleIcon className="rounded-full bg-gray-200 w-5 h-5 mr-4" />
                        ) : (
                          <div className="rounded-full bg-gray-200 w-5 h-5 mr-2" />
                        )}
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative pt-5 shrink-0 w-full min-h-[600px]">
              <div>
                <div className="font-medium text-xl mb-5">Eligibility</div>
                <div>
                  <div className="mb-2">
                    <div className="block text-base font-medium text-gray-700">
                      * Occupation
                    </div>
                  </div>
                  <div className="flex flex-wrap text-gray-500">
                    {["Student", "Professional / Post Grad"].map((item) => (
                      <div
                        key={item}
                        className={`px-4 py-1 flex items-center cursor-pointer rounded-sm border my-1 mr-2
                ${occupation === item ? " border-blue-900" : "border-gray-300"}
              `}
                        onClick={() => setOccupation(item)}
                      >
                        {occupation === item ? (
                          <CheckCircleIcon className="rounded-full bg-gray-200 w-5 h-5 mr-2" />
                        ) : (
                          <div className="rounded-full bg-gray-200 w-5 h-5 mr-2" />
                        )}
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mb-2">
                    <div className="block text-base font-medium text-gray-700 mt-5">
                      * Current student level
                    </div>
                  </div>
                  <div className="flex flex-wrap text-gray-500">
                    {["College", "High School", "Middle School"].map((item) => (
                      <div
                        key={item}
                        className={`px-4 py-1 flex items-center cursor-pointer rounded-sm border my-1 mr-2
                ${
                  currentLevel === item ? " border-blue-900" : "border-gray-300"
                }
              `}
                        onClick={() => setCurrentLevel(item)}
                      >
                        {currentLevel === item ? (
                          <CheckCircleIcon className="rounded-full bg-gray-200 w-5 h-5 mr-2" />
                        ) : (
                          <div className="rounded-full bg-gray-200 w-5 h-5 mr-2" />
                        )}
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-10">
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default SettingHackathonRecommend;
