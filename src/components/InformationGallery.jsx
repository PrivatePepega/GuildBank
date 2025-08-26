"use client";



import React from 'react'





const InformationGallery = () => {


  const data = [
    {
      imgelink:
        "@components/intro/NewsLetter/Chapter 1.jpg",
        title: "Chapter 1 : Login",
        hyperLink: "https://www.figma.com/board/48U8aa2nWoJgh9mzYTse8z/Chapter-1--Login-?node-id=0-1&p=f&t=C7Xf9yCyXSev6zi8-0",

    },
    {
      imgelink:
      "@components/intro/NewsLetter/Chapter 2.jpg",
      title: "Chapter 2: Founder Pepega",
      hyperLink: "https://www.figma.com/board/gOjDK6VOaF5RfdIMdCUtcP/Chapter-2--Founder-Pepega?node-id=1-62&t=C7Xf9yCyXSev6zi8-1",
    },
    {
      imgelink:
      "@components/intro/NewsLetter/Chapter 3.jpg",
      title: "Chapter 3: What it is GuildBank?",
      hyperLink: "https://www.figma.com/board/EU3N1f6OxS2AFvcNEYxfLD/Chapter-3--What-it-is-GuildBank-?node-id=0-1&p=f&t=C7Xf9yCyXSev6zi8-0",
    },
    {
      imgelink:
      "@components/intro/NewsLetter/Chapter 4.jpg",
      title: "Chapter 4: What it is LocalBank?",
      hyperLink: "https://www.figma.com/board/q3ZsRJAauMWzmEcvo7wbbB/Chapter-4?t=I6phj0nM3q9X8NyA-0",

    },
    {
      imgelink:
      "@components/intro/NewsLetter/Chapter 5.jpg",
      title: "Chapter 5: Governance",
      hyperLink: "https://www.figma.com/board/O0gUuCb1lUEhr8gQIfOz9X/Chapter-5?node-id=0-1&t=I6phj0nM3q9X8NyA-1",
    },
    {
      imgelink:
      "@components/intro/NewsLetter/Chapter 6.jpg",
      title: "Chapter 6: BoD.",
      hyperLink: "https://www.figma.com/board/p2u7kd5BXNm596KAMRU8yK/Chapter-6--Board-of-Directors?node-id=1-64&t=fZglGYnNI5CRyA0E-1",
    },
    {
      imgelink:
      "@components/intro/NewsLetter/Chapter 7.png",
      title: "Chapter 7: Tokenomics",
      hyperLink: "https://www.figma.com/board/OXwVIVPWkjecLO3DbyIium/Chapter-7--Tokenomics?node-id=1-52&t=fZglGYnNI5CRyA0E-1",
    },
    {
      imgelink:
      "@components/intro/NewsLetter/Chapter 8.jpg",
      title: "Chapter 8: the Matrix",
      hyperLink: "https://www.figma.com/board/prJZlOKWFmcAcmGzggBcpS/Untitled?node-id=0-1&t=fZglGYnNI5CRyA0E-1",
    },
    {
      imgelink:
      "@components/intro/NewsLetter/Chapter 9.png",
      title: "Chapter 9: Summary",
      hyperLink: "https://www.figma.com/board/h6uuBhBdYm8vb4JqxZoreE/Chapter-9--Summary?t=fZglGYnNI5CRyA0E-0",
    },
  ];
 
  const [active, setActive] = React.useState(
    "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  );


  return (
    <div className="grid gap-4">

      <div className="grid grid-cols-5 gap-4">
        {data.map(({ imgelink }, index) => (
          <div key={index}>
            <p>
              {data.title}
            </p>
            <img
              onClick={() => setActive(imgelink)}
              src={imgelink}
              className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
              alt="gallery-image"
            />
          </div>
        ))}
      </div>

      <div>
        <div className='flex flex-row gap-2'>

          <button href={data.hyperLink} className='text-sm'>figma</button>
          <p className='text-sm'>
            {data.title}
          </p>

        </div>

        <img
          className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
          src={active}
          alt=""
        />
      </div>
    </div>
  )
}

export default InformationGallery