import { useParams, Link, useNavigate } from "react-router-dom";
import { CustomButton, TextInput } from "../../../../components";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import FroalaEditor from "react-froala-wysiwyg";
import { CgClose } from "react-icons/cg";
import { v4 as uuidv4 } from "uuid";
import { defaultAvt, imgDefaultProject } from "../../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectSingle,
  resetSuccessAction,
  updateProject,
} from "../../../../redux/slices/projects/projectsSlices";
import fetchSkillApikey from "../../../../utils/fetchSkillApiKey";
import { IoIosClose } from "react-icons/io";

function ManageTeam() {
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
        id: projectId,
        data: pl,
        navigate,
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
    console.log("🚀 ~ AddProject ~ productId:", projectId);
    if (projectId !== undefined) {
      dispatch(getProjectSingle(projectId));
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
  const [teammates, setTeammates] = useState([
    { name: "Nguyễn Văn Phát", username: "@Fatitboo" },
  ]);
  return (
    <>
      <div className="px-60">
        <h2 className="my-8">Manage team</h2>
        <p>
          Add, remove, and look for teammates. If you're working alone,{" "}
          <a href="#">skip this step.</a>
        </p>

        <hr className="my-8" />

        <form className="w-[50%] " onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            type={"text"}
            register={register("teamName", {
              required: "Team name is required!",
            })}
            error={errors.teamName ? errors.teamName.message : ""}
            label="What is your team called? *"
            name="teamName"
            containerStyles="text-[#05264e] text-base w-full tw-bg-white"
            labelStyle="text-[#05264e] font-medium"
          />
        </form>
        <div className=" py-5 grid grid-cols-3 gap-20">
          <div className="mt-4 w-full col-span-2 ">
            <div className="mb-5">
              <div className="block text-base font-medium text-gray-700">
                Invite teammates
              </div>
              <div className="text-sm text-[#6F6F6F] italic my-3">
                Either share the link below privately with your teammates or
                send an invite link via email
              </div>
              <div className="relative flex items-center">
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
                  <div className="flex"></div>
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
                <button
                  onClick={() => navigator.clipboard.writeText(inviteLink)}
                  style={{
                    padding: "8px 10px",
                    marginLeft: "20px",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #ccc",
                    borderRadius: "2px",
                    cursor: "pointer",
                    width: "170px",
                  }}
                >
                  Send email
                </button>
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

              <div className="my-5">
                <p className="mb-2">Secret invite link</p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <input
                    type="text"
                    value={"inviteLink"}
                    readOnly
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "2px",
                    }}
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(inviteLink)}
                    style={{
                      padding: "8px 10px",
                      backgroundColor: "#f0f0f0",
                      border: "1px solid #ccc",
                      borderRadius: "2px",
                      cursor: "pointer",
                    }}
                  >
                    Copy
                  </button>
                </div>
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
            <div className="font-medium text-base">Current teammates</div>
            <div className="text-sm text-[#6F6F6F] italic my-3">
              Only the project creator, <strong>Nguyễn Văn Phát</strong>, can
              remove team members.
            </div>
            <div style={{ listStyle: "none", padding: 0 }}>
              {teammates.map((teammate, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={defaultAvt}
                    alt="avatar"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#ccc",
                    }}
                  />
                  <div>
                    <p style={{ margin: 0 }}>{teammate.name}</p>
                    <p style={{ margin: 0, color: "#888" }}>
                      {teammate.username}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageTeam;
