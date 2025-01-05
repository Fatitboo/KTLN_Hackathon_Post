import {
  useParams,
  Link,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { CustomButton, TextInput } from "../../../../components";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import FroalaEditor from "react-froala-wysiwyg";
import { CgClose } from "react-icons/cg";
import { v4 as uuidv4 } from "uuid";
import { imgDefaultProject } from "../../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectSingle,
  resetSuccessAction,
  updateProject,
} from "../../../../redux/slices/projects/projectsSlices";
import fetchSkillApikey from "../../../../utils/fetchSkillApiKey";
import { IoIosClose } from "react-icons/io";
import extractId from "../../../../utils/extractId";

function AddProject() {
  const inputBox = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [spin, setSpin] = useState(false);
  const [skills, setSkills] = useState([]);
  const [value, setValueDes] = useState(
    `<h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;' id="isPasted"><strong><span style="font-size: 18px;">Inspiration</span></strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong><span style="font-size: 18px;">What it does</span></strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong><span style="font-size: 18px;"> How I built it</span></strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong><span style="font-size: 18px;">Challenges I ran into</span></strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong><span style="font-size: 18px;">Accomplishments that I'm proud of</span></strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong><span style="font-size: 18px;">What I learned</span></strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong><span style="font-size: 18px;">What's next</span></strong></h4>`
  );
  const [loading, setLoading] = useState(false);
  const [titleBinding, setTitleBinding] = useState("");
  const [taglineBinding, setTaglineBinding] = useState("");
  const [galaryList, setGalaryList] = useState([]);
  const [listSkillApi, setListSkillApi] = useState([]);
  const { hackathonId } = useOutletContext();

  const [fileThumnail, setFileThumnail] = useState(null);
  const { project, isSuccess } = useSelector((store) => store.projects);
  const [tryoutLinks, setTryoutLinks] = useState([{ id: uuidv4(), name: "" }]);
  var myHeaders = new Headers();
  myHeaders.append("apikey", fetchSkillApikey);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

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
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    const pl = {
      projectTitle: data.projectName,
      tagline: data.tagLine,
      content: value.toString(),
      thumnailImage: fileThumnail,
      builtWith: skills,
      tryoutLinks: tryoutLinks.map((item) => data[`field_${item?.id}`]),
      galary: [{ url: data.videoLink, caption: "" }, ...galaryList],
    };
    dispatch(
      updateProject({
        id: extractId({ str: projectId }),
        data: pl,
        navigate,
        path: projectId?.includes("!imptHktid_")
          ? `/Seeker/project/manage-project/${extractId({
              str: projectId,
            })}/submit`
          : "/Seeker-detail/my-porfolio/Projects",
      })
    );
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

  const handleAddTryoutLinks = () => {
    setTryoutLinks((prev) => [...prev, { id: uuidv4(), name: "" }]);
  };

  const handleDeleteLink = (deleteId) => {
    const newList = tryoutLinks.filter((item) => {
      return item.id !== deleteId;
    });
    setTryoutLinks(newList);
    unregister("field_" + deleteId);
  };

  const handleUpdateAvt = async (e, addList) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const rs = await uploadImageFromLocalFiles({ file });

      setLoading(false);
      if (addList) {
        setGalaryList((prev) => [...prev, { url: rs.url, caption: "" }]);
      } else setFileThumnail(rs.url);
    }
  };

  // Hàm xử lý thay đổi caption
  const handleCaptionChange = (url, newCaption) => {
    setGalaryList((prevFiles) => {
      return prevFiles.map((file) =>
        file.url === url ? { ...file, caption: newCaption } : file
      );
    });
  };
  const handleDeleteGalaryItem = (url) => {
    setGalaryList((prevFiles) => prevFiles.filter((file) => file.url !== url));
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

  useEffect(() => {
    if (projectId !== undefined) {
      const prjId = extractId({ type: "projectId", str: projectId });
      dispatch(getProjectSingle(prjId));
    }
  }, [projectId]);

  useEffect(() => {
    if (isSuccess) {
      console.log("🚀 ~ AddProject ~ project:", project);

      setValue("projectName", project?.projectTitle);
      setTitleBinding(project?.projectTitle);
      setValue("tagLine", project?.tagline);
      setTaglineBinding(project?.tagline);
      setSkills([...(project?.builtWith ?? [])]);
      if (project?.content) {
        setValueDes(project?.content);
      }
      setFileThumnail(project?.thumnailImage);
      if (project?.galary) {
        project.galary?.forEach((element, index) => {
          if (index === 0) setValue("videoLink", project.galary[0].url);
          else {
            setGalaryList((prev) => [
              ...prev,
              { url: element.url, caption: element.caption ?? "" },
            ]);
          }
        });
      }
      if (project?.tryoutLinks) {
        project.tryoutLinks?.forEach((element) => {
          const id = uuidv4();
          setValue(`field_${id}`, element);
          setTryoutLinks((prev) => {
            if (prev[0].name === "") return [{ id, name: element }];
            return [...prev, { id, name: element }];
          });
        });
      }
      dispatch(resetSuccessAction());
    }
  }, [project]);
  return (
    <>
      <div className="px-60">
        <h2 className="my-8">Project details</h2>
        <p>
          Please respect our Community Guidelines. Information entered below
          will appear on your public project page.
        </p>

        <hr className="mt-8" />
        <form
          className="py-5 grid grid-cols-4 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-4 w-full col-span-3 ">
            <div className="mb-5 w-full">
              <TextInput
                type={"text"}
                register={register("projectName", {
                  required: "Project name is required!",
                  onChange: (event) => {
                    setTitleBinding(event.target.value);
                  },
                })}
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
                  onChange: (event) => {
                    setTaglineBinding(event.target.value);
                  },
                })}
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
                About the project *
              </p>
              <div className="text-xs text-[#6F6F6F] italic mb-4">
                Be sure to write what inspired you, what you learned, how you
                built your project, and the challenges you faced
              </div>
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
            <div>
              <div className=" font-medium text-base mt-4">Image Galary</div>
              <div className="text-xs text-[#6F6F6F] italic mb-4">
                JPG, PNG or GIF format, 5 MB max file size. For best results,
                use a 3:2 ratio.
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
              </div>
              <div className="mt-4 space-y-4">
                {galaryList.map((file) => (
                  <div
                    key={file.url}
                    className="flex items-center gap-y-4 gap-x-8 py-4 px-8  border border-gray-300 rounded shadow-sm"
                  >
                    {/* Hiển thị ảnh */}
                    <img
                      src={file.url}
                      alt="Uploaded"
                      className="w-24 h-24 object-cover rounded shadow-sm"
                    />

                    {/* Input caption */}
                    <input
                      type="text"
                      placeholder="Add a caption"
                      value={file.caption}
                      onChange={(e) =>
                        handleCaptionChange(file.url, e.target.value)
                      }
                      className="flex-1 px-4 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <div
                      className="cursor-pointer"
                      onClick={() => handleDeleteGalaryItem(file.url)}
                    >
                      <CgClose />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="">
                <div className=" font-medium text-base">
                  "Try it out" links{" "}
                </div>
                <div className="text-xs text-[#6F6F6F] italic">
                  Add links where people can try your project or see your code.
                </div>
                <div className="grid grid-cols-1">
                  {tryoutLinks.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex w-full my-1 items-center "
                    >
                      <div className="relative  mt-2 mr-3 ">
                        <input
                          type="text"
                          {...register(`field_${item.id}`)}
                          name={`field_${item.id}`}
                          className="block  focus:bg-white  text-base w-[850px] rounded-sm border-0 py-2 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
            <div className="mb-5 cursor-pointer max-w-xs bg-white border border-gray-300 rounded-sm hover:shadow-md">
              <div className="">
                <img
                  src={fileThumnail ?? imgDefaultProject}
                  alt={titleBinding}
                  className="h-48 w-full"
                />
                <div className="mb-2 px-2 h-16">
                  <h3 className="mt-2 text-base font-semibold line-clamp-1">
                    {titleBinding}
                  </h3>
                  <p className="my-1 text-[#6F6F6F] line-clamp-2 italic text-sm">
                    {taglineBinding}
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
            <label
              htmlFor="uploadImg"
              className="cursor-pointer text-blue-600 "
            >
              Change image
            </label>
            <div className="text-sm text-[#6F6F6F]">
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
