import SiteNav from "@/app/components/SiteNav";

export const metadata = {
  title: "Terms of Service - FinalsPrep",
  description:
    "The terms and conditions that apply when you use FinalsPrep.",
};

const LAST_UPDATED = "April 16, 2026";
const SUPPORT_EMAIL = "finalsprephelp@gmail.com";

export default function TermsPage() {
  return (
    <main className="bg-paper text-body">
      <SiteNav>
        <a href="/study" className="nav-link">
          Study
        </a>
        <a href="/" className="nav-link">
          Home
        </a>
      </SiteNav>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="label mb-3">Legal</div>
        <h1 className="font-serif text-5xl font-normal leading-tight text-ink">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: {LAST_UPDATED}</p>

        <div className="prose-body mt-10 space-y-6">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and use
            of finalsprep.com and the related study tools, AI tutoring
            features, subscriptions, token packs, content, and services
            provided by FinalsPrep (collectively, the &quot;Services&quot;). By using
            the Services, you agree to these Terms.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            1. Eligibility and Accounts
          </h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>You must be at least 13 years old to use the Services.</li>
            <li>
              If you are under 18, you represent that your parent or guardian
              has reviewed and accepted these Terms and the Privacy Policy with
              you, and has authorized your use of the Services.
            </li>
            <li>
              You must provide accurate information, maintain the security of
              your login credentials, and promptly notify us of unauthorized
              account use.
            </li>
            <li>
              You are responsible for activity that occurs through your account
              unless caused by our failure to maintain appropriate security.
            </li>
          </ul>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            2. Nature of the Services
          </h2>
          <p>
            FinalsPrep is an educational technology platform designed to help
            students study and practice. The Services may include unit
            overviews, topic lessons, flashcards, practice tools,
            interactives, and AI-generated assistance. FinalsPrep is not a
            school, testing agency, accredited educational institution, or a
            replacement for a teacher, tutor, or professional adviser.
          </p>
          <p>
            AI systems can generate incomplete, outdated, biased, or incorrect
            information. You are responsible for reviewing and validating any
            output before relying on it for schoolwork, exam preparation, or
            other decisions. FinalsPrep is intended to support learning, not to
            guarantee grades, scores, admissions outcomes, or academic credit.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            3. Educational Integrity and Acceptable Use
          </h2>
          <p>You agree not to:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              use the Services in violation of your school&apos;s, teacher&apos;s, or
              testing provider&apos;s rules, including rules about unauthorized AI
              assistance or cheating;
            </li>
            <li>
              share your account, resell access, or allow multiple people to
              use one paid account contrary to the intended plan limits;
            </li>
            <li>
              scrape, copy at scale, reverse engineer, interfere with, or
              bypass security, entitlement, or rate-limit measures;
            </li>
            <li>
              upload malware, harmful code, unlawful content, or content that
              infringes another person&apos;s rights;
            </li>
            <li>
              use bots, scripts, or abusive automation to generate excessive
              requests or drive unusual cost, load, or availability risk;
            </li>
            <li>
              submit sensitive personal information, student records, or
              third-party data that you are not authorized to provide.
            </li>
          </ul>
          <p>
            We may monitor usage, investigate suspected abuse, and limit,
            suspend, or terminate access where necessary to protect users, the
            platform, or our service providers.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            4. Paid Plans, Token Packs, Billing, and Cancellation
          </h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              Paid plan features, prices, billing intervals, credits, and
              entitlements are shown in the product or at checkout and may
              change over time.
            </li>
            <li>
              Recurring subscriptions automatically renew until canceled. By
              starting a subscription, you authorize the applicable payment
              processor to charge your selected payment method for recurring
              fees, taxes, and any applicable adjustments.
            </li>
            <li>
              One-time token-pack purchases do not auto-renew. Bonus tokens
              have no cash value, are non-transferable, and may be used only
              within the Services in accordance with the applicable plan and
              product rules.
            </li>
            <li>
              You may cancel a recurring subscription using the billing tools
              made available through checkout, billing emails, or by contacting{" "}
              <a
                className="text-orange underline"
                href={`mailto:${SUPPORT_EMAIL}`}
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              if you need help. Cancellation stops future renewal charges but
              does not retroactively cancel charges already incurred.
            </li>
          </ul>

          <h2 className="mt-10 font-serif text-2xl text-ink">5. Refunds</h2>
          <p>
            Unless a different offer is stated at checkout or required by law,
            first-time subscription purchases are generally eligible for a
            refund if requested within 7 days of the initial charge by
            contacting{" "}
            <a
              className="text-orange underline"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>
            . Renewals, partial billing periods, and one-time token-pack
            purchases are generally non-refundable except where required by
            applicable law or where FinalsPrep expressly approves an exception.
          </p>
          <p>
            We may deny refunds where we reasonably determine there has been
            fraud, abuse, repeated refund misuse, chargeback abuse, or other
            violation of these Terms.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            6. Usage Limits, Availability, and Plan Controls
          </h2>
          <p>
            Access to courses, AI usage, token budgets, interactive tools, file
            uploads, and other features may vary by plan and may be subject to
            quotas, rate limits, throttles, or anti-abuse controls. We may
            adjust reasonable usage policies, feature availability, or model
            routing to protect reliability, safety, cost, and fairness across
            the platform.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            7. Your Content and Feedback
          </h2>
          <p>
            You retain ownership of the content you submit to the Services.
            However, you grant FinalsPrep a non-exclusive, worldwide,
            royalty-free license to host, store, reproduce, adapt, transmit,
            and process that content solely as needed to operate the Services,
            provide responses, maintain your study history, improve service
            quality, enforce these Terms, and investigate abuse or safety
            issues.
          </p>
          <p>
            If you send us suggestions, ideas, or feedback, you agree that we
            may use them without restriction or compensation to you.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            8. Intellectual Property
          </h2>
          <p>
            FinalsPrep and its related software, design, content compilation,
            branding, and platform materials are protected by intellectual
            property laws. Subject to these Terms, we grant you a limited,
            revocable, non-exclusive, non-transferable right to use the
            Services for your personal, non-commercial educational use. You may
            not copy, distribute, sell, sublicense, or create competing
            services from the Services except as allowed by law or with our
            written permission.
          </p>
          <p className="text-sm text-muted">
            AP, AP Central, Advanced Placement, and College Board are
            trademarks of the College Board. FinalsPrep is not affiliated
            with, endorsed by, or sponsored by the College Board.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            9. Third-Party Services
          </h2>
          <p>
            The Services rely on third-party providers, including providers for
            authentication, cloud infrastructure, payments, email delivery, and
            AI model processing. Your use of third-party services made
            available through FinalsPrep may also be subject to those
            providers&apos; terms and policies. FinalsPrep is not responsible for
            the availability or independent acts of third-party services except
            as required by law.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            10. Service Changes and Termination
          </h2>
          <p>
            We may modify, suspend, or discontinue any part of the Services at
            any time, including features, content, pricing, plan structure, or
            AI model choices. We may suspend or terminate your access if we
            reasonably believe you violated these Terms, created risk or harm,
            engaged in fraud or abuse, or if continued operation of the
            Services becomes impracticable.
          </p>
          <p>
            If your account is terminated for fraud, abuse, or material breach,
            FinalsPrep may deny continued access and may refuse refunds except
            where required by law.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            11. Disclaimers
          </h2>
          <p>
            THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TO THE
            MAXIMUM EXTENT PERMITTED BY LAW, FINALSPREP DISCLAIMS ALL
            WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING
            IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, TITLE, NON-INFRINGEMENT, ACCURACY, AND QUIET ENJOYMENT. WE
            DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE,
            SECURE, OR THAT CONTENT OR AI OUTPUT WILL BE COMPLETE, ACCURATE, OR
            SUITABLE FOR ANY PARTICULAR PURPOSE.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            12. Limitation of Liability
          </h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, FINALSPREP AND ITS
            AFFILIATES, SERVICE PROVIDERS, AND LICENSORS WILL NOT BE LIABLE FOR
            ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR
            PUNITIVE DAMAGES, OR FOR ANY LOSS OF DATA, REVENUE, PROFITS,
            GOODWILL, OR BUSINESS INTERRUPTION, ARISING OUT OF OR RELATED TO
            THE SERVICES. OUR TOTAL LIABILITY FOR ALL CLAIMS RELATING TO THE
            SERVICES WILL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID TO
            FINALSPREP FOR THE SERVICES IN THE 12 MONTHS BEFORE THE EVENT GIVING
            RISE TO THE CLAIM OR (B) $100.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            13. Changes to These Terms
          </h2>
          <p>
            We may update these Terms from time to time. If we make material
            changes, we may provide notice through the Services or by email
            where appropriate. Continued use of the Services after the updated
            Terms become effective means you accept the revised Terms.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">14. Contact</h2>
          <p>
            Questions about these Terms:{" "}
            <a
              className="text-orange underline"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
