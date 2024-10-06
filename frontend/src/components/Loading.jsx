import { Oval } from "react-loader-spinner";

function LoadingComponent() {
    return (<>
        <div className={`fixed inset-0 flex justify-center items-center transition-colors visible bg-black/20 z-[100]`}>
            {/* modal */}
            <div className={`bg-white rounded-md shadow p-6 transition-all scale-100 opacity-100 z-[101]`}>
                <div className="text-center ">
                    <Oval
                        height={80}
                        width={80}
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                    />

                </div>
            </div>
        </div>
    </>);
}

export default LoadingComponent;