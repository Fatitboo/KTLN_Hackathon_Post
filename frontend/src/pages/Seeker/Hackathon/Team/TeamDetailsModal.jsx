import React from "react";

const TeamDetailsModal = ({ team, onClose }) => {
  if (!team) return null; // Không hiển thị nếu không có team

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Team Details: {team.name}</h2>
        <div className="mb-4">
          <p>
            <strong>Leader:</strong> {team.leader}
          </p>
          <p>
            <strong>Status:</strong> {team.status}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Members:</h3>
          <ul className="list-disc pl-5">
            {team.members.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>
        {team.projects && team.projects.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold">Projects:</h3>
            <ul className="list-disc pl-5">
              {team.projects.map((project, index) => (
                <li key={index}>{project.name}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TeamDetailsModal;
