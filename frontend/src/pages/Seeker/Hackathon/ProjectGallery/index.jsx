import { useOutletContext } from "react-router-dom";
import CardProject from "../../../../components/Seeker/CardProject";
import SearchInput from "../../../../components/Seeker/SearchInput";
import { defaultAvt, imgDefaultProject } from "../../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllProjects,
  resetValue,
} from "../../../../redux/slices/projects/projectsSlices";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function ProjectGallery() {
  const { myProject, id } = useOutletContext();
  console.log("🚀 ~ ProjectGallery ~ id:", id);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const limit = 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [totalPages, setTotalPage] = useState(1);
  let [currentProjects, setCurrentProjects] = useState([]);

  let { loading, projects, isSuccess } = useSelector((state) => state.projects);
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  const handleSearch = () => {
    dispatch(
      getAllProjects({
        page,
        limit: 10,
        searchKeyword: searchTerm,
        hackathonId: id,
      })
    );
  };
  useEffect(() => {
    dispatch(getAllProjects({ page, limit: 10, hackathonId: id }));
  }, [page]);

  useEffect(() => {
    if (isSuccess) {
      setCurrentProjects(projects.data);
      setTotal(projects?.total);
      setTotalPage(Math.ceil(projects?.total / limit));
      dispatch(resetValue({ key: "isSuccess", value: false }));
    }
    console.log("🚀 ~ useEffect ~ projects:", projects);
  }, [isSuccess]);
  return (
    <>
      <div className="px-60 max-lg:px-2 py-5 ">
        <div>
          <div className="mb-10 w-[75%]">
            <div className="">
              <SearchInput
                btnText={"Search projects"}
                textPlaceholder={"Find projects ... "}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
              />
            </div>
          </div>
          <dic className="text-gray-600">
            Showing {currentProjects.length ?? 0} in {total} projects
          </dic>
          <div className="my-5 grid grid-cols-4 max-xl:grid-cols-1 gap-6">
            {(currentProjects || []).map((card, index) => (
              <CardProject
                id={card?._id}
                key={index}
                member={card.createdBy}
                title={card?.projectTitle}
                description={card?.tagline}
                image={card?.thumnailImage || imgDefaultProject}
                imgUser={defaultAvt}
                isWinner={card.isWinner}
                votes={card.votes}
                comments={card.comments}
              />
            ))}
          </div>

          <div className="flex items-center justify-center mt-5">
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
              className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-sm mr-4 list-none"
            >
              <BsChevronLeft />
            </button>
            {/* <span style={{ margin: "0 10px" }}>
                            Page {page} of {totalPages}
                          </span> */}
            <span style={{ margin: "0 10px" }}>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
              className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-sm mr-4 list-none"
            >
              <BsChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectGallery;
