import React, { useEffect, useState } from "react";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";
import {
  HackathonEligibility,
  HackathonEssential,
  HackathonDesign,
  HackathonStarterKit,
  HackathonSite,
  HackathonToDos,
  HackathonSubmission,
  HackathonJudging,
  HackathonPrize,
} from "./JobRef";
import { useDispatch, useSelector } from "react-redux";
import { resetComponent } from "../../../redux/slices/vacancies/vacanciesSlices";
import { useNavigate, useParams } from "react-router-dom";
import SuccessCreate from "./JobRef/SuccessCreate";
import { toast, ToastContainer } from "react-toastify";
import {
  resetValue,
  updateHackathonComponent,
} from "../../../redux/slices/hackathons/hackathonsSlices";
import { BiSave } from "react-icons/bi";

function HostHackathon() {
  const params = useParams();
  const isUpdate = params.type === "update-hackathons";
  const dispatch = useDispatch();
  const { isSuccessUD } = useSelector((store) => store.hackathons);
  const nextJobRef = () => {
    if (jobRefKey < jobRef.length) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setJobRefKey(++jobRefKey);
      setJobProgress((jobRefKey / jobRef.length) * 100 + "%");
    }
  };

  const handleSaveHackathon = (data) => {
    if (params.id) {
      dispatch(
        updateHackathonComponent({
          id: params.id,
          hackathon: data,
        })
      );
    }
  };

  useEffect(() => {
    if (isSuccessUD) {
      if (isUpdate) notify("success", "Update hackathon successfully!");
      dispatch(resetValue({ key: "isSuccessUD", value: false }));
      if (!isUpdate) nextJobRef();
    }
  }, [isSuccessUD]);
  var [jobRefKey, setJobRefKey] = useState(0);
  var [jobProgress, setJobProgress] = useState("0%");
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
  ];
  const jobRef = [
    <HackathonEssential
      formSubmit={handleSaveHackathon}
      flag={0}
      formId={formId[0]}
      key={0}
    />,
    <HackathonEligibility
      formSubmit={handleSaveHackathon}
      formId={formId[1]}
      flag={1}
      key={1}
    />,
    <HackathonDesign
      formSubmit={handleSaveHackathon}
      formId={formId[2]}
      flag={2}
      key={2}
    />,
    <HackathonSite
      formSubmit={handleSaveHackathon}
      formId={formId[3]}
      flag={3}
      key={3}
    />,
    <HackathonToDos
      formSubmit={handleSaveHackathon}
      formId={formId[4]}
      flag={4}
      key={4}
    />,
    <HackathonStarterKit
      formSubmit={handleSaveHackathon}
      formId={formId[5]}
      flag={5}
      key={5}
    />,
    <HackathonSubmission
      formSubmit={handleSaveHackathon}
      formId={formId[6]}
      flag={6}
      key={6}
    />,
    <HackathonJudging
      formSubmit={handleSaveHackathon}
      formId={formId[7]}
      flag={7}
      key={7}
    />,
    <HackathonPrize
      formSubmit={handleSaveHackathon}
      formId={formId[8]}
      flag={8}
      key={8}
    />,
  ];

  //const currentJobComponent = useSelector((state) => state.vacancies.currentJobComponent)
  const flag = useSelector((state) => state.vacancies.flag);

  function backJobRef() {
    if (jobRefKey > 0) {
      dispatch(resetComponent());
      window.scrollTo({ top: 0, behavior: "smooth" });
      setJobRefKey(--jobRefKey);
      setJobProgress((jobRefKey / jobRef.length) * 100 + "%");
    }
  }

  const notify = (type, message) => toast(message, { type: type });

  useEffect(() => {
    if (flag) {
      setJobRefKey(flag);
      setJobProgress((flag / jobRef.length) * 100 + "%");
      window.scrollTo({ top: 0, behavior: "smooth" });
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
              <SuccessCreate />
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
              {isUpdate && jobRefKey !== 9 && (
                <button
                  className="outline flex items-center mr-5 justify-center h-[50px] box-border bg-[#fff] px-[18px] py-[8px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] cursor-pointer"
                  type={isUpdate ? "submit" : "button"}
                  form={isUpdate && formId[jobRefKey]}
                >
                  <span className="text-[15px] leading-none font-bold mr-2">
                    Save
                  </span>
                  <BiSave className="w-6 h-6" />
                </button>
              )}

              {jobRefKey !== 9 && (
                <button
                  type={!isUpdate ? "submit" : "button"}
                  form={!isUpdate && formId[jobRefKey]}
                  onClick={() => {
                    isUpdate && nextJobRef();
                  }}
                  className="flex items-center justify-center h-[53px] box-border bg-[#1967d3] px-[18px] py-[8px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
                >
                  <span className="text-[15px] leading-none font-bold mr-2">
                    {jobRefKey === 8 ? "Finish" : "Continue"}
                  </span>

                  <TbArrowRight className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HostHackathon;
