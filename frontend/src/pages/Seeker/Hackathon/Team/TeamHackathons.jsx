import React, { useState, useEffect } from "react";
import TeamDetailsModal from "./TeamDetailsModal";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { Link, useOutletContext } from "react-router-dom";
import SearchInput from "@/components/Seeker/SearchInput";
import { CustomButton } from "@/components";
import TeamItem from "@/components/Seeker/TeamItem";
import { data } from "autoprefixer";
import Swal from "sweetalert2";

const HackathonTeams = ({}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {};
  const [team, setTeam] = useState({});
  const [teams, setTeams] = useState([]);
  const { item, id, isRegistered, user } = useOutletContext();
  useEffect(() => {
    fetchTeams();
    fetchMyTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/teams/hackathon/${id}`
      );
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const fetchMyTeams = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/teams/my-team/${id}`,
        { withCredentials: true }
      );
      setTeam(response.data);
    } catch (error) {
      console.error("Error fetching user teams:", error);
    }
  };

  const handleSendInvite = async (teamId, targetTeamId) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/teams/${teamId}/invite/${targetTeamId}`
      );
      if (data === "ok") {
        Swal.fire({
          title: "Successfully!",
          text: "Seding invite succesfully",
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
      if (data === "Already invited this team.") {
        Swal.fire({
          title: "Already invite!",
          text: data,
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
    } catch (error) {
      Swal.fire({
        title: "Error sending invite!",
        text: "Failed to send invite team. Please try again",
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
    <div>
      <div className="grid grid-cols-12 max-xl:grid-cols-1 max-xl:mt-1 gap-4 w-full h-full max-xl:px-4 px-60">
        <div className="col-span-3 max-xl:col-span-1 max-xl:mt-1 mt-36 pr-10 max-xl:pr-1">
          <div className="mt-5 text-sm text-gray-600 font-normal">
            <div className="mb-4 ">
              <div className=" font-semibold mb-2 mt-5 uppercase">
                {" "}
                Team status
              </div>
              {["Eligible Members", "Not Eligible Members"].map(
                (status, index) => (
                  <label
                    key={index}
                    className="my-2 flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox mr-2"
                      //   onChange={() => handleStatusChange(status)}
                      //   checked={selectedStatuses.includes(status)}
                    />
                    {status === "Eligible Members"
                      ? "Eligible Members"
                      : "Not Eligible Members"}
                  </label>
                )
              )}
            </div>
            {/* Length Section */}
          </div>
        </div>
        <div className="col-span-9 max-xl:col-span-1 pl-5 pb-5">
          <div className="">
            <SearchInput
              textPlaceholder={"Search team by name,..."}
              btnText={"Search team"}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
            />
          </div>
          {/* Title */}
          <div className="flex justify-between items-center text-sm mt-10">
            <div className="text-gray-600">
              Showing {teams?.length ?? 0} team
            </div>
            <div className="flex items-center">
              <div className="mr-3 font-medium">Sort:</div>
              <div className="flex items-center border border-gray-300 p-3">
                <CustomButton
                  //   onClick={() => setSelectedSort("newest")}
                  title="Newest"
                  containerStyles="text-blue-600 mb-[2px] font-medium px-2 hover:text-blue-800 text-sm bg-transparent"
                />
                <CustomButton
                  //   onClick={() => setSelectedSort("projects")}
                  title="Projects"
                  containerStyles="text-blue-600 mb-[2px] font-medium px-2 hover:text-blue-800 text-sm bg-transparent"
                />
              </div>
            </div>
          </div>
          <div className="mt-8">
            {teams.map((item, index) => {
              return (
                <div className="my-6" key={index}>
                  <div>
                    <TeamItem
                      props={item}
                      currentTeamId={team?._id}
                      handleInvite={handleSendInvite}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonTeams;
