import React, { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { AmbassadorHeader } from '../../modules/AmbassadorHeader'
import { Footer } from '../../modules/Footer'
import { withLayout } from '../../common/layouts'
import { Layout } from '../../common/types'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '../../common/constants'

const name = 'Curation by Florence Moll'
const intro =
  'My fascination with evolving art forms, especially since the technological boom of the 2000s, drew me irresistibly towards this groundbreaking opportunity.'
const coverImage = '/assets/images/ambassadors/florence-moll/florence-moll.png'

const FlorenceMoll: FC = () => {
  const { asPath } = useRouter()
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
              It is with immense pleasure and a sense of creative wonder that I announce my artistic venture on the
              Ikigai platform. LiveTheLifeTV and Dimitri Daniloff have extended me the honor of curating a selection of
              distinguished artists for this innovative launch, a task that I embraced with great enthusiasm. This
              initiative marks a thrilling expedition, merging the realms of traditional photography and a novel,
              boundless exhibition space.
            </p>
            <p>
              My fascination with evolving art forms, especially since the technological boom of the 2000s, drew me
              irresistibly towards this groundbreaking opportunity. The results have been nothing short of
              extraordinary. The artists featured in the ikigAI Genesis Art Collective have adeptly and eagerly adapted
              to this avant-garde medium, showcasing their remarkable talents.
            </p>
            <p>
              Our curation is anchored in a meticulously reasoned selection of contemporary photographs, each leaving a
              significant imprint in the world of visual art. Spanning conceptual photography to ethereal poetic
              visuals, from the raw beauty of land art to the expanse of landscapes, each subject is distinct. These
              images, sometimes iconic, have garnered acclaim through exhibitions, awards, and publications. Their
              journey to recognition is a story in itself.
            </p>
            <p>
              This first edition on the Ikigai platform is not merely a showcase but a reinvention of vision. Far from
              being simple reproductions, these photographs gain new life and dimension through their creators&apos;
              touch. They offer a blend of spectacular and intimate experiences. The added layer of narration, be it the
              artists&apos; voices or surprises in animation, enriches the encounter. Maia Flore&apos;s playful
              manipulation of stillness, Tauffenbach-Pourtout&apos;s visual illusions, and Hannah Whitaker&apos;s
              creativity, along with Cédric Delsaux&apos;s enhanced narratives in the &apos;Dark Lens&apos; series,
              promise a journey beyond the conventional. The great artist&apos;s team under my curation is composed
              with: Dimitri Daniloff, Edouard Taufenbach & Bastien Pourtout, Maia Flore, Ryan Hopkinson, Cédric Delsaux,
              Letizia Le Fur, Nick Meek, Hannah Whitaker and Joris Baquet. I&apos;d like to thank them for their talent,
              faith, and commitment they&apos;ve given to the Ikigai project.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default withLayout(Layout.main)(FlorenceMoll)
