import { useState } from "react";
import Toast from "../Toast";
import GeneratorCard from "./GeneratorCard";
import Switcher3 from "./ToogleSwitch";

function PasswordGenerator() {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <Toast isVisible={isVisible} />
            <Switcher3 />
            <div className="flex flex-col items-center text-center text-black dark:text-white md:mt-0 -mt-[6dvh]">
                <div>
                    <h1 className="text-4xl text-center mb-8 tracking-[10px]">
                        Password Generator
                    </h1>
                </div>
                <GeneratorCard setIsVisible={setIsVisible} />
            </div>
        </>
    );
}

export default PasswordGenerator;
