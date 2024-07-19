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
        <h1 className="text-[2rem] md:text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska break-words">
          About
        </h1>
        <h2 className="mt-20">Empowering Creators</h2>
        <p>
          At Ikigai Labs, we believe that every artist deserves a platform where their creativity can thrive without
          boundaries. Our mission goes beyond simple curation; we empower creators by integrating cutting-edge
          blockchain technology to distribute and display their art securely on-chain. With the support of Transient
          Labs, we craft customized smart contracts, ensuring each piece remains as unique and authentic as the vision
          behind it. Here, artists find their ikigai—a convergence of passion, innovation, and technology.
        </p>

        <h2 className="mt-20">Innovative Curation</h2>
        <p>
          Curation at Ikigai Labs is a transformative experience. Our curators are more than selectors; they are the
          architects of an ever-evolving art ecosystem. By incorporating insights and expertise, they continually infuse
          our galleries with groundbreaking collections that inspire and captivate. Utilizing our advanced aggregator
          app, curators can seamlessly exhibit artworks from over 150 multi-chain marketplaces, offering a cohesive and
          immersive discovery experience. Curatorship goes beyond selection; it&apos;s about creating meaningful narratives
          and experiences. We focus on the context and story behind each artwork, connecting it to the community and
          broader cultural dialogues. This approach combats collector fatigue by offering fresh and impactful
          experiences that transcend the digital marketplace.
        </p>

        <h2 className="mt-20">Dynamic Collecting</h2>
        <p>
          We recognize collectors as the lifeblood of the art world. At Ikigai Labs, we extend beyond traditional
          collecting by creating a meticulously curated environment filled with extraordinary digital art and immersive
          metaverse experiences. Our partnership with Fairmint introduces an innovative equity tokenization model,
          allowing collectors to own a part of Ikigai Labs. This deepens their involvement, fostering a vibrant
          community of passionate art enthusiasts.
        </p>

        <h2 className="mt-20">Revolutionizing Authenticity with TRACE</h2>
        <p>
          Authenticity and provenance are paramount in the digital art space. Our T.R.A.C.E. (Transparent, Reliable,
          Authentic, Certified, and Encrypted) system revolutionizes this aspect by embedding secure chips in artworks,
          paired with digital certificates of authenticity. This advanced technology, developed by Transient Labs,
          guarantees the integrity and value of every piece on our platform.
        </p>
        <h2 className="mt-20">Our Vision</h2>
        <p>
          Inspired by the Japanese concept of &apos;ikigai&apos;, which represents the balance of passion, talent, societal
          contribution, and livelihood, Ikigai Labs aims to create a sustainable ecosystem that nurtures this harmony.
          Our vision transcends digital spaces, extending into real-world artist residencies that blend technology and
          creativity. We are committed to fostering a community where art and innovation intersect, creating lasting
          value for creators, curators, and collectors.
        </p>
        <h2 className="mt-20">Join us</h2>
        <p>
          Whether you are an artist looking to share your unique vision, a curator seeking to influence the art
          landscape, or a collector passionate about digital art, we provide the tools, technology, and community to
          help you find your ikigai.
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
