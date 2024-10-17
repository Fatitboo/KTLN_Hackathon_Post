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
import "froala-editor/js/plugins/font_size.min.js";

import FroalaEditor from "react-froala-wysiwyg";
import TextInput from "../InputField/TextInput";

function JobDes({ formId, formSubmit, flag, config, content, onDoneSubmit }) {
  const editor = useRef();
  let [errors] = useState({});

  function handleSubmit(e) {
    console.log(inputValues);
    e.preventDefault();
    formSubmit();
  }

  const [inputValues, setInputValues] = useState({
    mainDescription: `<h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;' id="isPasted"><strong><span style="font-size: 18px;">About the challenge</span></strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong><span style="font-size: 18px;">Get started</span></strong></h4>`,
    videoDescription: "",
    submissionDescription: `<h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;' id="isPasted"><strong>Introduction</strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong>Tools and Technologies</strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong>Inspiration</strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong>Contact Us &amp; Support Channels</strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong>Additional Resource links</strong></h4>`,
    ruleDescription: `<h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;' id="isPasted"><strong><span style="font-size: 18px;">Dates</span></strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 18px;"><strong>Eligibility</strong></span></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 18px;"><strong>Project and Submission Requirements</strong></span></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 18px;"><strong>Prizes</strong></span></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong><span style="font-size: 18px;">Judging Criteria and Winner Selection</span></strong></h4>`,
    resourceDescription: `<h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;' id="isPasted"><strong><span style="font-size: 18px;">What to Build</span></strong></h4><h4 style='color: rgb(0, 0, 0); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong><span style="font-size: 18px;">What to Submit</span></strong></h4>`,
  });

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

  function handleChange(e, model) {
    setInputValues({ ...inputValues, [model]: e });
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
                model={inputValues.mainDescription}
                onModelChange={(event, editor) => {
                  handleChange(event, "mainDescription");
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
                model={inputValues.submissionDescription}
                onModelChange={(event, editor) => {
                  handleChange(event, "submissionDescription");
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

          <TextInput
            label="Video"
            description="Do you have a promotional or explainer video for your hackathon? If so, include a YouTube or Vimeo link here. Make sure embedding is enabled."
            required
            type="text"
            vl={inputValues.videoDescription}
            onChange={(e) => {
              handleChange(e.target.value, "videoDescription");
            }}
            rules="requiredText"
          />

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
                model={inputValues.ruleDescription}
                onModelChange={(event, editor) => {
                  handleChange(event, "ruleDescription");
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
                model={inputValues.resourceDescription}
                onModelChange={(event, editor) => {
                  handleChange(event, "resourceDescription");
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
