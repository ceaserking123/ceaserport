import FeaturesCarousel from "./featureCarousel";

export default function Summary() {
  return (
    <div className=" flex flex-col gap-6 items-center justify-center py-20 w-screen h-screen">
        <div>
            <h1 className="text-4xl font-romantic">Picture collage</h1>
     
        </div>
        <div className=" w-[70%] h-3/4 max-sm:w-full  justify-center items-center flex rounded-2xl">
          <FeaturesCarousel />
            </div>
    </div>
  );
}