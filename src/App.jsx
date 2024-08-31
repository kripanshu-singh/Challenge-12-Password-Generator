import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";
import { CheckCircle, Ban, TriangleAlert, RefreshCw } from "lucide-react";

function App() {
    const [length, setLength] = useState(8);
    const [num, setNum] = useState(false);
    const [char, setChar] = useState(false);
    const [password, setPassword] = useState("");
    const [selectedValue, setSelectedValue] = useState("option1");
    const [passwordStatus, setPasswordStatus] = useState("");

    console.log(`\n ~ App ~ password :- `, passwordStatus);

    useEffect(() => {
        const hasLowercase = password.toLowerCase() !== password;
        const hasUppercase = password.toUpperCase() !== password;
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        let score = 0;
        if (password.length >= 8) score++;
        if (hasLowercase) score++;
        if (hasUppercase) score++;
        if (hasNumber) score++;
        if (hasSpecialChar) score++;

        let passwordStatus;
        if (score <= 2) passwordStatus = "Weak";
        else if (score === 3) passwordStatus = "Moderate";
        else passwordStatus = "Strong";

        setPasswordStatus(passwordStatus);
    }, [password]);

    const generator = useCallback(() => {
        let pass = "";
        let string = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm";
        if (num) string += "1234567890";
        if (char) string += "!@#$%^&*()-_=+[]{}|;:,.<>?";
        let len = string.length;
        for (let i = 0; i < length; i++) {
            let random = Math.floor(Math.random() * len);
            pass += string.charAt(random);
        }
        if (selectedValue === "option2") {
            pass = pass.toUpperCase();
        } else if (selectedValue === "option3") {
            pass = pass.toLowerCase();
        }
        setPassword(pass);
    }, [length, num, char, selectedValue]);

    useEffect(() => {
        generator();
    }, [length, num, char, selectedValue]);

    const passRef = useRef(null);

    let copy = () => {
        passRef.current.select();
        window.navigator.clipboard.writeText(password);
    };

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <div className="text-center text-white">
                <div>
                    <h1 className="text-4xl text-center text-white mb-8">
                        Password Generator
                    </h1>
                </div>
                <div className="card h-auto  flex justify-center">
                    {passwordStatus === "Moderate" && (
                        <div className="flex mb-3 gap-3 p-2 rounded-md bg-yellow-200">
                            <Ban className="h-6 w-6 text-yellow-800" />
                            <p className="text-lg font-bold text-yellow-800">
                                Moderate
                            </p>
                        </div>
                    )}
                    {passwordStatus === "Weak" && (
                        <div className="flex mb-3 gap-3 p-2 rounded-md bg-red-200">
                            <TriangleAlert className="h-6 w-6 text-red-800" />
                            <p className="text-lg font-bold text-red-800">
                                Weak
                            </p>
                        </div>
                    )}
                    {passwordStatus === "Strong" && (
                        <div className="flex mb-3 gap-3 p-2 rounded-md bg-green-200">
                            <CheckCircle className="h-6 w-6 text-black" />
                            <p className="text-lg font-bold text-green-800">
                                Strong
                            </p>
                        </div>
                    )}

                    <div className="main py-2 rounded-3xl ">
                        <div className="inputField mb-5 flex justify-center items-center select-none mx-3">
                            <input
                                className="px-4 p-2 rounded-l-xl outline-none w-full md:w-2/3  text-black flex-1 border-r-[1px] border-r-slate-600"
                                type="text"
                                readOnly
                                value={password}
                                placeholder="Password"
                                ref={passRef}
                            />
                            <div className="cursor-pointer  bg-red-100 text-black rounded-r-xl p-[0.65rem] mr-3 ">
                                <RefreshCw
                                    className="  "
                                    onClick={() => generator()}
                                />
                            </div>
                            <button
                                class="button rounded-xl p-2 px-3"
                                onClick={copy}
                            >
                                <span class="button-content rounded-xl">
                                    Copy
                                </span>
                            </button>
                            {/* <button
                                type="button"
                                className="rounded-xl bg-green-600 px-5 py-2 font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                onClick={copy}
                            >
                                Copy
                            </button> */}
                        </div>
                        <input
                            type="range"
                            min={4}
                            max={20}
                            value={length}
                            onChange={(e) =>
                                setLength(parseInt(e.target.value))
                            }
                            name="range"
                            id="range"
                            className="mb-5 mr-3 w-32 cursor-pointer"
                        />
                        <label htmlFor="range">Length: {length}</label>
                        <div className="flex justify-center">
                            <span className="mr-10">
                                <input
                                    type="checkbox"
                                    id="number"
                                    className="mx-1 cursor-pointer"
                                    onClick={() => setNum((num) => !num)}
                                />
                                <label htmlFor="number">Number</label>
                            </span>
                            <span>
                                <input
                                    type="checkbox"
                                    id="char"
                                    className="mx-1 cursor-pointer"
                                    onClick={() => setChar((prev) => !prev)}
                                />
                                <label htmlFor="char">Characters</label>
                            </span>
                        </div>
                    </div>
                    <hr className="border-t border-dashed border-white-900 my-4" />
                    <div className="radios flex justify-self-center justify-center flex-wrap">
                        <span>
                            <input
                                className="cursor-pointer"
                                type="radio"
                                name="Capital"
                                id="default"
                                defaultChecked={true}
                                value="option1"
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="default" className="mr-4 ml-1">
                                Default
                            </label>
                        </span>
                        <span>
                            <input
                                className="cursor-pointer"
                                type="radio"
                                name="Capital"
                                id="uppercase"
                                value="option2"
                                checked={selectedValue === "option2"}
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="uppercase" className="mr-4 ml-1">
                                Uppercase
                            </label>
                        </span>
                        <span>
                            <input
                                className="cursor-pointer"
                                type="radio"
                                name="Capital"
                                id="lowercase"
                                value="option3"
                                checked={selectedValue === "option3"}
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="lowercase" className="mr-4 ml-1">
                                Lowercase
                            </label>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
