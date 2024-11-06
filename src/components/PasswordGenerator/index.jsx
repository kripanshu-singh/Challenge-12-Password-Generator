import GeneratorCard from "./GeneratorCard";
import Switcher3 from "./ToogleSwitch";

function PasswordGenerator() {
    return (
        <>
            <Switcher3 />
            <div className="text-center text-gray-800 dark:text-white">
                <div>
                    <h1 className="text-4xl text-center mb-8 ">
                        Password Generator
                    </h1>
                </div>
                <GeneratorCard />
            </div>
        </>
    );
}

export default PasswordGenerator;
