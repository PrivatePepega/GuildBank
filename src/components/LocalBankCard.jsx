"use client";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";

  import Chapter from "/public/NewsLetter/Chapter 4.jpg";
  import Image from "next/image";
  import Link from "next/link";


const LocalBankCard = () => {



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
            Chapter 4:
          </Typography>
          <Typography>
            What it is a Local Bank?
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Link
            href="https://www.figma.com/board/q3ZsRJAauMWzmEcvo7wbbB/Chapter-4?t=I6phj0nM3q9X8NyA-0"
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

export default LocalBankCard
