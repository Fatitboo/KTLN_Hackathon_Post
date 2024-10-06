function SmallItemLoader() {
    return ( 
        <>
            <div className="animate-pulse relative mb-[30px] rounded-md px-1 w-full mx-auto gap-2">
                <div className="space-x-4 px-0.5 w-full flex items-start">
                    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-3 py-1">
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                    </div>
                </div> 
            </div>
        </>
    );
}

export default SmallItemLoader;