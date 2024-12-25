import React, { useEffect, useState } from "react";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";
import { MdRemoveRedEye } from "react-icons/md";
import {
  HackathonEligibility,
  HackathonEssential,
  HackathonDesign,
  HackathonStarterKit,
  JobReview,
  HackathonSite,
  HackathonToDos,
  HackathonSubmission,
  HackathonJudging,
  HackathonPrize,
} from "./JobRef";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentVacanciesComponent,
  resetComponent,
} from "../../../redux/slices/vacancies/vacanciesSlices";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { Modal } from "../../../components";
import { IoClose } from "react-icons/io5";
import PreviewVacancy from "./JobRef/JobComponents/PreviewVacancy";
import SuccessCreate from "./JobRef/SuccessCreate";
import { ToastContainer } from "react-toastify";
import {
  resetValue,
  updateHackathonComponent,
} from "../../../redux/slices/hackathons/hackathonsSlices";
import Swal from "sweetalert2";

function HostHackathon() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hackathonId, isSuccessUD } = useSelector((store) => store.hackathons);
  const nextJobRef = () => {
    if (jobRefKey < jobRef.length) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      jobRefKey > 1 ? setIsPreview(true) : setIsPreview(false);
      setJobRefKey(++jobRefKey);
      setJobProgress((jobRefKey / jobRef.length) * 100 + "%");
    }
  };

  const updateHackathon = (data) => {
    if (hackathonId) {
      console.log(hackathonId, data);
      dispatch(
        updateHackathonComponent({
          id: hackathonId,
          hackathon: data,
        })
      );
    }
  };

  useEffect(() => {
    if (isSuccessUD) {
      dispatch(resetValue({ key: "isSuccessUD", value: false }));
      if (jobRefKey === 8) {
        navigate("/Organizer/manage-hackathons");
        Swal.fire({
          title: "Success",
          text: "Create hackathon successfully!",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
      nextJobRef();
    }
  }, [isSuccessUD]);
  const [modal, setModal] = useState(false);
  var [jobRefKey, setJobRefKey] = useState(0);
  var [jobProgress, setJobProgress] = useState("0%");
  var [isPreview, setIsPreview] = useState(false);
  const formId = [
    "form-hackathon-essential",
    "form-hackathon-eligibility",
    "form-hackathon-design",
    "form-hackathon-site",
    "form-hackathon-todos",
    "form-hackathon-starter-kit",
    "form-hackathon-submission",
    "form-hackathon-judging",
    "form-hackathon-prize",
    "form-job-pre",
    "form-job-rev",
  ];
  const jobRef = [
    <HackathonEssential
      formSubmit={updateHackathon}
      flag={0}
      formId={formId[0]}
      key={0}
    />,
    <HackathonEligibility
      formSubmit={updateHackathon}
      formId={formId[1]}
      flag={1}
      key={1}
    />,
    <HackathonDesign
      formSubmit={updateHackathon}
      formId={formId[2]}
      flag={2}
      key={2}
    />,
    <HackathonSite
      formSubmit={updateHackathon}
      formId={formId[3]}
      flag={3}
      key={3}
    />,
    <HackathonToDos
      formSubmit={updateHackathon}
      formId={formId[4]}
      flag={4}
      key={4}
    />,
    <HackathonStarterKit
      formSubmit={updateHackathon}
      formId={formId[5]}
      flag={5}
      key={5}
    />,
    <HackathonSubmission
      formSubmit={updateHackathon}
      formId={formId[6]}
      flag={6}
      key={6}
    />,
    <HackathonJudging
      formSubmit={updateHackathon}
      formId={formId[7]}
      flag={7}
      key={7}
    />,
    <HackathonPrize
      formSubmit={updateHackathon}
      formId={formId[8]}
      flag={8}
      key={8}
    />,
    <JobReview
      formSubmit={updateHackathon}
      formId={formId[9]}
      flag={9}
      key={9}
    />,
  ];

  //const currentJobComponent = useSelector((state) => state.vacancies.currentJobComponent)
  const flag = useSelector((state) => state.vacancies.flag);

  function backJobRef() {
    if (jobRefKey > 0) {
      dispatch(resetComponent());
      window.scrollTo({ top: 0, behavior: "smooth" });
      jobRefKey > 3 ? setIsPreview(true) : setIsPreview(false);
      setJobRefKey(--jobRefKey);
      setJobProgress((jobRefKey / jobRef.length) * 100 + "%");
    }
  }

  useEffect(() => {
    // dispatch(getCurrentVacanciesComponent(params.id));s
  }, []);

  useEffect(() => {
    if (flag) {
      setJobRefKey(flag);
      setJobProgress((flag / jobRef.length) * 100 + "%");
      window.scrollTo({ top: 0, behavior: "smooth" });
      flag > 1 ? setIsPreview(true) : setIsPreview(false);
    }
  }, [flag]);

  return (
    <>
      <ToastContainer />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css"
      ></link>
      <div className="mx-[25%] pt-[50px]">
        <div className="flex flex-col justify-center">
          <div className="text-[12px] font-semibold leading-5">
            <span>Hackathon post progress</span>
            <div className="border h-2 flex rounded-[4px]">
              <div
                className="h-2 bg-gradient-to-r from-[#c74289] to-[#3f73d3] rounded-[4px]"
                style={{
                  width: jobProgress,
                  transition: "width 800ms cubic-bezier(0, 0, 1, 1) 0s",
                }}
              ></div>
            </div>
          </div>

          <div className="mt-8 mb-11">
            {jobRefKey !== jobRef.length ? (
              jobRef[jobRefKey]
            ) : (
              <SuccessCreate></SuccessCreate>
            )}
          </div>
          <div className="flex flex-row justify-between">
            {jobRefKey != 0 && jobRefKey !== 9 ? (
              <div
                className="flex items-center justify-center h-[53px] box-border bg-[white] border px-[18px] py-[8px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] hover:border-[#1967d3] cursor-pointer"
                onClick={backJobRef}
              >
                <TbArrowLeft className="w-6 h-6" />
                <span className="text-[15px] leading-none font-bold ml-2">
                  Back
                </span>
              </div>
            ) : (
              <div />
            )}

            <div className="flex flex-row items-center">
              {jobRefKey !== 7 && isPreview ? (
                <div
                  className="flex items-center mr-5 justify-center h-[53px] box-border bg-[#fff] px-[18px] py-[8px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] cursor-pointer"
                  onClick={() => setModal(true)}
                >
                  <span className="text-[15px] leading-none font-bold mr-2">
                    Preview
                  </span>
                  <MdRemoveRedEye className="w-6 h-6" />
                </div>
              ) : null}

              {jobRefKey === 9 ? null : (
                <button
                  type="submit"
                  form={formId[jobRefKey]}
                  className="flex items-center justify-center h-[53px] box-border bg-[#1967d3] px-[18px] py-[8px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
                >
                  <span className="text-[15px] leading-none font-bold mr-2">
                    {jobRefKey === 8 ? "Create" : "Continue"}
                  </span>

                  <TbArrowRight className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
          <Modal open={modal} setModal={setModal}>
            <div className="">
              <div className="flex flex-row items-center justify-between mx-2">
                <p className="block leading-8 text-gray-900 text-xl font-bold">
                  Preview your job post
                </p>
                <div
                  className="hover:bg-slate-100 rounded-sm p-2 cursor-pointer opacity-90"
                  onClick={() => setModal(false)}
                >
                  <IoClose size={20} />
                </div>
              </div>
              <hr className="block h-1 w-full bg-[rgb(212, 210, 208)] mt-3" />
              <div className="max-h-[400px] w-[600px] overflow-y-auto overflow-x-hidden mb-4">
                <PreviewVacancy />
              </div>
              <div className="flex flex-row items-center gap-2 float-right">
                <div
                  className="flex items-center justify-center box-border bg-[white] border px-[18px] py-[14px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] hover:border-[#1967d3] cursor-pointer"
                  onClick={() => setModal(false)}
                >
                  <span className="text-[15px] leading-none font-bold">
                    Close
                  </span>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default HostHackathon;
