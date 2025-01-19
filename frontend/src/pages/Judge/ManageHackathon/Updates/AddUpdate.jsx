import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "../../../../utils/baseUrl";
import { CustomButton, CustomRadioButton } from "../../../../components";
import FroalaEditor from "react-froala-wysiwyg";

export const AddUpdate = ({
  setopenReport,
  item,
  isVacancy,
  setReports,
  setIsGet,
}) => {
  const dispatch = useDispatch();

  const [dsTitle, setDsTitle] = useState(item?.title ?? "");
  const [dsDes, setDsDes] = useState(item?.content ?? "");

  useEffect(() => {
    setDsDes(item?.content ?? "");
    setDsTitle(item?.title ?? "");
  }, [item]);

  const handleUpdateDiscussion = async () => {
    const d = {
      title: dsTitle,
      content: dsDes.toString(),
      userId: item?.userId,
      hackathonId: item?.hackathonId,
    };
    console.log("🚀 ~ handleUpdateDiscussion ~ d:", d);

    try {
      const { data } =
        item?.isUpdate === true
          ? await axios.post(
              `${baseUrl}/api/v1/hackathons/update-updates/${item?.discussionId}`,
              d
            )
          : await axios.post(
              `${baseUrl}/api/v1/hackathons/create-updates/${item?.hackathonId}`,
              d
            );
      if (data) {
        Swal.fire({
          title: "Successed!",
          text: "This update has been updated.",
          icon: "success",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            setDsDes("");
            setDsTitle("");
            setopenReport(null);
            setIsGet(true);
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        text: "Update failed, please try again.",
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
        <div className="font-medium text-xl">Post update to this Hackathon</div>
        <div
          className="cursor-pointer"
          onClick={() => {
            setopenReport(null);
          }}
        >
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
        <div className="mt-2">
          <label
            htmlFor="description"
            className="block leading-8 text-gray-900 font-medium "
          >
            Update Title
          </label>
          <div className="relative mt-2 rounded-md shadow-sm ">
            <textarea
              value={dsTitle}
              onChange={(e) => setDsTitle(e.target.value)}
              rows={1}
              type="text"
              name="description"
              id="description"
              className="block bg-[#f7f9fa] focus:bg-white text-base w-full rounded-md border-0 py-2.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8"
            />
          </div>
        </div>

        <div className="mt-2">
          <label
            htmlFor="description"
            className="block leading-8 text-gray-900 font-medium "
          >
            Additional information
          </label>
          <FroalaEditor
            model={dsDes}
            onModelChange={(event, editor) => {
              setDsDes(event);
            }}
            config={{
              placeholderText:
                "Provide a comprehensive job description, outlining the roles, responsibilities, qualifications, and any additional information relevant to the blog.",
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
        <div className="mt-4">
          {dsTitle === "" ? (
            <div>
              <CustomButton
                isDisable={true}
                title={"Send"}
                containerStyles="text-white justify-center w-[100%] flex py-2   mb-2 focus:outline-none  hover:text-white rounded-md text-base border  bg-gray-300"
              />
            </div>
          ) : (
            <div onClick={handleUpdateDiscussion}>
              <CustomButton
                title={"Send"}
                containerStyles="text-white justify-center w-[100%] flex py-2   mb-2 focus:outline-none hover:bg-blue-900 hover:text-white rounded-md text-base border border-blue- bg-blue-700"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
