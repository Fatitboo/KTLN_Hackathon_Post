import { useParams, Outlet } from "react-router-dom";
import { backgroundSearch } from "../../../assets/images";
import { useEffect, useState } from "react";
import axios from "axios";
import RecommendTeamChat from "../../../components/Seeker/RecommendTeamChat";
import SubNavbarHackathon from "../../../components/Navbar/SubNavbar";
import { singleHackathon } from "../../../redux/slices/hackathons/hackathonsSlices";
import { useDispatch, useSelector } from "react-redux";

function HackathonDetail() {
  const { id } = useParams();
  const url = window.location.href;
  const [type, setType] = useState("overview");
  const [isRegistered, setIsRegistered] = useState(false);
  const storeData = useSelector((store) => store.users);
  const user = storeData?.userAuth?.user;
  const [item, setItemHackathon] = useState({});
  const { hackathon } = useSelector((state) => state.hackathons);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!id) return;
    dispatch(singleHackathon(id));
  }, [id]);
  useEffect(() => {
    if (hackathon) {
      console.log("🚀 ~ useEffect ~ hackathon:", hackathon);
      if (hackathon?.registerUsers?.find((item) => item?.userId === user?.id))
        setIsRegistered(true);
      setItemHackathon(hackathon);
    }
  }, [hackathon]);
  useEffect(() => {
    const parts = url.split("/"); // Tách URL thành mảng bằng dấu '/'
    setType(parts[parts.length - 1]);
  }, [url]);
  const myProject = [
    {
      title: "AI DataGraph",
      description: "Data sharing network for AI model training on Metagraph.",
      image: "https://via.placeholder.com/150",
      isWinner: false,
    },
    {
      title: "AutoSight",
      description:
        "Earn income while you drive. Autosight is a metaroboth-powered.",
      image: "https://via.placeholder.com/150",
      isWinner: true,
    },
  ];
  return (
    <>
      <div>
        <div
          className="flex flex-col py-5 bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${
              item?.headerImgBackground ?? backgroundSearch
            })`,
          }}
        >
          <div className="px-60 max-lg:px-2 ">
            <img
              src={item?.headerTitleImage}
              alt={item?.hackathonName}
              className="max-h-40 min-w-full"
            />
          </div>
          <SubNavbarHackathon id={id} type={type} />
        </div>
        <div className=" max-lg:px-2 py-5 min-h-60 ">
          <Outlet context={{ item, myProject, id, isRegistered, user }} />
        </div>
        {/* //recommend team hackathons */}
        <div className="fixed bottom-12 right-12 z-10">
          <RecommendTeamChat />
        </div>
      </div>
    </>
  );
}

export default HackathonDetail;
