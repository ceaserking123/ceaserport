
import type { Metadata } from "next";
import { Poppins, } from "next/font/google";
import "./globals.css";
import { romantic, Romancio, aroba, clairo, alrevo } from "./components/font";
import { Analytics } from "@vercel/analytics/next";
import Providers from "./components/Providers";

 


const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
})


export const metadata: Metadata = {
  title: "Ceaser Portfolio",
  description: "Ceaser's personal portfolio website.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body
        className={`${romantic.variable} ${Romancio.variable} ${aroba.variable} ${clairo.variable} ${alrevo.variable} ${poppins.variable} antialiased`}
      >
        <Providers>
          {children}
          <Analytics />
        </Providers>
        
        
              
      </body>
    </html>
  );
}
