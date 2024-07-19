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

const name = 'Joris Bacquet'
const intro =
  'Joris Bacquet, a multifaceted visual artist, has established himself as a trailblazer in digital art, particularly through his innovative use of artificial intelligence. His obvious pleasure in revisiting human nature in a close futuristic exploration draws new lines.'
const coverImage = '/assets/images/ambassadors/joris-bacquet/joris-bacquet.png'

const JorisBacquet: FC = () => {
  const { asPath } = useRouter()
  const sliderRef = useRef(null)
  const settings = {
    dots: false,
    className: 'center',
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
        <div className="bg-white flex flex-col w-full items-center">
          <div className="p-10 max-w-2xl text-black text-lg">
            <p>
              Joris Bacquet, a multifaceted visual artist, has established himself as a trailblazer in digital art,
              particularly through his innovative use of artificial intelligence. His obvious pleasure in revisiting
              human nature in a close futuristic exploration draws new lines.
            </p>
            <p>
              For Bacquet, AI is a medium that pushes the boundaries of visual, creative, and narrative expression. His
              approach, favoring visual research and experimentation, redefines the boundaries of art, demonstrating the
              transformative potential of AI in the hands of a visionary artist.
            </p>
            <p>
              Bacquet&apos;s work reshapes our understanding of artistic possibilities, marking a new era in digital
              artistry.
            </p>
            <p>
              The starting point of the series called ANNA LOG was to mix older analogic technologies like oscilloscope
              variations with AI to express the fact that technology is part of our daily life since the 70&apos;s.
              Playing with body distortions or alter the reality in a creative way is not new, just visually the way
              technology interfere in our life is different but not the process by itself.
            </p>
            <h4>ANA LOG</h4>
            <p>
              Inspired by the Joker costume from renaissance days, Bacquet then started thinking about how he can make
              it contemporary by putting it more into the sportswear and fashion look & feel.
            </p>
            <h4>JOKER</h4>
            <p>
              The very energetic series WE FLY HIGH shows his fascination for fashion inspired by the eponymous title
              from Jim Jones where our AI artist imagines strong looks here again mixed with codes coming from sportive
              codes.
            </p>
            <p>
              Enrooted in film direction, his latest film DEDALE updates a mythological fable and invites in a cinematic
              rather dark world where God is a sun and Icarus doesn&apos;t dream anymore...
            </p>
            <h4>DEDALE</h4>
            <p>
              Baquet&apos;s artistic versatility is further highlighted through his collaborations with luxury brands
              like Issey Miyake and Dior, and his AI-assisted narrative music video « INFINITY », the very first music
              video using AI in a narrative way with the artist Azelphara which received accolades at the Berlin
              Commercial awards. This work prompts viewers to ponder the role of the &apos;creator&apos; in the era of
              advanced technologies.
            </p>
          </div>
          <div className="max-w-3xl">
            <Slider {...settings} ref={sliderRef}>
              <div className="p-5 w-full">
                <Image
                  src="/assets/images/ambassadors/joris-bacquet/joris-bacquet-1.png"
                  alt="Joris Bacquet"
                  width={500}
                  height={500}
                  className="m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>
              <div className="p-5 w-full">
                <Image
                  src="/assets/images/ambassadors/joris-bacquet/joris-bacquet-2.png"
                  alt="Joris Bacquet"
                  width={500}
                  height={500}
                  className="m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>
              <div className="p-5 w-full">
                <Image
                  src="/assets/images/ambassadors/joris-bacquet/joris-bacquet-3.png"
                  alt="Joris Bacquet"
                  width={500}
                  height={500}
                  className="m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>
              <div className="p-5 w-full">
                <Image
                  src="/assets/images/ambassadors/joris-bacquet/joris-bacquet-4.png"
                  alt="Joris Bacquet"
                  width={500}
                  height={500}
                  className="m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>
              <div className="p-5 w-full">
                <Image
                  src="/assets/images/ambassadors/joris-bacquet/joris-bacquet-5.png"
                  alt="Joris Bacquet"
                  width={500}
                  height={500}
                  className="m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>
              <div className="p-5 w-full">
                <Image
                  src="/assets/images/ambassadors/joris-bacquet/joris-bacquet-6.png"
                  alt="Joris Bacquet"
                  width={500}
                  height={500}
                  className="m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>
              <div className="p-5 w-full">
                <Image
                  src="/assets/images/ambassadors/joris-bacquet/joris-bacquet-7.png"
                  alt="Joris Bacquet"
                  width={500}
                  height={500}
                  className="m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>
              <div className="p-5 w-full">
                <Image
                  src="/assets/images/ambassadors/joris-bacquet/joris-bacquet-8.png"
                  alt="Joris Bacquet"
                  width={500}
                  height={500}
                  className="m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>
              <div className='p-5 w-full'>
              <iframe src="https://player.vimeo.com/video/729139875?h=405ada5ec0&color=ffffff&title=0&byline=0&portrait=0" width="500" height="209" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
              <p><a href="https://vimeo.com/729139875">Azel Phara &nbsp;&quot;Infinity&quot;  | Joris Bacquet</a> from <a href="https://vimeo.com/tothemoonandback">to the moon and back</a> on <a href="https://vimeo.com">Vimeo</a>.</p>
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

export default withLayout(Layout.main)(JorisBacquet)
