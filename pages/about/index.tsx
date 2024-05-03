/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import React, { FC } from 'react'

import { withLayout } from '../../common/layouts'
import { Layout } from '../../common/types'
import { Footer } from '../../modules/Footer'
import Image from 'next/image'

const About: FC = () => (
  <div className="flex items-center flex-col">
    <Head>
      <title>Ikigai Labs - Shaped by Photography | About</title>
      <meta name="description" content="Shaped by Photography | About" />
      <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
    </Head>
    <main className="max-w-screen-2xl w-full">
      <div className="flex relative flex-col text-lg my-48 max-w-3xl mx-auto p-8">
        <h1 className="text-[2rem] md:text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska break-words">
          About
        </h1>
        <div className="bg-black p-8 mt-8 mb-16 boska md:-translate-x-40">
          <div className="text-[2rem] md:text-[3.5rem] text-white font-bold p-4 mb-2 leading-8 md:leading-10">
            Ikigai Labs XYZ
          </div>
          <div className="p-4 md:pl-20 text-white font-bold text-2xl md:text-[2rem] leading-8 md:leading-10">
            The quintessential destination for exquisite digital artifacts.
          </div>
        </div>

        <Image
          src="/assets/images/about-1.png"
          alt="Ikigai Labs - Create"
          width={1920}
          height={1080}
          className="border-black border-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        />
        <h2 className="mt-20">Create</h2>
        <p>
          At the heart of Ikigai Labs lies our commitment to exceptional creators. We not only curate but also empower
          artists by facilitating the onchain distribution and display of their art. Our collaboration with Transient
          Labs equips creators with tailored smart contracts, ensuring their art remains as unique and authentic as
          their vision. Here, artists don&apos;t just showcase their work; they find a pathway to their
          &quote;ikigai&quote; - a place where passion, creativity, and technology converge.
        </p>
        <Image
          src="/assets/images/about-2.png"
          alt="Ikigai Labs - Curate"
          width={1920}
          height={1080}
          className="border-black border-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        />
        <h2 className="mt-20">Curate</h2>
        <p>
          Curators play a pivotal role at Ikigai Labs, where curation transcends selection and becomes an art in itself.
          Our curators contribute to a living, breathing art ecosystem to continuously enrich our galleries with iconic
          collections. Their expertise and insight help shape the landscape of our platform, ensuring a consistently
          fresh and inspiring experience for all who visit. Our aggregator app allows curators to exhibit artworks from
          across all the major marketplaces.
        </p>
        <Image
          src="/assets/images/about-3.png"
          alt="Ikigai Labs - Collect"
          width={1920}
          height={1080}
          className="border-black border-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        />
        <h2 className="mt-20">Collect</h2>
        <p>
          At Ikigai Labs, we recognize collectors as the vital heartbeat of the art world. Our dedication to them goes
          beyond traditional appreciation; we offer a uniquely curated haven of extraordinary digital art, extending
          into the immersive realms of the metaverse. Leveraging our equity tokenization with Fairmint, collectors gain
          a unique opportunity to own a part of Ikigai Labs, deepening their involvement.
        </p>
        <Image
          src="/assets/images/about-4.png"
          alt="Ikigai Labs - Vision"
          width={1920}
          height={1080}
          className="border-black border-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        />
        <h2 className="mt-20">Vision</h2>
        <p>
          Ikigai Labs embodies the Japanese concept of &quot;ikigai&quot; representing a harmonious balance of passion,
          talent, societal contribution, and livelihood. Our mission is to create a sustainable ecosystem that nurtures
          this balance, extending our vision beyond digital spaces to tangible, real-world artist residencies.
        </p>
        <p className="font-bold">
          Acting as a crucial bridge, LiveTheLife.TV connects the creative pursuits at Ikigai Labs with insights,
          narratives, and viewpoints, enriching our understanding of the intertwining worlds of digital art and
          blockchain technology. This platform is a haven for those driven by curiosity and vision, creating a nexus
          where artistic exploration meets the multifaceted dynamics of contemporary web3 culture.
        </p>
      </div>
    </main>
    <Footer />
  </div>
)

export default withLayout(Layout.main)(About)
