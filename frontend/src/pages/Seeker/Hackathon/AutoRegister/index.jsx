import { useEffect, useState } from "react";
import { CustomButton } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";

import { welcomeToJoin } from "../../../../assets/images";
import axios from "axios";
import baseUrl from "../../../../utils/baseUrl";

function AutoRegisterToHackathon() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const token = params.get("token");
  const email = params.get("email");
  const storeData = useSelector((store) => store.users);
  const user = storeData?.userAuth?.user;
  const navigate = useNavigate();
  const { id } = useOutletContext();

  const handleAddRegisterHackathon = async () => {
    await axios
      .post(
        `${baseUrl}/api/v1/projects/accept-invite/auto-register?token=${token}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const { data } = response;
        console.log("🚀 ~ handleAddRegisterHackathon ~ data:", data);
        Swal.fire({
          title: "You had added to team!",
          text: "You had added to team and registered to this Hackathon. Please check the project of your team.",
          confirmButtonText: "OK",
          icon: "info",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("registerInfo");

            navigate(`/Hackathon-detail/${data.hackathonId}/my-project`);
          }
        });
      })
      .catch((e) => {
        const { data } = e.response;

        Swal.fire({
          title: data.message,
          text: "You had registered to this Hackathon.",
          confirmButtonText: "OK",
          icon: "info",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("registerInfo");

            navigate(`/Seeker/brower-hackathons`);
          }
        });
        return;
      });
  };
  useEffect(() => {
    if (user) {
      handleAddRegisterHackathon();
    } else {
      const registerInfo = {
        token,
        email,
        hackathonId: id,
      };
      console.log("🚀 ~ useEffect ~ registerInfo:", registerInfo);
      localStorage.setItem("registerInfo", JSON.stringify(registerInfo));
      Swal.fire({
        title: "Your dont log in!",
        text: "Please login to auto register to this hackathon. After login let click on the link again!",
        confirmButtonText: "OK",
        icon: "warning",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/user-auth/login");
        }
      });
    }
  }, [email]);
  return (
    <div className="px-96 max-lg:px-2 py-5 ">
      <div className="text-3xl font-medium uppercase">Register</div>
      <div className="py-5">Please respect our community guidelines.</div>

      <div>
        <img src={welcomeToJoin}></img>
      </div>
    </div>
  );
}

export default AutoRegisterToHackathon;
