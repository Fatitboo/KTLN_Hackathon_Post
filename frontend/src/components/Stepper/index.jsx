const Stepper = ({ currentStep }) => {
  const steps = [
    { id: 1, title: "Manage team" },
    { id: 2, title: "Project details" },
    { id: 3, title: "Submit" },
  ];

  return (
    <div className="flex items-center space-x-4">
      {steps.map((step, index) => (
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
      ))}
    </div>
  );
};
export default Stepper;
