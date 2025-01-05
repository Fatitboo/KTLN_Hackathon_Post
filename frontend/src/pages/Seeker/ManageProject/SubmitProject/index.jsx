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
import Swal from "sweetalert2";
import baseUrl from "../../../../utils/baseUrl";
import axios from "axios";

function SubmitProject() {
  const inputBox = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [skills, setSkills] = useState([]);
  const [isFirstChecked, setIsFirstChecked] = useState(false);
  const [isSecondChecked, setIsSecondChecked] = useState(false);
  const [titleBinding, setTitleBinding] = useState("");
  const [taglineBinding, setTaglineBinding] = useState("");
  const [galaryList, setGalaryList] = useState([]);
  const [fileThumnail, setFileThumnail] = useState(null);
  const { project, isSuccess } = useSelector((store) => store.projects);
  const [tryoutLinks, setTryoutLinks] = useState([{ id: uuidv4(), name: "" }]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    if (isFirstChecked && isSecondChecked) {
      const pl = {
        hackathonId: extractId({ type: "hackathonId", str: projectId }),
        linkSubmitVideo: data.linkSubmitVideo,
        linkSubmitFile: data.linkSubmitFile,
      };
      axios
        .post(
          `${baseUrl}/api/v1/projects/${extractId({
            str: projectId,
          })}/submit-hackathon`,
          pl
        )
        .then(
          Swal.fire({
            title: "Submit success!",
            text: "Submit success.",
            confirmButtonText: "OK",
            icon: "success",
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(
                `/Hackathon-detail/${extractId({
                  type: "hackathonId",
                  str: projectId,
                })}/my-project`
              );
            }
          })
        )
        .catch((e) => {
          Swal.fire({
            title: "Submit failed!",
            text: "Submit failed, please try again.",
            confirmButtonText: "OK",
            icon: "error",
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
          }).then((result) => {
            if (result.isConfirmed) {
              /* empty */
            }
          });
        });
    } else {
      Swal.fire({
        title: "Accept rule!",
        text: "Please check both checkboxes Eligibility requirements to submmit.",
        confirmButtonText: "OK",
        icon: "info",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
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
      setValue("linkSubmitVideo", project?.linkSubmitVideo);
      setTitleBinding(project?.projectTitle);
      setValue("linkSubmitFile", project?.linkSubmitFile);
      setTaglineBinding(project?.tagline);
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
                register={register("linkSubmitVideo", {
                  required: "Link Submit Video is required!",
                })}
                error={
                  errors.linkSubmitVideo ? errors.linkSubmitVideo.message : ""
                }
                label="Link demo this project *"
                name="linkSubmitVideo"
                containerStyles="text-[#05264e] text-base w-full tw-bg-white"
                labelStyle="text-[#05264e] font-medium"
              />
            </div>

            <div className="mb-5 w-full">
              <TextInput
                type={"text"}
                register={register("linkSubmitFile", {
                  required: "Link Submit File is required!",
                })}
                error={
                  errors.linkSubmitFile ? errors.linkSubmitFile.message : ""
                }
                label="Upload link source document of this project? *"
                description={`This will be a short link Submit File for the project`}
                name="linkSubmitFile"
                placeHolder={"A link Submit File for project."}
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
            <Link
              to={`/Seeker/project/${extractId({ str: projectId })}`}
              className="font-medium text-base mb-5 text-blue-700 cursor-pointer"
            >
              Preview
            </Link>
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
