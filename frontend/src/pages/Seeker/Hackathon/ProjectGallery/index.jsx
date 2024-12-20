import { useOutletContext } from "react-router-dom";
import CardProject from "../../../../components/Seeker/CardProject";
import SearchInput from "../../../../components/Seeker/SearchInput";
import { defaultAvt, imgDefaultProject } from "../../../../assets/images";

function ProjectGallery() {
  const { myProject, id } = useOutletContext();

  return (
    <>
      <div className="px-60 max-lg:px-2 py-5 ">
        <div>
          <div className="mb-10 w-[75%]">
            <SearchInput
              textPlaceholder={"Search project"}
              btnText={"Search project"}
            />
          </div>
          <div className="my-5 grid grid-cols-4 max-md:grid-cols-1 gap-6">
            {[...myProject, ...myProject, ...myProject].map((card, index) => (
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
    </>
  );
}

export default ProjectGallery;
