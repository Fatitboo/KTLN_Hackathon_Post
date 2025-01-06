import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { CustomButton } from "../../../../components";
import { useEffect, useState } from "react";
import { UpdateItem } from "./UpdateItem";
import { useDispatch, useSelector } from "react-redux";
import { singleHackathon } from "../../../../redux/slices/hackathons/hackathonsSlices";
import Swal from "sweetalert2";

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

  return (
    <div className="px-72 max-lg:px-2 py-5 ">
      <div className="text-3xl font-medium uppercase mb-4">Updates</div>

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
    </div>
  );
}

export default Updates;
