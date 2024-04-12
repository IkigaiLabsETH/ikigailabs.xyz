import React, { FC } from 'react'
import { Eyebrow } from '../Eyebrow'
import { Button } from '../Button'

interface FeaturedProps {}

export const Featured: FC<FeaturedProps> = ({}) => {
  return (
    <div>
      <div className="flex relative flex-col lg:flex-row-reverse lg:min-h-screen lg:h-min items-stretch">
        <div
          className="w-full lg:w-1/2 bg-no-repeat bg-center bg-cover h-96 lg:h-auto"
          style={{ backgroundImage: `url('assets/images/Dimitri_Daniloff_Archives_Molds_2.jpg')` }}
        ></div>
        <div className="w-full lg:w-1/2 p-16 flex flex-col justify-center">
          <Eyebrow>Dimitri Daniloff</Eyebrow>
          <h2 className="text-[2rem] md:text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska break-words">
            Molds 2
          </h2>
          <p className="my-8 satoshi text-lg lg:text-xl leading-relaxed max-w-3xl">
            Molds 2 is a series of 3D sculptures created by Dimitri Daniloff. The sculptures are created using a
            technique called photogrammetry, which involves taking hundreds of photos of an object from different angles
            and then stitching them together to create a 3D model.
          </p>
          <div className="block">
            <Button href={`/`}>Go to drop</Button>
          </div>
        </div>
      </div>
      <div className="flex relative flex-col lg:flex-row lg:min-h-screen lg:h-min items-stretch">
        <div
          className="w-full lg:w-1/2 bg-no-repeat bg-center bg-cover h-96 lg:h-auto"
          style={{ backgroundImage: `url('assets/images/chateaubrillant.jpg')` }}
        ></div>
        <div className="w-full lg:w-1/2 p-16 flex flex-col justify-center">
          <Eyebrow>Maia Flore</Eyebrow>
          <h2 className="text-[2rem] md:text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska break-words">
            Chateaubriand
          </h2>
          <p className="my-8 satoshi text-lg lg:text-xl leading-relaxed max-w-3xl">
            Chateaubriand is a series of 3D sculptures created by Maia. The sculptures are created using a technique
            called photogrammetry, which involves taking hundreds of photos of an object from different angles and then
            stitching them together to create a 3D model.
          </p>
          <div className="block">
            <Button href={`/`}>Go to drop</Button>
          </div>
        </div>
      </div>
      <div className="flex relative flex-col lg:flex-row-reverse lg:min-h-screen lg:h-min items-stretch">
        <div
          className="w-full lg:w-1/2 bg-no-repeat bg-center bg-cover h-96 lg:h-auto"
          style={{ backgroundImage: `url('assets/images/Nick Meek Sony Bravia Street copy.jpg')` }}
        ></div>
        <div className="w-full lg:w-1/2 p-16 flex flex-col justify-center">
          <Eyebrow>Nick Meek</Eyebrow>
          <h2 className="text-[2rem] md:text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska break-words">
            Sony Bravia Street
          </h2>
          <p className="my-8 satoshi text-lg lg:text-xl leading-relaxed max-w-3xl">Sony Bravia Street</p>
          <div className="block">
            <Button href={`/`}>Go to drop</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
