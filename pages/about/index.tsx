/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import React, { FC } from 'react'

import { withLayout } from '../../common/layouts'
import { Layout } from '../../common/types'
import { Footer } from '../../modules/Footer'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '../../common/constants'
import { Ambassadors } from '../../modules/Ambassadors'

const siteTitle = `${SITE_TITLE} | About`
const url = `${SITE_URL}/about`

const About: FC = () => (
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
      <meta property="og:image" content={SITE_LOGO_PATH} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content={SITE_LOGO_PATH} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={SITE_DESCRIPTION} />
      <meta property="twitter:image" content={SITE_LOGO_PATH} />
    </Head>
    <main className="max-w-screen-2xl w-full">
      <div className="flex relative flex-col text-lg mt-48 max-w-3xl mx-auto p-8">
        <h1 className="text-[3rem] md:text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska break-words">
          About
        </h1>
        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">Empowering Creators</h2>
        <p>
         At Ikigai Labs, we believe that every creator deserves a platform where their ideas can flourish. 
         But it’s not just about showcasing works; it’s about empowering creators to tap into the full potential of AI-driven agents. 
         Therefore, we integrate cutting-edge technology and intuitive interfaces that give artists, curators, 
         and collectors direct access to specialized AI agents capable of assisting with ideation, research, curation, and audience engagement. 
         These agents are not tools but collaborators—constantly evolving entities that adapt to your goals and help you find your ikigai.
        </p>

        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">Innovative Curation</h2>
        <p>
         Curation at Ikigai Labs transcends passive selection. But curators face an endless stream of options and potential directions, 
         therefore we equip them with advanced AI agents that process massive datasets, offering meaningful insights and patterns. 
         This goes beyond filtering; it’s about shaping each collection into a narrative-driven experience. 
         Our AI agents empower curators to craft cohesive, context-rich galleries and exhibitions that resonate across multiple chains, marketplaces, and cultural dialogues. 
         By harnessing their unique capabilities, we ensure that each exhibition not only combats collector fatigue but also continuously inspires fresh perspectives and deeper engagements.
        </p>

        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">Dynamic Collecting</h2>
        <p>
         Collectors today crave more than static pieces—they seek rich, evolving stories. 
         But traditional collecting can feel disconnected, therefore we integrate agents trained to guide collectors 
         through immersive metaverse experiences, and portfolio optimization. 
         These agents streamline decision-making and recommend artworks that align with personal aesthetic sensibilities, 
         investment goals, and long-term engagement strategies. It’s about forging a deeper connection, 
         transforming the act of collecting into a dynamic relationship that grows, evolves, and adds meaning over time.
        </p>

        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">Authenticity with TRACE</h2>
        <p>
          Authenticity and provenance are paramount in the digital art space. Our T.R.A.C.E. (Transparent, Reliable,
          Authentic, Certified, and Encrypted) system revolutionizes this aspect by embedding secure chips in artworks,
          paired with digital certificates of authenticity. This advanced technology, developed by Transient Labs,
          guarantees the integrity and value of every piece on our platform.
        </p>
        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">Our Vision</h2>
        <p>
         Our approach is anchored in the Japanese philosophy of ‘ikigai,’ where passion, purpose, and innovation converge. 
         But achieving true balance requires constant evolution, therefore our AI agents continuously adapt and improve, 
         guided by user feedback, new market insights, and cultural shifts.
        </p>
        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">Join us</h2>
        <p>
         At Ikigai Labs, you’re not just engaging with tools; you’re co-creating the future of art and digital identity alongside a vibrant ecosystem of AI-driven collaborators. 
         Whether you’re a creator seeking new mediums of expression, a curator shaping meaningful narratives, or a collector investing in transformative art experiences, 
         our AI agents are here to guide, inspire, and elevate. The doors of Ikigai Labs are open—step in, collaborate, and discover your ikigai in this new era of boundless artistic innovation.
        </p>
      </div>
      <div className="max-w-screen-2xl flex items-center justify-center self-center mx-auto">
        <Ambassadors />
      </div>
    </main>
    <Footer />
  </div>
)

export default withLayout(Layout.main)(About)
