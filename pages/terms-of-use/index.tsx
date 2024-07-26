/* eslint-disable react/function-component-definition */
import Head from 'next/head'
import React, { FC } from 'react'

import { withLayout } from '../../common/layouts'
import { Layout } from '../../common/types'
import { Footer } from '../../modules/Footer'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '../../common/constants'

const siteTitle = `${SITE_TITLE} | Terms of use`
const url = `${SITE_URL}/terms-of-use`

const TermsOfUse: FC = () => (
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
          Terms of Use
        </h1>
        <p>
          Ikigai Labs is a curated, non-custodial, open-source marketplace aggregator developed and made available by
          Ikigai Labs XYZ, Inc., a Delaware corporation (“Ikigai Labs XYZ,” “we,” “our,” or “us”). This platform
          consists of multiple components that can be accessed through our website located at https://ikigailabs.xyz/,
          powered by the Reservoir API (a hosted Application Programming Interface for building NFT applications), the
          ReservoirKit (a developer toolkit), and the Reservoir Protocol (an open-source NFT liquidity aggregation
          protocol). Details on the components of the Reservoir Platform can be found at
          https://docs.reservoir.tools/docs/what-is-reservoir. The Reservoir Protocol is comprised of open-source
          software, which is publicly available and located at https://github.com/reservoirprotocol.
        </p>
        <p>
          These Terms of Use (the “Terms,”) govern your relationship with Ikigai Labs XYZ, Inc. and your use of any
          services, tools, or information made available by us through (a) the Ikigai Labs website operated by us and
          located at https://ikigaigailabs.xyz/, and all associated websites linked to https://reservoir.tools/ by us,
          (b) the Reservoir API, and (c) the Reservoir Kit (collectively, the “Services”).
        </p>
        <p>
          Please read these Terms and our Privacy Policy located at https://www.reservoir.tools/privacy carefully. By
          using any of the Services, you agree to be bound by these Terms and our Privacy Policy, which is incorporated
          herein by reference. If you do not agree completely to these Terms or our Privacy Policy, do not use the
          Services.
        </p>
        <p>
          THIS AGREEMENT CONTAINS A BINDING INDIVIDUAL ARBITRATION AGREEMENT AND CLASS ACTION WAIVER IN SECTION 14. THIS
          AFFECTS YOUR RIGHTS WITH RESPECT TO ANY “DISPUTE” BETWEEN YOU AND IKIGAI LABS XYZ, INC. AND MAY REQUIRE YOU TO
          RESOLVE DISPUTES IN BINDING, INDIVIDUAL ARBITRATION, AND NOT IN COURT. PLEASE READ THIS ENTIRE AGREEMENT,
          INCLUDING THAT PROVISION, CAREFULLY.
        </p>
        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">1. Eligibility.</h2>
        <p>
          1.1 You must be at least the age of majority in your jurisdiction to access or use the Services. By accessing
          or using the Services, you represent that you are at least the age of majority (e.g., 18 years of age) and
          have the full right, power, and authority to enter and comply with these Terms. If you access or use the
          Services on behalf of a legal entity, (a) all references to “you” throughout these Terms will include that
          entity, (b) you represent that you are authorized to accept these Terms on that entity’s behalf, and (c) in
          the event you or the entity violates these Terms, the entity agrees to be responsible to us.
        </p>
        <p>
          1.2 You further represent that you are not (a) the subject of economic or trade sanctions administered or
          enforced by any governmental authority or otherwise designated on any list of prohibited or restricted parties
          (including but not limited to the list maintained by the Office of Foreign Assets Control of the U.S.
          Department of the Treasury) or (b) a citizen, resident, or organized in a jurisdiction or territory that is
          the subject of comprehensive country-wide, territory-wide, or regional economic sanctions by the United
          States.
        </p>
        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">2. Intellectual Property Ownership.</h2>
        <p>
          2.1 You acknowledge and agree that we own all legal right, title and interest in the website located at
          https://ikigaigailabs.xyz/ (the “Ikigai Labs Website”) and its contents, including but not limited to
          software, text, images, all trademarks, service marks, and trade names (“Ikigai Labs Materials”). You
          acknowledge that Ikigai Labs Materials are protected by copyright, trade dress, patent, and trademark laws,
          international conventions, other relevant intellectual property and proprietary rights, and applicable laws.
        </p>
        <p>
          2.2 Subject to your compliance with these Terms, we provide you a limited, personal, non-exclusive,
          non-transferable, non-assignable, fully revocable license to use the Ikigai Labs Website for your individual
          use. This license is effective until terminated. We may terminate or suspend any or all portions or features
          of the Ikigai Labs Website at any time and for any reason or for no reason with no liability to you. This
          license does not give you any ownership rights in the Ikigai Labs Materials.
        </p>
        <p>
          2.3 While the Ikigai Labs Materials are proprietary, the codebase is comprised of open-source software running
          on a public blockchain.
        </p>

        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">3. Privacy</h2>
        <p>
          3.1 When you use the Ikigai Labs Website, we may collect from you directly your digital asset wallet address,
          completed transaction hashes, and the token names, symbols, or other blockchain identifiers of the tokens that
          you use to interact with the codebase. Additionally, when you use the Ikigai Labs Website, we may collect
          information about you automatically through cookies and similar technologies. Please refer to our Privacy
          Policy, available at https://www.ikigailabs.art/privacy-policy/, for information on how we collect, use, and
          your information.
        </p>

        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">4. Prohibited Conduct and Content.</h2>
        <p>
          4.1 You acknowledge and agree that any data provided to you through our services is for your internal business
          use only, and may not be directly resold or sublicensed to third parties. You may incorporate the data into
          your own product or service for distribution or use by your own end-users, provided that such distribution or
          use is in accordance with these terms of service and any applicable laws and regulations. You may not offer
          the data as a standalone product or service, or permit third parties to access or use the data outside of your
          own product or service without our prior written consent.
        </p>
        <p>
          4.2 You agree not to engage in any of the following conduct (each a “Prohibited Activity”) with respect to the
          Reservoir Website or the Services:
        </p>
        <p>
          (i) Any activity that seeks to interfere with or compromise the integrity, security, or proper functioning of
          any computer, server, network, personal device, or other information technology system, including (but not
          limited to) the deployment of viruses and denial of service attacks;
        </p>
        <p>(ii) Any activity that seeks circumvent a usage or capacity limit of the Services;</p>
        <p>
          (iii) Any activity to defraud any person or entity, including but not limited to providing any false,
          inaccurate, or misleading information in order to unlawfully obtain the property of another;
        </p>
        <p>
          (iv) Any activity that violates any applicable law, rule, or regulation concerning the trading of securities,
          derivatives, or commodities; and
        </p>
        <p>
          (v) Any activity to violate any other applicable law, contract, intellectual property right or other
          third-party right or commit a tort.
        </p>
        <p>
          4.3 If you engage in any of the Prohibited Activities, we may, at our sole and absolute discretion, without
          notice or liability to you, and without limiting any of our other rights or remedies at law or in equity,
          immediately suspend or terminate your access to the Ikigai Labs Website or the Services.
        </p>
        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">5. Termination.</h2>
        <p>
          5.1 We may, at any time and at its sole discretion, suspend, terminate, deactivate, and delete your access to
          or any part of the Reservoir Website or the Services with or without notice to you for any reason or for no
          reason at all, including without limitation if: (i) you breach any provision of these Terms; (ii) you infringe
          any intellectual property rights; or (iii) you in engage in any Prohibited Activity.
        </p>
        <p>
          5.2 The following Sections of these Terms will survive termination of this agreement or discontinuation of
          your access to any part of the Services: Section 8 (Disclaimer and No Warranties), Section 9
          (Indemnification), Section 10 (Limitation of Liability), Section 11 (Release), Section 14 (Dispute Resolution
          and Binding Arbitration), and Section 17 (Feedback).
        </p>
        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">6. Non-Custodial and No Fiduciary Duties</h2>
        <p>
          6.1 Any Services offered by us are non-custodial, meaning you are solely responsible for the custody of the
          cryptographic private keys to the digital asset wallets you hold. These Terms are not intended to, and do not,
          create or impose any fiduciary duties on us. To the fullest extent permitted by law, you acknowledge and agree
          that we owe no fiduciary duties or liabilities to you or any other party, and that to the extent any such
          duties or liabilities may exist at law or in equity, those duties and liabilities are hereby irrevocably
          disclaimed, waived, and eliminated.
        </p>
        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">7. Non-Solicitation and No Professional Advice</h2>
        <p>
          7.1 You agree and understand that transactions you submit through the Ikigai Labs Website or through the
          codebase are considered unsolicited, which means that you have not received any investment advice from us in
          connection with any transactions.
        </p>
        <p>
          7.2 You agree and understand that all information provided by the Ikigai Labs Website is for informational
          purposes only and should not be construed as legal, financial, or tax advice. You should not take, or refrain
          from taking, any action based on any information contained on the Ikigai Labs Website.
        </p>
        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">8. Disclaimers and No Warranties.</h2>
        <p>
          8.1 YOU EXPRESSLY UNDERSTAND AND AGREE THAT YOUR ACCESS TO AND USE OF THE SERVICES IS AT YOUR SOLE RISK, AND
          THAT ACCESS TO THE SERVICES IS PROVIDED “AS IS” AND “AS AVAILABLE”. TO THE FULLEST EXTENT PERMISSIBLE PURSUANT
          TO APPLICABLE LAW, WE MAKE NO EXPRESS WARRANTIES AND HEREBY DISCLAIM ALL IMPLIED WARRANTIES REGARDING ANY PART
          OF THE SERVICES, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
          NON-INFRINGEMENT, CORRECTNESS, ACCURACY, OR RELIABILITY. WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, WE
          DO NOT REPRESENT OR WARRANT THAT ACCESS TO THE SERVICES WILL BE CONTINUOUS, UNINTERRUPTED, TIMELY, OR SECURE;
          THAT THE INFORMATION CONTAINED IN THE IKIGAI LABS WEBSITE WILL BE ACCURATE, RELIABLE, COMPLETE, OR CURRENT; OR
          THAT THE SERVICES WILL BE FREE FROM ERRORS, DEFECTS, VIRUSES, OR OTHER HARMFUL ELEMENTS.
        </p>
        <p>
          8.2 YOU ACCEPT THE INHERENT SECURITY RISKS OF PROVIDING INFORMATION AND DEALING ONLINE OVER THE INTERNET, YOU
          AND AGREE THAT WE HAVE NO LIABILITY OR RESPONSIBILITY FOR ANY BREACH OF SECURITY.
        </p>
        <p>
          8.3 WE WILL NOT BE RESPONSIBLE OR LIABLE TO YOU FOR ANY LOSSES YOU INCUR AS THE RESULT OF YOUR USE OF ANY
          BLOCKCHAIN NETWORK OR ANY DIGITAL ASSET WALLET OR OTHER ELECTRONIC WALLET, INCLUDING BUT NOT LIMITED TO ANY
          LOSSES, DAMAGES OR CLAIMS ARISING FROM: (i) USER ERROR, SUCH AS FORGOTTEN PASSWORDS OR INCORRECTLY CONSTRUED
          SMART CONTRACTS OR OTHER TRANSACTIONS; (ii) SERVER FAILURE OR DATA LOSS; (iii) CORRUPTED WALLET FILES; OR (iv)
          UNAUTHORIZED ACCESS OR ACTIVITIES BY THIRD PARTIES, INCLUDING BUT NOT LIMITED TO THE USE OF VIRUSES, PHISHING,
          BRUTEFORCING OR OTHER MEANS OF ATTACK AGAINST THE PLATFORM, BLOCKCHAIN NETWORK, OR ANY DIGITAL ASSET WALLET OR
          OTHER ELECTRONIC WALLET.
        </p>
        <p>
          8.4 WE ARE NOT RESPONSIBLE FOR LOSSES DUE TO BLOCKCHAINS OR ANY OTHER FEATURES OF ANY BLOCKCHAIN NETWORK OR
          ANY DIGITAL ASSET WALLET OR OTHER ELECTRONIC WALLET, INCLUDING BUT NOT LIMITED TO LATE REPORT BY DEVELOPERS OR
          REPRESENTATIVES (OR NO REPORT AT ALL) OF ANY ISSUES WITH THE BLOCKCHAIN SUPPORTING THE BLOCKCHAIN NETWORK,
          INCLUDING FORKS, TECHNICAL NODE ISSUES, OR ANY OTHER ISSUES HAVING FUND LOSSES AS A RESULT.
        </p>
        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">9. Indemnification.</h2>
        <p>
          9.1 To the fullest extent permitted by applicable law, you will indemnify, defend and hold harmless Ikigai
          Labs and our subsidiaries and affiliates, and each of our respective officers, directors, agents, partners and
          employees (individually and collectively, the “Ikigai Labs Parties”) from and against any losses, liabilities,
          claims, demands, damages, expenses or costs (“Claims”) arising out of or related to (a) your access to or use
          of the Services (b) your violation of these Terms; (c) your violation, misappropriation, or infringement of
          any rights of another (including intellectual property rights or privacy rights); or (d) your conduct in
          connection with the Services. You agree to promptly notify Ikigai Labs Parties of any third-party Claims,
          cooperate with Ikigai Labs Parties in defending such Claims and pay all fees, costs and expenses associated
          with defending such Claims (including attorneys’ fees). You also agree that Ikigai Labs Parties will have
          control of the defense or settlement, at Ikigai Labs’ sole option, of any third-party Claims.
        </p>

        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">11. Release.</h2>
        <p>
          11.1 To the fullest extent permitted by applicable law, you release Ikigai Labs and the other Ikigai Labs
          Parties from responsibility, liability, claims, demands and/or damages (actual and consequential) of every
          kind and nature, known and unknown (including claims of negligence), arising out of or related to disputes
          between users and the acts or omissions of third parties. If you are a consumer who resides in California, you
          hereby waive your rights under California Civil Code § 1542, which provides: “A general release does not
          extend to claims which the creditor does not know or suspect to exist in his or her favor at the time of
          executing the release, which if known by him or her must have materially affected his or her settlement with
          the debtor.”
        </p>

        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">12. Changes to these Terms.</h2>
        <p>
          12.1 We may update, amend, alter, or modify these Terms in the future. You agree that Ikigai Labs may make
          changes to these Terms at any time and for any reason at its sole discretion. If we make material changes to
          these Terms, we will notify you and give you an opportunity to review the new Terms that will supersede and
          replace these Terms. Your continued access or use of the Services after notice of changes to these Terms will
          mean that you accept any and all of such changes. If you do not agree to the amended Terms, you must stop
          using the Services.
        </p>

        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">13. Changes to the Services.</h2>
        <p>
          13.1 We may update, amend, alter, change, or stop the Services, from time to time without prior notice to you.
        </p>
        <p>
          13.2 We do not have any maintenance, update, or support obligations with respect to the Services. You agree
          that our updates to the Services may change the requirements necessary to use the Services, and you agree that
          in such an event you are responsible for any necessary actions, including but not limited to updating software
          or hardware to access and use the Services.
        </p>
        <p>13.3 We are not responsible for any loss or harm related to your inability to access or use the Services.</p>

        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">14. Dispute Resolution and Binding Arbitration.</h2>
        <p>
          14.1 Please read the following section carefully because it requires you to arbitrate certain disputes and
          claims with Ikigai Labs and limits the manner in which you can seek relief from us, unless you opt out of
          arbitration by following the instructions set forth below. No class or representative actions or arbitrations
          are allowed under this arbitration provision. In addition, arbitration precludes you from suing in court or
          having a jury trial.
        </p>
        <p>
          14.2 No Representative Actions. You agree that any dispute arising out of or related to these Terms or our
          Services is personal to you and Ikigai Labs and that any dispute will be resolved solely through individual
          action, and will not be brought as a class arbitration, class action or any other type of representative
          proceeding.
        </p>
        <p>
          14.3 Arbitration of Disputes. Except for disputes in which you or Ikigai Labs seeks injunctive or other
          equitable relief for the alleged infringement or misappropriation of intellectual property, you and Ikigai
          Labs waive your rights to a jury trial and to have any other dispute arising out of or related to these Terms,
          including claims related to privacy and data security, (collectively, “Disputes”) resolved in court. Instead,
          for any Dispute that you have against Ikigai Labs you agree to first contact Ikigai Labs and attempt to
          resolve the claim informally by sending a written notice of your claim (“Notice”) to ikigai Labs by email at
          ikigailabs@proton.me. The Notice must (a) include your name, residence address, email address, and telephone
          number; (b) describe the nature and basis of the Dispute; and (c) set forth the specific relief sought. Our
          notice to you will be similar in form to that described above. If you and Ikigai Labs cannot reach an
          agreement to resolve the Dispute within thirty (30) days after such Notice is received, then either party may
          submit the Dispute to confidential, binding arbitration. The arbitration shall be conducted in the State of
          New York by a single arbitrator pursuant to the Rules of the American Arbitration Association (“AAA”). You and
          Ikigai Labs agree that these Terms affect interstate commerce and that the enforceability of this Section 16
          will be substantively and procedurally governed by the Federal Arbitration Act, 9 U.S.C. § 1, et seq. (the
          “FAA”), to the maximum extent permitted by applicable law. As limited by the FAA, these Terms and the AAA
          Rules, the arbitrator will have exclusive authority to make all procedural and substantive decisions regarding
          any Dispute and to grant any remedy that would otherwise be available in court, including the power to
          determine the question of arbitrability. The arbitrator may conduct only an individual arbitration and may not
          consolidate more than one individual’s claims, preside over any type of class or representative proceeding or
          preside over any proceeding involving more than one individual. The arbitration will allow for the discovery
          or exchange of non-privileged information relevant to the Dispute. The arbitrator, Ikigai Labs, and you will
          maintain the confidentiality of any arbitration proceedings, judgments and awards, including information
          gathered, prepared and presented for purposes of the arbitration or related to the Dispute(s) therein. The
          arbitrator will have the authority to make appropriate rulings to safeguard confidentiality, unless the law
          provides to the contrary. The duty of confidentiality does not apply to the extent that disclosure is
          necessary to prepare for or conduct the arbitration hearing on the merits, in connection with a court
          application for a preliminary remedy or in connection with a judicial challenge to an arbitration award or its
          enforcement, or to the extent that disclosure is otherwise required by law or judicial decision.
        </p>
        <p>
          14.4 You and Ikigai Labs agree that for any arbitration you initiate, you will pay the filing fee up to a
          maximum of $250, and Ikigai Labs will pay the remaining fees and costs. For any arbitration initiated by
          Ikigai Labs, Ikigai Labs will pay all fees and costs. You and Ikigai Labs agree that the state or federal
          courts of the State of New York shall have exclusive jurisdiction over any appeals and the enforcement of an
          arbitration award.
        </p>
        <p>
          14.5 Any dispute must be filed within one year after the relevant claim arose; otherwise, the Dispute is
          permanently barred, which means that you and Ikigai Labs will not have the right to assert the claim.
        </p>
        <p>
          14.6 You have the right to opt out of binding arbitration within 30 days of the date you first accepted the
          terms of this Section 14 by contacting Ikigai Labs at ikigailabs@proton.me. In order to be effective, the
          opt-out notice must include your full name and address and clearly indicate your intent to opt out of binding
          arbitration. By opting out of binding arbitration, you are agreeing to resolve Disputes in accordance with
          Section 15.
        </p>
        <p>
          14.7 If any portion of this Section 14 is found to be unenforceable or unlawful for any reason, (a) the
          unenforceable or unlawful provision shall be severed from these Terms; (b) severance of the unenforceable or
          unlawful provision shall have no impact whatsoever on the remainder of this Section 14 or the parties’ ability
          to compel arbitration of any remaining claims on an individual basis pursuant to this Section 14; and (c) to
          the extent that any claims must therefore proceed on a class, collective, consolidated, or representative
          basis, such claims must be litigated in a civil court of competent jurisdiction and not in arbitration, and
          the parties agree that litigation of those claims shall be stayed pending the outcome of any individual claims
          in arbitration. Further, if any part of this Section 14 is found to prohibit an individual claim seeking
          public injunctive relief, that provision will have no effect to the extent such relief is allowed to be sought
          out of arbitration, and the remainder of this Section 14 will be enforceable.
        </p>
        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">15. Governing Law and Venue.</h2>
        <p>
          15.1 Any dispute arising from these Terms will be governed by and construed and enforced in accordance with
          the laws of the State of Delaware, except to the extent preempted by U.S. federal law, without regard to
          conflict of law rules or principles that would cause the application of the laws of any other jurisdiction.
          Any dispute between the parties that is not subject to arbitration will be resolved in the courts of the State
          of New York or federal courts located in the State of New York.
        </p>
        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">16. Severability.</h2>
        <p>
          16.1 If any provision or part of a provision of these Terms is unlawful, void or unenforceable, that provision
          or part of the provision is deemed severable from these Terms and does not affect the validity and
          enforceability of any remaining provisions.
        </p>
        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">17. Feedback.</h2>
        <p>
          17.1 You may voluntarily post, submit or otherwise communicate to us, including through third party channels
          (e.g., Discord), any questions, comments, suggestions, ideas, original or creative materials or other
          information about the Services (collectively, “Feedback”). By posting or submitting any Feedback to us, you
          hereby irrevocably grant to Ikigai Labs a worldwide, perpetual, irrevocable, royalty-free, and fully
          sublicensable license to use, reproduce, modify, adapt, publish, translate, create derivative works from,
          distribute, perform and display such Feedback (in whole or in part) in any media and to incorporate the
          Feedback into other works in any format or medium now known or later developed. You understand that Ikigai
          Labs may treat Feedback as nonconfidential.
        </p>
        <h2 className="mt-10 md:mt-20 text-[2rem] md:text-[3rem]">18. Miscellaneous.</h2>
        <p>
          18.1 The failure of Ikigai Labs to exercise or enforce any right or provision of these Terms will not operate
          as a waiver of such right or provision. These Terms reflect the entire agreement between the parties relating
          to the subject matter hereof and supersede all prior agreements, representations, statements and
          understandings of the parties. The section titles in these Terms are for convenience only and have no legal or
          contractual effect. Use of the word “including” will be interpreted to mean “including without limitation.”
          Except as otherwise provided herein, these Terms are intended solely for the benefit of the parties and are
          not intended to confer third-party beneficiary rights upon any other person or entity. You agree that
          communications and transactions between us may be conducted electronically.
        </p>
      </div>
    </main>
    <Footer />
  </div>
)

export default withLayout(Layout.main)(TermsOfUse)
