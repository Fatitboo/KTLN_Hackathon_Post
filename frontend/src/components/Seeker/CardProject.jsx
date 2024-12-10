import React from "react";
import { BiCommentDetail } from "react-icons/bi";
import { BsFillHeartFill } from "react-icons/bs";
import { tagWinner } from "../../assets/images";

const CardProject = ({
  title,
  description,
  image,
  isWinner,
  imgUser,
  votes,
  comments,
}) => {
  return (
    <div className="relative cursor-pointer max-w-xs bg-white border border-gray-300 rounded-sm hover:shadow-md">
      {isWinner && (
        <img
          src={tagWinner}
          className="absolute top-0 left-0 text-xs font-bold rounded-bl-lg"
        />
      )}
      <div className="">
        <img src={image} alt={title} className="h-48 w-full" />
        <div className=" px-2 h-16">
          <h3 className="mt-2 text-base font-semibold line-clamp-1">{title}</h3>
          <p className="mt-1 text-gray-600 line-clamp-2 italic text-sm">
            {description}
          </p>
        </div>
        <div className=" mt-4 flex justify-between p-2 bg-gray-100 align-bottom">
          <div className="flex -space-x-2 ">
            <img
              className="w-6 h-6 rounded-full border-2 border-white"
              src={imgUser}
              alt="User 1"
            />
            <img
              className="w-6 h-6 rounded-full border-2 border-white"
              src={imgUser}
              alt="User 2"
            />
          </div>
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
  );
};

export default CardProject;
