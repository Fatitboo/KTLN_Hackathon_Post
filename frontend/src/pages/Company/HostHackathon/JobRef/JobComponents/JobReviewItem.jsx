import { HiPencil } from "react-icons/hi2";

function JobReviewItem({title, value, html, onClick}) {
    return ( 
        <>
            <div className="flex flex-row items-center justify-between gap-2">
                <div className="flex flex-row w-full flex-1 flex-grow">
                    <div className="text-base text-[#2d2d2d] font-semibold min-w-[230px]">{title}</div>
                    {
                        html ? <p className="max-h-[190px] overflow-auto text-base flex-wrap text-[#595959] no-scrollbar" dangerouslySetInnerHTML={{ __html: value }}></p>
                        :
                        <p className="text-base text-[#595959] max-w-xs">{value}</p>
                    }
                </div>
                <div className="rounded-lg p-[6px] cursor-pointer hover:bg-slate-300 hover:opacity-90 active:opacity-80" onClick={onClick}>
                    <HiPencil color="rgb(37, 87, 167)" size={18}/>
                </div>
            </div>
        </>
    );
}

export default JobReviewItem;