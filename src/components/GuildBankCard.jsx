"use client";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";


  import Chapter from "/public/NewsLetter/Chapter 3.jpg";
  import Image from "next/image";
import Link from "next/link";


const GuildBankCard = () => {


  return (
      <Card className="mt-6 w-full">
        <CardHeader color="blue-gray" className="relative h-56">
        <Image
            className="w-full h-full object-cover"
              src={Chapter}
              alt="card-image"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Chapter 3:         
          </Typography>
          <Typography>
            What it is GuildBank?  
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Link
            href="https://www.figma.com/board/EU3N1f6OxS2AFvcNEYxfLD/Untitled?node-id=1-76&t=WyYuoFWutw1FiT7y-1"
            target="_blank" // Opens link in a new tab
            rel="noopener noreferrer" // Security best practice
            passHref
          >
            <Button>Figma</Button>
          </Link>       
        </CardFooter>
      </Card>
  )
}

export default GuildBankCard
