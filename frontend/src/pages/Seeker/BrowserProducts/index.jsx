import { useEffect, useState } from "react";
import CustomButton from "../../../components/CustomButton";
import HackathonItem from "../../../components/Seeker/HackathonItem";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../../../redux/slices/users/usersSlices";
import { Link } from "react-router-dom";

function BrowserProducts() {
  const dispatch = useDispatch();
  const [uProfile, setUProfile] = useState({});
  const storeData = useSelector((store) => store?.users);
  const { userProfile, loading, appErr, isSuccess, isSuccessUpd } = storeData;

  useEffect(() => {
    setUProfile({ ...userProfile });
    console.log("🚀 ~ useEffect ~ userProfile:", userProfile);
  }, [userProfile]);
  useEffect(() => {
    dispatch(
      getUserProfileAction({
        getType: "all",
        getBy: "id",
      })
    );
  }, []);
  return (
    <>
      {/* Searching Hackthon By Keyword*/}
      <></>
      {
        <>
          <div className="min-h-[800px]">
            <div className=" max-md:block flex justify-between items-center py-5 px-60 max-md:px-4 bg-[#F1F8FA]">
              <div className="flex items-center">
                <h4 className="font-semibold mr-4">YOUR HACKATHON</h4>
                {userProfile?.registerHackathons?.length ?? 0} opens
              </div>
            </div>
            <div className="px-60 max-md:px-4">
              <h4 className="font-semibold mr-4 my-5">Submissions opens</h4>
              <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:gap-0 gap-5">
                {(userProfile?.registerHackathons || []).map(
                  (hackathon, index) => {
                    return (
                      <>
                        <div className="my-6" key={hackathon._id}>
                          <Link
                            to={`/Hackathon-detail/${hackathon._id}/overview`}
                          >
                            <HackathonItem
                              id={hackathon?._id}
                              startDate={hackathon?.submissions?.start}
                              endDate={hackathon?.submissions?.deadline}
                              themes={hackathon.hackathonTypes}
                              organization={hackathon?.hostName}
                              period={hackathon.period}
                              title={hackathon?.hackathonName}
                              isExtended={false}
                              isFeature={index % 2 === 0 ? true : false}
                              location={hackathon.location}
                              prizes={`${hackathon?.prizeCurrency ?? "$"} ${
                                hackathon?.prizes[0]?.cashValue ?? 1000
                              }`}
                              participants={
                                hackathon?.registerUsers?.length ?? 0
                              }
                              imageHackthon={hackathon?.thumbnail}
                            />
                          </Link>
                        </div>
                      </>
                    );
                  }
                )}
              </div>
              {/* <div className="flex items-center justify-center mt-5">
                <CustomButton
                  title="View submissons"
                  containerStyles="bg-blue-600 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
                />
              </div> */}
            </div>
          </div>
        </>
      }
    </>
  );
}

export default BrowserProducts;
