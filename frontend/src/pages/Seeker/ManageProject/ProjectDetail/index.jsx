import { useParams, Link } from "react-router-dom";
import {
  backgroundSearch,
  defaultAvt,
  imgDefaultProject,
} from "../../../../assets/images";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectSingle,
  resetSuccessAction,
} from "../../../../redux/slices/projects/projectsSlices";

function ProjectDetail() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const projectSlice = useSelector((store) => store.projects);
  const { isSuccess, project } = projectSlice;
  const [item, setItemProject] = useState({});
  const getPrpjectDetail = async (id) => {
    dispatch(getProjectSingle(id));
  };
  useEffect(() => {
    getPrpjectDetail(projectId);
  }, [projectId]);

  useEffect(() => {
    if (isSuccess) {
      setItemProject(project);
      dispatch(resetSuccessAction());
    }
    console.log("🚀 ~ useEffect ~ project:", project);
  }, [isSuccess]);

  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <>
      <div>
        <div className="bg-teal-900 text-white text-center py-10 rounded-lg px-60">
          <h1 className="text-4xl font-bold mb-2">
            {item?.projectTitle ?? "Unitied"}
          </h1>
          <p className="text-lg mb-6 text-ellipsis line-clamp-3">
            {item?.tagline}
          </p>

          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 bg-teal-600 text-white py-2 px-4 rounded-sm hover:bg-teal-700 focus:outline-none">
              <span role="img" aria-label="heart">
                ❤️
              </span>{" "}
              Like {item?.likedBy?.length || 0}
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-sm hover:bg-blue-700 focus:outline-none">
              <span role="img" aria-label="comment">
                💬
              </span>{" "}
              Comment {"10"}
            </button>
          </div>
        </div>
        <div className="px-60 pt-5">
          <div className="border-blue-500 border-b-4 w-24">
            <h1 className="text-3xl font-medium mb-2 ">STORY</h1>
          </div>
        </div>
        <hr />
        <div className="px-60 max-lg:px-2 py-5 ">
          <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-10">
            <div className="col-span-2">
              <div className=" text-gray-600 " id="generated-script">
                <div>
                  <div
                    className="mb-6"
                    dangerouslySetInnerHTML={{
                      __html: decodeHTML(item?.content),
                    }}
                  ></div>
                </div>
              </div>
              {/* Built With Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Built With</h2>
                <div className="flex flex-wrap gap-2">
                  {(
                    item?.buildWith ?? [
                      "adobe",
                      "c#",
                      "illustrator",
                      "javascript",
                    ]
                  ).map((item, index) => {
                    return (
                      <>
                        <span
                          index={index}
                          className="bg-gray-200 px-4 py-1 text-sm "
                        >
                          {item}
                        </span>
                      </>
                    );
                  })}
                </div>
              </div>

              {/* Try It Out Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Try it out</h2>
                {(item?.tryoutLinks || []).map((item, index) => {
                  return (
                    <>
                      <a
                        key={index}
                        href={item}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {item}
                      </a>
                    </>
                  );
                })}
              </div>
              <hr />
              {/* Like and Comments Section */}
              <div className="my-8">
                <div className="flex items-center gap-4 mb-4">
                  <button className="flex items-center gap-2 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700">
                    <span>❤️</span> Like {likes}
                  </button>
                  <div className="flex -space-x-3 items-center">
                    {/* Example avatars */}
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white"
                      src={defaultAvt}
                      alt="User 1"
                    />
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white"
                      src={defaultAvt}
                      alt="User 2"
                    />
                    <div className="text-gray-600 text-sm pl-5">+43 more</div>
                  </div>
                </div>
              </div>
              <hr />
              {/* Updates Section */}
              <div>
                <h2 className="text-xl font-bold my-4">Updates</h2>
                <div className="space-y-4">
                  {comments.map((comment, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-md shadow-md"
                    >
                      <h4 className="font-bold">{comment.name}</h4>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-1"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectDetail;
