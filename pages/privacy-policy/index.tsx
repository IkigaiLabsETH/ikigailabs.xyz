/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import React, { FC } from 'react'

import { withLayout } from '../../common/layouts'
import { Layout } from '../../common/types'
import { Footer } from '../../modules/Footer'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '../../common/constants'
import { Ambassadors } from '../../modules/Ambassadors'

const siteTitle = `${SITE_TITLE} | Privacy Policy`
const url = `${SITE_URL}/privacy-policy`

const PrivacyPolicy: FC = () => (
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
          Privacy Policy
        </h1>
        <p>
          This Privacy Policy explains how information about you is collected, used, and disclosed by Ikigai Labs
          (“Ikigai Labs,” “we,” “our,” “ours,” and “us”). This Privacy Policy applies to information we collect when you
          use the website operated by us and located at https://ikigailabs.xyz/ (the “Ikigai Website”), and all
          associated websites linked to https://ikigailabs.xyz/ by us, or when you otherwise interact with the services
          or tools we provide.
        </p>
        <p>
          We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the
          date at the top of the policy and, in some cases, we may provide you with additional notice (such as adding a
          statement to our homepage or sending you a notification).
        </p>

        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">1. Collection of Information.</h2>
        <p>
          1.1 Information You Provide to Us. We collect information you provide directly to us. The types of information
          we may collect include your digital asset wallet address, completed transaction hashes, and the token names,
          symbols, or other blockchain identifiers.
        </p>

        <p>
          1.2 Information We Collect Automatically When You Use the Services. When you access or use our Services, we
          may automatically collect information about you, including:
        </p>
        <ul className='list-disc list-outside ps-6 mb-6'>
          <li>
            Log Information: We may collect log information about your use of the Ikigai Website, including the type of
            browser you use, access times, pages viewed, your IP address and the page you visited before navigating to
            the Ikigai Website.
          </li>
          <li>
            Device Information: We may collect information about the computer or mobile device you use to access the
            Ikigai Website, including the hardware model, operating system and version, unique device identifiers and
            mobile network information.
          </li>
        </ul>
        <p>
          1.3 Information Collected by Cookies and Other Tracking Technologies. We may use various technologies to
          collect information, including cookies and web beacons. Cookies are small data files stored on your hard drive
          or in device memory that help us improve our services and your experience, see which areas and features of our
          services are popular and count visits. Web beacons are electronic images that may be used in our services or
          emails and help deliver cookies, count visits and understand usage and campaign effectiveness. For more
          information about cookies, and how to disable them, please see “Your Choices” below.
        </p>

        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">2. Use of Information.</h2>
        <p>
          2.1 We may use information about you for various purposes, including to:</p>
          <ul className='list-disc list-outside ps-6 mb-6'>
            <li>Provide, maintain and improve our services;</li>
            <li>Send you technical notices, updates, security alerts and administrative messages;</li>
            <li>Respond to your comments, questions and requests;</li>
            <li>
              Communicate with you about products, services, offers and events offered by Ikigai Labs and others, and
              provide news and information we think will be of interest to you;
            </li>
            <li>Monitor and analyze trends, usage and activities in connection with our services;</li>
            <li>
              Detect, investigate and prevent fraudulent transactions and other illegal activities and protect the
              rights and property of Ikigai Labs and others;
            </li>
            <li>
              Personalize and improve the services and provide content or features that match user profiles or
              interests; and
            </li>
            <li>Carry out any other purpose described to you at the time the information was collected.</li>
          </ul>
        

        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">3. Sharing of Information.</h2>
        <p>
          3.1 We may use share information about you as follows or as otherwise described in this Privacy Policy:</p>
          <ul className='list-disc list-outside ps-6 mb-6'>
            <li>
              With vendors, consultants and other service providers who need access to such information to carry out
              work on our behalf;
            </li>
            <li>
              In response to a request for information if we believe disclosure is in accordance with, or required by,
              any applicable law, regulation or legal process;
            </li>
            <li>
              If we believe your actions are inconsistent with our user agreements or policies, or to protect the
              rights, property and safety of Ikigai Labs, or others;
            </li>
            <li>
              In connection with, or during negotiations of, any merger, sale of company assets, financing or
              acquisition of all or a portion of our business by another company;
            </li>
            <li>
              Between and among Ikigai Labs and our current and future parents, affiliates, subsidiaries and other
              companies under common control and ownership; and
            </li>
            <li>With your consent or at your direction.</li>
          </ul>
        
        <p>
          3.2 We may also share aggregated or de-identified information, which cannot reasonably be used to identify
          you.
        </p>
        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">
          4. Advertising and Analytics Services Provided by Others
        </h2>
        <p>
          4.1 We may allow others to provide analytics services and serve advertisements on our behalf across the
          Internet and in applications. These entities may use cookies, web beacons, device identifiers and other
          technologies to collect information about your use of the Ikigai Website and other websites and applications,
          including your IP address, web browser, mobile network information, pages viewed, time spent on pages or in
          apps, links clicked and conversion information. This information may be used by Ikigai Labs and others to,
          among other things, analyze and track data, determine the popularity of certain content, deliver advertising
          and content targeted to your interests the Ikigai Labs Website and other websites and better understand your
          online activity. For more information about interest-based ads, or to opt out of having your web browsing
          information used for behavioral advertising purposes, please visit www.aboutads.info/choices.
        </p>
        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">
          5. Transfer of Information to the U.S. and Other Countries
        </h2>
        <p>
          5.1 Ikigai Labs is based in the United States and the information we collect is governed by U.S. law. By
          accessing or using the Services or otherwise providing information to us, you consent to the processing,
          transfer and storage of information in and to the U.S. and other countries, where you may not have the same
          rights and protections as you do under local law.
        </p>
        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">6. Your Choices</h2>
        <p>
          6.1 You may update, correct or delete information about you at any time emailing us at ikigailabs@proton.me,
          but note that we may retain certain information as required by law or for legitimate business purposes. We may
          also retain cached or archived copies of information about you for a certain period of time.
        </p>
        <p>
          6.2 Cookies. Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to
          set your browser to remove or reject browser cookies. Removing or rejecting browser cookies does not
          necessarily affect third party flash cookies used in connection with our the Ikigai Website. Please note that
          if you choose to remove or reject cookies, this could affect the availability and functionality of the Ikigai
          Website.
        </p>
        <p>
          6.3 Promotional Communications. You may opt out of receiving promotional emails from us by following the
          instructions in those emails. If you opt out, we may still send you non-promotional emails, such as those
          about your account or our ongoing business relations.
        </p>
        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">7. Contact Us</h2>
        <p>
          7.1 If you have any questions about this Privacy Policy, please contact us by email at ikigailabs@proton.me
        </p>
      </div>
    </main>
    <Footer />
  </div>
)

export default withLayout(Layout.main)(PrivacyPolicy)
