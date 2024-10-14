import { FaPlus } from "react-icons/fa6";
function QuestionTag({name, onClick}) {
    return ( 
        <>
            <div className="p-3">
                <div className="flex flex-row items-center cursor-pointer box-border select-none" onClick={onClick}>
                    <div className="bg-[#2557a7] rounded-full flex items-center justify-center mr-2 w-5 h-5">
                        <FaPlus color="white" strokeWidth={10}  className="w-2.5 h-3"/>
                    </div>
                    <span className="text-sm text-[#2557a7] font-bold">
                        {name}
                    </span>
                </div>
            </div>
        </>
     );
}

export default QuestionTag;