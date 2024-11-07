import GeneratorCard from "./GeneratorCard";
import Switcher3 from "./ToogleSwitch";

function PasswordGenerator() {
    return (
        <>
            <Switcher3 />
            <div className="flex flex-col items-center text-center text-black dark:text-white md:mt-0 -mt-[6dvh]">
                <div>
                    <h1 className="text-4xl text-center mb-8 tracking-[10px]">
                        Password Generator
                    </h1>
                </div>
                <GeneratorCard />
            </div>
        </>
    );
}

export default PasswordGenerator;
