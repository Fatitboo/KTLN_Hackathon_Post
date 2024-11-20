import { useParams, Link } from "react-router-dom";
import { CustomButton, TextInput } from "../../../../components";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import FroalaEditor from "react-froala-wysiwyg";
import { CgAdd, CgClose } from "react-icons/cg";
import { v4 as uuidv4 } from "uuid";
import CardProject from "../../../../components/Seeker/CardProject";
import { imgDefaultProject } from "../../../../assets/images";

function AddProject() {
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const {
    register,
    unregister,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    const dataLogin = {
      // email: data.email,
      // password: data.password,
      // userType: accountType,
    };
    // dispatch(loginUserAction(dataLogin));
  };
  const inputBox = useRef();
  const [skills, setSkills] = useState([]);
  const [listSkillApi, setListSkillApi] = useState([]);
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
  const [value, setValueDes] = useState([]);
  const [tryoutLinks, setTryoutLinks] = useState([{ id: uuidv4(), name: "" }]);
  const [galaryList, setGalaryList] = useState([]);
  const [spin, setSpin] = useState(false);
  const handleAddTryoutLinks = () => {
    setTryoutLinks((prev) => [...prev, { id: uuidv4(), name: "" }]);
  };
  const [fileThumnail, setFileThumnail] = useState(null);

  const handleDeleteLink = (deleteId) => {
    const newList = tryoutLinks.filter((item) => {
      return item.id !== deleteId;
    });
    setTryoutLinks(newList);
    unregister("field_" + deleteId);
  };
  const [loading, setLoading] = useState(false);
  const [dataBinding, setDataBinding] = useState({
    title: "",
    description: "",
  });
  const handleUpdateAvt = async (e, addList) => {
    const file = e.target.files[0];
    setLoading(true);
    const rs = await uploadImageFromLocalFiles({ file });

    setLoading(false);
    if (addList) {
      setGalaryList((prev) => [...prev, { url: rs.url, caption: "" }]);
    }
    setFileThumnail(rs.url);
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
    <>
      <div>
        <div className="py-10 px-60 flex h-40 bg-[#0b4540] w-full text-white text-center font-bold items-center justify-between">
          <div className="flex items-start flex-col">
            <h2>Post a new project</h2>
            <div className="font-light text-sm mt-5">
              Please respect our community guidelines.
            </div>
          </div>
        </div>

        <form
          className="px-60 py-5 grid grid-cols-4 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-4 w-full col-span-3 ">
            <div className="mb-5 w-full">
              <TextInput
                type={"text"}
                register={register("projectName", {
                  required: "Project name is required!",
                })}
                onBlur={(event) => {
                  setDataBinding((prev) => {
                    return {
                      ...prev,
                      title: event.target.value,
                    };
                  });
                }}
                value={dataBinding.title}
                error={errors.projectName ? errors.projectName.message : ""}
                label="What is your project called? *"
                name="projectName"
                containerStyles="text-[#05264e] text-base w-full tw-bg-white"
                labelStyle="text-[#05264e] font-medium"
              />
            </div>

            <div className="mb-5 w-full">
              <TextInput
                type={"text"}
                register={register("tagLine", {
                  required: "Tag line is required!",
                })}
                value={dataBinding.description}
                onChange={(event) => {
                  setDataBinding((prev) => {
                    console.log(
                      "🚀 ~ setDataBinding ~ event.target.value:",
                      event.target.value
                    );

                    return {
                      ...prev,
                      description: event.target.value,
                    };
                  });
                }}
                error={errors.tagLine ? errors.tagLine.message : ""}
                label="Here's the elevator pitch? *"
                description={`What's your idea? This will be a short tagline for the project`}
                name="tagLine"
                placeHolder={"A short tag line for project."}
                containerStyles="text-[#05264e] text-base w-full tw-bg-white"
                labelStyle="text-[#05264e] font-medium"
              />
            </div>

            <div className="mb-5">
              <div className="block text-base font-medium text-gray-700">
                Build with? *
              </div>
              <div className="text-xs text-[#6F6F6F] italic mb-3">
                What languages, frameworks, platforms, cloud services,
                databases, APIs, or other technologies did you use?
              </div>
              <div className="relative">
                <div
                  tabIndex={0}
                  onChange={() => setListSkillApi([])}
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
              <p className="block leading-8 text-gray-900 font-medium mt-6">
                Project descriptions*
              </p>
              <FroalaEditor
                model={value}
                onModelChange={(event, editor) => {
                  setValueDes(event);
                }}
                config={{
                  placeholderText:
                    "Provide a comprehensive job description, outlining the roles, responsibilities, qualifications, and any additional information relevant to the job.",
                  charCounterCount: true,
                  toolbarButtons: {
                    moreParagraph: {
                      buttons: ["formatUL", "outdent", "indent"],
                    },
                    moreText: {
                      buttons: ["bold", "italic", "underline", "fontSize"],
                    },
                    moreRich: {
                      buttons: ["insertImage", "insertVideo", "insertTable"],
                    },
                    moreMisc: {
                      buttons: ["undo", "redo"],
                    },
                  },
                  height: 250,
                  heightMin: 250,
                  resizable: true,
                  wordCounter: true,
                  wordCounterLabel: "words",
                  wordCounterBbCode: false,
                  wordCounterTimeout: 0,
                }}
              />
            </div>

            <div className="flex items-end my-5 ">
              <div className="w-full h-32 flex items-center justify-center border-dashed border-2 border-gray-300">
                <input
                  onChange={(e) => handleUpdateAvt(e, true)}
                  type="file"
                  name="attachment"
                  accept="image/*"
                  id="uploadImgGerally"
                  hidden
                  className="opacity-0 absolute hidden overflow-hidden h-0 w-0 z-[-1]"
                />

                <label
                  htmlFor="uploadImgGerally"
                  className="flex ml-3 rounded items-center justify-center px-2 flex-col cursor-pointer bg-gray-300 text-black  border m-0  border-[#ced4e1]  "
                >
                  Choose file
                </label>
              </div>
              {galaryList?.map((item) => {
                return <div key={item}></div>;
              })}
            </div>

            <div className="mt-6">
              <div className="">
                <div className=" font-medium text-base">
                  "Try it out" links{" "}
                </div>
                <div className="text-xs italic">
                  Add links where people can try your project or see your code.
                </div>
                <div className="grid grid-cols-1">
                  {tryoutLinks.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex w-full my-1 items-center"
                    >
                      <div className="relative mt-2 mr-3 ">
                        <input
                          type="text"
                          {...register(`field_${item.id}`)}
                          name={`field_${item.id}`}
                          className="block  focus:bg-white  text-base w-[600px] rounded-sm border-0 py-2 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          style={{
                            borderColor: `${
                              errors[`field_${index}`] ? "#a9252b" : ""
                            }`,
                            outlineColor: `${
                              errors[`field_${index}`] ? "#a9252b" : ""
                            }`,
                          }}
                          placeholder="URL for demo site, app store listing, Github repo, etc..."
                        />
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleDeleteLink(item.id)}
                      >
                        <CgClose />
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  onClick={handleAddTryoutLinks}
                  className="cursor-pointer text-blue-600 my-5"
                >
                  ADD ANOTHER LINK
                </div>
              </div>

              <div className="mb-5 w-full">
                <TextInput
                  type={"text"}
                  register={register("videoLink")}
                  label="Video demo link"
                  name="videoLink"
                  description={
                    "This video will be embedded at the top of your project page. "
                  }
                  containerStyles="text-[#05264e] text-base w-full tw-bg-white"
                  labelStyle="text-[#05264e] font-medium"
                  placeHolder="Youtube, Facebook Video, Vimeo or Youku URL"
                />
              </div>
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
          </div>
          <div className="mt-5 w-full col-span-1">
            <div className="font-medium text-base">Thumnail Image</div>
            <div className=" cursor-pointer max-w-xs bg-white border border-gray-300 rounded-sm hover:shadow-md">
              <div className="">
                <img
                  src={fileThumnail ?? imgDefaultProject}
                  alt={dataBinding?.title}
                  className="h-48 w-full"
                />
                <div className=" px-2 h-16">
                  <h3 className="mt-2 text-base font-semibold line-clamp-1">
                    {dataBinding?.title}
                  </h3>
                  <p className="mt-1 text-gray-600 line-clamp-2 italic text-sm">
                    {dataBinding?.description}
                  </p>
                </div>
              </div>
            </div>
            <input
              onChange={(e) => handleUpdateAvt(e)}
              type="file"
              name="attachment"
              accept="image/*"
              id="uploadImg"
              hidden
              className="opacity-0 absolute hidden overflow-hidden h-0 w-0 z-[-1]"
            />
            <div
              htmlFor="uploadImg"
              className="cursor-pointer text-blue-600 my-5"
            >
              Change image
            </div>
            <div className="text-sm text-gray-700">
              JPG, PNG or GIF format, 5 MB max file size. For best results, use
              a 3:2 ratio.
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddProject;
