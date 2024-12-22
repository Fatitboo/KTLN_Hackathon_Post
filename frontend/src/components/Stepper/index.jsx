import { Link } from "react-router-dom";

const Stepper = ({ currentStep, id }) => {
  const steps = [
    { id: 1, title: "Manage team", link: "manage-team" },
    { id: 2, title: "Project details", link: "edit" },
    { id: 3, title: "Submit", link: "submit" },
  ];

  return (
    <div className="flex items-center space-x-4">
      {steps
        ?.filter((item) => {
          if (!id.includes("!imptHk") && item.id === 3) return false;
          else return true;
        })
        .map((step, index) => (
          <Link
            key={step.id}
            to={`/Seeker/project/manage-project/${id}/${step.link}`}
          >
            <div key={step.id} className="flex items-center">
              {/* Step Icon */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                  step.id <= currentStep
                    ? "bg-green-100 border-green-500 text-green-600"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {step.id <= currentStep ? (
                  <span className="text-green-500 font-bold">✓</span>
                ) : (
                  step.id
                )}
              </div>

              {/* Step Title */}
              <div
                className={`ml-2 ${
                  step.id === currentStep ? "font-bold" : "text-gray-500"
                }`}
              >
                {step.title}
              </div>

              {/* Step Divider */}
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-1 mx-2 ${
                    step.id < currentStep ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          </Link>
        ))}
    </div>
  );
};
export default Stepper;
