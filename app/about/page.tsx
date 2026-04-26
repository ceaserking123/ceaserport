import Navbar from "../components/Navbar";
export default function About() {
    return (
        <div className="flex flex-col w-screen h-screen">
            
            <div className="flex ">
                <div className="w-1/2 h-full bg-gray-200 flex items-center justify-center">
                    <h1 className="text-4xl font-bold">About Me</h1>
                </div>
                <div className="w-1/2 h-full bg-gray-300 flex items-center justify-center">
                    <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc commodo efficitur. Nulla facilisi. Sed at dui nec nisi bibendum fermentum. Curabitur ac odio a metus commodo efficitur.</p>
                
                </div>

            </div>
        </div>
    );
}