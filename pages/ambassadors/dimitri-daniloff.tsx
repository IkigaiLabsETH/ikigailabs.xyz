import React, { FC, useRef } from 'react'
import Head from 'next/head'
import Slider from 'react-slick'

import { AmbassadorHeader } from '../../modules/AmbassadorHeader'
import { Footer } from '../../modules/Footer'
import Image from 'next/image'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { withLayout } from '../../common/layouts'
import { Layout } from '../../common/types'

const name = 'Dimitri Daniloff'
const intro = 'Dimitri Daniloff stands as a testament to the transformative power of art when fused with technology. His illustrious career, spanning over more than two decades, is a journey that transcends the realms of traditional photography, venturing into the innovative frontiers of digital artistry.'
const coverImage = '/assets/images/ambassadors/dimitri-daniloff/Dimitri_Daniloff_Archives_Pills.jpg'

const DimitriDaniloff: FC = () => {
  const sliderRef = useRef(null)
  const settings = {
    dots: false,
    className: "center",
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    arrows: false,
  }

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>Ikigai Labs - Shaped by Photography | Dimitri Daniloff</title>
        <meta name="description" content="Shaped by Photography | Dimitri Daniloff" />
        <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
      </Head>
      <main className="w-full">
        <AmbassadorHeader name={name} intro={intro} coverImage={coverImage} />
        <div className='bg-white flex flex-col w-full items-center'>
          <div className='p-10 max-w-2xl text-black text-lg'>
            <p>
              From his earliest influences under the tutelage of his father, a master sculptor, Dimitri developed a deep appreciation for the intricacies of form and texture. His initial forays into the world of visual art using the 4x5 view camera marked the beginning of an enduring exploration of reality&apos;s capture. However, it was his unquenchable thirst for innovation that propelled him into the digital sphere, where he began to challenge and redefine the boundaries of the photographic medium.
            </p>
            <p>
              Dimitri&apos;s work is characterized by a unique blend of authenticity and fantastical elements, strikingly evident in his groundbreaking campaign for PlayStation in 2003. This project marked a pivotal point in his career, as he skillfully intertwined real-life elements with alien realms, creating a hybrid space where the real and the surreal coexist in harmony.
            </p>
            <p>
              His collaboration with the iconic electronic duo, Daft Punk, on the avant-garde Virtual Girl project in 2008 further showcased his ability to incorporate 3D elements into traditional photography, presenting a compelling narrative of augmented humanity. This venture exemplified his flair for merging the artistic with the technological, a theme that has become a hallmark of his work.
            </p>
            <p>
              Dimitri&apos;s advent into the world of photogrammetry, a technique that using photography to create detailed 3D models, marked another significant evolution in his artistic journey. His series &apos;L&apos;humain illimité&apos; (Human Unlimited)from 2018 stands as a revolutionary project that blurs the line between the virtual and the real. This work, a virtual figure anchored in reality, challenges the viewer&apos;s perceptions of the human form, pushing the limits of traditional 2D imagery.
            </p>
            <p>
              As the CEO of Kklone, Dimitri has continued to explore the potential of photogrammetry, creating breathtaking 3D models and immersive digital experiences. His work in this field has been recognized internationally, including a major project for EDF at the VR Arles festival, showcasing his ability to merge artistic vision with cutting-edge technology.
            </p>
            <p>
              In his current role as a consultant at Mazarine Paris, Dimitri brings his artistic vision and technological expertise to the forefront of the evolving digital landscape, advising on trends in web3 and the metaverse. His work here involves curating artists for events and providing insights into the future of digital art spaces, further cementing his position as a pioneer in the field.
            </p>
            <p>
              Throughout his career, Dimitri has collaborated with some of the world&apos;s top agencies and brands, including Adidas, Nike, and several prestigious international agencies. His passion and dedication to photography and digital art have earned him numerous accolades, including the prestigious Grand Prix de Cannes at the Cannes Lions, gold and silver Lions, and awards at the Clios Awards.
            </p>
            <p>
            Dimitri Daniloff&apos;s career is more than a chronicle of personal achievement; it is a vivid illustration of the endless possibilities at the intersection of art and technology. His journey from capturing reality to creating new realities serves as an inspiration, inviting us to envision a future where art and technology coalesce to redefine our experiences and perceptions. His work stands as a beacon for those who dare to dream beyond the confines of the conventional, heralding a new era of visual storytelling where imagination knows no bounds.
            </p>
          </div>
          <div className='max-w-3xl'>
            <Slider {...settings} ref={sliderRef}>
              <div className='p-5 w-full'>
                  <Image src='/assets/images/ambassadors/dimitri-daniloff/Daniloff_Human-Unlimited_02-2.jpg' alt='Dimitri Daniloff Human Unlimited 2' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/dimitri-daniloff/Daniloff_Human-Unlimited_05-1.jpg' alt='Dimitri Daniloff Human Unlimited 5' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/dimitri-daniloff/Daniloff_Nike_Paoleta1.jpg' alt='Dimitri Daniloff Nick Paoleta' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/dimitri-daniloff/Dimitri_Daniloff_Archives_Digital_Game.jpg' alt='Dimitri Daniloff Archives Digital Game' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/dimitri-daniloff/Dimitri_Daniloff_Archives_Plugs.jpg' alt='Dimitri Daniloff Archives Plugs' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/dimitri-daniloff/Dimitri_Daniloff_Archives_Pills.jpg' alt='Dimitri Daniloff Archives Pills' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/dimitri-daniloff/Dimitri_Daniloff_Archives_Supermarket.jpg' alt='Dimitri Daniloff Archives Supermarket' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/dimitri-daniloff/dimitri_daniloff_black-eyed-peas_1.jpg' alt='Dimitri Daniloff Archives Black Eyed Peas' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/dimitri-daniloff/horiz-l.jpg' alt='Dimitri Daniloff Archives Horizontal' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/dimitri-daniloff/Shot-04.jpg' alt='Dimitri Daniloff Archives Shot 04' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/dimitri-daniloff/profile.jpg' alt='Dimitri Daniloff Archives' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
            </Slider>
          </div>
          <div className="flex flex-row justify-center items-center mb-28 mt-4 w-full max-w-3xl">
              <button
                className="p-3 text-black border-2 border-black border-r transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                onClick={() => sliderRef?.current?.slickPrev()}
              >
                <FaArrowLeft />
              </button>
              <button
                className="p-3 text-black border-2 border-black border-l transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                onClick={() => sliderRef?.current?.slickNext()}
              >
                <FaArrowRight />
              </button>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(DimitriDaniloff)
