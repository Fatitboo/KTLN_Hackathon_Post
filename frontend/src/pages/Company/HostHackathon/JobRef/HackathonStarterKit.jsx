import { JobRefImage } from "../../../../assets/images";
import { useEffect, useRef, useState } from "react";
import { TextInput } from "../../../../components";

import FroalaEditor from "react-froala-wysiwyg";
import { useParams } from "react-router-dom";

function HackathonStarterKit({ formId, formSubmit, config }) {
  const editor = useRef();
  const param = useParams();

  let [errors, setErrors] = useState({});

  const [inputValues, setInputValues] = useState({
    subjectMailTitle: "",
    contentMailRegister: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    formSubmit(inputValues);
  }

  function onChangeTextInput(type, e) {
    setInputValues({
      ...inputValues,
      [type]: e,
    });
  }

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

  useEffect(() => {
    fetch(`${baseUrl}/api/v1/hackathons/component/${param.id}/${formId}`)
      .then((response) => response.json())
      .then((result) => {
        const { _id, ...rest } = result;
        setInputValues({ ...inputValues, ...rest });
      });
  }, []);

  return (
    <>
      {config ? null : (
        <div className="flex flex-row justify-between bg-[#faf9f8] rounded-xl -mx-8">
          <div className="flex items-center m-8">
            <span className="text-[#2D2D2D] text-[28px] font-bold">
              Starter Kit
            </span>
          </div>
          <div className="col-span-3 flex mr-8">
            <img src={JobRefImage} alt="" className="h-52 overflow-hidden" />
          </div>
        </div>
      )}
      <div className="p-8">
        <form
          id={formId}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <TextInput
            label="Subject"
            description="This is the subject line of an email that will go to all registrants upon registration, if enabled. It will automatically include the name of the hackathon, so there's no need to add that here."
            required
            name="jobTitle"
            vl={inputValues.subjectMailTitle}
            onChange={(e) =>
              onChangeTextInput("subjectMailTitle", e.target.value)
            }
            type="text"
            rules="requiredText"
          />

          <div>
            {TitleDescription(
              "Main Description",
              "Describe your hackathon and what makes it special. Many in-person hackathons include their event schedules here too."
            )}
            <div
              ref={editor}
              name="jobDes"
              className="border border-[black] rounded-md overflow-hidden h-96"
              style={{
                borderColor: `${errors.jobDes ? "#a9252b" : ""}`,
                outlineColor: `${errors.jobDes ? "#a9252b" : ""}`,
              }}
            >
              <FroalaEditor
                model={inputValues.contentMailRegister}
                onModelChange={(event, editor) => {
                  onChangeTextInput("contentMailRegister", event);
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
          </div>
        </form>
      </div>
    </>
  );
}

export default HackathonStarterKit;
