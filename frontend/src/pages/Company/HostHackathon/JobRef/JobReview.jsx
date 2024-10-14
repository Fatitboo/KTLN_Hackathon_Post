import { useEffect, useState } from "react";
import { JobDesImage, JobReviewImage } from "../../../../assets/images";
import JobReviewItem from "./JobComponents/JobReviewItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getFullUnCompletedVacancy,
  postFullVacancy,
  resetComponent,
  resetSuccessAction,
  setVacancyId,
  setValueSuccess,
} from "../../../../redux/slices/vacancies/vacanciesSlices";
import { Modal } from "../../../../components";
import { IoClose } from "react-icons/io5";
import { JobPreferences } from ".";

function JobReview({ formId, formSubmit, flag }) {
  const dispatch = useDispatch();
  const formIds = [
    "form-job-basic",
    "form-job-detail",
    "form-job-benefit",
    "form-job-des",
    "form-job-ref",
    "form-job-pre",
    "form-job-rev",
  ];
  let [modal, setModal] = useState(false);
  let [currentFlag, setCurrentFlag] = useState(null);
  let [children, setChildren] = useState(null);
  let [childName, setChildrenName] = useState(null);
  const [vacancy, setVacancy] = useState(null);
  function handleSubmit(e) {
    e.preventDefault();
    vacancyId && dispatch(postFullVacancy(vacancyId));
  }

  const unCompletedVacancy = useSelector(
    (state) => state.vacancies.unCompletedVacancy
  );
  const vacancyId = useSelector((state) => state.vacancies.vacancyId);
  const loadingUD = useSelector((state) => state.vacancies.loadingUD);
  const isSuccessCR = useSelector((state) => state.vacancies.isSuccessCR);
  const loadingPF = useSelector((state) => state.vacancies.loadingPF);

  useEffect(() => {
    dispatch(getFullUnCompletedVacancy(vacancyId));
  }, []);

  useEffect(() => {
    if (unCompletedVacancy) {
      setVacancy(unCompletedVacancy);
      dispatch(setVacancyId(unCompletedVacancy.vacancyId));
    }
  }, [unCompletedVacancy]);

  const configModal = (a, b, c) => {
    setChildren(a);
    setChildrenName(b);
    setModal(true);
    setCurrentFlag(c);
  };

  const onDoneSubmit = () => {
    dispatch(getFullUnCompletedVacancy(vacancyId));
    setModal(false);
  };

  useEffect(() => {
    if (isSuccessCR) {
      dispatch(resetSuccessAction(false));
      formSubmit();
      dispatch(resetComponent());
    }
  }, [isSuccessCR]);

  return (
    <>
      <div className="flex flex-row justify-between bg-[#faf9f8] rounded-xl -mx-8">
        <div className="flex items-center m-8">
          <span className="text-[#2D2D2D] text-[28px] font-bold">Review</span>
        </div>
        <div className="col-span-3 flex mr-8">
          <img src={JobReviewImage} alt="" className="h-52 overflow-hidden" />
        </div>
      </div>

      <div className="p-8">
        <form id={formId} onSubmit={handleSubmit}>
          <hr className="block h-1 bg-[rgb(212, 210, 208)] my-6" />
          <p className="block leading-8 text-gray-900 text-xl font-bold mb-1">
            Vacancy details
          </p>
          <div className="flex flex-col gap-6">
            <JobReviewItem
              title={"Vacancy title"}
              name="vacancyName"
              value={vacancy?.jobBasic?.jobTitle}
              onClick={() => configModal("jobBasic", "jobTitle", 0)}
            />
            <JobReviewItem
              title={"Number of openings"}
              name="maxRequired"
              value={vacancy?.jobBasic?.numberParticipants?.name}
              onClick={() => configModal("jobBasic", "numberParticipants", 0)}
            />
            <JobReviewItem
              title={"Location"}
              name="location|locationType|locationSpecificRequired"
              value={vacancy?.jobBasic?.location}
              onClick={() => configModal("jobBasic", "location", 0)}
            />
            <JobReviewItem
              title={"Vacancy type"}
              html
              name="timeLength|timePeriod|timeFirst|timeSecond|timeType"
              value={`<p>${vacancy?.jobDetail?.jobTypes
                ?.map((item) =>
                  item.name === "Part-time"
                    ? `${item.name}: ${vacancy?.jobDetail?.showBy_1}${
                        vacancy?.jobDetail?.showBy_2
                          ? " - " + vacancy?.jobDetail?.showBy_2
                          : ""
                      } hours/week`
                    : item.name === "Temporary"
                    ? `${item.name}: ${vacancy?.jobDetail?.length} ${vacancy?.jobDetail?.period?.name}`
                    : item.name
                )
                .join("<p></p>")}</p>`}
              onClick={() => configModal("jobDetail", "jobTypes", 1)}
            />
            {vacancy?.jobBenefit ? (
              <JobReviewItem
                title={"Pay"}
                name="salaryType|salaryFirst|salarySecond|salaryRate"
                value={
                  vacancy?.jobBenefit?.showPayBy?.name === "Range"
                    ? `$${vacancy?.jobBenefit?.pay_1} - $${vacancy?.jobBenefit?.pay_2} ${vacancy?.jobBenefit?.rate?.name}`
                    : vacancy?.jobBenefit?.showPayBy?.name === "Starting amount"
                    ? `From $${vacancy?.jobBenefit?.pay_1} ${vacancy?.jobBenefit?.rate?.name}`
                    : vacancy?.jobBenefit?.showPayBy?.name === "Maximum amount"
                    ? `Up to $${vacancy?.jobBenefit?.pay_1} ${vacancy?.jobBenefit?.rate?.name}`
                    : `$${vacancy?.jobBenefit?.pay_1} ${vacancy?.jobBenefit?.rate?.name}`
                }
                onClick={() =>
                  configModal("jobBenefit", "showPayBy|pay_1|pay_2|rate", 2)
                }
              />
            ) : null}
            <JobReviewItem
              title={"Skills required"}
              name="skillsRequired"
              html={true}
              value={`<p>${vacancy?.jobDes?.skills
                ?.map((item) => item)
                .join("</p><p>")}</p>`}
              onClick={() => configModal("jobDes", "skills", 3)}
            />
            <JobReviewItem
              title={"Description"}
              name="description"
              value={vacancy?.jobDes?.description}
              html={true}
              onClick={() => configModal("jobDes", "description", 3)}
            />
          </div>
          <hr className="block h-1 bg-[rgb(212, 210, 208)] my-6" />
          <p className="block leading-8 text-gray-900 text-xl font-bold mb-3 mt-5">
            Setting
          </p>
          <div className="flex flex-col gap-6">
            <JobReviewItem
              title={"Applicantion via"}
              name="emailReceivers|canReceiveApplied|canContactViaEmail"
              html
              value={`<p>${vacancy?.jobRef?.emails
                ?.map((item) => item)
                .join("<p></p>")}</p>`}
              onClick={() => configModal("jobRef", "emails", 4)}
            />
            <JobReviewItem
              title={"Required CV"}
              name="requireResume"
              value={vacancy?.jobRef?.resume?.name}
              onClick={() => configModal("jobRef", "resume", 4)}
            />
            <JobReviewItem
              title={"Application updates"}
              name="canReceiveApplied"
              value={
                vacancy?.jobRef?.emailApply
                  ? "Send daily update to your email"
                  : "Do nothing"
              }
              onClick={() => configModal("jobRef", "emailApply", 4)}
            />
            <JobReviewItem
              title={"Candidates contact you"}
              name="canContactViaEmail"
              value={
                vacancy?.jobRef?.emailContact
                  ? "Yes, at email address provided"
                  : "No"
              }
              onClick={() => configModal("jobRef", "emailContact", 4)}
            />
            <JobReviewItem
              title={"Hiring timeline"}
              name="hiringTimeline"
              value={vacancy?.jobRef?.hiringTimeline?.name}
              onClick={() => configModal("jobRef", "hiringTimeline", 4)}
            />
          </div>
        </form>
      </div>
      <Modal open={modal} setModal={setModal}>
        <div className="">
          <div className="flex flex-row items-center justify-between mx-2">
            <p className="block leading-8 text-gray-900 text-xl font-bold">
              Edit the job post
            </p>
            <div
              className="hover:bg-slate-100 rounded-sm p-2 cursor-pointer opacity-90"
              onClick={() => setModal(false)}
            >
              <IoClose size={20} />
            </div>
          </div>
          <hr className="block h-1 w-full bg-[rgb(212, 210, 208)] mt-3" />
          <div className="max-h-[400px] w-[700px] overflow-y-auto overflow-x-hidden mb-4">
            {children === "jobBasic" ? //     onDoneSubmit={onDoneSubmit} //     content={childName} //     config={children} //     formId={formIds[0]} //     flag={0} //   <JobBasic
            //   />
            null : children === "jobDetail" ? //   content={childName} //   config={children} //   formId={formIds[1]} //   flag={1} // <JobDetail
            //   onDoneSubmit={onDoneSubmit}
            // />
            null : children === "jobBenefit" ? //   formId={formIds[2]} //   flag={2} // <JobBenefit
            //   config={children}
            //   content={childName}
            //   onDoneSubmit={onDoneSubmit}
            // />
            null : children === "jobDes" ? // <JobDes
            //   flag={3}
            //   formId={formIds[3]}
            //   config={children}
            //   content={childName}
            //   onDoneSubmit={onDoneSubmit}
            // />
            null : children === "jobRef" ? (
              <JobPreferences
                flag={4}
                formId={formIds[4]}
                config={children}
                content={childName}
                onDoneSubmit={onDoneSubmit}
              />
            ) : children === "jobPre" ? (
              <JobPreferences flag={5} config={children} content={childName} />
            ) : null}
          </div>
          <div className="flex flex-row items-center gap-2 float-right">
            <div
              className="flex items-center justify-center box-border bg-[white] border px-[18px] py-[14px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] hover:border-[#1967d3] cursor-pointer"
              onClick={() => setModal(false)}
            >
              <span className="text-[15px] leading-none font-bold">Close</span>
            </div>
            <button
              type="submit"
              form={formIds[currentFlag]}
              className="w-[90px] flex items-center justify-center box-border bg-[#1967d3] px-[18px] py-[14px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
            >
              {loadingUD ? (
                <svg
                  className="right-1 animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-0"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-90"
                    fill="white"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <span className="text-[15px] leading-none font-bold">Done</span>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default JobReview;
