import { useState, useCallback, useEffect, useRef } from "react";
import { CheckCircle, Ban, TriangleAlert, RefreshCw } from "lucide-react";
import { generator } from "./helper";

function GeneratorCard() {
    const [length, setLength] = useState(8);
    const [password, setPassword] = useState("");
    const [word, setWord] = useState("");
    const [isNum, setIsNum] = useState(false);
    const [isChar, setIsChar] = useState(false);
    const [selectedValue, setSelectedValue] = useState("option1");
    const [passwordStatus, setPasswordStatus] = useState("");
    const generatorParameters = {
        length,
        isNum,
        isChar,
        selectedValue,
        word,
    };

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

    useEffect(() => {
        setPassword(generator({ ...generatorParameters, length }));
    }, [length]);

    const passRef = useRef(null);
    let copy = () => {
        passRef.current.select();
        window.navigator.clipboard.writeText(password);
    };

    const handleRadioChange = (event) => {
        const newSelectedValue = event.target.value;
        setSelectedValue(newSelectedValue);

        setPassword(
            generator({
                ...generatorParameters,
                selectedValue: newSelectedValue,
            })
        );
    };

    const trimOnLengthChange = (e) => {
        if (e.target.value < word.length) {
            setWord(word.slice(0, e.target.value));
        }
    };

    return (
        <div className="card rounded h-auto  flex justify-center">
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
                    <p className="text-lg font-bold text-red-800">Weak</p>
                </div>
            )}
            {passwordStatus === "Strong" && (
                <div className="flex mb-3 gap-3 p-2 rounded-md bg-green-200">
                    <CheckCircle className="h-6 w-6 text-black" />
                    <p className="text-lg font-bold text-green-800">Strong</p>
                </div>
            )}

            <div className="main py-2 rounded-3xl ">
                {/* <div className="flex mb-3 gap-3 rounded-md"> */}
                <div className="flex select-none w-full mb-3">
                    <input
                        className="px-4 p-2 rounded-l outline-none text-black flex-1 border-r-[1px] border-r-slate-600"
                        type="text"
                        readOnly
                        value={password}
                        placeholder="Password"
                        ref={passRef}
                    />
                    <div
                        className="cursor-pointer  bg-red-100 text-black rounded-r p-[0.65rem] mr-3 "
                        onClick={() =>
                            setPassword(generator(generatorParameters))
                        }
                    >
                        <RefreshCw />
                    </div>
                    <button
                        className="button rounded p-2 px-3"
                        onClick={copy}
                    >
                        <span className="button-content rounded-xl">Copy</span>
                    </button>
                    {/* </div> */}
                </div>
                <input
                    className="px-4 p-2 mb-3 rounded outline-none w-full text-black flex-1 border-r-[1px] border-r-slate-600"
                    type="text"
                    value={word}
                    placeholder="Enter a word"
                    disabled={word.length >= 14}
                    onChange={(e) => {
                        const newWord = e.target.value;
                        setWord(newWord);

                        if (newWord.length > length) {
                            setLength(newWord.length);
                        }

                        setPassword(
                            generator({
                                ...generatorParameters,
                                word: newWord,
                            })
                        );
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Backspace" && word.length > 0) {
                            const newLength = word.length - 1;
                            setLength(newLength);
                        }
                    }}
                />
                <div className="flex h-10">
                    <input
                        type="range"
                        min={4}
                        max={14}
                        value={length}
                        onChange={(e) => {
                            setLength(parseInt(e.target.value));
                            trimOnLengthChange(e);
                        }}
                        name="range"
                        id="range"
                        className="mb-5 mr-3 cursor-pointer flex-1 self-end"
                    />
                    <label htmlFor="range" className="self-start">
                        Length: {length}
                    </label>
                </div>

                <div className="flex justify-center">
                    <span className="mr-10">
                        <input
                            type="checkbox"
                            id="number"
                            className="mx-1 cursor-pointer"
                            onClick={(e) => {
                                setIsNum(e.target.checked);
                                setPassword(
                                    generator({ ...generatorParameters, isNum })
                                );
                            }}
                        />
                        <label htmlFor="number">Number</label>
                    </span>
                    <span>
                        <input
                            type="checkbox"
                            id="char"
                            className="mx-1 cursor-pointer"
                            onClick={(e) => {
                                setIsChar(e.target.checked);
                                setPassword(
                                    generator({
                                        ...generatorParameters,
                                        isChar,
                                    })
                                );
                            }}
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
                        id="uppercase"
                        value="option2"
                        checked={selectedValue === "option2"}
                        onChange={handleRadioChange}
                    />
                    <label
                        htmlFor="uppercase"
                        className="mr-4 ml-1 cursor-pointer"
                    >
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
                    <label
                        htmlFor="lowercase"
                        className="mr-4 ml-1 cursor-pointer"
                    >
                        Lowercase
                    </label>
                </span>
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
                    <label
                        htmlFor="default"
                        className="mr-4 ml-1 cursor-pointer"
                    >
                        Both
                    </label>
                </span>
            </div>
        </div>
    );
}

export default GeneratorCard;
