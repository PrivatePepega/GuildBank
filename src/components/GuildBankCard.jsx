"use client";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";

  import {chapter3} from "@components/Data/NewsCard.js";
  import Image from "next/image";



const GuildBankCard = () => {





  return (
      <Card className="mt-6 w-full">
        <CardHeader color="blue-gray" className="relative h-56">
          <Image
          className="w-full h-full object-cover"
            src={chapter3.img}
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
          <Button href="https://www.figma.com/board/EU3N1f6OxS2AFvcNEYxfLD/Chapter-3--What-it-is-GuildBank-?node-id=0-1&p=f&t=C7Xf9yCyXSev6zi8-0">Figma</Button>
        </CardFooter>
      </Card>
  )
}

export default GuildBankCard
