import React, { useEffect, useRef, useState } from "react";
import { JobDesImage } from "../../../../assets/images";
import { AiFillExclamationCircle } from "react-icons/ai";
// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/table.min.js";
import "froala-editor/js/plugins/video.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/markdown.min.js";

import FroalaEditor from "react-froala-wysiwyg";
import { toast } from "react-toastify";

function JobDes({ formId, formSubmit, flag, config, content, onDoneSubmit }) {
  const editor = useRef();
  let [errors] = useState({});
  const inputBox = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    formSubmit();
  }

  const notify = (type, message) => toast(message, { type: type });

  const [value, setValue] = useState("");

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

  function handleChange(e) {
    console.log(e);
    setValue(e);
  }

  return (
    <>
      {config ? null : (
        <div className="flex flex-row justify-between bg-[#faf9f8] rounded-xl -mx-8">
          <div className="flex items-center m-8">
            <span className="text-[#2D2D2D] text-[28px] font-bold">
              Hackathon site
            </span>
          </div>
          <div className="col-span-3 flex mr-8">
            <img src={JobDesImage} alt="" className="h-52 overflow-hidden" />
          </div>
        </div>
      )}
      <div className="p-8">
        <form
          id={formId}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
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
                model={value}
                onModelChange={(event, editor) => {
                  handleChange(event, editor);
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

          <div>
            {TitleDescription(
              "Submission Requirements",
              "Clearly tell hackers what they need to build for the hackathon and anything additional they should submit on Devpost."
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
                model={value}
                onModelChange={(event, editor) => {
                  handleChange(event, editor);
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

          <div>
            {TitleDescription(
              "Video",
              "Do you have a promotional or explainer video for your hackathon? If so, include a YouTube or Vimeo link here. Make sure embedding is enabled."
            )}
            <div
              ref={editor}
              name="jobDes"
              className="border border-[black] rounded-md overflow-hidden h-96"
              style={{
                borderColor: `${errors.jobDes ? "#a9252b" : ""}`,
                outlineColor: `${errors.jobDes ? "#a9252b" : ""}`,
              }}
            ></div>
          </div>

          <div>
            {TitleDescription(
              "Rules",
              "You should consult a lawyer before finalizing the rules for your hackathon. Here are some rules suggestions you may find useful. If you're running an ​in-person hackathon​, you must include a code of conduct as well. Here's a template."
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
                model={value}
                onModelChange={(event, editor) => {
                  handleChange(event, editor);
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

          <div>
            {TitleDescription(
              "Resources",
              "This will be added as a hackathon tab. List any additional resources for the hackathon (e.g. links to required tools, datasets or tutorials, tech support, etc. - anything that may be helpful for participants)."
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
                model={value}
                onModelChange={(event, editor) => {
                  handleChange(event, editor);
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

export default JobDes;
