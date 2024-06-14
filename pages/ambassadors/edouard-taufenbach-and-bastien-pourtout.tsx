import React, { FC, useRef } from 'react'
import Head from 'next/head'
import Slider from 'react-slick'

import { AmbassadorHeader } from '../../modules/AmbassadorHeader'
import { Footer } from '../../modules/Footer'
import Image from 'next/image'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { withLayout } from '../../common/layouts'
import { Layout } from '../../common/types'
import { useRouter } from 'next/router'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '../../common/constants'

const name = 'Edouard Taufenbach and Bastien Pourtout'
const intro = 'Edouard Taufenbach and Bastien Pourtout stands as a testament to the transformative power of art when fused with technology. His illustrious career, spanning over more than two decades, is a journey that transcends the realms of traditional photography, venturing into the innovative frontiers of digital artistry.'
const coverImage = '/assets/images/ambassadors/edouard-taufenbach-and-bastien-pourtout/profile.png'

const EdouardTaufenbachAndBastienPourtout: FC = () => {
  const { pathname } = useRouter()
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

  const siteTitle = `${SITE_TITLE} | Meet ${name}`
  const url = `${SITE_URL}${pathname}`

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_LOGO_PATH} />

        <meta name="title" content={siteTitle} />
        <meta name="description" content={SITE_DESCRIPTION} />
  
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={coverImage} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content={coverImage} />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={siteTitle} />
        <meta property="twitter:description" content={SITE_DESCRIPTION} />
        <meta property="twitter:image" content={coverImage} />
      </Head>
      <main className="w-full">
        <AmbassadorHeader name={name} intro={intro} coverImage={coverImage} />
        <div className='bg-white flex flex-col w-full items-center'>
          <div className='p-10 max-w-2xl text-black text-lg'>
            <p>
              Edouard Taufenbach and Bastien Pourtout are an acclaimed French artistic duo known for their innovative and evocative visual narratives. Taufenbach, holding a Master in Arts and Digital Media from Paris I - Panthéon Sorbonne, and Pourtout, with a Master in Photography and Contemporary Art from Paris VIII, have been collaboratively exploring the boundaries of photography since their first joint project exhibited at Paris Photo &quot;Spéculaire,&quot; in 2018.
            </p>
            <p>
              Their residency at the Villa Médicis in Rome marked a pivotal point in their careers. It was here, during the creation of &quot;Le bleu du ciel,&quot; that they explored the themes of freedom and creativity, capturing the swift flight of swallows in a series of checkered patterns. 
            </p>
            <p>
              This project, supported by the Swiss Life Foundation, was not only a critical success but also led to their works being featured in the collection of the Cité de la Musique at the Philharmonie de Paris and the Neuflize OBC fondation. 
            </p>
            <p>
              Furthermore, their notable publications, such as &quot;Obsession Dietrich&quot; by Éditions de L&apos;Artiere, &quot;Cinémode&quot; by Jean-Paul Gaultier, Flammarion, and &quot;The Age of Collage 3&quot; by Gestalten, reflect their presence in renowned art circles.
            </p>
            <p>
              &quot;When the sky is full of swallows, it&apos;s a hypnotic aerial dance, and we&apos;ve used optical effects to recreate the incredible aerobatics and music of these birds&apos; flight&quot;
            </p>
            <p>
              In 2022, Taufenbach and Pourtout showcased their unique vision through the &quot;OBSESSION DIETRICH&quot; exhibition, held in collaboration with Pierre Passebon. This project featured innovative photomontages derived from Marlene Dietrich&apos;s photographs, reflecting on the themes of time, immobility, and the multifaceted nature of her persona. Their technique, reminiscent of the chronophotography of Étienne-Jules Marey and the stroboscopic effects used by Harold Edgerton or Gjon Mili, demonstrates their ability to renew photographic tradition through modern digital means.
            </p>
            <p>
              In 2023, their project &quot;LE JARDIN QUI BASCULE&quot; - was exhibited at Galerie C in Paris. This exhibition, a metaphorical reflection of their collaborative space, showcases their unique method of creating art—a blend of protocols, games, and an exchange of images that evolve organically rather than being preconceived. Selected works from this project were chosen for the Photo Biennale in Daegu, Korea, further cementing their international recognition.
            </p>
            <p>
              Finally, &quot;Swinging Gardens&quot; was created as the digital extension of this project through a collection of NFTs.
            </p>
            <p>
              Their work is characterized by a deep understanding of the photographic medium, both in its historical context and contemporary possibilities. Taufenbach and Pourtout&quot;s methodical yet playful approach to art-making, combined with prestigious recognitions like the Villa Médicis residency, positions them as significant contemporary artists whose work resonates with a global audience. Their ability to transform everyday moments into profound visual experiences marks them as innovators in the field of contemporary photography.
            </p>
            <p>
              The creation of the duo is an infinite conversation; with LES GLANEURS where the hand is at the heart of their photographic dialogue where they compose repertoires of shapes, like alphabets — intimate choreographies of private signs in a square format  frame.
            </p>
          </div>
          <div className='max-w-3xl'>
            <Slider {...settings} ref={sliderRef}>
              <div className='p-5 w-full'>
                  <Image src='/assets/images/ambassadors/edouard-taufenbach-and-bastien-pourtout/Edouard-Taufenbach-and-Bastien-Pourtout.png' alt='Edouard Taufenbach and Bastien Pourtout' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/edouard-taufenbach-and-bastien-pourtout/Le-bleu-du-ciel-By-Edouard-Taufenbach-and-Bastien-Pourtout--1.png' alt='Edouard Taufenbach and Bastien Pourtout Le bleu du ciel' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/edouard-taufenbach-and-bastien-pourtout/Obsession-Dietrich-2-.png' alt='Edouard Taufenbach and Bastien Pourtout Obsession Dietrich' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/edouard-taufenbach-and-bastien-pourtout/Obsession-Dietrich.png' alt='Edouard Taufenbach and Bastien Pourtout Dietrich' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/edouard-taufenbach-and-bastien-pourtout/Self-portrait.png' alt='Edouard Taufenbach and Bastien Pourtout Self portrait' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/edouard-taufenbach-and-bastien-pourtout/Spe-culaire-By-Edouard-Taufenbach-and-Bastien-Pourtout--1.png' alt='Edouard Taufenbach and Bastien Pourtout Archives Spe culaire' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
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

export default withLayout(Layout.main)(EdouardTaufenbachAndBastienPourtout)
