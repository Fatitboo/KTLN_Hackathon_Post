import React from "react";
import {
  ComboBox,
  CustomComboBox,
  LoadingComponent,
  Modal,
  PaginationButtons,
  TextInput,
} from "../../../components";
import { AiFillExclamationCircle, AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { SubscriptionItem } from "./SubscriptionItem";
function ManageSubscription() {
  // define state
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [filterKeyWord, setFilterKeyWord] = useState("");
  const [loading, setLoading] = useState(null);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [subscriptionTypeList, setSubscriptionTypeList] = useState([]);
  const [modalType, setModalType] = useState("Add");

  let [inputsValues, setInputValues] = useState({
    subscriptionType: "",
    price: "",
    periodType: "",
    description: [],
  });

  const listRangeTypes = [
    { id: 1, name: "Month", value: "month" },
    { id: 2, name: "Year", value: "year" },
  ];
  // func change cbb
  const filterValueCombobox = (type, value) => {
    setInputValues({
      ...inputsValues,
      [type]: value,
    });
  };
  // get histories

  const getHis = () => {
    setLoading(true);
    fetch(`${baseUrl}/api/v1/subscriptions`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setSubscriptionList([...result]);
        setPages(result.slice(currentPage * 10, (currentPage + 1) * 10));
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getHis();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/api/v1/subscription-types`)
      .then((response) => response.json())
      .then((result) => {
        setSubscriptionTypeList(
          result.map((item) => ({ _id: item._id, name: item.name }))
        );
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }, []);

  // get store
  const storeData = useSelector((store) => store?.skills);
  const { appErr } = storeData;

  return (
    <div>
      <div className="px-10 pb-0 text-sm">
        {loading && <LoadingComponent />}
        {/* Start title of page  */}
        <div className="mb-8">
          <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">
            Manage subscription!
          </h3>
          <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">
            Ready to jump back in?
          </div>
        </div>
        <div className="flex flex-wrap mx-3 mt-3">
          <div className="max-w-full px-3 pt-3 shrink-0 w-full">
            <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
              <div className="relative">
                {/* start header + search */}
                <div className="relative flex justify-between items-center flex-wrap bg-transparent px-8 py-5">
                  <div className="flex">
                    <div className="relative mr-4">
                      <div>
                        <div className="relative mb-0 leading-6">
                          <AiOutlineSearch
                            fontSize={22}
                            color="#a7a9ad"
                            className="absolute l-3  h-11 justify-center ml-2 text-center z-10 "
                          />
                          <input
                            onChange={(e) => setFilterKeyWord(e.target.value)}
                            type="search"
                            name="search-field"
                            id="search-field"
                            placeholder="Search"
                            className=" relative mt-2 block w-72 border pt-1 pb-1 pl-10 h-10 pr-5 text-sm bg-[#f0f5f7] focus:bg-white  rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setInputValues({
                        subscriptionType: "",
                        price: "",
                        periodType: "",
                        description: [],
                      });
                      setSelected(null);
                      setModalType("Add");
                      setModal(true);
                    }}
                    className="flex items-center justify-center box-border bg-[#1967d3] px-[18px] py-[14px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
                  >
                    <span className="text-[15px] leading-none font-semibold">
                      Add subscription
                    </span>
                  </button>
                </div>
                {appErr && (
                  <span className="flex flex-row items-center text-base text-[#a9252b] mt-2 ml-8">
                    <AiFillExclamationCircle className="mr-1" />
                    {appErr}
                  </span>
                )}
                {/* table list skill information */}
                <div className="px-6 relative">
                  <div className="overflow-y-hidden overflow-x-auto">
                    <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0 text-[15px]">
                      <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                        <tr className="w-full ">
                          <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left  w-3/12 pl-4">
                            Subscription Id
                          </th>
                          <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left pl-2 w-3/12">
                            Subscription type
                          </th>
                          <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left  w-2/12 ">
                            Price
                          </th>
                          <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left pl-6 w-2/12">
                            Period type
                          </th>
                          <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left pl-12 w-2/12">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="w-full">
                        {loading ? (
                          [1, 2, 3, 4, 5, 6].map((item, index) => {
                            return (
                              <tr
                                key={index}
                                className="animate-pulse relative shadow rounded-md p-4 w-full mx-auto gap-2"
                              >
                                <td className="space-x-4 py-2.5 px-0.5 w-full flex items-center">
                                  {/* <div className="rounded-full bg-slate-200 h-12 w-12"></div> */}
                                  <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                      </div>
                                      <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                  </div>
                                </td>
                                <td className="space-x-4 py-2.5 px-0.5 w-1/12">
                                  {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                  <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                      </div>
                                      <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                      </div>
                                      <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                      </div>
                                      <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                  </div>
                                </td>
                                <td className="space-x-4 py-2.5 px-0.5 w-1/12">
                                  {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                  <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                      </div>
                                      <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                  </div>
                                </td>
                                <td className="space-x-4 py-2.5 px-0.5 w-full flex items-center">
                                  {/* <div className="rounded-full bg-slate-200 h-12 w-12"></div> */}
                                  <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                      </div>
                                      <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                  </div>
                                </td>
                                <td className="space-x-4 py-2.5 px-0.5 w-1/12">
                                  {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                  <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                      </div>
                                      <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                      </div>
                                      <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                      </div>
                                      <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <>
                            {[...subscriptionList]
                              ?.reverse()
                              ?.map((item, index) => {
                                return (
                                  <SubscriptionItem
                                    item={item}
                                    key={index}
                                    onOpenModal={() => {
                                      setInputValues({
                                        subscriptionType:
                                          item.subscriptionTypeId._id,
                                        description: item.description,
                                        price: item.price,
                                        periodType: item.periodType,
                                      });
                                      setSelected(item);
                                      setModalType("Edit");
                                      setModal(true);
                                    }}
                                    onDelete={() => {
                                      fetch(
                                        `${baseUrl}/api/v1/subscriptions/${item._id}`,
                                        {
                                          method: "DELETE",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                        }
                                      )
                                        .then((response) => response.json())
                                        .then((aydy) => {
                                          Swal.fire({
                                            title: "Deleted!",
                                            text: "Subscription type has been deleted.",
                                            icon: "success",
                                            confirmButtonText: "OK",
                                            allowOutsideClick: false,
                                            confirmButtonColor: "#3085d6",
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                              setSubscriptionList(
                                                subscriptionList.filter(
                                                  (i) => i._id !== item._id
                                                )
                                              );
                                            }
                                          });
                                        })
                                        .catch((error) =>
                                          console.log("error", error)
                                        );
                                    }}
                                  />
                                );
                              })}
                          </>
                        )}
                      </tbody>
                    </table>
                    <div className="list-none mt-10 flex items-center justify-center mb-4">
                      <PaginationButtons
                        totalPages={subscriptionList.length / 10}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={modal} setModal={setModal}>
        <div>
          <div className="flex flex-row items-center justify-between mx-2">
            <p className="block leading-8 text-gray-900 text-xl font-bold">
              Edit subscription
            </p>
            <div
              className="hover:bg-slate-100 rounded-sm p-2 cursor-pointer opacity-90"
              onClick={() => {
                setSelected(null);
                setModal(false);
              }}
            >
              <IoClose size={20} />
            </div>
          </div>
          <hr className="block h-1 w-full bg-[rgb(212, 210, 208)] my-3" />
          <div className="flex flex-col w-[400px] mx-9 overflow-x-hidden mb-4 gap-6">
            <div className="flex flex-row items-center gap-4">
              <div>Subscription type: </div>
              <CustomComboBox
                listItem={subscriptionTypeList}
                filterValueSelected={(e) => {
                  filterValueCombobox("subscriptionType", e._id);
                }}
                placeHolder={"Select an options"}
              />
            </div>
            <div className="flex flex-row items-center gap-4">
              <div>Price: </div>
              <TextInput
                placeHolder={inputsValues?.price}
                onChange={(e) => {
                  setInputValues({
                    ...inputsValues,
                    price: e.target.value,
                  });
                }}
                vl={inputsValues.price}
              />
            </div>
            <div className="flex flex-row items-center gap-4">
              <div>Period type: </div>
              <CustomComboBox
                listItem={listRangeTypes}
                filterValueSelected={(e) => {
                  filterValueCombobox("periodType", e.value);
                }}
                placeHolder={"Select an options"}
              />
            </div>

            <div className="flex flex-row items-center gap-4">
              <div>Description: </div>
              <div className="flex flex-col gap-1">
                {inputsValues.description.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="flex flex-row items-center gap-2"
                    >
                      <TextInput
                        onChange={(e) => {
                          setInputValues({
                            ...inputsValues,
                            description: inputsValues.description.map((des) =>
                              des.id === item.id
                                ? { ...des, value: e.target.value }
                                : { ...des }
                            ),
                          });
                        }}
                        vl={item.value ?? item}
                      />
                      <IoClose
                        className="cursor-pointer"
                        onClick={() => {
                          setInputValues({
                            ...inputsValues,
                            description: inputsValues.description.filter(
                              (i) => i.id !== item.id
                            ),
                          });
                        }}
                      />
                    </div>
                  );
                })}
                <div
                  onClick={() => {
                    setInputValues({
                      ...inputsValues,
                      description: [
                        ...inputsValues.description,
                        { id: uuidv4(), value: "" },
                      ],
                    });
                  }}
                  className="outline w-16 items-center outline-2 px-2 py-1 rounded outline-[#1967d3] text-[#1967d3] cursor-pointer font-semibold"
                >
                  Add
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 float-right">
            <div
              className="flex items-center justify-center box-border bg-[white] border px-[18px] py-[14px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] hover:border-[#1967d3] cursor-pointer"
              onClick={() => {
                setSelected(null);
                setModal(false);
              }}
            >
              <span className="text-[15px] leading-none font-bold">Close</span>
            </div>
            <button
              type="submit"
              onClick={() => {
                fetch(
                  `${baseUrl}/api/v1/subscriptions${
                    modalType === "Add" ? "" : `/${selected._id}`
                  }`,
                  {
                    method: modalType === "Add" ? "POST" : "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      subscriptionType: inputsValues.subscriptionType,
                      price: inputsValues.price,
                      description: inputsValues.description.map(
                        (item) => item.value
                      ),
                      periodType: inputsValues.periodType,
                    }),
                  }
                )
                  .then((response) => response.json())
                  .then((aydy) => {
                    Swal.fire({
                      title: "Updated!",
                      text: "Subscription type has been updated.",
                      icon: "success",
                      confirmButtonText: "OK",
                      allowOutsideClick: false,
                      confirmButtonColor: "#3085d6",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        if (modalType === "Add") {
                          setSubscriptionList([...subscriptionList, aydy]);
                        } else {
                          setSubscriptionList(
                            subscriptionList.map((item) =>
                              item._id === selected._id
                                ? { ...aydy }
                                : { ...item }
                            )
                          );
                        }
                        getHis();
                        setSelected(null);
                        setModal(false);
                      }
                    });
                  })
                  .catch((error) => console.log("error", error));
              }}
              className="w-[90px] flex items-center justify-center box-border bg-[#1967d3] px-[18px] py-[14px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
            >
              <span className="text-[15px] leading-none font-bold">Done</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default ManageSubscription;
