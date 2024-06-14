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

const name = 'Ryan Hopkinson'
const intro = 'After assisting various photographers in London and receiving guidance from seasoned mentors, Hopkinson has carved out a style that harmoniously bridges the worlds of art and commerce. His collaborations with esteemed brands such as Issey Miyake, Louis Vuitton and Craig Green have each provided a platform to fully express his creative vision, whilst the London Philharmonic and Saudi Arabia’s art institute have given him the platform to showcase creative interpretations of sound, landscapes and color through unique photographic techniques.'
const coverImage = '/assets/images/ambassadors/ryan-hopkinson/-Refusing-to-be-still--Exhibition-in-Jeddah-Museum-by-Ryan-Hopkins.jpg'

const RyanHopkinson: FC = () => {
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
              His work for Louis Vuitton, for instance, showcases his skill in employing experimental techniques to highlight the brand&amp;s products. One campaign, inspired by the idea of reaching a higher plane both conceptually and physically, involved the use of a large drones to lift Louis Vuitton&amp;s iconic luggage into the air, introducing movement into a typically static setting.
            </p>
            <p>
              One of his notable personal projects, &quot;Stroke,&quot; in collaboration with set designer Andrew Stellitano, reimagines the artistic potential of a single paint stroke, transforming it into a sculptural masterpiece.
            </p>
            <p>
              Whilst &quot;Midsommar&quot; further exemplifies Hopkinson&apos;s flair for blending unnatural, hyper-real colors with natural landscapes, creating otherworldly formations.
            </p>
            <p>
              A multiple award-winner, including at the Cannes Lions International Festival of Creativity, D&AD Awards, and Young Guns ADC Awards, Ryan Hopkinson continues to push the boundaries of photography through all possible mediums. His method, adeptly blending live-action photography, digital techniques and technical camera work, results in works of unmatched richness and originality.
            </p>
            <p>
              In his exploration of time perception, his collaboration with United Visual Artists in &quot;Illuminating Time&quot; reveals his knack for depicting temporary installations that alter the viewer&apos;s reality perception. Through his lens, Hopkinson invites us to rethink our understanding of the world, one snapshot at a time.
            </p>
            <p>
              Ryan Hopkinson&apos;s photographic artistry is not just about capturing moments; it&apos;s about creating a realm where art, technology, and imagination converge through all forms of digital and traditional mediums. Inviting viewers to step into an ever-changing world of scale, form and sculpture that&apos;s portrayed through a redefined and modern lens.
            </p>
          </div>
          <div className='max-w-3xl'>
            <Slider {...settings} ref={sliderRef}>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/ryan-hopkinson/-Refusing-to-be-still--Exhibition-in-Jeddah-Museum-by-Ryan-Hopkins.jpg' alt='Ryan Hopkinson Refusing to be still' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                  <Image src='/assets/images/ambassadors/ryan-hopkinson/Louis-Vuitton-magazine-by-Ryan-Hopkinson.jpg' alt='Ryan Hopkinson Luis Vuitton magazine' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/ryan-hopkinson/Midsommar-by-Ryan-Hopkinson-1.jpg' alt='Ryan Hopkinson Midsommar 1' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/ryan-hopkinson/Midsommar-by-Ryan-Hopkinson-2.jpg' alt='Ryan Hopkinson Midsommar 2' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/ryan-hopkinson/Nature-Interrupted-by-Ryan-Hopkinson.jpg' alt='Ryan Hopkinson Nature Interrupted' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/ryan-hopkinson/Stroke-by-Ryan-Hopkinson.jpg' alt='Ryan Hopkinson Stroke' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/ryan-hopkinson/Universalis-by-Ryan-Hopkinson.jpg' alt='Ryan Hopkinson Universalis' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
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

export default withLayout(Layout.main)(RyanHopkinson)
