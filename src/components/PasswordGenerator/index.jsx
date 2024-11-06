import GeneratorCard from "./GeneratorCard";
import Switcher3 from "./ToogleSwitch";

function PasswordGenerator() {
    return (
        <>
            <Switcher3 />
            <div className="text-center text-black dark:text-white">
                <div>
                    <h1 className="text-4xl text-center mb-8 tra glass">
                        Password Generator
                    </h1>
                </div>
                <GeneratorCard />
            </div>
        </>
    );
}

export default PasswordGenerator;
