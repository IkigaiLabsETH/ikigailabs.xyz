import Head from 'next/head'
import { FC } from "react"
import { ConnectEmbed, useActiveWalletConnectionStatus } from 'thirdweb/react'
import { withLayout } from '../../common/layouts'
import { Layout } from '../../common/types'
import { TWClient } from '../../common/web3/web3'
import Image from 'next/image'
import { match } from 'ts-pattern'
import { Loader, Size } from '../../modules/Loader'
import Link from 'next/link'

const Connect: FC = () => {
  const connectionStatus = useActiveWalletConnectionStatus()

  const signIn = (
    <>
      <div>
        <h1 className="flex text-center text-3xl font-medium tracking-tighter justify-center text-neutral-300">
          Sign in to get started
        </h1>
        <div className="h-10" />
        <div className="flex justify-center"></div>
      </div>
      <ConnectEmbed 
        client={TWClient}
      />
    </>
  )

  const loading = (
    <div>
      <Loader size={Size.l} color="yellow"/>
    </div>
  )

  const signedIn = (
    <div className='flex text-center text-white flex-col'>
      <h1 className="flex text-center text-3xl font-medium tracking-tighter justify-center text-neutral-300">
        Signed in. 
      </h1>
      <Link href='/ethereum/explore' title='Start exploring'>Start exploring</Link>
    </div>
  )

  return (
    <div className="flex items-center flex-col">
      <Head>
        <title>Ikigai Labs - Shaped by Photography | Connect</title>
        <meta name="description" content="Shaped by Photography | Connect" />
        <link rel="icon" href="/assets/images/IKIGAI_LABS_logo.svg" />
      </Head>
      <main className="w-full">
      <div className="w-full xl:grid xl:grid-cols-2 h-screen">
        <div
          className="overflow-hidden relative h-full hidden xl:block"
          style={{
            backgroundImage: "linear-gradient(#131418, #070708)",
          }}
        >
          <Image
            className="z-0 absolute inset-0 object-cover w-full h-full"
            src="https://0b6ff6d257685c2de8cc8e51755a0ae9.ipfscdn.io/ipfs/bafybeigzmthry6a5bzqscvlwjpson4ledcgok2oygge4vylpkfmioo3nay/332.png"
            alt=""
            width={1920}
            height={1080}
          />
        </div>
        <div className="flex items-center justify-center pt-12 xl:pt-0">
          <div className="w-full flex flex-col items-center px-4">
            {
              match(connectionStatus)
                .with('disconnected', () => signIn)
                .with('connecting', () => loading)
                .with('connected', () => signedIn)
                .exhaustive()
            }
          </div>
        </div>
      </div>
      </main>
    </div>
  )
}

export default withLayout(Layout.skeleton)(Connect)
