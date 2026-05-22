"use client"
import BottomNav from "../components/bottomNav";
import CaseStudyPage from "../components/CaseStudyPage";
import GrainOverlay from "../components/grainoverlay";


export default function(){
    return(
        <div className="bg-blue-900 w-screen h-screen">
{/*             
            <CaseStudyPage />
            <CaseStudyPage /> */}

            <h1 className="text-9xl text-wrap font-romantic text-white">coming soon</h1>
            <BottomNav />
            <GrainOverlay opacity={0.2} fps={40} tileSize={200}/>
        </div>
    )
}