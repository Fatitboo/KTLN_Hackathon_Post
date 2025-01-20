import React from "react";
import { BiCommentDetail } from "react-icons/bi";
import { BsFillHeartFill } from "react-icons/bs";
import { tagWinner } from "../../assets/images";
import { Link } from "react-router-dom";

const CardProjectJudge = ({
  title,
  description,
  image,
  isWinner,
  imgUser,
  member,
  votes,
  comments,
  id,
}) => {
  return (
    <div className="w-full">
      <a href={`/Seeker/project/${id}`}>
        <div className="relative cursor-pointer bg-white border border-gray-300 rounded-sm hover:shadow-md">
          {isWinner && (
            <img
              src={tagWinner}
              className="absolute top-0 left-0 text-xs font-bold rounded-bl-lg"
            />
          )}
          <div className="flex">
            <img src={image} alt={title} className="h-24 w-24" />
            <div className="px-1">
              <h3 className="mt-1 ml-1 text-base font-semibold line-clamp-1">
                {title}
              </h3>
              <p className="mt-1 ml-1 text-gray-600 line-clamp-2 italic text-xs">
                {description}
              </p>
              <div className="flex justify-between px-2 items-center bg-gray-100 align-bottom">
                <div className="flex -space-x-2 ">
                  {member?.map((item) => {
                    return (
                      <img
                        key={item._id}
                        className="w-5 h-5 rounded-full border-2 border-white"
                        src={item.avatar ?? imgUser}
                        alt="User 1"
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between p-1 bg-gray-100 align-bottom">
                  <div className="flex items-center text-gray-500 text-sm">
                    <div className="mr-3 flex items-center">
                      <BsFillHeartFill className="h-3"></BsFillHeartFill>
                      {votes}
                    </div>
                    <div className="flex items-center">
                      <BiCommentDetail className="h-3" /> {comments}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default CardProjectJudge;
