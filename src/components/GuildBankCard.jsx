"use client";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";




const GuildBankCard = () => {


  return (
      <Card className="mt-6 w-full">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
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
          <Button href="https://www.figma.com/board/EU3N1f6OxS2AFvcNEYxfLD/Untitled?node-id=1-76&t=WyYuoFWutw1FiT7y-1">Read More</Button>
        </CardFooter>
      </Card>
  )
}

export default GuildBankCard
