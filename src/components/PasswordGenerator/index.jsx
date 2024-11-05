import GeneratorCard from "./GeneratorCard";

function PasswordGenerator() {
    return (
        <>
            <div className="text-center text-white">
                <div>
                    <h1 className="text-4xl text-center text-white mb-8">
                        Password Generator
                    </h1>
                </div>
                <GeneratorCard />
            </div>
        </>
    );
}

export default PasswordGenerator;
