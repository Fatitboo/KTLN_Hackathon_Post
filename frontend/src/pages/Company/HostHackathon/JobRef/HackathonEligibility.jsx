import { CustomComboBox } from "../../../../components";
import { JobDetailImage } from "../../../../assets/images";
import { useEffect, useState } from "react";

import RadioButton from "../InputField/RadioButton";
import CheckBox from "../InputField/CheckBox";

function HackathonEligibility({ formId, formSubmit, config }) {
  const listRangeTypes = [
    { id: 1, name: "Range" },
    { id: 2, name: "Starting amount" },
    { id: 3, name: "Maximum amount" },
    { id: 4, name: "Exact amount" },
  ];

  let [inputsValues, setInputValues] = useState({
    isPublished: true,
    participantAge: {
      type: "",
      min: "",
      max: "",
    },
    teamRequirement: {
      isRequire: false,
      type: "",
      min: "",
      max: "",
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    const data = inputsValues;
    data.teamRequirement.min = Number(data.teamRequirement.min);
    data.teamRequirement.max =
      data.teamRequirement.max != "" ? Number(data.teamRequirement.max) : null;
    data.participantAge.min = Number(data.participantAge.min);
    data.participantAge.max =
      data.participantAge.max != "" ? Number(data.participantAge.max) : null;
    formSubmit(data);
  }

  const communityTypes = [
    { id: 1, name: "Public" },
    { id: 2, name: "Invite only" },
  ];

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

  const filterValueCombobox = (type, value) => {
    setInputValues({
      ...inputsValues,
      [type]: { ...inputsValues[type], type: value.name, max: "" },
    });
  };

  const onChangeTextInput = (type, name, e) => {
    setInputValues({
      ...inputsValues,
      [type]: { ...inputsValues[type], [name]: e.target.value },
    });
  };

  const canTeamRequired = (value) => {
    setInputValues({
      ...inputsValues,
      teamRequirement: {
        ...inputsValues.teamRequirement,
        isRequire: value.length === 1,
      },
    });
  };

  const getFromText = (id) => {
    switch (id) {
      case 1:
        return "From";
      case 2:
        return "Minimum";
      case 3:
        return "Maximum";
      case 4:
        return "Exact";
      default:
        return "From";
    }
  };
  return (
    <>
      <div>
        {config ? null : (
          <div className="flex flex-row justify-between bg-[#faf9f8] rounded-xl -mx-8">
            <div className="flex items-center m-8">
              <span className="text-[#2D2D2D] text-[28px] font-bold">
                Eligibility
              </span>
            </div>
            <div className="col-span-3 flex mr-8">
              <img
                src={JobDetailImage}
                alt=""
                className="h-52 overflow-hidden"
              />
            </div>
          </div>
        )}
        <div className="p-8">
          <form
            id={formId}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <RadioButton
              listItem={communityTypes}
              name="isRequire"
              column={1}
              filterValueChecked={(e) => {
                setInputValues({
                  ...inputsValues,
                  isPublished: e.id === 1,
                });
              }}
              label="Hackathon Community"
              require
            />

            <div>
              {TitleDescription(
                "Participant Age",
                "For hackathons with participants under the legal age of majority, please consult legal counsel for consent forms and other requirements"
              )}
              <div className="flex flex-row items-center gap-2 mt-2 ">
                <div className="flex flex-row items-center gap-2 w-full">
                  <div className="w-[30%]">
                    <CustomComboBox
                      listItem={listRangeTypes}
                      name="participantAge"
                      filterValueSelected={(e) =>
                        filterValueCombobox("participantAge", e)
                      }
                      label="Type"
                      placeHolder={"Select an options."}
                    />
                  </div>
                  <div className="w-[50%] flex flex-row gap-2 items-center">
                    <div className="w-full">
                      <p className="block leading-8 text-gray-900 text-base font-semibold">
                        {getFromText(inputsValues["participantAge"].id)}
                      </p>
                      <div>
                        <input
                          type="text"
                          name="pay_1"
                          value={inputsValues.participantAge.min}
                          onChange={(e) =>
                            onChangeTextInput("participantAge", "min", e)
                          }
                          className={`w-full block bg-[#f9fbfc] focus:bg-white text-base shadow-sm rounded-md py-2 pl-5 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                        />
                      </div>
                    </div>
                    {inputsValues["participantAge"].type === "Range" ? (
                      <>
                        <div className="text-base mt-8 whitespace-nowrap">
                          to
                        </div>
                        <div className="w-full">
                          <p className="block leading-8 text-gray-900 text-base font-semibold">
                            Maximum
                          </p>
                          <input
                            type="text"
                            name="pay_2"
                            value={inputsValues.participantAge.max}
                            onChange={(e) =>
                              onChangeTextInput("participantAge", "max", e)
                            }
                            className={`w-full bg-[#f9fbfc] focus:bg-white text-base shadow-sm rounded-md py-2 pl-5 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                          />
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <CheckBox
                label="Team requirements"
                require
                filterValueChecked={canTeamRequired}
                listItem={[{ id: 1, name: "Team required" }]}
              />
              {inputsValues.teamRequirement.isRequire && (
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-row items-center gap-2 w-full">
                    <div className="w-[30%]">
                      <CustomComboBox
                        listItem={listRangeTypes}
                        name="teamRequirement"
                        filterValueSelected={(e) => {
                          filterValueCombobox("teamRequirement", e);
                        }}
                        label="Type"
                        placeHolder={"Select an options."}
                      />
                    </div>
                    <div className="w-[50%] flex flex-row gap-2 items-center">
                      <div className="w-full">
                        <p className="block leading-8 text-gray-900 text-base font-semibold">
                          {getFromText(inputsValues["teamRequirement"].id)}
                        </p>
                        <div>
                          <input
                            type="text"
                            name="pay_1"
                            value={inputsValues.teamRequirement.min}
                            onChange={(e) =>
                              onChangeTextInput("teamRequirement", "min", e)
                            }
                            className={`w-full block bg-[#f9fbfc] focus:bg-white text-base shadow-sm rounded-md py-2 pl-5 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                          />
                        </div>
                      </div>
                      {inputsValues["teamRequirement"].type === "Range" ? (
                        <>
                          <div className="text-base mt-8 whitespace-nowrap">
                            to
                          </div>
                          <div className="w-full">
                            <p
                              className="block leading-8 text-gray-900 text-base font-semibold"
                              style={{}}
                            >
                              Maximum
                            </p>
                            <input
                              type="text"
                              name="pay_2"
                              value={inputsValues.teamRequirement.max}
                              onChange={(e) =>
                                onChangeTextInput("teamRequirement", "max", e)
                              }
                              className={`w-full bg-[#f9fbfc] focus:bg-white text-base shadow-sm rounded-md py-2 pl-5 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                            />
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default HackathonEligibility;
