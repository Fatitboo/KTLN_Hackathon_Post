import { BiTrash } from "react-icons/bi";

function AlertNotificate({setOpen, funcImplement}) {
    return (<>
        <div className="text-center w-96">
            <BiTrash size={52} className="mx-auto text-red-500" />
            <div className="mx-auto mt-4 mb-8 w-96">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Confirm Delete</h3>
                <p className="text-sm text-gray-500">
                    Are you sure you want to delete this item?
                </p>
            </div>
            <div className="flex gap-4  ">
                <button onClick={funcImplement} className="border rounded w-full py-1 bg-red-500 text-white">Delete</button>
                <button
                    className="border rounded w-full py-1 "
                    onClick={() => setOpen(false)}>
                    Cancel
                </button>
            </div>
        </div>
    </>);
}

export default AlertNotificate;