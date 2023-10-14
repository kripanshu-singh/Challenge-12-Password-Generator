import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const generator = useCallback(() => {
    let pass = "";
    let string = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm";
    if (num) string += "123456789012345678901234567890";
    if (char) string += "!@#$%^&*()-_=+[]{}|;:,.<>?";
    let len = string.length;
    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * len);
      pass += string.charAt(random);
    }
    if (selectedValue === "option2") {
      pass = pass.toLocaleUpperCase();
    } else if (selectedValue === "option3") {
      pass = pass.toLowerCase();
    }
    setPassword(pass);
  }, [length, num, char, selectedValue]);

  useEffect(() => {
    generator();
  }, [length, num, char, selectedValue]);

  let copy = () => {
    passRef.current.select();
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  let passRef = useRef(null);
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="text-center text-white">
      <div>
        <h1 className="text-4xl text-center text-white mb-8">
          Password Generator
        </h1>
      </div>
      <div className="card flex justify-center">
        <div className="main py-2  rounded-3xl  ">
          <div className="inputFeild mb-5">
            <input
              className="px-4 p-2 rounded-xl  outline-none w-full md:w-2/3 mr-3 mb-3 text-black"
              type="text"
              name=""
              id=""
              readOnly
              value={password}
              placeholder="Password"
              ref={passRef}
              // placeholder={password}
            />
            <button
              type="button"
              className="rounded-xl bg-green-600 px-5 py-2  font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              onClick={copy}
            >
              Copy
            </button>
          </div>
          <input
            type="range"
            min={5}
            max={20}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            name="range"
            id="range"
            className="mb-5 mr-3 cursor-pointer"
          />
          <label htmlFor="">Length: {length}</label>
          <div className="flex  justify-center">
            <span className="mr-10 ">
              <input
                type="checkbox"
                name="number"
                id="number"
                className="mx-1 cursor-pointer"
                onClick={() => {
                  setNum((num) => !num);
                }}
              />
              <label htmlFor="" className="">
                Number
              </label>
            </span>
            <span>
              <input
                type="checkbox"
                name="char"
                id="char"
                className="mx-1 cursor-pointer"
                onClick={() => {
                  setChar((prev) => !prev);
                }}
              />
              <label htmlFor="">Chacters</label>
            </span>
          </div>
        </div>
        <hr className="border-t border-dashed border-white-900 my-4" />
        <div className="radios flex justify-self-center justify-center flex-wrap">
          <span>
            <input
              className="cursor-pointer"
              // className="ml-3"
              type="radio"
              name="Capital"
              id="capital"
              defaultChecked={true}
              value="option1"
              // checked={selectedValue === "option1"}
              onChange={handleRadioChange}
            />
            <label htmlFor="" className="mr-4 ml-1">
              Default
            </label>
          </span>
          <span>
            <input
              className="cursor-pointer"
              type="radio"
              name="Capital"
              id="capital"
              value="option2"
              checked={selectedValue === "option2"}
              onChange={handleRadioChange}
            />
            <label htmlFor="" className="mr-4 ml-1">
              Uppercase
            </label>
          </span>
          <span>
            <input
              className="cursor-pointer"
              type="radio"
              name="Capital"
              id="capital"
              value="option3"
              checked={selectedValue === "option3"}
              onChange={handleRadioChange}
            />
            <label htmlFor="" className="mr-4 ml-1">
              Lowercase
            </label>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
