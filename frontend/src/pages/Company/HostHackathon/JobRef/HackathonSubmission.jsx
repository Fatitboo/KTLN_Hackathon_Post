import { JobPreScreenImage } from "../../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../InputField/TextInput";
import FroalaEditor from "react-froala-wysiwyg";
import { useState } from "react";
import ComboBox from "../InputField/ComboBox";
function HackathonSubmissions({ formId, formSubmit }) {
  const [inputValues, setInputValues] = useState({
    start: "",
    deadline: "",
    note: "",
    isUploadFile: false,
    isUploadVideo: false,
  });
  function handleSubmit(e) {
    e.preventDefault();
    formSubmit({ submissions: inputValues });
  }

  const onChange = (type, value) => {
    setInputValues({
      ...inputValues,
      [type]: value,
    });
  };

  const filterCombobox = (type, e) => {
    setInputValues({
      ...inputValues,
      [type]: e.id === 1,
    });
  };

  const TitleDescription = (title, description) => {
    return (
      <div>
        <p className="block leading-6 text-gray-900 text-base font-semibold">
          <label className="align-middle mr-1 text-[#FF4949] font-bold">
            *
          </label>
          {title}
        </p>
        <p className="text-sm text-[#6F6F6F] italic">{description}</p>
      </div>
    );
  };

  return (
    <>
      <div>
        <div className="flex flex-row justify-between bg-[#faf9f8] rounded-xl -mx-8">
          <div className="flex items-center m-8">
            <span className="text-[#2D2D2D] text-[28px] font-bold">
              Submissions
            </span>
          </div>
          <div className="col-span-3 flex mr-8">
            <img
              src={JobPreScreenImage}
              alt=""
              className="h-52 overflow-hidden"
            />
          </div>
        </div>
        <div className="p-8">
          <form
            id={formId}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <TextInput
              type="date"
              label="Start of hacking period"
              vl={inputValues.start}
              onChange={(e) => onChange("start", e.target.value)}
              required
              description="Event kickoff for in-person events."
            />

            <TextInput
              type="date"
              label="Deadline"
              vl={inputValues.deadline}
              onChange={(e) => onChange("deadline", e.target.value)}
              required
              description="Hackers must submit their projects before this time."
            />

            <div className="block text-gray-900 font-bold text-xl mb-[2px] mt-3">
              Customize submission form
            </div>

            <div>
              {TitleDescription(
                "Final Reminders",
                "Use this field to add any last-minute reminders about key submission requirements, etc. These reminders will be shown to submitters right before they submit."
              )}

              <FroalaEditor
                model={inputValues.note}
                onModelChange={(event, editor) => {
                  onChange("note", event);
                }}
                config={{
                  placeholderText:
                    "Provide a comprehensive vacancy description, outlining the roles, responsibilities, qualifications, and any additional information relevant to the job.",
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
                  height: 325,
                  heightMin: 325,
                  resizable: true,
                  wordCounter: true,
                  wordCounterLabel: "words",
                  wordCounterBbCode: false,
                  wordCounterTimeout: 0,
                }}
              />
            </div>

            <ComboBox
              listItem={[
                { id: 1, name: "On" },
                { id: 2, name: "Off" },
              ]}
              name="participantAge"
              filterValueSelected={(e) => filterCombobox("isUploadFile", e)}
              label="File Upload (PDF, ZIP, Word doc)"
              description="Some types of submissions (for example, YouTube videos and apps in the iPhone App Store) will exist outside of the hackathon site. For other types, you can add a file upload button so a file can be attached right on the hackathon site. Uploaded files will only be visible to hackathon managers and judges."
              placeHolder={"Select an options."}
            />
            <ComboBox
              listItem={[
                { id: 1, name: "On" },
                { id: 2, name: "Off" },
              ]}
              name="participantAge"
              filterValueSelected={(e) => filterCombobox("isUploadVideo", e)}
              label="Require videos"
              description="Turning this on will require submitters to add a video link to their submission."
              placeHolder={"Select an options."}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default HackathonSubmissions;
