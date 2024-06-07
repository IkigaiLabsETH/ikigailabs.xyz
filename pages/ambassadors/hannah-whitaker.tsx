import React, { FC, useRef } from 'react'
import Head from 'next/head'
import Slider from 'react-slick'

import { AmbassadorHeader } from '../../modules/AmbassadorHeader'
import { Footer } from '../../modules/Footer'
import Image from 'next/image'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { withLayout } from '../../common/layouts'
import { Layout } from '../../common/types'

const name = 'Hannah Whitaker'
const intro = 'Hannah Whitaker, an artist and photographer based in Brooklyn, New York, has become a prominent figure in the international art scene. Her captivating work has been featured in numerous prestigious exhibitions, such as the Henie Onstad Triennial for Photography and New Media in Norway (2020), the Public Art Fund&apos;s citywide exhibition, Foam Talent (2014), and Rencontres d&apos;Arles in France (2012), where she was a nominee for the Discovery Prize. In 2021, Galerie Christophe Gaillard in Paris showed her solo exhibition &quot;Shadow Detail&quot; and simultaneously presented her work at the prestigious Paris Photo Fair. Her publication &quot;Ursula&quot; (2021) further cements her status as a visionary in photographic art.'
const coverImage = '/assets/images/ambassadors/hannah-whitaker/Aperture-anniversary--Hannah-Whitaker.png'

const HannahWhitaker: FC = () => {
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
        <title>Ikigai Labs - Shaped by Photography | Hannah Whitaker</title>
        <meta name="description" content="Shaped by Photography | Hannah Whitaker" />
        <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
      </Head>
      <main className="w-full">
        <AmbassadorHeader name={name} intro={intro} coverImage={coverImage} />
        <div className='bg-white flex flex-col w-full items-center'>
          <div className='p-10 max-w-2xl text-black text-lg'>
            <p>
              A significant element of Whitaker&apos;s oeuvre concerns her reflections on photography&apos;s role in technology. Through her insightful essays and publications, Whitaker explores the complex relationship between photography and truth, particularly in today&apos;s digital age where the distinction between reality and its representation is increasingly blurred. Her work challenges the conventional perception of photographs as mere reflections of reality, pushing the boundaries of photographic meaning.
            </p>
            <p>
              In her compelling exhibition, &quot;Shadow Detail,&quot; Whitaker expands upon themes from her book &quot;Ursula.&quot; The exhibition includes an array of new photographs, a large collaged triptych, a video work, and several sculptural lamps. This body of work continues to explore the sensory potential of silhouettes and patterns, as seen in her previous series. Whitaker ingeniously wraps the human form in reflective tape and aluminum tubing, transforming it into something almost alien. These alterations and her use of bright, monochromatic backgrounds and strategic lighting, create a sense of futuristic isolation.
            </p>
            <p>
              The exhibition&quot;s highlight is the way Whitaker plays with scale, bringing the viewer to a level of equal footing with the figure, yet simultaneously creating a distance from the depicted futuristic world. The shadowy figures, veiled in patterned shadows and sometimes obscured faces, become screens for the disorienting effects of light and props. The still-life components of the exhibition, constructed with the same materials used in the portraits, add another dimension to the work, standing as sentinel-like structures that echo the human form.
            </p>
            <p>
              Whitaker&quot;s first venture into video art in this exhibition is particularly notable. She captures brief episodes featuring the same model used in her photographs, emphasizing the gap between posing and the natural flow of time. This approach extends the moment of a photograph into a narrative in real-time, further exploring the dynamic between stasis and movement, control, and gesture.
            </p>
            <p>
              Additionally, &quot;Tangled,&quot; a three-panel collage in the exhibition, showcases Whitaker&apos;s skill in layering and texture. The collage, with its striking use of black and white stripes and hot pink slashes, centers around a large, cloud-like form made of various textures and patterns. This central tangle is patrolled by silhouettes of Whitaker&apos;s model, adding a sense of absurdity and menace to the composition.
            </p>
          </div>
          <div className='max-w-3xl'>
            <Slider {...settings} ref={sliderRef}>
              <div className='p-5 w-full'>
                  <Image src='/assets/images/ambassadors/hannah-whitaker/Aperture-anniversary--Hannah-Whitaker.png' alt='Hannah Whitaker Aperture Anniversary' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/hannah-whitaker/ok-ok-ok-ok-ok-ok-ok--Hannah-Whitaker.png' alt='Hannah Whitaker OK OK OK OK OK OK OK OK' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/hannah-whitaker/Shadow-detail--Hannah-Whitaker.png' alt='Hannah Whitaker Shadow detail' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/hannah-whitaker/Shadow-detail-by-Hannah-Whitaker-1.png' alt='Hannah Whitaker Shadow detail' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/hannah-whitaker/Shadow-detail-Hannah-Whitaker.png' alt='Hannah Whitaker Shadow detail' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/hannah-whitaker/Tangled--Hannah-Whitaker.png' alt='Hannah Whitaker Tangled' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/hannah-whitaker/Ursula--Hannah-Whitaker.png' alt='Hannah Whitaker Ursula' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/hannah-whitaker/Portrait-Hannah-Whitaker--Matthew-Porter.png' alt='Hannah Whitaker Portrait' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
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

export default withLayout(Layout.main)(HannahWhitaker)
