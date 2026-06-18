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
  keywords: [
    "GuildBank",
    "Vanilla-Plus",
  ],
  author: [{ name: "GuildBank Team"}],
  creator: "GuildBank",
  openGraph: {
    title: "GuildBank",
    description: "Together. Building and owning the metaverse.",
    url: "https://guildbank.biz",           // ← Change to your real domain
    siteName: "GuildBank",
    images: [
      {
        url: "/og-image.jpg",               // Recommended size: 1200x630
        width: 1200,
        height: 630,
        alt: "GuildBank Metaverse",
      },
    ],
    locale: "en_US",
    type: "website",
    icons: {
      icon: '/icon guildbank white-01.png',
    },
  },
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