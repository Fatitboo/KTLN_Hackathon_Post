import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setValueSuccess } from "../../../../redux/slices/vacancies/vacanciesSlices";
import { SuccessPostImage } from "../../../../assets/images";


function SuccessCreate() {
    let [count, setCount] = useState(7)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        const interval = setInterval(() => {
            if(count > 0)
                setCount(--count)
            else{
                dispatch(setValueSuccess(false))
                navigate("/Organizer/manage-vacancy")
                clearInterval(interval)
            }
        }, 1000)
    }, [])
    return ( 
        <>
            <div className="flex flex-col items-center">
                <div className="text-2xl font-bold mb-3">Create vacancy successfully!</div>
                <div className="flex items-center justify-center mx-2 mb-3">
                    <img alt="" src={SuccessPostImage} className="w-full h-full  max-h-[350px]"/>
                </div>
                <div className="flex flex-row justify-center">
                    <div className="flex items-center justify-center box-border w-[250px] bg-[#1967d3] px-[10px] py-3 rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer" onClick={() => navigate("/Organizer/manage-vacancy")} >
                        <span className="text-[15px] leading-none font-semibold">Go to manage vacancies ({count})</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SuccessCreate;