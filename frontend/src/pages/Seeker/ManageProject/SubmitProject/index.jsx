import { useParams, Link, useNavigate } from "react-router-dom";
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

function SubmitProject() {
  const inputBox = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [spin, setSpin] = useState(false);
  const [skills, setSkills] = useState([]);
  const [isFirstChecked, setIsFirstChecked] = useState(false);
  const [isSecondChecked, setIsSecondChecked] = useState(false);
  const [value, setValueDes] = useState(
    `<h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;' id="isPasted"><strong><span style="font-size: 18px;">Inspiration</span></strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong><span style="font-size: 18px;">What it does</span></strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong><span style="font-size: 18px;"> How I built it</span></strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong><span style="font-size: 18px;">Challenges I ran into</span></strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong><span style="font-size: 18px;">Accomplishments that I'm proud of</span></strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong><span style="font-size: 18px;">What I learned</span></strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong><span style="font-size: 18px;">What's next</span></strong></h4>`
  );
  const [loading, setLoading] = useState(false);
  const [titleBinding, setTitleBinding] = useState("");
  const [taglineBinding, setTaglineBinding] = useState("");
  const [galaryList, setGalaryList] = useState([]);
  const [listSkillApi, setListSkillApi] = useState([]);
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
    console.log("🚀 ~ onSubmit ~ pl:", pl);

    dispatch(
      updateProject({
        id: extractId({ str: projectId }),
        data: pl,
        navigate,
        path: `/Hackathon-detail/12762/my-project`,
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

  // Hàm xử lý thay đổi caption
  const handleCaptionChange = (url, newCaption) => {
    setGalaryList((prevFiles) => {
      console.log("🚀 ~ handleCaptionChange ~ prevFiles:", prevFiles);
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
          setTryoutLinks((prev) => [...prev, { id: uuidv4(), name: element }]);
        });
      }
      dispatch(resetSuccessAction());
    }
  }, [project]);
  return (
    <>
      <div className="px-60">
        <h2 className="my-8">Submit project</h2>
        <p>
          After submitting, you can still edit your project until the submission
          deadline.
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

            <div>
              <div className="mt-5 mb-2">
                <div className="block text-base font-semibold text-gray-700">
                  Terms & conditions{" "}
                </div>
              </div>
              <div>
                <label className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox mr-4 mt-2"
                    checked={isFirstChecked}
                    onChange={(e) => setIsFirstChecked(e.target.checked)}
                  />
                  <div>
                    <span>
                      * I have read and agree to the eligibility requirements
                      for this hackathon:
                    </span>
                    <div className="grid grid-cols-2">
                      {["Only specific", "Quebec is excluded"].map(
                        (item, index) => {
                          return (
                            <div key={index} className="grid-cols-1">
                              - {item}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </label>
                <label className="my-5 flex items-center space-x-2">
                  <input
                    checked={isSecondChecked}
                    onChange={(e) => setIsSecondChecked(e.target.checked)}
                    type="checkbox"
                    className="form-checkbox mr-4"
                  />
                  <span>
                    * I, and all of my team members, have read and agree to be
                    bound by the Official Rules and the Devpost Terms of
                    Service.
                  </span>
                </label>
              </div>
              <div className="w-[1/3] items-center flex">
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
          </div>
        </form>
      </div>
    </>
  );
}

export default SubmitProject;
