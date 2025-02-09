import { useOutletContext } from "react-router-dom";
import CardProject from "../../../../components/Seeker/CardProject";
import { CustomButton } from "../../../../components";
import { defaultAvt, imgDefaultProject } from "../../../../assets/images";
import HackathonInfo from "../../../../components/Seeker/HackathonInfo";
import ManageTeams from "../Team/ManageTeam";
import Swal from "sweetalert2";

function MyProject() {
  const { item, id, isRegistered, user } = useOutletContext();

  const handleNavigatePage = (to) => {
    if (to === "register" && !user) {
      Swal.fire({
        title: "Please login!",
        text: "You need to login to register hackathon.",
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        icon: "info",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/user-auth/login");
        }
      });
    } else {
      navigate(`/Hackathon-detail/${id}/${to}`);
    }
  };
  return (
    <div className="px-60 max-lg:px-2 py-5 ">
      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-10">
        <div className="col-span-2">
          {isRegistered ? (
            <div>
              <ManageTeams hackathon={item} user={user} />
            </div>
          ) : (
            <div>Nothing to show. You have to register hackathon</div>
          )}
        </div>
        <div className="col-span-1 text-sm mt-2">
          {!isRegistered && (
            <CustomButton
              onClick={() => handleNavigatePage(`register`)}
              title="Join hackathon"
              containerStyles="bg-blue-600 w-fit  mb-2 font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
            />
          )}
          <div>
            <HackathonInfo
              prizes={`${item?.prizeCurrency ?? "$"} ${Math.floor(
                Math.random() * 10000
              )}`}
              themes={item?.hackathonTypes}
              organization={item?.hostName}
              start={item?.submissions?.start}
              end={item?.submissions?.deadline}
              participants={item?.registerUsers?.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProject;
