import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { CustomButton, CustomRadioButton } from "../../../../components";
import axios from "axios";
import baseUrl from "../../../../utils/baseUrl";

export const ReportHackathon = ({ setopenReport, item, isVacancy }) => {
  const dispatch = useDispatch();
  const Reportss = [
    {
      id: 0,
      name: "The activity involves deceitful practices, such as scams, fake information, or attempts to mislead users for personal gain.",
      value: "fraudulent",
      type: "none",
    },
    {
      id: 1,
      name: "The content appears to be irrelevant or excessive, often with the intent to advertise, promote, or disrupt the user experience.",
      value: "spam",
      type: "none",
    },
    {
      id: 2,
      name: "The content is inappropriate, offensive, or violates community guidelines by being explicit, harmful, or derogatory.",
      value: "inappropriate",
      type: "none",
    },
    {
      id: 3,
      name: "The content contains material that violates copyright laws, including unauthorized use of protected work without proper permissions.",
      value: "copyright_infringement",
      type: "none",
    },
    {
      id: 4,
      name: "Suspicious activities indicate attempts to compromise system security or access restricted data without authorization.",
      value: "hacking_attempts",
      type: "none",
    },
    {
      id: 5,
      name: "The content or behavior breaches the platform's Terms of Service, undermining the safe and fair use of the system by others.",
      value: "terms_of_service_violation",
      type: "none",
    },
    {
      id: 6,
      name: "Another",
      value: "another",
      type: "none",
    },
  ];
  const [rpType, setRpType] = useState("");
  const [reDes, setRpDes] = useState("");
  function handleCheckReports(e) {
    setRpType(e.name);
  }
  const handleCreateReport = async () => {
    const d = {
      type: rpType,
      content: reDes,
      userId: item?.userId,
    };
    console.log("🚀 ~ handleCreateReport ~ d:", d);
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/hackathons/create-report/${item?.hackathonId}`,
        d
      );
      if (data) {
        Swal.fire({
          title: "Reported!",
          text: "This report has been sent.",
          icon: "success",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            setRpDes("");
            setRpType("");

            setopenReport(false);
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Report failed!",
        text: "Report failed, please try again.",
        confirmButtonText: "OK",
        icon: "error",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          /* empty */
        }
      });
    }
  };
  return (
    <div className="w-[600px] rounded-lg bg-white h-auto px-4">
      <div className="flex justify-between border-b border-gray-300 pb-5">
        <div className="font-medium text-xl">Report this Hackathon</div>
        <div className="cursor-pointer" onClick={() => setopenReport(false)}>
          <CgClose size={24} />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="whitespace-nowrap mt-2 font-medium">
            {isVacancy ? item?.hackathonName : item?.project?.projectName}
          </div>
          <div className="text-sm mt-2 text-gray-600">
            Host by: {item?.hostName}
          </div>
        </div>
        <div className="-ml-4">
          <CustomRadioButton
            listItem={Reportss}
            filterValueChecked={handleCheckReports}
          />
        </div>

        <div className="mt-2">
          <label
            htmlFor="description"
            className="block leading-8 text-gray-900 font-medium "
          >
            Additional information
          </label>
          <div className="relative mt-2 rounded-md shadow-sm ">
            <textarea
              value={reDes}
              onChange={(e) => setRpDes(e.target.value)}
              rows={4}
              type="text"
              name="description"
              id="description"
              className="block bg-[#f7f9fa] focus:bg-white text-base w-full rounded-md border-0 py-2.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8"
            />
          </div>
        </div>
        <div className="mt-4">
          {rpType === "" ? (
            <div>
              <CustomButton
                isDisable={true}
                title={"Send"}
                containerStyles="text-white justify-center w-[100%] flex py-2   mb-2 focus:outline-none  hover:text-white rounded-md text-base border  bg-gray-300"
              />
            </div>
          ) : (
            <div onClick={handleCreateReport}>
              <CustomButton
                title={"Send"}
                containerStyles="text-white justify-center w-[100%] flex py-2   mb-2 focus:outline-none hover:bg-blue-900 hover:text-white rounded-md text-base border border-blue- bg-blue-700"
              />
            </div>
          )}
        </div>
        <div className="text-sm text-gray-600 mb-2">
          All Hackathon information must comply with HackathonPost's Terms of
          Service. We allow users to report actions that may violate these
          terms. Hackathon may also be found violative by HackathonPost.
          However, no system is perfect, so detection of a violation does not
          mean the hackathon will be removed from HackathonPost.
        </div>
      </div>
    </div>
  );
};
