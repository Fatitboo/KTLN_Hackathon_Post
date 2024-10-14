import { CustomComboBox } from "../../../../components";
import { JobDetailImage } from "../../../../assets/images";
import { useState } from "react";
import { useSelector } from "react-redux";

import RadioButton from "../InputField/RadioButton";

function HackathonEligibility({ formId, formSubmit, config }) {
  const listRangeTypes = [
    { id: 1, name: "Range" },
    { id: 2, name: "Starting amount" },
    { id: 3, name: "Maximum amount" },
    { id: 4, name: "Exact amount" },
  ];
  const { currentJobComponent } = useSelector((store) => store.vacancies);

  let [inputsValues, setInputValues] = useState({
    participantAge: listRangeTypes[0],
    teamRequirement: listRangeTypes[0],
  });

  let [errors, setErrors] = useState({});

  let [visibleMax, setVisibleMax] = useState(
    currentJobComponent ? (currentJobComponent.pay_2 ? true : false) : false
  );

  let [ErrorMessages, setErrorMessages] = useState({
    jobTypes: "Please choose some type.",
    showBy_1: "Please fill a fixed hours.",
    showBy_2: "Please fill finish hour",
    duration: "Add a duration",
  });

  function handleSubmit(e) {
    e.preventDefault();
    formSubmit();
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

  const filterParticipantAge = (value) => {
    setInputValues({
      ...inputsValues,
      participantAge: value,
    });
  };

  const filterTeamRequirement = (value) => {
    setInputValues({
      ...inputsValues,
      teamRequirement: value,
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
              filterValueChecked={(e) => {}}
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
                      filterValueSelected={filterParticipantAge}
                      label="Type"
                      placeHolder={"Select an options."}
                    />
                  </div>
                  <div className="w-[50%] flex flex-row gap-2 items-center">
                    <div className="w-full">
                      <p
                        className="block leading-8 text-gray-900 text-base font-semibold"
                        style={{ color: `${errors.pay_1 ? "#a9252b" : ""}` }}
                      >
                        {getFromText(inputsValues["participantAge"].id)}
                      </p>
                      <div>
                        <input
                          type="text"
                          name="pay_1"
                          value={inputsValues.pay_1}
                          style={{
                            borderColor: `${errors.pay_1 ? "#a9252b" : ""}`,
                            outlineColor: `${errors.pay_1 ? "#a9252b" : ""}`,
                          }}
                          className={`w-full block bg-[#f9fbfc] focus:bg-white text-base shadow-sm rounded-md py-2 pl-5 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                        />
                      </div>
                    </div>
                    {inputsValues["participantAge"].id ===
                    listRangeTypes[0].id ? (
                      <>
                        <div className="text-base mt-8 whitespace-nowrap">
                          to
                        </div>
                        <div className="w-full">
                          <p
                            className="block leading-8 text-gray-900 text-base font-semibold"
                            style={{
                              color: `${errors.pay_2 ? "#a9252b" : ""}`,
                            }}
                          >
                            Maximum
                          </p>
                          <input
                            type="text"
                            name="pay_2"
                            value={inputsValues.pay_2}
                            style={{
                              borderColor: `${errors.pay_2 ? "#a9252b" : ""}`,
                              outlineColor: `${errors.pay_2 ? "#a9252b" : ""}`,
                            }}
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
              <RadioButton
                listItem={[{ id: 1, name: "Team required" }]}
                require
                label={"Team requirements"}
                filterValueChecked={() => {}}
              />
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center gap-2 w-full">
                  <div className="w-[30%]">
                    <CustomComboBox
                      listItem={listRangeTypes}
                      name="teamRequirement"
                      filterValueSelected={filterTeamRequirement}
                      label="Type"
                      placeHolder={"Select an options."}
                    />
                  </div>
                  <div className="w-[50%] flex flex-row gap-2 items-center">
                    <div className="w-full">
                      <p
                        className="block leading-8 text-gray-900 text-base font-semibold"
                        style={{ color: `${errors.pay_1 ? "#a9252b" : ""}` }}
                      >
                        {getFromText(inputsValues["teamRequirement"].id)}
                      </p>
                      <div>
                        <input
                          type="text"
                          name="pay_1"
                          value={inputsValues.pay_1}
                          style={{
                            borderColor: `${errors.pay_1 ? "#a9252b" : ""}`,
                            outlineColor: `${errors.pay_1 ? "#a9252b" : ""}`,
                          }}
                          className={`w-full block bg-[#f9fbfc] focus:bg-white text-base shadow-sm rounded-md py-2 pl-5 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                        />
                      </div>
                    </div>
                    {inputsValues["teamRequirement"].id ===
                    listRangeTypes[0].id ? (
                      <>
                        <div className="text-base mt-8 whitespace-nowrap">
                          to
                        </div>
                        <div className="w-full">
                          <p
                            className="block leading-8 text-gray-900 text-base font-semibold"
                            style={{
                              color: `${errors.pay_2 ? "#a9252b" : ""}`,
                            }}
                          >
                            Maximum
                          </p>
                          <input
                            type="text"
                            name="pay_2"
                            value={inputsValues.pay_2}
                            style={{
                              borderColor: `${errors.pay_2 ? "#a9252b" : ""}`,
                              outlineColor: `${errors.pay_2 ? "#a9252b" : ""}`,
                            }}
                            className={`w-full bg-[#f9fbfc] focus:bg-white text-base shadow-sm rounded-md py-2 pl-5 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                          />
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default HackathonEligibility;
