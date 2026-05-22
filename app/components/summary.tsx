import FeaturesCarousel from "./featureCarousel";

export default function Summary() {
  return (
    <div className=" flex flex-col items-center justify-center py-20 w-screen h-screen">
        <div>
            <h1 className="text-4xl font-romantic text-white">Picture collage</h1>
     
        </div>
        <div className=" w-full h-3/4 max-sm:w-full  justify-center items-center flex rounded-2xl">
          <FeaturesCarousel />
            </div>
    </div>
  );
}