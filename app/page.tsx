import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import Content from "./components/Content";


export default function Home() {
  return (
    <div className="font-romantic">
      <Navbar />
     <Hero />
     <Content />
    </div>
  );
}
