import {
  useParams,
  Link,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";
import SearchUser from "./SearchUser/SearchUser";
import baseUrl from "@/utils/baseUrl";

function MngTModal({ hackathonId, teamId }) {
  const inputBox = useRef();
  const inputBoxReal = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [spin, setSpin] = useState(false);
  const [skills, setSkills] = useState([]);
  const [listSkillApi, setListSkillApi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const storeData = useSelector((store) => store.users);

  const user = storeData?.userAuth?.user;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchDataSkill("all", "", searchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchDataSkill = (searchTerm, hackathonId, value) => {
    inputBoxReal.current = value;
    if (value === "") {
      setListSkillApi([]);
    } else {
      setSpin(true);
      const params = new URLSearchParams({
        searchTerm,
        hackathonId,
        searchQuery: value,
      }).toString();

      fetch(`${baseUrl}/api/v1/users/search?${params}`)
        .then((response) => response.json())
        .then((result) => {
          if (result.length == 0) {
            fetchSkillsAI(value);
          }
          const arr = [...result];
          console.log(arr);

          setListSkillApi(arr);
          setSpin(false);
        })
        .catch((error) => console.log("error", error));
    }
  };

  const fetchSkillsAI = (value) => {
    setSpin(true);
    fetch(`http://127.0.0.1:5000/predict-skill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: value,
        threshold: 0.4,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.length >= 1) {
          inputBoxReal.current = result[0].skill;
          const params = new URLSearchParams({
            searchTerm: "skills",
            hackathonId: "",
            searchQuery: result[0].skill,
          }).toString();
          fetch(`${baseUrl}/api/v1/users/search?${params}`)
            .then((response) => response.json())
            .then((result) => {
              const arr = [...result];

              setListSkillApi(arr);
              setSpin(false);
            })
            .catch((error) => {
              console.log("error", error);
              setSpin(false);
            });
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleCheckMail = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const v = { hackathonId, emails: skills };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/projects/projectId/check-invite-list`,
        v,
        {}
      );
      if (data.registedAndHasTeam.length > 0) {
        Swal.fire({
          title: "User had team in this Hackathon!",
          text:
            data.registedAndHasTeam.join(", ") +
            " had team registed to this Hackathon. Please remove them",
          confirmButtonText: "OK",
          icon: "error",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            return;
          }
        });
      } else {
        Swal.fire({
          title:
            data.noAccount.length > 0
              ? "User dont have account in our Platform!"
              : "Do you want to invite them",
          text:
            data.noAccount.length > 0
              ? data.noAccount.join(", ") +
                " dont have account in our Platform. Do you want to invite them?"
              : "Do you want to invite them?",
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          showCancelButton: true,
          icon: "info",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then(async (result) => {
          if (result.isConfirmed) {
            /* empty */
            const { data } = await axios.post(
              `${baseUrl}/api/v1/teams/${teamId}/send-invite-member/${hackathonId}`,
              v,
              {}
            );
            if (data === "ok") {
              Swal.fire({
                title: "Send mail successfully!",
                text: "Send mail successfully. Please wait for them accepting",
                confirmButtonText: "OK",
                icon: "success",
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
              }).then((result) => {
                if (result.isConfirmed) {
                  return;
                }
              });
            }
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error when invite user: " + error.message,
        confirmButtonText: "OK",
        icon: "warning",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          return;
        }
      });
    }
  };

  return (
    <>
      <div>
        <div className=" py-5 grid grid-cols-3 gap-20">
          <div className="mt-4 w-full col-span-3 ">
            <div className="mb-5">
              <div className="block text-base font-medium text-gray-700">
                Invite teammates
              </div>
              <div className="text-sm text-[#6F6F6F] italic my-3">
                Either share the link below privately with your teammates or
                send an invite link via email
              </div>
              <div className="relative ">
                <div className="flex items-center">
                  <div
                    tabIndex={0}
                    onChange={() => setListSkillApi([])}
                    className={`relative flex flex-row gap-1 flex-wrap items-center w-full bg-white focus:bg-white focus:border-gray-900 text-base shadow-sm rounded-sm pl-5 py-1 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                  >
                    {skills?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-row items-center rounded gap-1 bg-gray-100 py-1 px-2 text-sm h-8"
                        >
                          <div className="whitespace-nowrap">{item}</div>
                          <div
                            className="cursor-pointer"
                            onClick={() =>
                              setSkills(skills.filter((i) => i != item))
                            }
                          >
                            <IoIosClose />
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex"></div>
                    <div className="flex-1 ">
                      <input
                        type="text"
                        ref={inputBox}
                        placeholder={
                          "Input email of user you want to add to team."
                        }
                        onBlur={(e) => e.stopPropagation()}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`min-w-5 w-full block focus:outline-none bg-white  focus:bg-white text-base  rounded-md pr-5 text-gray-900 border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                      />
                    </div>

                    {spin ? (
                      <svg
                        className="absolute right-1 animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="white"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="#cccccc"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : null}
                  </div>
                  <button
                    onClick={handleCheckMail}
                    style={{
                      padding: "8px 10px",
                      marginLeft: "20px",
                      backgroundColor: "#f0f0f0",
                      border: "1px solid #ccc",
                      borderRadius: "2px",
                      cursor: "pointer",
                      width: "170px",
                    }}
                  >
                    Invite
                  </button>
                </div>
                <div
                  className="relative z-100"
                  style={{
                    visibility:
                      listSkillApi.length === 0 ? "collapse" : "visible",
                  }}
                >
                  <div className="border mt-1 rounded overflow-auto absolute w-full max-h-56">
                    {listSkillApi.map((item, index) => {
                      return (
                        <div
                          onClick={() => {
                            !skills.includes(item.email) &&
                              setSkills([...skills, item.email]);
                            inputBox.current.value = "";
                            setListSkillApi([]);
                          }}
                          key={index}
                          className={`hover:bg-[#eef1f2] z-20  block focus:outline-none bg-white focus:bg-white text-base shadow-sm py-2 pl-5 pr-5 text-gray-90 placeholder:text-gray-400 sm:text-base sm:leading-8 cursor-pointer`}
                        >
                          <SearchUser
                            props={item}
                            value={inputBoxReal.current}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MngTModal;
