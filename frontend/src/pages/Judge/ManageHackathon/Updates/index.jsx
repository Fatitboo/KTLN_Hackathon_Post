import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { CustomButton, Modal } from "../../../../components";
import { useEffect, useState } from "react";
import { UpdateItem } from "./UpdateItem";
import { useDispatch, useSelector } from "react-redux";
import { singleHackathon } from "../../../../redux/slices/hackathons/hackathonsSlices";
import Swal from "sweetalert2";
import { AddUpdate } from "./AddUpdate";

function Updates({ item, user }) {
  // const { item, user } = useOutletContext();
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [isGet, setIsGet] = useState(false);
  const { hackathon } = useSelector((state) => state.hackathons);
  const dispatch = useDispatch();
  const handleGetSingleHackathon = async () => {
    dispatch(singleHackathon(item?._id));
  };
  useEffect(() => {
    if (!item?._id) return;
    handleGetSingleHackathon();
  }, [item?._id]);

  useEffect(() => {
    if (!isGet) return;
    setIsGet(false);
    handleGetSingleHackathon();
  }, [isGet]);
  const navigate = useNavigate();
  const handleOpenUpdate = () => {
    if (!user) {
      Swal.fire({
        title: "Please login!",
        text: "You need to login.",
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
      setSelectedUpdate({ title: "", content: "" });
    }
  };
  return (
    <div className="px-72 max-lg:px-2 py-5 ">
      <div className="text-3xl font-medium uppercase">Updates</div>
      <CustomButton
        onClick={() => handleOpenUpdate()}
        title="Post a update topic"
        containerStyles="bg-blue-600 my-5 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
      />
      {hackathon?.updateNews?.length > 0 ? (
        <>
          {hackathon?.updateNews?.map((item, index) => {
            return (
              <UpdateItem
                key={index}
                item={item}
                setIsGet={setIsGet}
                hackathonId={hackathon?._id}
                setSelectedDiscussion={setSelectedUpdate}
                user={user}
              />
            );
          })}
        </>
      ) : (
        <div className=" max-lg:grid-cols-1 gap-10">
          No update topics have been created yet.
        </div>
      )}
      <Modal
        open={
          selectedUpdate !== null && typeof selectedUpdate?.title === "string"
        }
      >
        <AddUpdate
          setopenReport={setSelectedUpdate}
          // setReports={setReports}
          item={{
            hackathonName: item?.hackathonName,
            hostName: item?.hostName,
            hackathonId: item?._id,
            userId: user?.id,
            title: selectedUpdate?.title,
            content: selectedUpdate?.content,
            isUpdate: selectedUpdate?.isUpdate,
            discussionId: selectedUpdate?.discussionId,
            // reportId: selectedDiscussion?.reportId,
          }}
          isVacancy={true}
          setIsGet={setIsGet}
        />
      </Modal>
    </div>
  );
}

export default Updates;
