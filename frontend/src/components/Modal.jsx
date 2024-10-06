import { CgClose } from "react-icons/cg";
export default function Modal({ open,  children }) {
    return (
        // backdrop
        <div
            className={`
          fixed inset-0 flex z-[50] justify-center items-center transition-colors
          ${open ? "visible bg-black/20" : "invisible"}
        `}
        >
            {/* modal */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
            bg-white rounded-md shadow p-6 transition-all
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
          `}
            >
               
                {children}
            </div>
        </div>
    )
}