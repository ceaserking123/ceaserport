import Image from "next/image"
import Link from "next/link";
import { navigation, myInfo } from '../userDTO/navDTO';
import NavButton from "./navbutton";


export default function Navbar() {
    return(
        <main className="flex justify-between w-full h-20 border-2 border-amber-300 items-center">
            <div className=" w-1/3 visible max-sm:hidden flex items-center ml-4">
            <div className="w-7 h-7 bg-orange-700  flex justify-center items-center ">
                <span className="w-6 h-6 block  overflow-hidden">
                    <span className="h-3 w-6 bg-blue-600 block"></span>
                    <span className="h-3 w-6 bg-blue-600 block"></span>
                </span>
                
            </div>
                <>{
                    myInfo.map((info) =>(
                        <span key={info.id} className=" text-sm mr-2">{info.value}{info.id !== myInfo.length ? ',' : ''} </span>
                    ))
                }</>
               
            </div>
            <div className="w-1/3 items-center flex justify-center">
               <Image src={'logo.svg'} width={100} height={100} alt="Ceaser logo" className=" w-16 h-16" />
            </div>
            <div id="Navigation" className="w-1/3 items-center flex justify-center">
                <ul>
                    {
                        navigation.map((link, index) =>(
                            <Link href={link.value.toLowerCase() === 'home' ? `/` : ` ${link.value.toLowerCase()}`} key={index + 1}>
                  <NavButton value={link.value} />
                </Link>
                        ))
                    }

                </ul>
            </div>
        </main>
        
    )
}