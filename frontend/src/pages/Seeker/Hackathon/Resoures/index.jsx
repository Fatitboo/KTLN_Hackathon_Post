import { useOutletContext } from "react-router-dom";

function Resourses() {
  const { item } = useOutletContext();

  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="px-60 max-lg:px-2 py-5 ">
      <div className="text-3xl font-medium uppercase">Resourses</div>

      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-10">
        <div
          className="col-span-2 text-gray-600 min-h-40 "
          id="generated-script"
        >
          <div>
            <div
              className="mb-6"
              dangerouslySetInnerHTML={{
                __html: decodeHTML(item?.resourceDescription),
              }}
            ></div>
          </div>
        </div>

        <div className="col-span-1"></div>
      </div>
    </div>
  );
}

export default Resourses;
