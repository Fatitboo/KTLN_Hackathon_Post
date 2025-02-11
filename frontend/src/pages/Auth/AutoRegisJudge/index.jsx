import axios from "axios";
import { welcomeToJoin } from "../../../assets/images";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import baseUrl from "../../../utils/baseUrl";

function AutoRegisterJudge() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const name = params.get("name");
  const email = params.get("email");
  const judgeId = params.get("judgeId");
  const id = params.get("id");
  const storeData = useSelector((store) => store.users);
  const user = storeData?.userAuth?.user;
  const navigate = useNavigate();

  const handleAddRegisterHackathon = async () => {
    await axios
      .post(
        `${baseUrl}/api/v1/hackathons/accept-invite-judge/${id}`,
        {
          name: name,
          email: email,
          judge: judgeId,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const { data } = response;
        console.log("🚀 ~ handleAddRegisterHackathon ~ data:", data);
        Swal.fire({
          title: "You had added to team!",
          text: "You had added to team as a judge. Please check your email.",
          confirmButtonText: "OK",
          icon: "info",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/Hackathon-detail/${data.hackathonId}`);
          }
        });
      })
      .catch((e) => {
        const { data } = e.response;
        if (
          data.message === "This team is full. Please ask another team to join."
        ) {
          Swal.fire({
            title: "This team is full.",
            text: data.message,
            confirmButtonText: "OK",
            icon: "info",
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
          }).then((result) => {
            if (result.isConfirmed) {
              sessionStorage.removeItem("registerInfo");

              navigate(`/Seeker/brower-hackathons`);
            }
          });
          return;
        } else if (
          data.message === "This user has join a team in this Hackathon"
        ) {
          Swal.fire({
            title: data.message,
            text: "You had registered to this Hackathon. Please check your email!",
            confirmButtonText: "OK",
            icon: "info",
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
          }).then((result) => {
            if (result.isConfirmed) {
              sessionStorage.removeItem("registerInfo");

              navigate(`/Seeker/brower-hackathons`);
            }
          });
          return;
        } else {
          Swal.fire({
            title: "Error",
            text: "Has error when register. Please try again",
            confirmButtonText: "OK",
            icon: "info",
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(`/Seeker/brower-hackathons`);
            }
          });
          return;
        }
      });
  };
  useEffect(() => {
    if (email && name) {
      handleAddRegisterHackathon();
    }
  }, [email, name]);
  return (
    <div className="max-lg:px-2 py-5 align-middle">
      <div className="text-3xl font-medium uppercase self-center text-center">
        Register
      </div>
      <div className="py-5 text-center">
        Please respect our community guidelines.
      </div>
      <div className="flex justify-center align-middle self-center">
        <img
          src={welcomeToJoin}
          className="text-center self-center items-center align-middle"
        ></img>
      </div>
    </div>
  );
}

export default AutoRegisterJudge;
