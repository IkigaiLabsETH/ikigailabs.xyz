import React, { FC, useRef } from 'react'
import Head from 'next/head'
import Slider from 'react-slick'

import { AmbassadorHeader } from '../../modules/AmbassadorHeader'
import { Footer } from '../../modules/Footer'
import Image from 'next/image'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'

const name = 'Cedric Delsaux'
const intro = 'Cédric Delsaux, born in 1974, is a Paris-based artist originally known for his advertising photography. He has since gained international recognition for his long-term series that each time invent unique approaches. His work, inspired by cinema and literature, equally summons the fantastical and the mundane, to make visible the fictional power of images and the phantasmagorical potential of reality. His "Dark Lens" series, a photographic sequence that gradually shifts from "non-places" to urban "hyper-places" inhabited by characters from the Star Wars saga, has achieved global success since 2004.'
const coverImage = '/assets/images/ambassadors/cedric-delsaux/23-Dark-Lens-Origins_DUBAI_Darth_Vader.-2009-copie.jpg'

const CedricDelsaux: FC = () => {
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
        <title>Ikigai Labs - Shaped by Photography | Cedric Delsaux</title>
        <meta name="description" content="Shaped by Photography | Cedric Delsaux" />
        <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
      </Head>
      <main className="w-full">
        <AmbassadorHeader name={name} intro={intro} coverImage={coverImage} />
        <div className='bg-white flex flex-col w-full items-center'>
          <div className='p-10 max-w-2xl text-black text-lg'>
            <p>
              George Lucas himself praised Delsaux&apos;s work, highlighting its uniqueness and the honor it brings to the Star Wars legacy. The success of &quot;Dark Lens&quot; culminated in a book published by Éditions EXB, featuring a preface by Lucas. The series, now known as &quot;Welcome to The Dark Corporation&quot; in 2017, imagines an Earth entirely populated by droids where humans seem to have no place left;
            </p>
            <p>
              In &quot;Dark Lens,&quot; Delsaux offers a unique and intriguing interpretation of Star Wars, integrating its characters and vehicles into stark urban and industrial, yet unmistakably earthbound environments. His images are novel and disruptive yet completely plausible, demonstrating his ability to blend fantasy with reality. This series, showcasing a world where Star Wars mythology and our contemporary surroundings merge, provides a commentary on the increasing encroachment of fictional narratives into real-world landscapes.
            </p>
            <p>
              As highlighted in a New York Times Magazine article by Dana Jennings, Delsaux&apos;s &quot;Dark Lens&quot; series represents more than a tribute to Star Wars; it&apos;s a meditation on the fusion of fiction and reality in our modern world. The images, while surreal, resonate with a profound sense of possibility and familiarity, underscoring the blurred lines between the realms of fantasy and the tangible world. This aspect of Delsaux&apos;s work challenges traditional perceptions of reality, urging viewers to consider the pervasive influence of fictional narratives in shaping our understanding of the environment we inhabit.
            </p>
            <p>
              With A Common Destiny edited in 2009 by Random House Editions with an introduction by Bill McKibben and a special notable support from Robert Redford, Cédric Delsaux explores the hidden face of our modernity.
            </p>
            <p>
              Delsaux has exhibited in numerous galleries, fairs, and institutions like Paris-Photo, Art-Paris, Art-Genève, the Maison Européenne de la Photographie, the BNF François Mitterand in Paris, the National Center of Photography in Greece and Slovakia, and the Museum of Elsewhere in Yverdon, Switzerland. He is progressively expanding into other disciplines, now adding text, drawing and sculptures to his photographs that have already met their fans, his bronze sculptures  being  lastly  collected by  private collectors and Foundations.
            </p>
          </div>
          <div className='max-w-3xl'>
            <Slider {...settings} ref={sliderRef}>
              <div className='p-5 w-full'>
                  <Image src='/assets/images/ambassadors/cedric-delsaux/-Ce-dric-Delsaux---Unberried-Vador-2023---Collection-particulie-re.png' alt='Unberried Vador' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/cedric-delsaux/01-Dark_Lens_Origins_DUBAI_AT-AT_Under_Fog.2009-copie.jpg' alt='Cedric Delsaux Dark Lens Origins' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/cedric-delsaux/02-Dark_Lens_Origins_PARIS_RED_GUARDS.2005-copie.jpg' alt='Cedric Delsaux Dark Lens Origins' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/cedric-delsaux/08-Dark_Lens_Origins_DUBAI_The_Buick.2009-copie.jpg' alt='Cedric Delsaux Dark Lens Origins' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/cedric-delsaux/23-Dark-Lens-Origins_DUBAI_Darth_Vader.-2009-copie.jpg' alt='Cedric Delsaux Dark Lens Origins' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/cedric-delsaux/A-common-destiny-by-Ce-dric-Delsaux.png' alt='Cedric Delsaux A common destiny' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/cedric-delsaux/A-Common-Destiny-Ce-dric-Delsaux.png' alt='Cedric Delsaux A common destiny' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/cedric-delsaux/profile.jpg' alt='Cedric Delsaux' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
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

export default CedricDelsaux
