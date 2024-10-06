function CustomLoader({type}) {

    return ( 
        <>
            {
                type === "title-paragraph" ?
                    <>
                        <div className="animate-pulse relative rounded-md w-full mx-auto gap-2">
                            <div className="space-x-4 px-0.5 pb-2 w-full flex items-center">
                                {/* <div className="rounded-full bg-slate-200 h-16 w-16"></div> */}
                                <div className="flex-1 space-y-4 py-1">
                                <div className="h-5 w-64 bg-slate-200 rounded-full"></div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                    </div>
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                </div>
                                </div>
                            </div>
                            <div className="space-x-4 px-0.5 w-full">
                                <div className="flex-1 space-y-6 py-1">
                                <div className="space-y-3">
                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                    </div>
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                </div>
                                </div>
                            </div>
                            <div className="space-x-4 px-0.5 w-full">
                                <div className="flex-1 space-y-6 py-1">
                                <div className="space-y-3">
                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                    </div>
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </>
                : 
                type === "title-input" ? 
                    <>
                        <div>
                            <div className="animate-pulse relative rounded-md w-full mx-auto gap-2">
                                <div className="space-x-4 px-0.5 pb-2 mt-2 w-full flex items-center">
                                    {/* <div className="rounded-full bg-slate-200 h-16 w-16"></div> */}
                                    <div className="flex-1 space-y-4 py-1">
                                    <div className="h-2.5 w-[30%] bg-slate-200 rounded-full"></div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                    </div>
                                </div>
                                {/* <div className="space-x-4 px-0.5 w-full">
                                    <div className="flex-1 space-y-6 py-1">
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                    </div>
                                </div> */}
                                {/* <div className="space-x-4 px-0.5 w-full">
                                    <div className="flex-1 space-y-6 py-1">
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </> 
                : null
            }
        </>
    );
}

export default CustomLoader;