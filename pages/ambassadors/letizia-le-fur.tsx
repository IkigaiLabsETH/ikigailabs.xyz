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

const name = 'Letizia Le Fur'
const intro = 'Letizia Le Fur, an alumnus of the prestigious École des Beaux-Arts in France, embarked on her creative journey as a painter, graduating in 1998. Her artistic trajectory took a pivotal turn under the mentorship of Valérie Belin, an influential artist and teacher, who steered her towards the realm of photography. This transition marked the genesis of an aesthetic quest that blends the fluidity of painting with the precision of photography.'
const coverImage = '/assets/images/ambassadors/letizia-le-fur/Mythologies-by-Letizia-Le-Fur.png'

const LetiziaLeFur: FC = () => {
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
              In the sphere of photography, Le Fur has achieved notable accolades. She was a nominee for the esteemed Niepce Prize in 2022, a testament to her prowess in the photographic arts.
            </p>
            <p>
              Her mastery has also been recognized through several awards, including the Leica/Alpine Prize in 2019 and the BNF&apos;s Grande Commande Photographique in 2022.
            </p>
            <p>
              Further cementing her status in the art world, she received the &quot;Fenêtres Ouvertes&quot; Prize by the MEP in 2020 and has been selected for prestigious residencies at the Planches Contact festival in Deauville (2020), the InCadaquésfestival (2021), and the Festival Portrait(s) in Vichy (2023), with a future residency lined up with the BNP Foundation in 2024.
            </p>
            <p>
              Le Fur&apos;s work has graced numerous solo and group exhibitions, showcasing her ability to encapsulate beauty and a fantasized otherworld. Influenced by Greek mythology, her photography is not just a capture of moments but a reflection on humanity&apos;s place in a primordial world. Her unique perspective is further illustrated in her publications, &quot;Mythologies - Chap. I & II&quot; (2021) and &quot;Mythologies - Chap. III&quot; (2022), which explores mythological themes through a contemporary lens.
            </p>
            <p>
              Her approach to color and light is reminiscent of her roots in painting. With a palette that extends beyond the conventional, Le Fur transforms, isolates, and amplifies tones to transcend reality. This process creates an ethereal world, suspended between fantasy and dream. Her quest for harmony and beauty, akin to a cult-like devotion, stands in stark opposition to ugliness and inappropriateness, breaking free from prevailing norms to achieve a form of artistic liberation.
            </p>
            <p>
              Alongside her personal projects, Le Fur&apos;s talent extends to collaborations in advertising and the press, working with illustrious brands such as Belmond, Air France, Ruinart, and Chanel, and contributing to publications like AD, The New York Times, and Grazia. As a Leica ambassador since 2019, she continues to showcase her commitment to quality and excellence in the field of photography.
            </p>
            <p>
              Currently, Letizia Le Fur is preparing for her next solo exhibition at the French Institute in Madrid, an event that promises to be a confluence of her journey in art and photography, showcasing her unique ability to blend these mediums into a distinctive visual language. Her work, transcending the barriers between art forms, invites viewers into a world where myth, beauty, and imagination meld seamlessly.
            </p>
            <p>
              By the end of 2023, She has  been the  proud recipient of the&quot; Paris Je t&apos;aime x Photodays&quot; Prize, a testament to her innovative approach to capturing the essence of Paris through « Small games » in echo to the Olympic Games  that will be exhibited by the end of the year 2024.
            </p>
          </div>
          <div className='max-w-3xl'>
            <Slider {...settings} ref={sliderRef}>
              <div className='p-5 w-full'>
                  <Image src='/assets/images/ambassadors/letizia-le-fur/Mythologies-by-Letizia-Le-Fur.png' alt='Letizia Le Fur Mythologies' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/letizia-le-fur/Mythologies---Les-Me-tamorphoses-by-Letizia-Le-Fur.png' alt='Letizia Le Fur Mythologies' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/letizia-le-fur/Mythologies---Les-Me-tamorphoses-3-by-Letizia-Le-Fur.png' alt='Letizia Le Fur Mythologies' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/letizia-le-fur/Mythologies---Les-Me-tamorphoses-2-by-Letizia-Le-Fur.png' alt='Letizia Le Fur Mythologies' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/letizia-le-fur/De-colorisation---Art-project-by-Letizia-Le-Fur.png' alt='Letizia Le Fur De-colorisation' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/letizia-le-fur/-Leica-Alpine-Prize-by-Letizia-Le-Fur-.png' alt='Letizia Le Fur Leica Alping Prize' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/letizia-le-fur/-I-don-t-have-much-time-left-she-says----Personal-project--Letizia-Le-Fur.png' alt='Letizia Le Fur I don&apos;t have much time left, she says' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/letizia-le-fur/-I-don-t-have-much-time-left-she-says----2-Personal-Project-by-Letizia-Le-Fur-1.png' alt='Letizia Le Fur I don&apos;t have much time left, she says' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
              </div>
              <div className='p-5 w-full'>
                <Image src='/assets/images/ambassadors/letizia-le-fur/-22Fene-tres-Ouvertes-22-Prize----MEP--2020-by-Letizia-Le-Fur.png' alt='Letizia Le Fur Fene tres Ouvertes' width={500} height={500} className='m-auto border-2 border-black border-r shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'/>
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

export default withLayout(Layout.main)(LetiziaLeFur)
