/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import React, { FC } from 'react'

import { withLayout } from '../../common/layouts/MainLayout/withLayout'
import { Layout } from '../../common/types'
import { Footer } from '../../modules/Footer'

const About: FC = () => (
  <div className="flex items-center flex-col">
    <Head>
      <title>Ikigai Labs - Shaped by Photography | About</title>
      <meta name="description" content="Shaped by Photography | About" />
      <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
    </Head>
    <main className="max-w-screen-2xl w-full">
      <div className="flex relative flex-col text-lg my-48 max-w-3xl mx-auto p-8">
        <h1 className="text-[4rem] lg:text-[6rem] leading-none font-bold mb-4 tracking-tight boska">About</h1>

        <p>
          Ikigai Labs is a visionary platform that aims to revolutionize the world of photography and
          photogrammetry-based NFTs. With a strong emphasis on quality over quantity, this community-driven platform
          brings together award-winning and relevant photographers to curate a collection like no other. It&apos;s not
          just about art; it&apos;s about creating a space where creators and art enthusiasts can engage in open
          conversations, explore markets, and immerse themselves in life-changing experiences.
        </p>
        <p>
          The mission of Ikigai Labs goes beyond financial success; it&apos;s about enhancing the lives of artists and
          nurturing the sensibilities of art lovers. Through treasury funding, the platform collaborates with artists to
          commission exclusive mints under the Ikigai Labs Mint Pass. This is a bold and powerful initiative that brings
          together individuals who share a passion for food, wine, art, and technology, fostering a sense of community
          and freedom.
        </p>
        <p>
          Ikigai Labs takes a comprehensive approach, guiding and supporting artists throughout the entire process of
          creating NFTs that match the quality of their physical artworks. From setting up onchain art galleries on the
          website to displaying works in the metaverse or even in tangible reality, the platform bids a range of
          possibilities. The auction house provides photography and photogrammetry collectors and enthusiasts with an
          opportunity to support the artists they admire.
        </p>
        <p>
          Each month, Ikigai Labs will spotlight a featured artist, unveiling their incredible artworks. To kick off
          this exciting journey, the renowned artist Dimitri Daniloff will introduce the astounding DDA collection.
        </p>
        <p>
          To ignite the Ikigai Art Collective we are soft launching an OG Mint Pass with an authentic artwork by Dimitri
          Daniloff—an enticing invitation to join this extraordinary venture.
        </p>
      </div>
    </main>
    <Footer />
  </div>
)

export default withLayout(Layout.main)(About)
