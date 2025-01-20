import { Modal } from "@/components";
import { useEffect, useState } from "react";
import { BiTask } from "react-icons/bi";
import TeamProjectSmall from "../TeamProjectSmall/TeamProjectSmall";
import { IoClose, IoTennisball } from "react-icons/io5";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ManageJudges = ({ judges, projects }) => {
  const params = useParams();
  const [modal, setModal] = useState(false);
  const [judgeList, setJudgeList] = useState([]);
  const [selectJudge, setSelectJudge] = useState(undefined);
  useEffect(() => {
    if (judges) setJudgeList(judges);
  }, [judges]);

  const handleAssignTeams = async (judgeId, projects) => {
    fetch(
      `http://localhost:3000/api/v1/hackathons/assign-project-judges/${params.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          judgeId: judgeId,
          projects: projects.map((item) => ({ projectId: item.id })),
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
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
        });
      })
      .catch((error) => console.log("error", error));
  };

  const getSelectedProject = (item) => {
    fetch(
      `http://localhost:3000/api/v1/hackathons/judges-project/${params.id}?judgeId=${item.userId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (selectJudge && selectJudge.id == item.id) setSelectJudge(undefined);
        else {
          if (result.length !== 1 || result[0].judges.length !== 1) return;
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
  return (
    <>
      <div className="flex flex-row">
        <div className="border border-gray-200 rounded-sm p-5">
          {judgeList?.map((item) => {
            return (
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <img src={item.photo} className="w-20 h-20" />|
                  <div>{item.fullName}</div>|<div>{item.email}</div>|
                  <div>{item.title}</div>|
                  <div>{item.invited ? "Invited" : "Invite"}</div>|
                  <div>
                    {item.invited && (
                      <button
                        onClick={() => {
                          getSelectedProject(item);
                        }}
                        className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#278646] hover:text-white"
                      >
                        {" "}
                        <BiTask fontSize={18} />{" "}
                      </button>
                    )}
                  </div>
                </div>
                {selectJudge?.id === item.id && (
                  <div className="flex flex-row gap-4">
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
                                <TeamProjectSmall props={item} select={false} />
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
                                <TeamProjectSmall props={item} select={false} />
                                <div className="absolute z-10 top-1 right-2">
                                  <button
                                    onClick={() => {
                                      let assignProj = selectJudge.projectRates;
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

      <Modal open={modal} setModal={setModal}></Modal>
    </>
  );
};

export default ManageJudges;
