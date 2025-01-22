import React, { useEffect, useState } from "react";

export const Payment = () => {
  const list = [
    {
      _id: "6779057134bd989a5b220467",
      subscriptionTypeId: "6779061b34bd989a5b22046a",
      name: "Free",
      description: ["Upload 1 public hackathon", "General Support"],
      price: "0",
      periodType: "month",
      buttonStyle: "bg-gray-700 text-white hover:bg-gray-600",
    },
    {
      _id: "6779065634bd989a5b22046c",
      subscriptionTypeId: "677902a534bd989a5b22045f",
      name: "Plus",
      description: [
        "Upload 3 public hackathon",
        "Unlock recommend feature",
        "Premium Support",
      ],
      price: "9",
      periodType: "month",
      buttonStyle: "bg-yellow-400 text-black hover:bg-yellow-300",
    },
    {
      _id: "6779067634bd989a5b22046e",
      subscriptionTypeId: "677902e234bd989a5b220460",
      name: "Advanced",
      description: [
        "Upload 3 public hackathon",
        "Unlock recommend feature",
        "Unlock AI optimize",
        "Premium Support",
      ],
      price: "19",
      periodType: "month",
      buttonStyle: "bg-gray-700 text-white hover:bg-gray-600",
    },
    {
      _id: "677906bc34bd989a5b220475",
      subscriptionTypeId: "6779061b34bd989a5b22046a",
      name: "Free",
      description: ["Upload 1 public hackathon", "General Support"],
      price: "0",
      periodType: "year",
      buttonStyle: "bg-gray-700 text-white hover:bg-gray-600",
    },
    {
      _id: "677906c634bd989a5b220476",
      subscriptionTypeId: "677902a534bd989a5b22045f",
      name: "Plus",
      description: [
        "Upload 3 public hackathon",
        "Unlock recommend feature",
        "Premium Support",
      ],
      price: "75.6",
      periodType: "year",
      buttonStyle: "bg-yellow-400 text-black hover:bg-yellow-300",
    },
    {
      _id: "677906ce34bd989a5b220477",
      subscriptionTypeId: "677902e234bd989a5b220460",
      name: "Advanced",
      description: [
        "Upload 3 public hackathon",
        "Unlock recommend feature",
        "Unlock AI optimize",
        "Premium Support",
      ],
      price: "159.6",
      periodType: "year",
      buttonStyle: "bg-gray-700 text-white hover:bg-gray-600",
    },
  ];
  const [subscriptions, setSubscriptions] = useState(list);

  const subscriptionList = [
    { id: "month", name: "Month" },
    { id: "year", name: "Year" },
  ];
  const [mode, setMode] = useState(subscriptionList[0].id); // State to track the selected mode

  const handleModeChange = (selectedMode) => {
    setSubscriptions(list.filter((item) => item.periodType == selectedMode));
    setMode(selectedMode);
  };
  const handlePayment = (id, price) => {
    fetch(`${baseUrl}/api/v1/invoices/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "671a5d4ce7e9496444c1697a",
        subscriptionId: "6779065634bd989a5b22046c",
        price: String(price * 1000),
        payType: "pay with momo",
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        const payment = JSON.parse(result?.payment);
        if (payment?.payUrl) window.location.href = payment.payUrl;
        console.log(payment);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {}, []);
  return (
    <div className="bg-gray-100 text-gray-900 font-sans">
      <div className="text-center py-20 mx-28">
        <div className="pb-12 px-6 md:px-24 flex flex-col md:flex-row items-center gap-16 justify-between">
          <div className="text-left md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold">
              Enjoy all our features by subscribing regularly!
            </h2>
          </div>

          <div className="mt-6 md:mt-0 md:text-right ml-16">
            <p className="text-gray-600 text-sm md:text-base">
              Choose the plan that fits your business needs and propel your
              website to the top of search engine results!
            </p>
            <a
              href="#"
              className="text-blue-500 font-semibold hover:underline mt-2 inline-block"
            >
              See Demo
            </a>
          </div>
        </div>
        <div className="inline-flex border border-gray-300 rounded-full overflow-hidden mb-5">
          {subscriptionList.map((item) => {
            return (
              <button
                className={`px-4 py-2 w-20 font-semibold ${
                  item.id === mode
                    ? "bg-black text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => mode !== item.id && handleModeChange(item.id)}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        <p className="text-sm text-gray-500 mb-8">
          100% Secure payment plan with money back guarantee.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-12 lg:px-24">
          {subscriptions
            .filter((item) => item.periodType == mode)
            .map((subscription) => (
              <div
                key={subscription.id}
                className={`shadow-md rounded-lg p-6 flex flex-col justify-between gap-6 ${
                  subscription.id === "professional"
                    ? "bg-black text-white transform scale-105"
                    : "bg-white"
                }`}
              >
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {subscription.name}
                  </h2>
                  <ul className="text-left mb-6 space-y-2">
                    {subscription.description.map((feature, index) => (
                      <li className="list-none" key={index}>
                        ✔ {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-4">
                    ${subscription.price}
                    <span className="text-base font-normal">
                      /
                      {subscriptionList
                        .find((item) => item.id == mode)
                        ?.name.toLowerCase()}
                    </span>
                  </div>
                  {subscription.id !== "basic" && (
                    <button
                      className={`py-2 px-6 rounded ${subscription.buttonStyle}`}
                      onClick={() =>
                        handlePayment(subscription.id, subscription.price)
                      }
                    >
                      {subscription.id === "basic" ? "Contact" : "Start now"}
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
