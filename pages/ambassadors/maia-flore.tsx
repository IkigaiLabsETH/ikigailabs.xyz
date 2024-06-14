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

const name = 'Maia Flore'
const intro = 'Maia Flore transforms the mundane into the extraordinary through the lens of her camera. Her artistry lies in staging improbable, poetic, and metaphorical scenes, often using herself as not just a model, but an active subject in her own surreal narratives.'
const coverImage = '/assets/images/ambassadors/maia-flore/Maia-Flore---Cover-Image.png'

const MaiaFlore: FC = () => {
  const { asPath } = useRouter()
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
  const url = `${SITE_URL}${asPath}`

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
              Her signature series &quot;Sleep Elevations&quot; exemplifies this philosophy. Here, Maia, often the subject herself, appears to float in serene, minimalist settings, amidst everyday objects rendered fantastical. This juxtaposition of the simple and surreal weaves a dreamlike tapestry, a delicate yet profound visual poetry, further accentuated by pastel hues and soft lighting. These images invite viewers into a world unbound by gravity, where imagination is sovereign.
            </p>
            <p>
              In &quot;Situations,&quot; Flore delves into the delicate interplay between freedom and environment, capturing a young girl in a striking red costume navigating uncharted landscapes. This series dances on the edge of reality and imagination, exploring emotional ambiguity as a canvas for creative exploration.
            </p>
            <p>
              Her HSBC Prize-winning series, &quot;Rememories&quot; (2015), moves away from stark reality, favoring metaphorical and poetic imagery. Here, her distinctive red hair and pale skin blend seamlessly with her surroundings, creating a dynamic interplay of form and space.
            </p>
            <p>
              With &quot;Voyage Fantastique,&quot; commissioned by Atout France, Maia reimagines France&apos;s cultural heritage. This series transcends mere photographic journey, reenchanting the narrative of heritage, history, and art. Through her lens, castles, museums, and landscapes transform into stages for her imaginative tales, intertwining the absurd with the mystical.
            </p>
            <p>
              Marking a significant evolution in her artistry, Flore has shifted from digital manipulation to choreographed performance, emphasizing physicality and space. This is evident in her recent works, &quot;By the Sea&quot; and &quot;Scenes from the Sun,&quot; where the landscape itself becomes an integral character in her storytelling.
            </p>
            <p>
              &quot;D&apos;Iles en Lune&quot; (2019/2020), created during a residency in Saint Malo, beautifully extends Flore&apos;s exploration of the tangible and ethereal. Here, she harmonizes with the rhythm of the world&apos;s highest tides, allowing the sun and moon to guide her art. This series, symbolizing the balance between masculine (&apos;Îl&apos;) and feminine (&apos;Lune&apos;) energies, perfectly aligns with her themes of blending dreams and reality.
            </p>
            <p>
              Maia Flore&apos;s photography is more than a mere collection of images; it is an odyssey through a visionary&apos;s mind, constantly challenging and blurring the lines between the real and the imagined. Each series is a chapter in her ongoing narrative of exploration and discovery, inviting viewers to immerse themselves in the beauty and complexity of her dreamscapes.
            </p>
          </div>
          <div className='max-w-3xl'>
            <Slider {...settings} ref={sliderRef}>
              <div className='p-5 w-full'>
                  <Image src='/assets/images/ambassadors/maia-flore/Maia-Flore---Cover-Image.png' alt='Maia Flore' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/maia-flore/Maia-Flore---By-The-Sea.png' alt='Maia Flore By the sea' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/maia-flore/Maia-Flore---D-iles-en-Lune-II.png' alt='Maia Flore D&apos;iles en Lune II' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/maia-flore/Maia-Flore---D-iles-en-Lune.png' alt='Maia Flore D&apos;iles en Lune' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/maia-flore/Maia-Flore---D-iles-en-Lune-III.png' alt='Maia Flore D&apos;iles en Lune III' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/maia-flore/Maia-Flore---Rememories.png' alt='Maia Flore Rememories' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/maia-flore/Maia-Flore---Scenes-from-the-sun.png' alt='Maia Flore Scenes from the sun' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/maia-flore/Maia-Flore---Self-Portrait.png' alt='Maia Flore Self portrait' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/maia-flore/Maia-Flore---Situations.png' alt='Maia Flore Situations' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/maia-flore/Maia-Flore---Sleep-Elevations.png' alt='Maia Flore Sleep Elevations' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/maia-flore/Maia-Flore---Voyage-Fantastique.png' alt='Maia Flore Voyage Fantastique' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
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

export default withLayout(Layout.main)(MaiaFlore)
