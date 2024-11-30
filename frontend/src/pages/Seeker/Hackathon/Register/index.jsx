import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { CustomButton } from "../../../../components";

function RegisterToHackathon() {
  const [TeamStatus, setTeamStatus] = useState("");
  const teamStatus = [
    "Working solo",
    "Looking for teammates",
    "Already have a team",
  ];
  const handleTeamStatusChange = (value) => setTeamStatus(value);
  return (
    <div className="px-96 max-lg:px-2 py-5 ">
      <div className="text-3xl font-medium uppercase">Register</div>
      <div className="py-5">Please respect our community guidelines.</div>
      <div>
        <div className="mb-2">
          <div className="block text-base font-semibold text-gray-700">
            * Do you have teammates?
          </div>
        </div>
        <div className="flex flex-wrap text-gray-500">
          {teamStatus.map((item) => (
            <div
              key={item}
              className={`px-4 py-1 flex items-center cursor-pointer rounded-sm border my-1 mr-4
                ${TeamStatus === item ? " border-blue-900" : "border-gray-300"}
              `}
              onClick={() => handleTeamStatusChange(item)}
            >
              {TeamStatus === item ? (
                <CheckCircleIcon className="rounded-full bg-gray-200 w-5 h-5 mr-2" />
              ) : (
                <div className="rounded-full bg-gray-200 w-5 h-5 mr-2" />
              )}
              {item}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mt-5 mb-2">
          <div className="block text-base font-semibold text-gray-700">
            Eligibility requirements
          </div>
        </div>
        <div>
          <label className="flex items-start space-x-2">
            <input type="checkbox" className="form-checkbox mr-4 mt-2" />
            <div>
              <span>
                * I have read and agree to the eligibility requirements for this
                hackathon:
              </span>
              <div className="grid grid-cols-2">
                {[
                  "Ages 18+ only",
                  "Only specific",
                  "Quebec is excluded",
                  "Countries/Territories included",
                ].map((item, index) => {
                  return (
                    <div key={index} className="grid-cols-1">
                      - {item}
                    </div>
                  );
                })}
              </div>
            </div>
          </label>
          <label className="my-5 flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox mr-4" />
            <span>
              * I have read and agree to be bound by the Official Rules and the
              Devpost Terms of Service
            </span>
          </label>
        </div>
        <div className="flex items-center">
          <CustomButton
            title="Register"
            containerStyles="bg-blue-600 cursor-pointer w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
          />
          <div
            onClick={() => {}}
            className="cursor-pointer text-blue-600 ml-10"
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterToHackathon;
