import { useState, useCallback, useEffect, useRef } from "react";
import { CheckCircle, Ban, TriangleAlert, RefreshCw } from "lucide-react";
import generatePassword from "@kripanshu-singh/generatepassword";
import Toast from "../Toast";

function GeneratorCard({ setIsVisible }) {
    const [passwordLength, setPasswordLength] = useState(8);
    const [generatedPassword, setGeneratedPassword] = useState("");
    const [inputWord, setInputWord] = useState("");
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
    const [caseOption, setCaseOption] = useState("option1");
    const [passwordStrength, setPasswordStrength] = useState("");
    const timeoutRef = useRef(null);

    let generatorConfig = {
        passwordLength,
        includeNumbers,
        isUppercase: caseOption === "option1" || caseOption === "option2",
        isLowercase: caseOption === "option1" || caseOption === "option3",
        includeSpecialChars,
        inputWord,
    };

    useEffect(() => {
        const hasLowercase =
            generatedPassword.toLowerCase() !== generatedPassword;
        const hasUppercase =
            generatedPassword.toUpperCase() !== generatedPassword;
        const hasNumber = /\d/.test(generatedPassword);
        const hasSpecialChar = /[!@#$%^&*]/.test(generatedPassword);

        let strengthScore = 0;
        if (generatedPassword.length >= 8) strengthScore++;
        if (hasLowercase) strengthScore++;
        if (hasUppercase) strengthScore++;
        if (hasNumber) strengthScore++;
        if (hasSpecialChar) strengthScore++;

        const strengthStatus =
            strengthScore <= 2
                ? "Weak"
                : strengthScore === 3
                ? "Moderate"
                : "Strong";
        setPasswordStrength(strengthStatus);
    }, [generatedPassword]);

    useEffect(() => {
        setGeneratedPassword(
            generatePassword({ ...generatorConfig, length: passwordLength })
        );
    }, [passwordLength]);

    const passwordRef = useRef(null);

    const copyToClipboard = () => {
        passwordRef.current.select();
        window.navigator.clipboard.writeText(generatedPassword);
        triggerToast();
    };

    const triggerToast = () => {
        setIsVisible(true);

        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a new timeout
        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
        }, 2000);
    };

    const handleCaseChange = (event) => {
        const newCaseOption = event.target.value;
        setCaseOption(newCaseOption);
        setGeneratedPassword(
            generatePassword({
                ...generatorConfig,
                isUppercase:
                    newCaseOption === "option1" || newCaseOption === "option2",
                isLowercase:
                    newCaseOption === "option1" || newCaseOption === "option3",
            })
        );
    };

    const adjustWordLength = (event) => {
        if (event.target.value < inputWord.length) {
            setInputWord(inputWord.slice(0, event.target.value));
        }
    };

    return (
        <div className="card rounded h-auto flex justify-center w-5/6 md:w-full">
            {/* {!showToast && <Toast />} */}
            {passwordStrength === "Moderate" && (
                <div className="flex mb-3 gap-3 p-2 rounded-md bg-yellow-200">
                    <Ban className="h-6 w-6 text-yellow-800" />
                    <p className="text-lg font-bold text-yellow-800">
                        Moderate
                    </p>
                </div>
            )}
            {passwordStrength === "Weak" && (
                <div className="flex mb-3 gap-3 p-2 rounded-md bg-red-200">
                    <TriangleAlert className="h-6 w-6 text-red-800" />
                    <p className="text-lg font-bold text-red-800">Weak</p>
                </div>
            )}
            {passwordStrength === "Strong" && (
                <div className="flex mb-3 gap-3 p-2 rounded-md bg-green-200">
                    <CheckCircle className="h-6 w-6 text-black" />
                    <p className="text-lg font-bold text-green-800">Strong</p>
                </div>
            )}
            <div className="main md:py-2 rounded-3xl ">
                <div className="flex select-none mb-3">
                    <input
                        className="md:px-4 md:p-2 p-1 outline-none text-black flex-1 md:w-full w-5/6 rounded-xl cursor-not-allowed dark:text-white"
                        type="text"
                        readOnly
                        disabled={true}
                        value={generatedPassword}
                        ref={passwordRef}
                    />
                    <button
                        type="button"
                        className="button cursor-pointer rounded-xl ml-1 mr-2 px-2"
                        data-dismiss-target="#toast-success"
                        aria-label="Close"
                        onClick={() => {
                            setGeneratedPassword(
                                generatePassword(generatorConfig)
                            );
                        }}
                    >
                        <RefreshCw />
                    </button>
                    {/* <div
                        className="cursor-pointer bg-red-100 text-black rounded-r p-[0.65rem] mr-3"
                        onClick={() => {
                            setGeneratedPassword(
                                generatePassword(generatorConfig)
                            );
                        }}
                    >
                        <RefreshCw />
                    </div> */}
                    <button
                        className="button rounded md:p-2 md:px-3 px-1"
                        onClick={copyToClipboard}
                    >
                        <span className="button-content rounded-xl">Use</span>
                    </button>
                </div>
                <input
                    className="px-4 p-2 mb-3 rounded outline-none w-full text-black flex-1 border-r-[1px] border-r-slate-600"
                    type="text"
                    value={inputWord}
                    placeholder="Enter a word"
                    disabled={inputWord.length >= 20}
                    onChange={(e) => {
                        const newWord = e.target.value;
                        setInputWord(newWord);

                        if (newWord.length > passwordLength) {
                            setPasswordLength(newWord.length);
                        }

                        setGeneratedPassword(
                            generatePassword({
                                ...generatorConfig,
                                inputWord: e.target.value,
                            })
                        );
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Backspace" && inputWord.length > 0) {
                            setPasswordLength(inputWord.length - 1);
                        }
                    }}
                />
                <div className="flex h-10">
                    <input
                        type="range"
                        min={4}
                        max={20}
                        value={passwordLength}
                        onChange={(e) => {
                            setPasswordLength(parseInt(e.target.value));
                            adjustWordLength(e);
                        }}
                        name="range"
                        id="range"
                        className="mb-5 mr-3 cursor-pointer flex-1 self-end"
                    />
                    <label htmlFor="range" className="self-start">
                        Length: {passwordLength}
                    </label>
                </div>

                <div className="flex justify-center flex-wrap">
                    <span className="sm:mr-10 mr-5">
                        <input
                            type="checkbox"
                            id="number"
                            className="mx-1 cursor-pointer"
                            onClick={(e) => {
                                setIncludeNumbers(e.target.checked);
                                setGeneratedPassword(
                                    generatePassword({
                                        ...generatorConfig,
                                        isNum: e.target.checked,
                                    })
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
                                setIncludeSpecialChars(e.target.checked);
                                setGeneratedPassword(
                                    generatePassword({
                                        ...generatorConfig,
                                        isChar: e.target.checked,
                                    })
                                );
                            }}
                        />
                        <label htmlFor="char">Characters</label>
                    </span>
                </div>
            </div>
            <hr className="border-t border-dashed border-white-900 my-4" />
            <div className="radios flex justify-center flex-wrap">
                <span>
                    <input
                        className="cursor-pointer"
                        type="radio"
                        name="Capital"
                        id="default"
                        value="option1"
                        defaultChecked={true}
                        onChange={handleCaseChange}
                    />
                    <label
                        htmlFor="default"
                        className="mr-4 ml-1 cursor-pointer"
                    >
                        Both
                    </label>
                </span>
                <span>
                    <input
                        className="cursor-pointer"
                        type="radio"
                        name="Capital"
                        id="uppercase"
                        value="option2"
                        checked={caseOption === "option2"}
                        onChange={handleCaseChange}
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
                        checked={caseOption === "option3"}
                        onChange={handleCaseChange}
                    />
                    <label
                        htmlFor="lowercase"
                        className="mr-4 ml-1 cursor-pointer"
                    >
                        Lowercase
                    </label>
                </span>
            </div>
        </div>
    );
}

export default GeneratorCard;
