import SiteNav from "@/app/components/SiteNav";

export const metadata = {
  title: "Privacy Policy - FinalsPrep",
  description:
    "How FinalsPrep collects, uses, discloses, and protects personal information.",
};

const LAST_UPDATED = "April 16, 2026";
const SUPPORT_EMAIL = "finalsprephelp@gmail.com";

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: {LAST_UPDATED}</p>

        <div className="prose-body mt-10 space-y-6">
          <p>
            This Privacy Policy explains how FinalsPrep collects, uses,
            discloses, and protects personal information when you use
            finalsprep.com, our study tools, AI tutoring features,
            subscriptions, and related services (collectively, the
            &quot;Services&quot;). By using the Services, you acknowledge the
            practices described in this policy.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            1. Information We Collect
          </h2>
          <p>We collect information in the following categories:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-ink">Account and identity data:</strong>{" "}
              your email address, authentication provider, Firebase user ID,
              email-verification status, and any information you provide when
              contacting support.
            </li>
            <li>
              <strong className="text-ink">Learning and study data:</strong>{" "}
              course selections, chat conversations, prompts, AI responses,
              saved conversations, bookmarks, schedule data, streaks, study
              insights, and other content you enter while using the Services.
            </li>
            <li>
              <strong className="text-ink">Uploaded content:</strong>{" "}
              materials you choose to submit, including text, pasted questions,
              and images attached to AI requests.
            </li>
            <li>
              <strong className="text-ink">Billing and transaction data:</strong>{" "}
              plan tier, subscription status, billing interval, Stripe customer
              and subscription identifiers, token-pack purchases, invoices, and
              payment status. We do not receive or store full payment-card
              numbers.
            </li>
            <li>
              <strong className="text-ink">Usage, device, and log data:</strong>{" "}
              IP address, browser and device information, timestamps, feature
              usage, approximate request metadata, rate-limit identifiers, and
              event logs such as sign-ins, lesson views, practice opens, chat
              usage, and checkout events.
            </li>
            <li>
              <strong className="text-ink">
                Communications and marketing data:
              </strong>{" "}
              emails you provide for product updates, account notices, support,
              or downloadable resources such as a formula sheet.
            </li>
            <li>
              <strong className="text-ink">
                Browser storage and device-permission data:
              </strong>{" "}
              essential site identifiers, theme preferences, flashcard progress,
              and similar local browser storage. If you use voice input, your
              browser or device provider may process speech under its own terms.
            </li>
          </ul>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            2. How We Use Information
          </h2>
          <p>We use personal information to:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Provide, operate, maintain, and improve the Services.</li>
            <li>
              Authenticate users, save progress, sync study history across
              devices, and personalize the learning experience.
            </li>
            <li>
              Process AI tutoring, explanation, and interactive-generation
              requests.
            </li>
            <li>
              Process subscriptions, token-pack purchases, payments, refunds,
              and fraud-prevention checks.
            </li>
            <li>
              Measure product usage, enforce plan entitlements and rate limits,
              detect abuse, and protect service reliability and cost controls.
            </li>
            <li>
              Respond to support requests, send account notices, and deliver
              requested transactional or marketing emails.
            </li>
            <li>
              Comply with legal obligations, resolve disputes, and enforce our
              Terms of Service.
            </li>
          </ul>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            3. How We Disclose Information
          </h2>
          <p>
            We do not sell personal information, and we do not share personal
            information for cross-context behavioral advertising. We may
            disclose information:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-ink">To service providers</strong> that
              help us operate the Services, including Firebase and Google Cloud
              for authentication and database services, Stripe for payments,
              Anthropic and Google for AI features, Resend for certain email
              delivery, and our infrastructure or hosting vendors.
            </li>
            <li>
              <strong className="text-ink">To payment providers</strong> such
              as Stripe to process charges, subscriptions, refunds, billing
              events, and fraud checks.
            </li>
            <li>
              <strong className="text-ink">To AI providers</strong> such as
              Anthropic and Google when needed to generate responses,
              explanations, or interactive learning tools.
            </li>
            <li>
              <strong className="text-ink">For legal or safety reasons</strong>{" "}
              if we believe disclosure is necessary to comply with law, enforce
              our terms, investigate abuse, or protect users, FinalsPrep, or
              the public.
            </li>
            <li>
              <strong className="text-ink">In a business transfer</strong> such
              as a merger, financing, asset sale, or acquisition, subject to
              customary confidentiality protections.
            </li>
            <li>
              <strong className="text-ink">At your direction</strong> when you
              ask us to share information or connect with a third-party tool.
            </li>
          </ul>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            4. AI Processing and Study Content
          </h2>
          <p>
            When you use AI-powered features, the questions, prompts, attached
            images, and surrounding context you submit may be processed by
            third-party AI providers so we can generate responses. We do not
            use your submitted content to train our own models. Third-party AI
            providers process data under their own terms, privacy policies, and
            retention practices applicable to API or enterprise use.
          </p>
          <p>
            Because FinalsPrep is a study product, we recommend that you avoid
            submitting highly sensitive personal information, student records,
            health information, or third-party information that you are not
            authorized to share.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            5. Cookies, Local Storage, and Similar Technologies
          </h2>
          <p>
            FinalsPrep uses essential browser storage and similar technologies
            to keep the site functioning, remember settings, maintain
            rate-limiting and abuse-prevention identifiers, and preserve study
            state such as theme and flashcard progress.
          </p>
          <p>
            We do not use the Services to serve targeted advertising. We also
            do not knowingly allow third parties to collect personal
            information through the Services for their own cross-site
            advertising purposes. Because there is no consistent industry
            standard for browser &quot;Do Not Track&quot; signals, our Services do not
            currently respond differently to those signals.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            6. Data Retention
          </h2>
          <p>
            We retain information for as long as reasonably necessary to
            provide the Services, maintain account history, comply with legal,
            tax, accounting, and security obligations, resolve disputes, and
            enforce our agreements. Retention periods vary based on the type of
            data, how the Services are used, and applicable legal requirements.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            7. Your Choices and Privacy Rights
          </h2>
          <p>You may have the ability to:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              update certain account information through the Services or your
              authentication provider;
            </li>
            <li>
              unsubscribe from non-essential marketing emails using the link in
              the message;
            </li>
            <li>
              request access to, correction of, export of, or deletion of your
              personal information by contacting us;
            </li>
            <li>
              request cancellation of a subscription through the billing tools
              made available in checkout or receipt emails, or by contacting
              support if you need help.
            </li>
          </ul>
          <p>
            Depending on where you live, you may also have additional rights
            under applicable privacy laws, including rights to know, access,
            correct, delete, or limit certain processing of personal
            information. We will review and respond to verified requests as
            required by applicable law. We do not disclose personal information
            to third parties for their own direct-marketing purposes.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            8. Children&apos;s Privacy
          </h2>
          <p>
            FinalsPrep is intended for students age 13 and older. The Services
            are not directed to children under 13, and we do not knowingly
            collect personal information from children under 13. If you believe
            a child under 13 has provided us personal information, contact us
            at{" "}
            <a
              className="text-orange underline"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>{" "}
            so we can review and, where appropriate, delete the information.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            9. Security
          </h2>
          <p>
            We use administrative, technical, and organizational measures
            designed to protect personal information. No internet or storage
            system is completely secure, however, and we cannot guarantee
            absolute security.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            10. International Transfers
          </h2>
          <p>
            FinalsPrep and our service providers may process and store
            information in the United States and other countries where we or
            they operate. Those locations may have data-protection rules that
            differ from the laws of your jurisdiction.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            11. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. If we make
            material changes, we may provide notice through the Services or by
            email where appropriate. The &quot;Last updated&quot; date above indicates
            when this version became effective.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">12. Contact</h2>
          <p>
            Questions or privacy requests:{" "}
            <a
              className="text-orange underline"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>

          <p className="text-sm text-muted">
            AP, AP Central, Advanced Placement, and College Board are
            trademarks of the College Board. FinalsPrep is not affiliated
            with, endorsed by, or sponsored by the College Board.
          </p>
        </div>
      </article>
    </main>
  );
}
