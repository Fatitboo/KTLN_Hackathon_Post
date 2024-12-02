import { useParams, Link } from "react-router-dom";
import {
  backgroundSearch,
  defaultAvt,
  imgDefaultProject,
} from "../../../../assets/images";
import { useEffect, useState } from "react";
import axios from "axios";

function ProjectDetail() {
  const { id, type } = useParams();

  // const [item, setItemHackathon] = useState({});
  const getHackathonDetail = async (hackathon_id) => {
    const { data } = await axios.get(
      "http://localhost:5001/get-hackathon-detail/" + hackathon_id
    );
    console.log("🚀 ~ getHackathonDetail ~ data:", data);
    // setItemHackathon(data[0]);
  };
  useEffect(() => {
    getHackathonDetail(id);
  }, [id]);
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
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
  const likes = 53;
  const comments = [
    {
      name: "VrGame Dev",
      text: "I played this on web3 and android but new web3 game is more exciting as it has more screen view.",
    },
    {
      name: "gioni marko",
      text: "So cute and adorable game. Fall into childhood",
    },
    {
      name: "Frankie C. Vernon",
      text: "Dive into the rhythmic challenges of Motu Pop Bubble Shooter Game blending bubble-popping fun with Friday Night Funkin vibes. Engage in catchy beats while clearing colorful bubbles for victory!",
    },
  ];
  return (
    <>
      <div>
        <div className="bg-teal-900 text-white text-center py-10 rounded-lg px-60">
          <h1 className="text-4xl font-bold mb-2">
            Motu Pop Bubble Shooter Game
          </h1>
          <p className="text-lg mb-6">
            Pop bubbles, rescue motu's chhotu, and blast through fun puzzles in
            this thrilling bubble shooter adventure! Compete, earn, and enjoy a
            vibrant world of challenges!
          </p>

          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 bg-teal-600 text-white py-2 px-4 rounded-sm hover:bg-teal-700 focus:outline-none">
              <span role="img" aria-label="heart">
                ❤️
              </span>{" "}
              Like {"10"}
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
        <div className="px-60">
          {/* Built With Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Built With</h2>
            <div className="flex flex-wrap gap-2">
              {["adobe", "c#", "illustrator", "javascript"].map(
                (item, index) => {
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
                }
              )}
            </div>
          </div>

          {/* Try It Out Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Try it out</h2>
            <a
              href="https://motupop.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              motupop.fun
            </a>
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
                <div key={index} className="bg-white p-4 rounded-md shadow-md">
                  <h4 className="font-bold">{comment.name}</h4>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectDetail;
