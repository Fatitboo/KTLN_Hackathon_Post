import { defaultAvt } from "@/assets/images";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BiPencil } from "react-icons/bi";
import MngTModal from "./ManageTeamModal";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  getProjectRegisteredToHackathonAction,
  resetSuccessAction,
} from "@/redux/slices/projects/projectsSlices";
import { CustomButton, Modal } from "@/components";
import TeamItem from "@/components/Seeker/TeamItem";
import { AskToAddProject } from "@/components/Modal/AskToAddProject";
import CardProject from "@/components/Seeker/CardProject";

const ManageTeams = ({ hackathon, user }) => {
  const [team, setTeam] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState([]);
  const [newTeam, setNewTeam] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [itemProject, setItemProject] = useState([]);
  const [openAskToAddProject, setOpenAskToAddProject] = useState(false);

  const handleCreateTeam = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/teams/${newTeam.action ?? "create"}`,
        {
          teamName: newTeam.name,
          hackathonId: hackathon?._id,
          teamId: newTeam.id,
        },
        { withCredentials: true }
      );
      setTeam({ ...response.data });
      setNewTeam(null);
    } catch (error) {
      Swal.fire({
        title: "Error creating team!",
        text: "Failed to create team. Please try again",
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        icon: "info",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          return;
        }
      });
    }
  };
  useEffect(() => {
    fetchMyTeams();
    fetchMyInvitations();
  }, []);

  // const id = "67386091dc5db4aea4e96603";

  const sliceProject = useSelector((store) => store.projects);
  const { myprojects, isSuccessUD } = sliceProject;

  useEffect(() => {
    dispatch(
      getProjectRegisteredToHackathonAction({ hackathonId: hackathon._id })
    );
  }, []);

  useEffect(() => {
    if (isSuccessUD) {
      dispatch(resetSuccessAction());
      setItemProject(myprojects);
    }
  }, [isSuccessUD]);

  const fetchMyTeams = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/teams/my-team/${hackathon._id}`,
        { withCredentials: true }
      );

      setTeam(response.data);
    } catch (error) {
      console.error("Error fetching user teams:", error);
    }
  };

  const fetchMyInvitations = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/teams/my-invitation/${hackathon._id}`,
        { withCredentials: true }
      );

      setInvitations(response.data);
    } catch (error) {
      console.error("Error fetching user teams:", error);
    }
  };

  const handleAcceptInvite = async (invitationId) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/teams/${invitationId}/merge/${team?._id}`
      );
      if (data) {
        Swal.fire({
          title: "Accept success!",
          text: "Accept invitation successfully.",
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          showCancelButton: true,
          icon: "info",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            fetchMyTeams();
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error accepting team!",
        text: "Error accepting invitation. Please try again",
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        icon: "info",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          return;
        }
      });
    }
  };

  const handleRejectInvite = async (invitationId) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/teams/${team?._id}/decline/${invitationId}`
      );
      if (data) {
        Swal.fire({
          title: "Reject success!",
          text: "Reject invitation successfully.",
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          showCancelButton: true,
          icon: "info",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            fetchMyTeams();
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error rejecting team!",
        text: "Error rejecting invitation. Please try again",
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        icon: "info",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          return;
        }
      });
    }
  };

  const handleTransferLeaderInvite = async (newLeaderId) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/teams/${team?._id}/set-leader`,
        { newLeaderId }
      );
      if (data) {
        Swal.fire({
          title: "Transfer Leader success!",
          text: "Transfer Leader  successfully.",
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          showCancelButton: true,
          icon: "info",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            fetchMyTeams();
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error Transfer Leader team!",
        text: "Error Transfer Leader . Please try again",
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        icon: "info",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          return;
        }
      });
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/teams/${team?._id}/remove-member`,
        { memberId }
      );
      if (data) {
        Swal.fire({
          title: "Remove success!",
          text: "Remove invitation successfully.",
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          showCancelButton: true,
          icon: "info",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            fetchMyTeams();
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error remove!",
        text: "Error remove member. Please try again",
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        icon: "info",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          return;
        }
      });
    }
  };

  const handleDeleteInvite = async (invitationId) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/teams/${team._id}/delete-invite/${invitationId}`
      );
      if (data) {
        Swal.fire({
          title: "Delete success!",
          text: "Delete invitation successfully.",
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          showCancelButton: true,
          icon: "info",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            fetchMyInvitations();
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error deleting team!",
        text: "Error deleting invitation. Please try again",
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        icon: "info",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          return;
        }
      });
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const { data } = await axios.delete(
        `${baseUrl}/api/v1/projects/${projectId}`
      );
      if (data) {
        Swal.fire({
          title: "Delete success!",
          text: "Delete successfully.",
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          showCancelButton: true,
          icon: "info",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(
              getProjectRegisteredToHackathonAction({
                hackathonId: hackathon._id,
              })
            );
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error deleting !",
        text: "Error deleting . Please try again",
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        icon: "info",
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
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Teams</h1>
        {!team ? (
          <div className="mt-6">
            <button
              onClick={() =>
                setNewTeam({
                  name: "",
                  action: "create",
                  id: "",
                })
              }
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              + Create New Team
            </button>
          </div>
        ) : (
          user.id === team.leaderId?._id && (
            <div className="mt-6">
              <button
                onClick={() => setOpenModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Invite member
              </button>
            </div>
          )
        )}
      </div>

      {/* User Teams */}
      {team && (
        <div className="mt-6">
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div key={team.id} className="border p-4 rounded shadow bg-blue-50">
              <div className="flex items-center">
                <h2 className="font-semibold mr-10">{team.name}</h2>
                {user.id === team.leaderId?._id && (
                  <BiPencil
                    className="cursor-pointer"
                    onClick={() =>
                      setNewTeam({
                        name: team.name,
                        action: "update",
                        id: team._id,
                      })
                    }
                    size={20}
                  />
                )}
              </div>
              <p>Leader: {team.leaderId?.fullname}</p>
            </div>
            <div className="w-full">
              <div className="w-full uppercase ml-1 my-2">Members</div>
              <div className="flex flex-wrap w-full">
                <div style={{ listStyle: "none", padding: 0, width: "100%" }}>
                  {team?.members?.map((teammate, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "10px",
                        marginBottom: "10px",
                        width: "100%",
                      }}
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center">
                          <img
                            src={teammate?.avatar ?? defaultAvt}
                            alt="avatar"
                            style={{
                              width: "40px",
                              height: "40px",
                              marginRight: "5px",
                              borderRadius: "50%",
                              backgroundColor: "#ccc",
                            }}
                          />
                          <div>
                            <div className="flex">
                              <p style={{ margin: 0 }}>{teammate.fullname}</p>
                              {teammate._id === team.leaderId._id && (
                                <div className="bg-green-800 text-white px-2 mx-3">
                                  Leader
                                </div>
                              )}
                            </div>
                            <p style={{ margin: 0, color: "#888" }}>
                              {teammate.email}
                            </p>
                          </div>
                        </div>
                        <div className="mx-3">
                          | {teammate?.settingRecommend?.specialty} |
                        </div>

                        <div className="flex ">
                          {user.id === team.leaderId?._id &&
                          user.id !== teammate._id ? (
                            <button
                              onClick={() =>
                                handleTransferLeaderInvite(teammate._id)
                              }
                              className="bg-blue-700 p-1 text-white mr-3"
                            >
                              Transfer Leader
                            </button>
                          ) : (
                            <div></div>
                          )}
                          {user.id === team.leaderId?._id &&
                          user.id !== teammate._id ? (
                            <button
                              onClick={() => handleRemoveMember(teammate._id)}
                              className="bg-red-700 p-1 text-white"
                            >
                              Remove
                            </button>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Team Modal */}
      {newTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-semibold">Create New Team</h2>
            <div className="mt-4">
              <label className="block font-medium">Team Name</label>
              <input
                type="text"
                value={newTeam.name}
                onChange={(e) =>
                  setNewTeam({ ...newTeam, name: e.target.value })
                }
                className="w-full mt-2 px-3 py-2 border rounded"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setNewTeam(null)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTeam}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-[50%]">
            <h2 className="text-xl font-semibold">Invite member</h2>
            <MngTModal hackathonId={hackathon._id} teamId={team._id} />
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {invitations ? (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Team's invitations</h2>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {invitations?.map((invitation) => (
              <div key={invitation.id} className="border p-4 rounded shadow">
                <TeamItem
                  props={invitation}
                  currentTeamId={team?._id}
                  handleInvite={() => {}}
                  isHideTag={true}
                />

                <button
                  onClick={() => handleDeleteInvite(invitation._id)}
                  className="ml-2 mt-2 px-4 py-2 bg-red-700 text-white rounded"
                >
                  Delete request
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Nothing to show</div>
      )}
      {/* Invitations */}
      {team && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">
            Request combined team invitations
          </h2>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {team.invitations?.map((invitation) => (
              <div key={invitation.id} className="border p-4 rounded shadow">
                <TeamItem
                  props={invitation}
                  currentTeamId={team?._id}
                  handleInvite={() => {}}
                  isHideTag={true}
                />
                <button
                  onClick={() => handleAcceptInvite(invitation._id)}
                  className="mt-2 px-4 py-2 bg-green-800 text-white rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectInvite(invitation._id)}
                  className="ml-2 px-4 py-2 bg-red-700 text-white rounded"
                >
                  Reject
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {team && (
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Team's hackathon projects</h3>

            {user.id === team.leaderId?._id && (
              <CustomButton
                onClick={() => setOpenAskToAddProject(true)}
                title="Create new project"
                containerStyles="bg-blue-600  mb-2 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
              />
            )}
          </div>
          <div>
            <div className="my-5 grid grid-cols-2 max-xl:grid-cols-1 gap-6">
              {(itemProject ?? [])?.map((card, index) => (
                <div>
                  <CardProject
                    key={index}
                    id={card._id}
                    title={card?.projectTitle}
                    description={card?.tagline}
                    member={card.createdBy}
                    image={card?.thumnailImage ?? imgDefaultProject}
                    imgUser={defaultAvt}
                    isWinner={false}
                    votes={card?.votes ?? 0}
                    comments={card?.comments ?? 0}
                    link={`/Seeker/project/manage-project/!imptHktid_${hackathon._id}_${card._id}`}
                  />
                  <div className="flex">
                    <Link
                      to={`/Seeker/project/manage-project/!imptHktid_${hackathon._id}_${card._id}/edit`}
                      className="mt-2 px-4 py-2 bg-green-800 text-white rounded"
                    >
                      Edit
                    </Link>
                    {user.id === team.leaderId?._id &&
                      card._id !== team.submittedProjectId && (
                        <button
                          onClick={() => handleDeleteProject(card._id)}
                          className="ml-2 mt-2 px-4 py-2 bg-red-700 text-white rounded"
                        >
                          Delete
                        </button>
                      )}
                    {card._id === team.submittedProjectId ? (
                      <>
                        <div className="ml-2 mt-2 px-4 py-2 bg-gray-400 text-white rounded">
                          Submited{" "}
                        </div>
                      </>
                    ) : (
                      user.id === team.leaderId?._id && (
                        <Link
                          to={`/Seeker/project/manage-project/!imptHktid_${hackathon._id}_${card._id}/submit`}
                          className="ml-2 mt-2 px-4 py-2 bg-blue-700 text-white rounded"
                        >
                          Submit
                        </Link>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Modal open={openAskToAddProject}>
        <AskToAddProject
          isAddProject={true}
          setopenReport={setOpenAskToAddProject}
          item={{}}
          isVacancy={true}
          teamId={team._id}
        />
      </Modal>
    </div>
  );
};

export default ManageTeams;
