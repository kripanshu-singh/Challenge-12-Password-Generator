import React, { useState } from "react";

const Switcher3 = () => {
    const [dark, setDark] = useState(false);

    const handleCheckboxChange = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    };

    return (
        <>
            <label
                className="flex select-none items-center absolute top-6 right-6 cursor-pointer"
                // onClick={() => setDark(!dark)}
            >
                <div className="relative">
                    <input
                        type="checkbox"
                        checked={dark}
                        onChange={handleCheckboxChange}
                        className="sr-only"
                    />
                    {/* Background for the switch */}
                    <div
                        className={`block h-6 w-11 rounded-full cursor-pointer transition ${
                            dark ? "bg-gray-200" : "bg-sky-100"
                        }`}
                    ></div>
                    {/* The dot that moves */}
                    <div
                        className={`cursor-pointer dot absolute top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white transition transform ${
                            dark
                                ? "translate-x-6 bg-gray-700"
                                : "translate-x-1 bg-sky-400"
                        }`}
                    >
                        {/* Toggle between the active and inactive icons */}
                        {dark ? (
                            <span className="active flex">
                                <svg
                                    width="46px"
                                    height="46px"
                                    viewBox="-16 -16 48.00 48.00"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    ></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                            d="M0 8.00002C0 4.75562 1.93132 1.9623 4.70701 0.707031L5.65436 1.65438C5.2352 2.51383 5 3.47946 5 4.50002C5 8.08987 7.91015 11 11.5 11C12.5206 11 13.4862 10.7648 14.3456 10.3457L15.293 11.293C14.0377 14.0687 11.2444 16 8 16C3.58172 16 0 12.4183 0 8.00002Z"
                                            fill="#ffffff"
                                        ></path>{" "}
                                        <path
                                            d="M11.5 7.00003L9 4.50003L11.5 2.00003L14 4.50003L11.5 7.00003Z"
                                            fill="#ffffff"
                                        ></path>{" "}
                                    </g>
                                </svg>
                            </span>
                        ) : (
                            <span className="inactive flex">
                                <svg
                                    width="54px"
                                    height="54px"
                                    viewBox="-24 -24 72.00 72.00"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    ></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                            d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
                                            fill="#1C274C"
                                        ></path>{" "}
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V4C12.75 4.41421 12.4142 4.75 12 4.75C11.5858 4.75 11.25 4.41421 11.25 4V2C11.25 1.58579 11.5858 1.25 12 1.25ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H4C4.41421 11.25 4.75 11.5858 4.75 12C4.75 12.4142 4.41421 12.75 4 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM19.25 12C19.25 11.5858 19.5858 11.25 20 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20C19.5858 12.75 19.25 12.4142 19.25 12ZM12 19.25C12.4142 19.25 12.75 19.5858 12.75 20V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20C11.25 19.5858 11.5858 19.25 12 19.25Z"
                                            fill="#1C274C"
                                        ></path>{" "}
                                        <g opacity="0.5">
                                            {" "}
                                            <path
                                                d="M3.66919 3.7156C3.94869 3.4099 4.42309 3.38867 4.72879 3.66817L6.95081 5.69975C7.25651 5.97925 7.27774 6.45365 6.99824 6.75935C6.71874 7.06505 6.24434 7.08629 5.93865 6.80679L3.71663 4.7752C3.41093 4.4957 3.38969 4.0213 3.66919 3.7156Z"
                                                fill="#1C274C"
                                            ></path>{" "}
                                            <path
                                                d="M20.3319 3.7156C20.6114 4.0213 20.5902 4.4957 20.2845 4.7752L18.0624 6.80679C17.7567 7.08629 17.2823 7.06505 17.0028 6.75935C16.7233 6.45365 16.7446 5.97925 17.0503 5.69975L19.2723 3.66817C19.578 3.38867 20.0524 3.4099 20.3319 3.7156Z"
                                                fill="#1C274C"
                                            ></path>{" "}
                                            <path
                                                d="M17.0261 17.0247C17.319 16.7318 17.7938 16.7319 18.0867 17.0248L20.3087 19.2471C20.6016 19.54 20.6016 20.0148 20.3087 20.3077C20.0158 20.6006 19.5409 20.6006 19.248 20.3076L17.026 18.0854C16.7331 17.7924 16.7332 17.3176 17.0261 17.0247Z"
                                                fill="#1C274C"
                                            ></path>{" "}
                                            <path
                                                d="M6.97521 17.0249C7.2681 17.3177 7.2681 17.7926 6.97521 18.0855L4.75299 20.3077C4.46009 20.6006 3.98522 20.6006 3.69233 20.3077C3.39943 20.0148 3.39943 19.54 3.69233 19.2471L5.91455 17.0248C6.20744 16.732 6.68232 16.732 6.97521 17.0249Z"
                                                fill="#1C274C"
                                            ></path>{" "}
                                        </g>{" "}
                                    </g>
                                </svg>
                            </span>
                        )}
                    </div>
                </div>
            </label>
        </>
    );
};

export default Switcher3;

//
