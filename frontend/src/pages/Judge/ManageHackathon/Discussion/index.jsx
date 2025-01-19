import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { CustomButton, Modal } from "../../../../components";
import { AddDiscussion } from "./AddDiscussion";
import { useEffect, useState } from "react";
import { DiscussionItem } from "./DiscussionItem";
import { useDispatch, useSelector } from "react-redux";
import { singleHackathon } from "../../../../redux/slices/hackathons/hackathonsSlices";
import Swal from "sweetalert2";

function Discussion({ item, user }) {
  // const { item, user } = useOutletContext();
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
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
  const handleOpenDiscussion = () => {
    if (!user) {
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
      setSelectedDiscussion({ title: "", content: "" });
    }
  };
  return (
    <div className="px-72 max-lg:px-2 py-5 ">
      <div className="text-3xl font-medium uppercase">Discussion</div>
      <CustomButton
        onClick={() => handleOpenDiscussion()}
        title="Post a discussion topic"
        containerStyles="bg-blue-600 my-5 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
      />
      {hackathon?.discussions?.length > 0 ? (
        <>
          {hackathon?.discussions?.map((item, index) => {
            return (
              <DiscussionItem
                key={index}
                item={item}
                setIsGet={setIsGet}
                hackathonId={hackathon?._id}
                setSelectedDiscussion={setSelectedDiscussion}
                user={user}
              />
            );
          })}
        </>
      ) : (
        <div className=" max-lg:grid-cols-1 gap-10">
          No topics have been created yet.
        </div>
      )}
      <Modal
        open={
          selectedDiscussion !== null &&
          typeof selectedDiscussion?.title === "string"
        }
      >
        <AddDiscussion
          setopenReport={setSelectedDiscussion}
          // setReports={setReports}
          item={{
            hackathonName: item?.hackathonName,
            hostName: item?.hostName,
            hackathonId: item?._id,
            userId: user?.id,
            title: selectedDiscussion?.title,
            content: selectedDiscussion?.content,
            isUpdate: selectedDiscussion?.isUpdate,
            discussionId: selectedDiscussion?.discussionId,
            // reportId: selectedDiscussion?.reportId,
          }}
          isVacancy={true}
          setIsGet={setIsGet}
        />
      </Modal>
    </div>
  );
}

export default Discussion;
