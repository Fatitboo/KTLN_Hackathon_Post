import { Modal, TextInput } from "@/components";
import { useEffect, useRef, useState } from "react";
import {
  BiMailSend,
  BiPencil,
  BiSave,
  BiTask,
  BiTrash,
  BiUserCheck,
} from "react-icons/bi";
import TeamProjectSmall from "../TeamProjectSmall/TeamProjectSmall";
import { IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CiViewBoard } from "react-icons/ci";
import InfoPopup from "@/components/Judge/InfoPopup";
import { defaultAvt } from "@/assets/images";
import CardProjectJudge from "@/components/Judge/CardProject";
import { PencilIcon, PlusIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import {
  resetValue,
  updateHackathonComponent,
} from "@/redux/slices/hackathons/hackathonsSlices";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MdCardMembership } from "react-icons/md";
import { UserIcon } from "@/assets/icons";
import { LuMailCheck } from "react-icons/lu";
import baseUrl from "@/utils/baseUrl";

const ManageJudges = ({ judges, projects, hackathon, setHackathon }) => {
  const params = useParams();
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [inputValues, setInputvalues] = useState({});
  const [judgeList, setJudgeList] = useState([]);
  const [prjs, setPrjs] = useState([]);
  const dispatch = useDispatch();
  const temp = useRef(null);
  const { isSuccessUD } = useSelector((store) => store.hackathons);

  const list = [12, 10, 25, 1, 3, 6, 10, 15, 16, 12, 1, 6, 4, 6, 8];

  const [selectJudge, setSelectJudge] = useState(undefined);
  useEffect(() => {
    if (judges) setJudgeList(judges);
  }, [judges]);

  const handleAssignTeams = async (judgeId, projects) => {
    fetch(`${baseUrl}/api/v1/hackathons/assign-project-judges/${params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        judgeId: judgeId,
        projects: projects.map((item) => ({ projectId: item.id })),
      }),
    })
      .then((response) => response.json())
      .then((endResult) => {
        Swal.fire({
          title: "Success",
          text: "Assign project successfully",
          confirmButtonText: "OK",
          icon: "success",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            setSelectJudge(undefined);
          }
          setHackathon(endResult);
        });
      })
      .catch((error) => console.log("error", error));
  };

  const getSelectedProject = (item) => {
    fetch(
      `${baseUrl}/api/v1/hackathons/judges-project/${params.id}?judgeId=${item.userId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (selectJudge && selectJudge.id == item.id) setSelectJudge(undefined);
        else {
          if (result.length !== 1 || result[0].judges.length !== 1) return;
          if (!result[0].judges[0].projectRates) {
            setSelectJudge({
              ...item,
              projectRates: [],
            });
            return;
          }
          const projectIdList = result[0].judges[0].projectRates.map(
            (item) => item.projectId
          );

          const projectsSelect = projects.filter((i) =>
            projectIdList.includes(i.id)
          );
          setSelectJudge({
            ...item,
            projectRates: projectsSelect,
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  const getMarkList = (item) => {
    fetch(
      `${baseUrl}/api/v1/hackathons/judges-project/${params.id}?judgeId=${item.userId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.length !== 1 || result[0].judges.length !== 1) return;
        if (!result[0].judges[0].projectRates) {
          setPrjs([]);
          setModal(true);
          return;
        }
        const projectIdList = result[0].judges[0].projectRates.map(
          (item) => item.projectId
        );
        console.log(projectIdList);
        const projectsSelect = projects.filter((i) =>
          projectIdList.includes(i.id)
        );
        console.log("ua alo", hackathon);
        const projectRates = hackathon.judges.find(
          (i) => i.userId === item.userId
        )?.projectRates;
        if (!projectRates) return;
        const mappedProject = projectsSelect.map((i) => {
          const proj = projectRates.find((p) => p.projectId === i.id);
          return {
            ...i,
            scores: [
              ...hackathon.criteria.map((c) => ({
                ...c,
                score:
                  proj.scores?.find((p) => p.criteriaId === c.id)?.score ?? 0,
              })),
            ],
            comment: proj.comment,
          };
        });
        setPrjs(mappedProject);
        setModal(true);
      })
      .catch((error) => console.log("error", error));
  };

  const sendInvitation = (judgeId, email, name) => {
    fetch(`${baseUrl}/api/v1/hackathons/check-valid-email/${params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        judgeId: judgeId,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          const queryParams = {
            judgeId: judgeId,
            email: email,
            receiver: name,
          };

          // Manually construct the query string
          const queryString = Object.keys(queryParams)
            .map(
              (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(
                  queryParams[key]
                )}`
            )
            .join("&");

          fetch(
            `${baseUrl}/api/v1/hackathons/invite-judge/${params.id}?${queryString}`,
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
                  setJudgeList([
                    ...judgeList.map((i) =>
                      i.id === judgeId ? { ...i, invited: true } : { ...i }
                    ),
                  ]);
                }
              });
            })
            .catch((error) => console.log("error", error));
        } else {
          Swal.fire({
            title: "Warning",
            text: "This email has been used in this hackathon",
            icon: "warning",
            confirmButtonText: "OK",
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
          });
        }
      });
  };

  const handleImageChange = (type, id, e) => {
    const { name, files } = e.target;
    setInputvalues((prevValues) => ({
      ...prevValues,
      [type]: files[0],
    }));
  };

  const handleSaveJudges = async () => {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/hackathons/check-valid-email/${params.id}`,
      {
        email: inputValues.email,
        judgeId: inputValues.id,
      }
    );
    if (!data) {
      Swal.fire({
        title: "Warning!",
        text: "This email has been used in this hackathon.",
        icon: "warning",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    const uploadedJudge = await handleUpload(inputValues);
    const judgeExit = judgeList?.find((item) => item.id === inputValues.id);
    console.log(judges, judgeExit, uploadedJudge);
    let mainData = [];
    if (judgeExit) {
      mainData = judgeList.map((item) =>
        item.id === uploadedJudge.id ? { ...uploadedJudge } : { ...item }
      );
    } else {
      mainData = [...judgeList];
      mainData.push(uploadedJudge);
    }

    temp.current = mainData;
    if (params.id) {
      dispatch(
        updateHackathonComponent({
          id: params.id,
          hackathon: { judges: mainData },
        })
      );
    }
  };
  const handleUpload = async (judge) => {
    const { photo, id } = judge;
    if (typeof photo === "string") {
      return judge;
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
      return { ...judge, photo: photoUrl };
    } catch (error) {
      console.error(`Error uploading photo for judge ${id}:`, error);
    }

    return updatedJudges;
  };

  useEffect(() => {
    if (isSuccessUD) {
      notify("success", "Update judge successfully!");
      dispatch(resetValue({ key: "isSuccessUD", value: false }));
      if (temp.current) {
        setJudgeList(temp.current);
        temp.current = null;
      }
      setModal2(false);
    }
  }, [isSuccessUD]);

  const notify = (type, message) => toast(message, { type: type });
  return (
    <>
      <div className="px-40 max-lg:px-2 py-5 ">
        <div className="border border-gray-200 rounded-sm p-5">
          <div className="flex flex-row items-center justify-between">
            <h2 className="font-semibold mt-5 mb-5">Manage judges</h2>
            <button
              onClick={() => {
                setInputvalues({
                  id: Date.now().toString(),
                  fullName: "",
                  email: "",
                  title: "",
                  photo: "",
                  invited: false,
                });
                setModal2(true);
              }}
              type="button"
              className="flex items-center justify-center h-[53px] box-border bg-[#1967d3] px-[18px] py-[8px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
            >
              <PlusIcon className="w-6 h-6" />
              <span className="text-[15px] leading-none font-semibold ml-1">
                Add Judge
              </span>
            </button>
          </div>

          <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-1 bg-white border-0">
            <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
              <tr className="w-full">
                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-4/12 pl-5 ">
                  Full name
                </th>
                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-3/12">
                  Email
                </th>
                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-3/12">
                  Company
                </th>
                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-1/12">
                  Is invited
                </th>
                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-1/12">
                  Actions
                </th>
              </tr>
            </thead>
          </table>
          <div className="flex flex-col gap-2">
            {judgeList?.map((item) => {
              return (
                <div className="border border-gray-300 shadow-sm p-1">
                  <div className="flex flex-row gap-2 items-center font-semibold">
                    <div className="flex flex-row items-center gap-2 w-4/12">
                      <img src={item.photo} className="w-20 h-20" />
                      <div>{item.fullName}</div>
                    </div>
                    <div className="w-3/12">{item.email}</div>
                    <div className="w-3/12">{item.title}</div>
                    <div className="w-1/12">
                      {item.invited ? (
                        item.userId ? (
                          <button
                            type="button"
                            className="flex items-center justify-center h-[40px] box-border bg-gray-400 px-[10px] py-[4px] rounded-[8px] text-[#fff] cursor-default"
                          >
                            <BiUserCheck className="w-6 h-6" />
                            <span className="text-[15px] leading-none font-semibold ml-1">
                              Joined
                            </span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="flex items-center justify-center h-[40px] box-border bg-gray-400 px-[10px] py-[4px] rounded-[8px] text-[#fff] cursor-default"
                          >
                            <LuMailCheck className="w-5 h-5" />
                            <span className="text-[15px] leading-none font-semibold ml-1">
                              Invited
                            </span>
                          </button>
                        )
                      ) : (
                        <button
                          onClick={() => {
                            sendInvitation(item.id, item.email, item.fullName);
                          }}
                          type="button"
                          className="flex items-center justify-center  h-[40px] box-border bg-[#1967d3] px-[10px] py-[4px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
                        >
                          <BiMailSend className="w-6 h-6" />
                          <span className="text-[15px] leading-none font-semibold ml-1">
                            Invite
                          </span>
                        </button>
                      )}
                    </div>

                    <div className="w-1/12">
                      {item.invited ? (
                        <div className="flex flex-row gap-1">
                          {item.userId && (
                            <button
                              onClick={() => {
                                getSelectedProject(item);
                              }}
                              className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] p-1 hover:bg-[#278646] hover:text-white"
                            >
                              {" "}
                              <BiTask fontSize={18} />{" "}
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setInputvalues(item);
                              setModal2(true);
                            }}
                            className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] p-1 hover:bg-[#278646] hover:text-white"
                          >
                            {" "}
                            <BiPencil fontSize={18} />{" "}
                          </button>
                          {item.userId && (
                            <button
                              onClick={() => {
                                getMarkList(item);
                              }}
                              className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] p-1 hover:bg-[#278646] hover:text-white"
                            >
                              {" "}
                              <CiViewBoard fontSize={18} />{" "}
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-row gap-1">
                          <button
                            onClick={() => {
                              setInputvalues(item);
                              setModal2(true);
                            }}
                            className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] p-1 hover:bg-[#278646] hover:text-white"
                          >
                            {" "}
                            <BiPencil fontSize={18} />{" "}
                          </button>
                          <button
                            onClick={() => {
                              if (params.id) {
                                temp.current = judgeList.filter(
                                  (i) => i.id !== item.id
                                );
                                dispatch(
                                  updateHackathonComponent({
                                    id: params.id,
                                    hackathon: {
                                      judges: temp.current,
                                    },
                                  })
                                );
                              }
                            }}
                            className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] p-1 hover:bg-[#278646] hover:text-white"
                          >
                            {" "}
                            <BiTrash fontSize={18} />{" "}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {selectJudge?.id === item.id && !modal && (
                    <div className="flex flex-row gap-4 mt-2 px-52 max-lg:px-2 py-5 ">
                      <div className="outline outline-[1px] shadow-sm  w-[350px]">
                        <div className="flex flex-row items-center justify-between mx-2">
                          <p className="block leading-8 text-gray-900 text-xl font-bold">
                            Teams
                          </p>
                          <button
                            onClick={() => {
                              setSelectJudge({
                                ...selectJudge,
                                projectRates: projects,
                              });
                            }}
                            className="flex items-center justify-center box-border bg-[#1967d3] px-[16px] py-[8px] mt-1 rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
                          >
                            <span className="text-[15px] leading-none font-semibold">
                              Add all
                            </span>
                          </button>
                        </div>
                        <hr className="block h-1 w-full bg-[rgb(212, 210, 208)] my-3" />
                        <div className="max-h-[400px] max-w-[900px] mx-4 overflow-y-auto overflow-x-hidden mb-4 no-scrollbar">
                          <div className="flex flex-col gap-2 col-span-1">
                            {projects?.map((item, index) => {
                              return (
                                <div key={index} className="relative">
                                  <TeamProjectSmall
                                    props={item}
                                    select={false}
                                  />
                                  {!selectJudge?.projectRates?.find(
                                    (i) => i.id === item.id
                                  ) && (
                                    <div className="absolute z-10 top-1 right-2">
                                      <button
                                        onClick={() => {
                                          let assignProj =
                                            selectJudge.projectRates;
                                          if (assignProj) {
                                            assignProj.push(item);
                                          } else {
                                            assignProj = [item];
                                          }
                                          setSelectJudge({
                                            ...selectJudge,
                                            projectRates: assignProj,
                                          });
                                        }}
                                        className="flex items-center justify-center box-border bg-[#1967d3] px-[10px] py-[4px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
                                      >
                                        <span className="text-[15px] leading-none font-semibold">
                                          Add
                                        </span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="outline outline-[1px] shadow-sm w-[350px]">
                        <div className="flex flex-row items-center justify-between mx-2">
                          <p className="block leading-8 text-gray-900 text-xl font-bold">
                            Assign Teams
                          </p>
                          <div className="flex flex-row gap-1">
                            <button
                              onClick={() => {
                                const { projectRates, ...rest } = selectJudge;
                                setSelectJudge(rest);
                              }}
                              className="flex items-center justify-center box-border bg-[#f85c57] px-[16px] py-[8px] mt-1 rounded-[8px] text-[#fff] hover:bg-[#ae2b26] cursor-pointer"
                            >
                              <span className="text-[15px] leading-none font-semibold">
                                Remove all
                              </span>
                            </button>
                            <button
                              onClick={() => {
                                handleAssignTeams(
                                  item.userId,
                                  selectJudge.projectRates
                                );
                              }}
                              className="flex items-center justify-center box-border bg-[#1967d3] px-[16px] py-[8px] mt-1 rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
                            >
                              <span className="text-[15px] leading-none font-semibold">
                                Assign
                              </span>
                            </button>
                          </div>
                        </div>
                        <hr className="block h-1 w-full bg-[rgb(212, 210, 208)] my-3" />
                        <div className="max-h-[400px] max-w-[900px] mx-4 overflow-y-auto overflow-x-hidden mb-4 no-scrollbar">
                          <div className="flex flex-col gap-2 col-span-1">
                            {selectJudge?.projectRates?.map((item, index) => {
                              return (
                                <div key={index} className="relative">
                                  <TeamProjectSmall
                                    props={item}
                                    select={false}
                                  />
                                  <div className="absolute z-10 top-1 right-2">
                                    <button
                                      onClick={() => {
                                        let assignProj =
                                          selectJudge.projectRates;
                                        if (assignProj) {
                                          assignProj = assignProj.filter(
                                            (i) => i.id !== item.id
                                          );
                                        }
                                        setSelectJudge({
                                          ...selectJudge,
                                          projectRates: assignProj,
                                        });
                                      }}
                                      className="flex items-center justify-center box-border bg-[#f85c57] px-[10px] py-[4px] rounded-[8px] text-[#fff] hover:bg-[#ae2b26] cursor-pointer"
                                    >
                                      <IoClose />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal open={modal} setModal={setModal}>
        <div>
          <div className="flex flex-row items-center justify-between mx-2">
            <p className="block leading-8 text-gray-900 text-xl font-bold">
              Judge scores
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
          <div className="overflow-x-auto max-h-[500px] no-scrollbar">
            {prjs && prjs.length === 0 ? (
              <>
                <div className="text-[#3a60bf] font-medium p-5 text-base">
                  No projects assigned for this judge
                </div>
              </>
            ) : (
              <table className="color-white w-full border-2 border-[#a7b1c2]">
                <thead className="w-full bg-[#f5f7fc]">
                  <tr>
                    <th
                      rowSpan={2}
                      className="relative text-[#3a60bf] font-medium py-2 text-base border-r-2 border-r-[#a7b1c2]"
                    >
                      Project
                    </th>
                    <th
                      colSpan={hackathon?.criteria.length ?? 1}
                      className="relative text-[#3a60bf] font-medium py-2 border text-base border-b-2 border-[#a7b1c2]"
                    >
                      Criteria
                    </th>
                    <th
                      rowSpan={2}
                      className="relative text-[#3a60bf] font-medium py-2 text-base border-l-2 border-[#a7b1c2]"
                    >
                      Comment
                    </th>
                  </tr>
                  <tr>
                    {hackathon?.criteria.map((item, index) => {
                      return (
                        <th
                          key={index}
                          className="text-[#3a60bf] font-medium py-2 text-base border-r-2 border-r-[#a7b1c2]"
                        >
                          <div className="flex flex-row items-center gap-1 justify-center">
                            {item.title}
                            <InfoPopup information={item.description} />
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="bg-slate-50">
                  {prjs &&
                    prjs.map((card, index) => (
                      <tr className="border-2 border-[#a7b1c2]">
                        <td className="p-2 border-r-2 border-r-[#a7b1c2] max-w-xs">
                          <CardProjectJudge
                            key={index}
                            id={card.id}
                            title={card.projectTitle}
                            description={card.tagline}
                            image={card.thumnailImage}
                            imgUser={defaultAvt}
                            member={card.createdBy}
                            isWinner={false}
                            votes={index < list.length ? list[index] : 0}
                            comments={
                              index < list.length
                                ? list[list.length - index - 1]
                                : 0
                            }
                          />
                        </td>
                        {card.scores.map((item) => {
                          return (
                            <td className="p-2 border-r-2 border-r-[#a7b1c2]">
                              <TextInput
                                type="number"
                                readOnly
                                value={item.score}
                              />
                            </td>
                          );
                        })}
                        <td className="p-2">
                          <textarea
                            type="text"
                            name="comment"
                            id="comment"
                            readOnly
                            value={card.comment}
                            className="block focus:bg-white text-base w-full rounded-md border-0 py-2.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8"
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </Modal>

      <Modal open={modal2} setModal={setModal2}>
        <div>
          <div className="flex flex-row items-center justify-between mx-2">
            <p className="block leading-8 text-gray-900 text-xl font-bold">
              Add Judge
            </p>
            <div
              className="hover:bg-slate-100 rounded-sm p-2 cursor-pointer opacity-90"
              onClick={() => {
                setModal2(false);
              }}
            >
              <IoClose size={20} />
            </div>
          </div>
          <hr className="block h-1 w-full bg-[rgb(212, 210, 208)] my-3" />
          <div className="overflow-x-auto max-h-[500px] no-scrollbar">
            <div
              key={inputValues.id}
              className="bg-[#f7f7f7] p-5 rounded-lg grid grid-cols-2 gap-4"
            >
              <div className="flex flex-col gap-2">
                <div>
                  <TextInput
                    label="Full name"
                    required
                    value={inputValues.fullName}
                    onChange={(e) =>
                      setInputvalues({
                        ...inputValues,
                        fullName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <TextInput
                    label="Email or Hackadev username"
                    required
                    readOnly={inputValues.invited}
                    value={inputValues.email}
                    onChange={(e) =>
                      setInputvalues({
                        ...inputValues,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <TextInput
                    label="Title / Company"
                    required
                    value={inputValues.title}
                    onChange={(e) =>
                      setInputvalues({
                        ...inputValues,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="ml-4">
                <div className="text-gray-900 font-medium mb-1">Photo</div>
                <div className="w-56 h-56 bg-[#f2f2f2] flex flex-col items-center justify-center border text-sm text-[#6F6F6F] italic mb-1">
                  <div className="w-full h-full">
                    {inputValues.photo && (
                      <img
                        src={
                          typeof inputValues.photo == "string"
                            ? inputValues.photo
                            : URL.createObjectURL(inputValues.photo)
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
                  onChange={(e) =>
                    handleImageChange("photo", inputValues.id, e)
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end mr-3">
            <button
              onClick={handleSaveJudges}
              type="button"
              className="flex mt-2 items-center h-[53px] box-border bg-[#1967d3] px-[18px] py-[8px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
            >
              <BiSave className="w-6 h-6" />
              <span className="text-[15px] leading-none font-semibold ml-1">
                Save
              </span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ManageJudges;
