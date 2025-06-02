import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider} from "../utils/thirdweb/thirdweb";
import {client} from "../utils/thirdweb/client";
import Navbar from "../components/Navbar";
// import {AppContextProvider} from "../utils/thirdweb/thirdweb";




const inter = Inter({ subsets: ["latin"] });




export const metadata = {
  title: "GuildBank",
  description: "Together. Building and owning the metaverse.",
};




export default function RootLayout({ children }) {




  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider client={client}>
            <Navbar />
            {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}