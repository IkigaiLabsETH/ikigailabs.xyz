import Image from 'next/image'
import React, { FC } from 'react'

export const Ambassadors: FC = () => {
  return (
    <div className='mb-20 lg:mb-36'>
      <h1 className="boska text-6xl lg:text-8xl my-20 lg:my-36 pl-10">Meet our <br/>Ambassadors</h1>
      <div className="">
        <div className='flex flex-row flex-wrap md:flex-nowrap'>
          {/* Ryan Hoskison */}
          <div className='w-full md:w-1/2 lg:w-7/12 p-5 lg:ml-8 group lg:pt-16 pb-0'>
            <a href='https://livethelife.tv/ryan-hopkinson/' target='_blank' rel='noreferrer'>
              <div className='max-w-[1000px] px-12 pt-6 pb-3 bg-black lg:ml-12 lg:mr-6 z-10 relative lg:group-hover:-translate-x-2 lg:group-hover:-translate-y-2 transition-all'>
                <h1 className="text-xl lg:text-3xl font-bold boska">Ryan Hopkinson</h1>
                <p className="text-xs lg:text-sm text-white">
                  At the forefront of contemporary photography, Ryan Hopkinson, another member of the Ikigai Genesis Art Collective, curated by Florence Moll, stands out with his unique approach, blending art and technology to craft captivating works. 
                </p>
              </div>
              <div className='lg:-translate-y-5 z-9 lg:group-hover:scale-105 transition-all'>
                <Image src="/assets/images/ambassadors/ryan-hopkinson/cover.jpg" alt="Ryan Hopkinson" width={1000} height={1000} />
              </div>
            </a>
          </div>
          {/* Letizia le Fur */}
          <div className='w-full md:w-1/2 lg:w-5/12 p-5 lg:pl-9 lg:-mt-28 group pb-0'>
            <a href='https://livethelife.tv/letizia-le-fur/' target='_blank' rel='noreferrer'>
              <div className='max-w-[1000px] px-12 pt-6 pb-3 bg-black lg:ml-12 lg:mr-6 z-10 relative lg:group-hover:-translate-x-2 lg:group-hover:-translate-y-2 transition-all'>
                <h1 className="text-xl lg:text-3xl font-bold boska">Letizia Le Fur</h1>
                <p className="text-xs lg:text-sm text-white">
                  An award-winning photographer and esteemed member of our Genesis Art Collective. Her visionary work, curated by Florence Moll, masterfully blends narrative depth with visual elegance, making every piece a captivating journey.
                </p>
              </div>
              <div className='lg:pl-6 lg:group-hover:scale-105 transition-all lg:-translate-y-5'>
                <Image src="/assets/images/ambassadors/letizia-le-fur/cover.jpg" alt="Letizia le Fur" width={800} height={800} />
              </div>
            </a>
          </div>
        </div>
        <div className='flex flex-row lg:my-28 md:my-14 flex-wrap my-0'>
          {/* Cédric Delsaux */}
          <div className='w-full md:w-1/2 p-5 group pb-0'>
            <a href='https://livethelife.tv/dark-lens-origins-with-cedric-delsaux/' target='_blank' rel='noreferrer'>
              <div className='max-w-[1000px] px-12 pt-6 pb-3 bg-black lg:ml-6 lg:mr-6 z-10 relative lg:group-hover:-translate-x-2 lg:group-hover:-translate-y-2 transition-all'>
                <h1 className="text-xl lg:text-3xl font-bold boska">Cédric Delsaux</h1>
                <p className="text-xs lg:text-sm text-white">
                  Inspired by cinema and literature, his work equally summons the fantastical and the mundane, to make visible the fictional power of images and the phantasmagorical potential of reality.
                </p>
              </div>
              <div className='lg:-translate-y-5 z-9 lg:group-hover:scale-105 transition-all'>
                <Image src="/assets/images/ambassadors/cedric-delsaux/cover.jpg" alt="Cédric Delsaux" width={800} height={800} />
              </div>
            </a>
          </div>
          {/* Dimitri Daniloff */}
          <div className='w-full md:w-1/2 p-5 md:mt-6 group pb-0'>
            <a href='https://livethelife.tv/dimitri-daniloff-a-visionary-at-the-nexus-of-art-and-technology/' target='_blank' rel='noreferrer'> 
              <div className='max-w-[1000px] px-12 pt-6 pb-3 bg-black lg:ml-6 lg:mr-6 z-10 relative lg:group-hover:-translate-x-2 lg:group-hover:-translate-y-2 transition-all'>
                <h1 className="text-xl lg:text-3xl font-bold boska">Dimitri Daniloff</h1>
                <p className="text-xs lg:text-sm text-white">
                    His illustrious career, spanning over more than two decades, is a journey that transcends the realms of traditional photography, venturing into the innovative frontiers of digital artistry.
                </p>
              </div>
              <div className='lg:group-hover:scale-105 transition-all lg:-translate-y-5'>
                <Image src="/assets/images/ambassadors/dimitri-daniloff/cover.jpg" alt="Dimitri Daniloff" width={800} height={800} />
              </div>
            </a>
          </div>
          
        </div>
        {/* Maia Flore */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 gap-5 p-5 md:p-10'>
          <div className='group'>
            <a href='https://livethelife.tv/maia-flore/' target='_blank' rel='noreferrer'>
              <div className='max-w-[1000px] px-12 pt-6 pb-3 bg-black lg:ml-6 lg:mr-6 z-10 relative lg:group-hover:-translate-x-2 lg:group-hover:-translate-y-2 transition-all'>
                <h1 className="text-xl lg:text-3xl font-bold boska">Maia Flore</h1>
                <p className="text-xs lg:text-sm text-white">
                  Maia Flore&apos;s artistry lies in staging improbable, poetic, and metaphorical scenes, often using herself as not just a model, but an active subject in her own surreal narratives.
                </p>
              </div>
              <div className='lg:group-hover:scale-105 transition-all lg:-translate-y-5'>
                <Image src="/assets/images/ambassadors/maia-flore/cover.png" alt="Maia Flore" width={800} height={800} />
              </div>
            </a>
          </div>
          {/* Eduard Taufenbach and Bastien Pourtout */}
          <div className='group lg:mt-36'>
            <a href='https://livethelife.tv/edouard-taufenbach-and-bastien-pourtout/' target='_blank' rel='noreferrer'>
              <div className='max-w-[1000px] px-12 pt-6 pb-3 bg-black lg:ml-6 lg:mr-6 z-10 relative lg:group-hover:-translate-x-2 lg:group-hover:-translate-y-2 transition-all'>
                <h1 className="text-xl lg:text-3xl font-bold boska">Eduard Taufenbach and Bastien Pourtout</h1>
                <p className="text-xs lg:text-sm text-white">
                  Edouard Taufenbach and Bastien Pourtout are an acclaimed French artistic duo known for their innovative and evocative visual narratives.
                </p>
              </div>
              <div className='lg:group-hover:scale-105 transition-all lg:-translate-y-5'>
                <Image src="/assets/images/ambassadors/edouard-taufenbach-and-bastien-pourtout/cover.png" alt="Eduard Taufenbach and Bastien Pourtout" width={800} height={800} />
              </div>
            </a>
          </div>
          {/* Hannah Whitaker */}
          <div className='group lg:mt-16'>
            <a href='https://livethelife.tv/hannah-whitaker-a-contemporary-visionary-in-photography/' target='_blank' rel='noreferrer'>
              <div className='max-w-[1000px] px-12 pt-6 pb-3 bg-black lg:ml-6 lg:mr-6 z-10 relative lg:group-hover:-translate-x-2 lg:group-hover:-translate-y-2 transition-all'>
                <h1 className="text-xl lg:text-3xl font-bold boska">Hannah Whitaker</h1>
                <p className="text-xs lg:text-sm text-white">
                  Hannah Whitaker, an artist and photographer based in Brooklyn, New York, has become a prominent figure in the international art scene.
                </p>
              </div>
              <div className='lg:group-hover:scale-105 transition-all lg:-translate-y-5'>
                <Image src="/assets/images/ambassadors/hannah-whitaker/cover.png" alt="Hannah Whitaker" width={800} height={800} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
