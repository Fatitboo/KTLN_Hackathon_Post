import {
  useParams,
  Link,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { CustomButton, TextInput } from "../../../../components";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { defaultAvt, imgDefaultProject } from "../../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectSingle,
  resetSuccessAction,
  updateProject,
} from "../../../../redux/slices/projects/projectsSlices";
import { IoIosClose } from "react-icons/io";
import extractId from "../../../../utils/extractId";
import baseUrl from "../../../../utils/baseUrl";
import axios from "axios";
import Swal from "sweetalert2";

function ManageTeam() {
  const inputBox = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [spin, setSpin] = useState(false);
  const [skills, setSkills] = useState([]);
  const [listSkillApi, setListSkillApi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { hackathonId } = useOutletContext();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { project, isSuccess } = useSelector((store) => store.projects);

  const [teammates, setTeammates] = useState([
    { fullname: "Nguyễn Văn Phát", email: "@Fatitboo" },
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    const pl = {
      teamName: data.teamName,
    };

    dispatch(
      updateProject({
        id: extractId({ str: projectId }),
        data: pl,
        navigate,
        path: `/Seeker/project/manage-project/${projectId}/edit`,
      })
    );
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchDataSkill("email", "", searchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchDataSkill = (searchTerm, hackathonId, value) => {
    if (value === "") {
      setListSkillApi([]);
    } else {
      setSpin(true);
      const params = new URLSearchParams({
        searchTerm,
        hackathonId,
        searchQuery: value,
      }).toString();

      fetch(`${baseUrl}/api/v1/users/search?${params}`)
        .then((response) => response.json())
        .then((result) => {
          const arr = [...result, { email: value }];

          setListSkillApi(arr);
          setSpin(false);
        })
        .catch((error) => console.log("error", error));
    }
  };

  const handleCheckMail = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const v = { hackathonId, emails: skills };
    const { data } = await axios.post(
      `${baseUrl}/api/v1/projects/${extractId({
        type: "projectId",
        str: projectId,
      })}/check-invite-list`,
      v,
      {}
    );
    if (data.registedAndHasTeam.length > 0) {
      Swal.fire({
        title: "User had team in this Hackathon!",
        text:
          data.registedAndHasTeam.join(", ") +
          " had team registed to this Hackathon. Please remove them",
        confirmButtonText: "OK",
        icon: "error",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          return;
        }
      });
    } else {
      Swal.fire({
        title:
          data.noAccount.length > 0
            ? "User dont have account in our Platform!"
            : "Do you want to invite them",
        text:
          data.noAccount.length > 0
            ? data.noAccount.join(", ") +
              " dont have account in our Platform. Do you want to invite them?"
            : "Do you want to invite them?",
        confirmButtonText: "OK",
        icon: "info",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then(async (result) => {
        if (result.isConfirmed) {
          /* empty */
          const { data } = await axios.post(
            `${baseUrl}/api/v1/projects/${extractId({
              type: "projectId",
              str: projectId,
            })}/send-mail-invite`,
            v,
            {}
          );
          if (data === "ok") {
            Swal.fire({
              title: "Send mail successfully!",
              text: "Send mail successfully. Please wait for them accepting",
              confirmButtonText: "OK",
              icon: "success",
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
            }).then((result) => {
              if (result.isConfirmed) {
                return;
              }
            });
          }
        }
      });
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
      setTeammates((prev) => {
        const arr = [];
        arr.push({ ...project?.owner });
        return arr;
      });
      setValue("teamName", project?.teamName);

      dispatch(resetSuccessAction());
    }
  }, [project]);

  return (
    <>
      <form className="px-60" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="my-8">Manage team</h2>
        <p>
          Add, remove, and look for teammates. If you're working alone,{" "}
          <a href="#">skip this step.</a>
        </p>

        <hr className="my-8" />

        <div className="w-[50%] ">
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
        </div>
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
              <div className="relative ">
                <div className="flex items-center">
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
                          "Input email of user you want to add to team."
                        }
                        onBlur={(e) => e.stopPropagation()}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                    onClick={handleCheckMail}
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
                </div>
                <div
                  className="relative z-100"
                  style={{
                    visibility:
                      listSkillApi.length === 0 ? "collapse" : "visible",
                  }}
                >
                  <div className="border mt-1 rounded overflow-auto absolute w-full max-h-56">
                    {listSkillApi.map((item, index) => {
                      return (
                        <div
                          onClick={() => {
                            !skills.includes(item.email) &&
                              setSkills([...skills, item.email]);
                            inputBox.current.value = "";
                            setListSkillApi([]);
                          }}
                          key={index}
                          className={`hover:bg-[#eef1f2] z-20  block focus:outline-none bg-white focus:bg-white text-base shadow-sm py-2 pl-5 pr-5 text-gray-90 placeholder:text-gray-400 sm:text-base sm:leading-8 cursor-pointer`}
                        >
                          {item.email}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* <div className="my-5">
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
                    onClick={() => navigator.clipboard.writeText("inviteLink")}
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
              </div> */}
            </div>

            <div className="w-[1/3] flex items-center mt-20">
              <CustomButton
                // isDisable={loading}
                title={"Save and continue"}
                type={"submit"}
                containerStyles={
                  "bg-[#3c65f5] focus:bg-[#05264e] w-fit py-2 pl-5 pr-5 rounded flex justify-center items-center text-white mb-3"
                }
              />
              <div
                onClick={() => {}}
                className="cursor-pointer text-blue-600 ml-10"
              >
                Cancel
              </div>
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
                    src={teammate?.avatar ?? defaultAvt}
                    alt="avatar"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#ccc",
                    }}
                  />
                  <div>
                    <p style={{ margin: 0 }}>{teammate.fullname}</p>
                    <p style={{ margin: 0, color: "#888" }}>{teammate.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default ManageTeam;
