import { useOutletContext } from "react-router-dom";
import CardProject from "../../../../components/Seeker/CardProject";
import { CustomButton } from "../../../../components";
import { defaultAvt, imgDefaultProject } from "../../../../assets/images";
import HackathonInfo from "../../../../components/Seeker/HackathonInfo";

function MyProject() {
  const { myProject } = useOutletContext();

  return (
    <div className="px-60 max-lg:px-2 py-5 ">
      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-10">
        <div className="col-span-2">
          <h2 className="font-semibold mt-5">My hackathon projects</h2>
          <div>
            <div className="my-5 grid grid-cols-2 max-md:grid-cols-1 gap-6">
              {[...myProject].map((card, index) => (
                <CardProject
                  key={index}
                  title={card.title}
                  description={card.description}
                  image={imgDefaultProject}
                  imgUser={defaultAvt}
                  isWinner={card.isWinner}
                  votes={card.votes}
                  comments={card.comments}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-1 text-sm mt-2">
          <div>
            <CustomButton
              title="Join hackathon"
              containerStyles="my-4  bg-blue-600 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
            />
            <HackathonInfo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProject;
