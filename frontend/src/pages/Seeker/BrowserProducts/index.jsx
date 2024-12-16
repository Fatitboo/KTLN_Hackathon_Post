import CustomButton from "../../../components/CustomButton";
import HackathonItem from "../../../components/Seeker/HackathonItem";
import { useSelector } from "react-redux";
const hackathons = [
  {
    name: "Student Mental Health Hackathon",
    location: "Online",
    currency: "$",
    price: 0,
    participants: 7,
    organizer: "RaahimFarhan",
    period: "Jun 23 - Jul 01, 2023",
    invite: "False",
    tags: "['Beginner Friendly', 'Gaming', 'Open Ended']",
    logo_link:
      "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/002/514/731/datas/medium_square.png",
    item_id: "item-00001",
    start_date: "2023-06-23",
    end_date: "2023-07-01",
  },
  {
    name: "Encode Justice NY Hackathon",
    location: "Brooklyn Public Library",
    currency: "$",
    price: 0,
    participants: 3,
    organizer: "Encode Justice New York",
    period: "Jul 01, 2023",
    invite: "False",
    tags: "['Beginner Friendly', 'Education', 'Low/No Code']",
    logo_link:
      "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/002/509/489/datas/medium_square.png",
    item_id: "item-00027",
    start_date: "2023-07-01",
    end_date: "2023-07-08",
  },
  {
    name: "InfoCamp",
    location: "Online",
    currency: "₹",
    price: 7000,
    participants: 30,
    organizer: "Skill Pulse",
    period: "Jun 24 - Jul 01, 2023",
    invite: "False",
    tags: "['Beginner Friendly', 'Communication', 'Mobile']",
    logo_link:
      "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/002/512/612/datas/medium_square.png",
    item_id: "item-00003",
    start_date: "2023-06-24",
    end_date: "2023-07-01",
  },
  {
    name: "Hackspree 1.0",
    location: "Online",
    currency: "$",
    price: 0,
    participants: 27,
    organizer: "The HackSpree Community",
    period: "Jun 17 - Jul 15, 2023",
    invite: "False",
    tags: "['Beginner Friendly', 'Open Ended', 'Social Good']",
    logo_link:
      "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/002/509/438/datas/medium_square.png",
    item_id: "item-00004",
    start_date: "2023-06-17",
    end_date: "2023-07-15",
  },
];
function BrowserProducts() {
  const storeData = useSelector((store) => store.users);

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
                {1} opens
              </div>
              <CustomButton
                title="Brower hackathons"
                containerStyles="bg-blue-600 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
              />
            </div>
            <div className="px-60 max-md:px-4">
              <h4 className="font-semibold mr-4 my-5">Submissions opens</h4>
              <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:gap-0 gap-5">
                {(hackathons.filter((item, index) => index % 2 == 0) || []).map(
                  (hackathon, index) => {
                    return (
                      <>
                        <div className="max-md:my-[1px] mx-3 my-2" key={index}>
                          <HackathonItem
                            id={index}
                            startDate={hackathon.start_date}
                            endDate={hackathon.end_date}
                            themes={hackathon.tags}
                            organization={hackathon.organizer}
                            period={hackathon.period}
                            title={hackathon.name}
                            isExtended={false}
                            isFeature={false}
                            location={hackathon.location}
                            prizes={`${hackathon.currency} ${hackathon.price}`}
                            participants={hackathon.participants}
                            imageHackthon={hackathon.logo_link}
                          />
                        </div>
                      </>
                    );
                  }
                )}
              </div>
              <div className="flex items-center justify-center mt-5">
                <CustomButton
                  title="View submissons"
                  containerStyles="bg-blue-600 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
                />
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
}

export default BrowserProducts;
