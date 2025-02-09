import { useEffect, useState } from "react";
import { JobBasicImage } from "../../../../assets/images";
import TextInput from "../InputField/TextInput";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BiMailSend } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import FroalaEditor from "react-froala-wysiwyg";
import { Modal } from "../../../../components";

function HackathonJudging({ formSubmit, formId }) {
  const param = useParams();
  const [modal, setModal] = useState(false);
  const [inputValues, setInputValues] = useState({
    judgingType: "",
    judgingPeriod: {
      start: "",
      end: "",
    },
    judges: [],
    criteria: [],
    criteriaScore: {
      min: 0,
      max: 0,
    },
  });
  const [inviteMail, setInviteMail] = useState({
    title: "",
    content: "",
  });

  const onSubmitForm = async (e) => {
    e?.preventDefault();
    const uploadedJudges = await handleUpload(inputValues.judges);
    const data = {
      ...inputValues,
      judges: uploadedJudges,
      judgingPeriod: {
        start: new Date(inputValues.judgingPeriod.start),
        end: new Date(inputValues.judgingPeriod.end),
      },
      criteriaScore: {
        min: Number(inputValues.criteriaScore.min),
        max: Number(inputValues.criteriaScore.max),
      },
    };
    console.log(data);
    formSubmit(data);
  };

  const judgingTypes = [
    {
      type: "ONLINE",
      des: "Judges will log onto Devpost to score each project.",
      subDes: "(This is the preferred method for online hackathons.)",
    },
    {
      type: "OFFLINE",
      des: "Judges will review projects via expo / demos / presentations.",
      subDes: "(This method is frequently used at in-person hackathons)",
    },
  ];

  const onChangeValueTextInput = (type, e) => {
    setInputValues({
      ...inputValues,
      judgingPeriod: { ...inputValues.judgingPeriod, [type]: e.target.value },
    });
  };

  const onChangeText = (type, subtype, id, e) => {
    setInputValues({
      ...inputValues,
      [type]: inputValues[type].map((i) =>
        i.id === id ? { ...i, [subtype]: e } : { ...i }
      ),
    });
  };

  const handleUpload = async (judgePhotos) => {
    const updatedJudges = [];

    for (const judge of judgePhotos) {
      const { photo, id } = judge;
      if (!photo) continue;
      if (typeof photo === "string") {
        updatedJudges.push(judge);
        continue;
      }
      const formData = new FormData();
      formData.append("file", photo);
      formData.append("upload_preset", "nhanle");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dcdjan0oo/image/upload`,
          formData
        );
        const photoUrl = response.data.secure_url;
        console.log(`Photo for judge ${id} uploaded successfully: ${photoUrl}`);

        // Cập nhật đối tượng judge với URL ảnh mới
        updatedJudges.push({ ...judge, photo: photoUrl });
      } catch (error) {
        console.error(`Error uploading photo for judge ${id}:`, error);
      }
    }

    return updatedJudges;
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

  const handleImageChange = (type, id, e) => {
    const { name, files } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      judges: prevValues.judges.map((item) =>
        item.id === id ? { ...item, [type]: files[0] } : { ...item }
      ),
    }));
  };

  function convertToDateTimeFormat(isoDateString) {
    try {
      // Create a new Date object from the ISO 8601 string
      const date = new Date(isoDateString);

      if (isNaN(date.getTime())) {
        throw new Error("Invalid date string");
      }

      // Extract the required components
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      // Return the formatted string
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch (error) {
      console.error("Error converting date:", error.message);
      return null;
    }
  }

  useEffect(() => {
    fetch(`${baseUrl}/api/v1/hackathons/component/${param.id}/${formId}`)
      .then((response) => response.json())
      .then((result) => {
        const { _id, ...rest } = result;
        setInputValues({ ...inputValues, ...rest });
      });
  }, []);

  const sendInvitation = async (judgeId, email, name) => {
    await onSubmitForm();
    const queryParams = {
      judgeId: judgeId,
      email: email,
      receiver: name,
    };

    // Manually construct the query string
    const queryString = Object.keys(queryParams)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
      )
      .join("&");

    fetch(
      `http://localhost:3000/api/v1/hackathons/invite-judge/${param.id}?${queryString}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((aydy) => {
        Swal.fire({
          title: "Success!",
          text: "Invitation mail has been send.",
          icon: "success",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            setInputValues({
              ...inputValues,
              judges: inputValues.judges.map((item) =>
                item.id === judgeId ? { ...item, invited: true } : { ...item }
              ),
            });
          }
        });
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div>
        <div className="bg-[#faf9f8] rounded-xl grid grid-cols-5 gap-4 -mx-8">
          <div className="col-span-2 flex items-center m-8">
            <span className="text-[#2D2D2D] text-[28px] font-bold">
              Judging
            </span>
          </div>
          <div className="col-span-3 flex mr-12 justify-end">
            <img src={JobBasicImage} className="h-52 overflow-hidden" />
          </div>
        </div>
        <div className="p-8">
          <form
            id={formId}
            onSubmit={onSubmitForm}
            className="flex flex-col gap-5"
          >
            {TitleDescription(
              "Are you using online or offline judging?",
              "You can edit this choice until the submission period ends"
            )}

            {judgingTypes.map((item, index) => {
              return (
                <li
                  key={index}
                  value={index}
                  onClick={() => {
                    setInputValues({
                      ...inputValues,
                      judgingType: item.type,
                    });
                  }}
                  className="flex items-center justify-between py-0 px-5 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90"
                >
                  <div className="flex flex-row items-center cursor-pointer">
                    <div>
                      <div className="relative h-7 flex items-center">
                        <div
                          className="absolute bg-[#FFF] border border-[#808082] w-[18px] h-[18px] rounded-[10px]"
                          color="#FFF"
                        ></div>
                        <div
                          className={`${
                            inputValues.judgingType === item.type
                              ? ""
                              : "hidden"
                          } flex items-center justify-center absolute bg-[#1967d2] w-[18px] h-[18px] rounded-[10px]`}
                          color="#FFF"
                        >
                          <BsCheck color="#FFF" />
                        </div>
                      </div>
                    </div>
                    <span className="pl-7 text-base select-none text-[#6F6F6F] flex flex-col">
                      <div className="flex flex-row items-center">
                        {item.type}
                        <div className="text-[#696969] text-sm">
                          - {item.des}
                        </div>
                      </div>
                      <span className="text-sm select-none text-[#696969]">
                        {item.subDes}
                      </span>
                    </span>
                  </div>
                </li>
              );
            })}

            {TitleDescription(
              "Judging Period (mm/dd/yyyy)",
              "MM/DD/YYYY format. All times are in Eastern Time (US & Canada) (EDT)"
            )}
            <TextInput
              label="Start"
              required
              value={convertToDateTimeFormat(inputValues.judgingPeriod.start)}
              onChange={(value) => onChangeValueTextInput("start", value)}
              type="datetime-local"
            />

            <TextInput
              label="Ends"
              required
              value={convertToDateTimeFormat(inputValues.judgingPeriod.end)}
              onChange={(value) => onChangeValueTextInput("end", value)}
              type="datetime-local"
            />

            {TitleDescription(
              "Judges",
              "Add your judges here and their name, title, and photo will be displayed on the hackathon site. (We won't display emails.)"
            )}

            {inputValues.judges?.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="bg-[#f7f7f7] p-5 rounded-lg grid grid-cols-2 gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <div>
                      <TextInput
                        label="Full name"
                        required
                        value={item.fullName}
                        onChange={(e) =>
                          onChangeText(
                            "judges",
                            "fullName",
                            item.id,
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <TextInput
                        label="Email or Hackadev username"
                        required
                        value={item.email}
                        onChange={(e) =>
                          onChangeText(
                            "judges",
                            "email",
                            item.id,
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <TextInput
                        label="Title / Company"
                        required
                        value={item.title}
                        onChange={(e) =>
                          onChangeText(
                            "judges",
                            "title",
                            item.id,
                            e.target.value
                          )
                        }
                      />
                    </div>
                    {item.invited ? (
                      <button
                        type="button"
                        className="flex items-center justify-center h-[53px] box-border bg-gray-400 px-[18px] py-[8px] rounded-[8px] text-[#fff] cursor-default"
                      >
                        <BiMailSend className="w-6 h-6" />
                        <span className="text-[15px] leading-none font-semibold ml-1">
                          Mail Send
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          sendInvitation(item.id, item.email, item.fullName);
                        }}
                        type="button"
                        className="flex items-center justify-center h-[53px] box-border bg-[#1967d3] px-[18px] py-[8px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
                      >
                        <BiMailSend className="w-6 h-6" />
                        <span className="text-[15px] leading-none font-semibold ml-1">
                          Invite Mail
                        </span>
                      </button>
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-gray-900 font-medium mb-1">Photo</div>
                    <div className="w-56 h-56 bg-[#f2f2f2] flex flex-col items-center justify-center border text-sm text-[#6F6F6F] italic mb-1">
                      <div className="w-full h-full">
                        {item.photo && (
                          <img
                            src={
                              typeof item.photo == "string"
                                ? item.photo
                                : URL.createObjectURL(item.photo)
                            }
                            alt="Uploaded"
                            className="w-full h-full"
                          />
                        )}
                      </div>
                    </div>
                    <input
                      type="file"
                      name="photo"
                      onChange={(e) => handleImageChange("photo", item.id, e)}
                    />
                    <div
                      className="text-[#1D4ED8] cursor-pointer mt-1 font-semibold w-14"
                      onClick={() => {
                        setInputValues({
                          ...inputValues,
                          judges: inputValues.judges.filter(
                            (i) => i.id !== item.id
                          ),
                        });
                      }}
                    >
                      Cancel
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              className="bg-[#1D4ED8] text-white rounded-lg py-1 font-semibold flex items-center justify-center w-28 hover:opacity-90"
              onClick={(e) => {
                e.preventDefault();
                const newArr = [...inputValues.judges];
                newArr.push({
                  id: Date.now().toString(),
                  fullName: "",
                  email: "",
                  title: "",
                  photo: "",
                  invited: false,
                });
                setInputValues({
                  ...inputValues,
                  judges: newArr,
                });
              }}
            >
              Add judges
            </button>

            {TitleDescription(
              "Criteria",
              "Add criteria to help participants understand how they'll be judged."
            )}

            {inputValues.criteria?.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="bg-[#f7f7f7] p-5 rounded-lg flex flex-col gap-2"
                >
                  <div className="w-2/5">
                    <TextInput
                      label="Title"
                      required
                      value={item.title}
                      onChange={(e) =>
                        onChangeText(
                          "criteria",
                          "title",
                          item.id,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="w-5/6">
                    <div className="text-gray-900 font-medium">Description</div>
                    <textarea
                      className="w-5/6 p-2"
                      value={item.description}
                      onChange={(e) =>
                        onChangeText(
                          "criteria",
                          "description",
                          item.id,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div
                    className="text-[#1D4ED8] cursor-pointer mt-1 font-semibold w-14"
                    onClick={() => {
                      setInputValues({
                        ...inputValues,
                        criteria: inputValues.criteria.filter(
                          (i) => i.id !== item.id
                        ),
                      });
                    }}
                  >
                    Cancel
                  </div>
                </div>
              );
            })}

            <button
              className="bg-[#1D4ED8] text-white rounded-lg py-1 font-semibold flex items-center justify-center w-28 hover:opacity-90"
              onClick={(e) => {
                e.preventDefault();
                const newArr = [...inputValues.criteria];
                newArr.push({
                  id: Date.now(),
                  title: "",
                  description: "",
                });
                setInputValues({
                  ...inputValues,
                  criteria: newArr,
                });
              }}
            >
              Add criteria
            </button>

            {TitleDescription(
              "Criteria Score",
              "Add criteria score to set the range of to mark"
            )}
            <div className="flex flex-row items-center gap-4 bg-[#f7f7f7] p-5 rounded-lg">
              <TextInput
                label="Min score"
                type="number"
                min={0}
                required
                value={inputValues.criteriaScore.min}
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    criteriaScore: {
                      min: e.target.value,
                      max: Math.max(
                        e.target.value,
                        inputValues.criteriaScore.max
                      ),
                    },
                  });
                }}
              />
              <TextInput
                label="Max score"
                type="number"
                min={0}
                required
                value={inputValues.criteriaScore.max}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    criteriaScore: {
                      min: Math.min(
                        e.target.value,
                        inputValues.criteriaScore.min
                      ),
                      max: e.target.value,
                    },
                  })
                }
              />
            </div>
          </form>
        </div>
      </div>
      <Modal open={modal} setModal={setModal}>
        <div>
          <div className="flex flex-row items-center justify-between mx-2">
            <p className="block leading-8 text-gray-900 text-xl font-bold">
              Invitation Mail
            </p>
            <div
              className="hover:bg-slate-100 rounded-sm p-2 cursor-pointer opacity-90"
              onClick={() => {
                setModal(false);
              }}
            >
              <IoClose size={20} />
            </div>
          </div>
          <hr className="block h-1 w-full bg-[rgb(212, 210, 208)] my-3" />
          <div className="flex flex-col w-[600px] mx-9 overflow-x-hidden mb-4 gap-6">
            <TextInput
              label="Subject"
              required
              name="jobTitle"
              value={inviteMail.title}
              onChange={(e) => {
                setInviteMail({
                  ...inviteMail,
                  title: e.target.value,
                });
              }}
              type="text"
              rules="requiredText"
            />

            <div>
              {TitleDescription(
                "Main Description",
                "Describe your hackathon and what makes it special. Many in-person hackathons include their event schedules here too."
              )}
              <div
                name="jobDes"
                className="border border-[black] rounded-md overflow-hidden h-96"
              >
                <FroalaEditor
                  model={inviteMail.content}
                  onModelChange={(event, editor) => {
                    console.log(event);
                    setInviteMail({
                      ...inviteMail,
                      content: event,
                    });
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
          </div>
          <div className="flex flex-row items-center gap-2 float-right">
            <div
              className="flex items-center justify-center box-border bg-[white] border px-[18px] py-[14px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] hover:border-[#1967d3] cursor-pointer"
              onClick={() => {
                setModal(false);
              }}
            >
              <span className="text-[15px] leading-none font-bold">Close</span>
            </div>
            <button
              type="submit"
              onClick={() => {
                console.log(inviteMail);
                fetch(`${baseUrl}/api/v1/hackathons/invite-judge/${param.id}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(inviteMail),
                })
                  .then((response) => response.json())
                  .then((aydy) => {
                    Swal.fire({
                      title: "Updated!",
                      text: "Subscription type has been updated.",
                      icon: "success",
                      confirmButtonText: "OK",
                      allowOutsideClick: false,
                      confirmButtonColor: "#3085d6",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        setModal(false);
                      }
                    });
                  })
                  .catch((error) => console.log("error", error));
              }}
              className="w-[90px] flex items-center justify-center box-border bg-[#1967d3] px-[18px] py-[14px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
            >
              <span className="text-[15px] leading-none font-bold">Send</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default HackathonJudging;
