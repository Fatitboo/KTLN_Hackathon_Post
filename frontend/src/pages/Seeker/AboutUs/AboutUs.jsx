import React from 'react'

export const AboutUs = () => {
    return (
        <div>
            <section className="py-10 lg:py-20 bg-white font-poppins :bg-white">
                <div className="max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
                    <div className="flex flex-wrap ">
                        <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
                            <div className="lg:max-w-md">
                                <div className="px-4 pl-4 mb-6 border-l-4 border-blue-500">
                                    <span className="text-sm text-gray-600 uppercase dark:text-gray-400">Who we are?</span>
                                    <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl dark:text-gray-300">
                                        About Us
                                    </h1>
                                </div>
                                <p className="px-4 mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam Lorem ipsum dolor sit
                                    amet.
                                </p>
                                <div className="flex flex-wrap items-center">
                                    <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                                        <div className="p-6 bg-white dark:bg-gray-900">
                                            <span className="text-blue-500 dark:text-blue-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
                                                    fill="currentColor" className="bi bi-file-earmark-text w-10 h-10" viewBox="0 0 16 16">
                                                    <path
                                                        d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                                                    <path
                                                        d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                                                </svg>
                                            </span>
                                            <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">2097
                                            </p>
                                            <h2 className="text-sm text-gray-700 dark:text-gray-400">Projects and Plans</h2>
                                        </div>
                                    </div>
                                    <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                                        <div className="p-6 bg-white dark:bg-gray-900">
                                            <span className="text-blue-500 dark:text-blue-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
                                                    fill="currentColor" className="bi bi-people-fill w-10 h-10" viewBox="0 0 16 16">
                                                    <path
                                                        d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                    <path fillRule="evenodd"
                                                        d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                                                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                                                </svg>
                                            </span>
                                            <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">3,590
                                            </p>
                                            <h2 className="text-sm text-gray-700 dark:text-gray-400">Helped people</h2>
                                        </div>
                                    </div>
                                    <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                                        <div className="p-6 bg-white dark:bg-gray-900">
                                            <span className="text-blue-500 dark:text-blue-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
                                                    fill="currentColor" className="bi bi-person-fill w-10 h-10" viewBox="0 0 16 16">
                                                    <path
                                                        d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                </svg>
                                            </span>
                                            <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">74
                                            </p>
                                            <h2 className="text-sm text-gray-700 dark:text-gray-400">Volunteer</h2>
                                        </div>
                                    </div>
                                    <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                                        <div className="p-6 bg-white dark:bg-gray-900">
                                            <span className="text-blue-500 dark:text-blue-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
                                                    fill="currentColor" className="bi bi-alarm-fill w-10 h-10" viewBox="0 0 16 16">
                                                    <path
                                                        d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z" />
                                                </svg>
                                            </span>
                                            <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">100
                                            </p>
                                            <h2 className="text-sm text-gray-700 dark:text-gray-400">Timing</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                            <img src="https://i.postimg.cc/9MW8G96J/pexels-the-coach-space-2977565.jpg" alt=""
                                className="relative z-40 object-cover w-full h-full rounded" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex items-center bg-white py-11 font-poppins dark:bg-gray-800">
                <div className="max-w-6xl px-4 mx-auto">
                    <div className="max-w-4xl mx-auto text-center">
                        <span
                            className="inline-block px-2 py-px mb-4 text-xs font-medium leading-5 text-blue-500 bg-blue-100 rounded-full shadow-sm dark:text-gray-400 dark:bg-gray-700">FAQ</span>
                        <h2
                            className="mb-6 text-4xl font-bold leading-tight tracking-tighter text-gray-700 dark:text-gray-300 md:text-5xl">
                            Frequently Asked Questions</h2>
                        <p className="mb-24 text-lg font-medium text-gray-500 dark:text-gray-400">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam
                        </p>
                    </div>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4 mb-16 md:w-1/2 lg:w-1/3">
                            <div
                                className="relative h-full px-8 pt-16 pb-8 transition duration-200 rounded-md shadow-md bg-gray-50 dark:bg-gray-900 ">
                                <div
                                    className="absolute top-0 inline-flex items-center justify-center w-16 h-16 transition duration-200 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full dark:bg-gray-800 left-1/2">
                                    <div
                                        className="inline-flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="w-6 h-6 bi bi-patch-question" viewBox="0 0 16 16">
                                            <path
                                                d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z" />
                                            <path
                                                d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
                                            <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="max-w-xs mb-4 text-xl font-bold leading-7 text-gray-700 dark:text-gray-300">
                                    What is Components ? How does it help us?
                                </h2>
                                <p className="font-medium text-gray-500 transition duration-200 dark:text-gray-500">
                                    Components are pre made web structures which are used for making a website faster
                                    and easier.
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-4 mb-16 md:w-1/2 lg:w-1/3">
                            <div
                                className="relative h-full px-8 pt-16 pb-8 transition duration-200 rounded-md shadow-md bg-gray-50 dark:bg-gray-900 ">
                                <div
                                    className="absolute top-0 inline-flex items-center justify-center w-16 h-16 transition duration-200 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full dark:bg-gray-800 left-1/2">
                                    <div
                                        className="inline-flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="w-6 h-6 bi bi-patch-question" viewBox="0 0 16 16">
                                            <path
                                                d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z" />
                                            <path
                                                d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
                                            <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="max-w-xs mb-4 text-xl font-bold leading-7 text-gray-700 dark:text-gray-300">
                                    What is your profit for business?
                                </h2>
                                <p className="font-medium text-gray-500 transition duration-200 dark:text-gray-500">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Iste
                                    quae quam
                                    nostrum harum non in at
                                    eaque quibusdam eum ratione.
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-4 mb-16 md:w-1/2 lg:w-1/3">
                            <div
                                className="relative h-full px-8 pt-16 pb-8 transition duration-200 rounded-md shadow-md bg-gray-50 dark:bg-gray-900 ">
                                <div
                                    className="absolute top-0 inline-flex items-center justify-center w-16 h-16 transition duration-200 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full dark:bg-gray-800 left-1/2">
                                    <div
                                        className="inline-flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="w-6 h-6 bi bi-patch-question" viewBox="0 0 16 16">
                                            <path
                                                d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z" />
                                            <path
                                                d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
                                            <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="max-w-xs mb-4 text-xl font-bold leading-7 text-gray-700 dark:text-gray-300">
                                    What is Components ? How does it help us?
                                </h2>
                                <p className="font-medium text-gray-500 transition duration-200 dark:text-gray-500">
                                    Components are pre made web structures which are used for making a website faster
                                    and easier.
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-4 mb-16 md:w-1/2 lg:w-1/3">
                            <div
                                className="relative h-full px-8 pt-16 pb-8 transition duration-200 rounded-md shadow-md bg-gray-50 dark:bg-gray-900 ">
                                <div
                                    className="absolute top-0 inline-flex items-center justify-center w-16 h-16 transition duration-200 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full dark:bg-gray-800 left-1/2">
                                    <div
                                        className="inline-flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="w-6 h-6 bi bi-patch-question" viewBox="0 0 16 16">
                                            <path
                                                d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z" />
                                            <path
                                                d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
                                            <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="max-w-xs mb-4 text-xl font-bold leading-7 text-gray-700 dark:text-gray-300">
                                    What is your profit for business?
                                </h2>
                                <p className="font-medium text-gray-500 transition duration-200 dark:text-gray-500">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Iste
                                    quae quam
                                    nostrum harum non in at
                                    eaque quibusdam eum ratione.
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-4 mb-16 md:w-1/2 lg:w-1/3">
                            <div
                                className="relative h-full px-8 pt-16 pb-8 transition duration-200 rounded-md shadow-md bg-gray-50 dark:bg-gray-900 ">
                                <div
                                    className="absolute top-0 inline-flex items-center justify-center w-16 h-16 transition duration-200 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full dark:bg-gray-800 left-1/2">
                                    <div
                                        className="inline-flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="w-6 h-6 bi bi-patch-question" viewBox="0 0 16 16">
                                            <path
                                                d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z" />
                                            <path
                                                d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
                                            <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="max-w-xs mb-4 text-xl font-bold leading-7 text-gray-700 dark:text-gray-300">
                                    What is Components ? How does it help us?
                                </h2>
                                <p className="font-medium text-gray-500 transition duration-200 dark:text-gray-500">
                                    Components are pre made web structures which are used for making a website faster
                                    and easier.
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-4 mb-16 md:w-1/2 lg:w-1/3">
                            <div
                                className="relative h-full px-8 pt-16 pb-8 transition duration-200 rounded-md shadow-md bg-gray-50 dark:bg-gray-900 ">
                                <div
                                    className="absolute top-0 inline-flex items-center justify-center w-16 h-16 transition duration-200 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full dark:bg-gray-800 left-1/2">
                                    <div
                                        className="inline-flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="w-6 h-6 bi bi-patch-question" viewBox="0 0 16 16">
                                            <path
                                                d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z" />
                                            <path
                                                d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
                                            <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="max-w-xs mb-4 text-xl font-bold leading-7 text-gray-700 dark:text-gray-300">
                                    What is your profit for business?
                                </h2>
                                <p className="font-medium text-gray-500 transition duration-200 dark:text-gray-500">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Iste
                                    quae quam
                                    nostrum harum non in at
                                    eaque quibusdam eum ratione.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex items-center bg-white xl:h-screen font-poppins dark:bg-gray-800 ">
                <div className="justify-center flex-1 px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                        <h2
                            className="mb-6 text-4xl font-bold leading-tight tracking-tighter text-gray-700 dark:text-gray-300 md:text-5xl">
                            My Team</h2>
                        <p className="mb-24 text-lg font-medium text-gray-500 dark:text-gray-400">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam
                        </p>
                    </div>
                    <div className="flex flex-wrap ">
                        <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                            <div className="mb-10 lg:max-w-lg lg:mb-0">
                                <span
                                    className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-blue-600 bg-blue-100 rounded-md dark:bg-gray-700 dark:text-gray-400">
                                    Team</span>
                                <h2 className="mb-4 text-3xl font-bold md:text-4xl dark:text-gray-300">
                                    Lorem ipsum dolor sit amet
                                </h2>
                                <p className="mb-6 leading-loose text-gray-500 dark:text-gray-400">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quidem ea necessitatibus
                                    voluptates
                                    aliquid rerum officiis explicabo laborum molestiae id Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Cum quidem ea necessitatibus voluptates aliquid rerum officiis explicabo
                                    laborum molestiae...
                                </p>
                                <a href="#" className="px-4 py-2 text-gray-100 bg-blue-600 rounded-md ">Read More</a>
                            </div>
                        </div>
                        <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                            <div className="flex flex-wrap -mx-4">
                                <div className="w-full px-4 mb-10 text-center lg:w-1/2 sm:w-1/2">
                                    <div
                                        className="inline-block mb-3 overflow-hidden text-xs text-white bg-blue-500 rounded-full w-44 h-44 sm:w-64 sm:h-64">
                                        <img className="object-cover w-full h-full transition-all hover:scale-110"
                                            src="https://i.postimg.cc/JzmrHQmk/pexels-pixabay-220453.jpg" alt="" />
                                    </div>
                                    <h2 className="text-xl font-bold dark:text-gray-400">Henry Robinson</h2>
                                    <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">Director</p>
                                    <div className="flex items-center justify-center mt-4">
                                        <a className="inline-block mr-5 text-gray-800 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-400"
                                            href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                className="w-6 h-6 bi bi-facebook " viewBox="0 0 16 16">
                                                <path
                                                    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z">
                                                </path>
                                            </svg>
                                        </a>
                                        <a className="inline-block mr-5 text-gray-800 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400"
                                            href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                className="w-6 h-6 bi bi-twitter" viewBox="0 0 16 16">
                                                <path
                                                    d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z">
                                                </path>
                                            </svg>
                                        </a>
                                        <a className="inline-block text-gray-800 dark:text-gray-400 hover:text-pink-400 dark:hover:text-pink-400 "
                                            href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                className="w-6 h-6 bi bi-instagram" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z">
                                                </path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div className="w-full px-4 mb-10 text-center lg:w-1/2 sm:w-1/2">
                                    <div
                                        className="inline-block mb-3 overflow-hidden text-xs text-white bg-blue-500 rounded-full w-44 h-44 sm:w-64 sm:h-64">
                                        <img className="object-cover w-full h-full transition-all hover:scale-110"
                                            src="https://i.postimg.cc/bNyr5cJq/pexels-anastasia-shuraeva-5704720.jpg" alt="" />
                                    </div>
                                    <h2 className="text-xl font-bold dark:text-gray-400">Sriyana Berley</h2>
                                    <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">Founder</p>
                                    <div className="flex items-center justify-center mt-4">
                                        <a className="inline-block mr-5 text-gray-800 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-400"
                                            href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                className="w-6 h-6 bi bi-facebook " viewBox="0 0 16 16">
                                                <path
                                                    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z">
                                                </path>
                                            </svg>
                                        </a>
                                        <a className="inline-block mr-5 text-gray-800 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400"
                                            href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                className="w-6 h-6 bi bi-twitter" viewBox="0 0 16 16">
                                                <path
                                                    d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z">
                                                </path>
                                            </svg>
                                        </a>
                                        <a className="inline-block text-gray-800 dark:text-gray-400 hover:text-pink-400 dark:hover:text-pink-400 "
                                            href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                className="w-6 h-6 bi bi-instagram" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z">
                                                </path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
