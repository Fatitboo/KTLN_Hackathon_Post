import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { CustomButton } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  registerHackathonAction,
  TEAM_STATUS,
} from "../../../../redux/slices/users/usersSlices";

function RegisterToHackathon() {
  const [TeamStatus, setTeamStatus] = useState("");
  const [isFirstChecked, setIsFirstChecked] = useState(false);
  const [isSecondChecked, setIsSecondChecked] = useState(false);
  const users = useSelector((store) => store.users);
  const { appErr, registerRs } = users;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teamStatus = [
    "Working solo",
    "Looking for teammates",
    "Already have a team",
  ];
  const handleSubmit = () => {
    if (isFirstChecked && isSecondChecked) {
      let b;
      switch (TeamStatus) {
        case teamStatus[0]:
          b = TEAM_STATUS.WORKING_SOLO;
          break;
        case teamStatus[1]:
          b = TEAM_STATUS.FINDING_TEAMATE;
          break;
        case teamStatus[2]:
          b = TEAM_STATUS.HAD_TEAM;
          break;
        default:
          b = "";
          break;
      }
      const payload = {
        hackathonId: "67386091dc5db4aea4e96603",
        additionalInfo: {
          status: b,
        },
      };
      // console.log("🚀 ~ handleSubmit ~ payload:", payload);
      dispatch(registerHackathonAction(payload));
    } else {
      Swal.fire({
        title: "Accept rule!",
        text: "Please check both checkboxes Eligibility requirements to register.",
        confirmButtonText: "OK",
        icon: "info",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
    }
  };
  const handleTeamStatusChange = (value) => setTeamStatus(value);

  useEffect(() => {
    if (registerRs) {
      Swal.fire({
        title: "Register success!",
        confirmButtonText: "OK",
        icon: "success",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          if (registerRs.teamStatus === TEAM_STATUS.HAD_TEAM) {
            navigate(
              `/Seeker/project/manage-project/!imptHktid_12762_${registerRs.projectId}`
            );
          } else {
            navigate(`/Hackathon-detail/${"12762"}`);
          }
        }
      });
    }
  }, [registerRs]);

  useEffect(() => {
    if (appErr) {
      Swal.fire({
        title: "Register failed!",
        text: "Please try again.",
        confirmButtonText: "OK",
        icon: "info",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
    }
  }, [appErr]);
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
            <input
              type="checkbox"
              className="form-checkbox mr-4 mt-2"
              checked={isFirstChecked}
              onChange={(e) => setIsFirstChecked(e.target.checked)}
            />
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
            <input
              checked={isSecondChecked}
              onChange={(e) => setIsSecondChecked(e.target.checked)}
              type="checkbox"
              className="form-checkbox mr-4"
            />
            <span>
              * I have read and agree to be bound by the Official Rules and the
              Devpost Terms of Service
            </span>
          </label>
        </div>
        <div className="flex items-center">
          <CustomButton
            onClick={handleSubmit}
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
