"use client";



import React, { useState } from 'react'
import Image from "next/image";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import Link from "next/link";


const InformationGallery = () => {

  const data = [
    {
      id: 0,
      imglink: "/NewsLetter/Chapter 1.jpg",
      title: "Chapter 1: Login",
      hyperLink: "https://www.figma.com/board/48U8aa2nWoJgh9mzYTse8z/Chapter-1--Login-?node-id=0-1&p=f&t=C7Xf9yCyXSev6zi8-0",
    },
    {
      id: 1,
      imglink: "/NewsLetter/Chapter 2.jpg",
      title: "Chapter 2: Founder Pepega",
      hyperLink: "https://www.figma.com/board/gOjDK6VOaF5RfdIMdCUtcP/Chapter-2--Founder-Pepega?node-id=1-62&t=C7Xf9yCyXSev6zi8-1",
    },
    {
      id: 2,
      imglink: "/NewsLetter/Chapter 3.jpg",
      title: "Chapter 3: What it is GuildBank?",
      hyperLink: "https://www.figma.com/board/EU3N1f6OxS2AFvcNEYxfLD/Chapter-3--What-it-is-GuildBank-?node-id=0-1&p=f&t=C7Xf9yCyXSev6zi8-0",
    },
    {
      id: 3,
      imglink: "/NewsLetter/Chapter 4.jpg",
      title: "Chapter 4: What are Local Banks",
      hyperLink: "https://www.figma.com/board/q3ZsRJAauMWzmEcvo7wbbB/Chapter-4?t=I6phj0nM3q9X8NyA-0",
    },
    {
      id: 4,
      imglink: "/NewsLetter/Chapter 5.jpg",
      title: "Chapter 5: Governance",
      hyperLink: "https://www.figma.com/board/O0gUuCb1lUEhr8gQIfOz9X/Chapter-5?node-id=0-1&t=I6phj0nM3q9X8NyA-1",
    },
    {
      id: 5,
      imglink: "/NewsLetter/Chapter 6.jpg",
      title: "Chapter 6: Board of Directors",
      hyperLink: "https://www.figma.com/board/p2u7kd5BXNm596KAMRU8yK/Chapter-6--Board-of-Directors?node-id=1-64&t=fZglGYnNI5CRyA0E-1",
    },
    {
      id: 6,
      imglink: "/NewsLetter/Chapter 7.png",
      title: "Chapter 7: Tokenomics",
      hyperLink: "https://www.figma.com/board/OXwVIVPWkjecLO3DbyIium/Chapter-7--Tokenomics?node-id=1-52&t=fZglGYnNI5CRyA0E-1",
    },
    {
      id: 7,
      imglink: "/NewsLetter/Chapter 8.jpg",
      title: "Chapter 8: the Matrix",
      hyperLink: "https://www.figma.com/board/prJZlOKWFmcAcmGzggBcpS/Untitled?node-id=0-1&t=fZglGYnNI5CRyA0E-1",
    },
    {
      id: 8,
      imglink: "/NewsLetter/Chapter 9.png",
      title: "Chapter 9: Summary",
      hyperLink: "https://www.figma.com/board/h6uuBhBdYm8vb4JqxZoreE/Chapter-9--Summary?t=fZglGYnNI5CRyA0E-0",
    },
  ];
 

const [dataID, setDataID] = useState(0);

  return (
    <div className="grid gap-4">

      <div className="grid grid-cols-5 gap-4">
        {data.map((item) => (
          <div key={item.id} className='gap-4'>
            <p>
              {item.title}
            </p>
            <Image
              width={300}
              height={300}
              onClick={() => setDataID(item.id)}
              src={item.imglink}
              className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
              alt="gallery-image"
            />
          </div>
        ))}
      </div>

      <div>
        <div className='flex flex-row gap-2 items-center'>

          <Link
            href={data[dataID].hyperLink}
            target="_blank" // Opens link in a new tab
            rel="noopener noreferrer" // Security best practice
            passHref
          >
            <Button>Figma</Button>
          </Link>
          <p className='text-xl'>
            {data[dataID].title}
          </p>

        </div>

        <Image
          width={300}
          height={300}
          style={{ objectFit: "contain" }}
          className="h-auto w-full max-w-4xl mx-auto rounded-lg object-cover object-center md:h-[480px] shadow-lg"
          src={data[dataID].imglink}
          alt={data[dataID].title}
        />
      </div>
    </div>
  )
}

export default InformationGallery