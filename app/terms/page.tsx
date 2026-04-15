import SiteNav from "@/app/components/SiteNav";

export const metadata = {
  title: "Terms of Service - FinalsPrep",
  description: "The terms that apply when you use FinalsPrep.",
};

export default function TermsPage() {
  return (
    <main className="bg-paper text-body">
      <SiteNav>
        <a href="/study" className="nav-link">Study</a>
        <a href="/" className="nav-link">Home</a>
      </SiteNav>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="label mb-3">Legal</div>
        <h1 className="font-serif text-5xl font-normal leading-tight text-ink">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: April 13, 2026</p>

        <div className="prose-body mt-10 space-y-6">
          <p>
            By using FinalsPrep you agree to these terms. This is an
            indie-scale product, the terms are short, and we're trying to
            be fair.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            1. What the service is
          </h2>
          <p>
            FinalsPrep is an AI tutor for math, physics, computer science,
            and history. It gives you explanations and practice help. It
            is not a substitute for a teacher, not a guarantee of any
            grade, and not a source of verified fact - the AI can be
            wrong. You are responsible for checking its work.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">2. Account</h2>
          <p>
            You must be at least 13 to create an account. If you're under
            18, a parent or guardian should be aware you're using it and
            paying for it. You're responsible for keeping your password
            secure.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            3. Acceptable use
          </h2>
          <p>Don't:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Share your account with anyone.</li>
            <li>
              Use FinalsPrep to cheat on exams, quizzes, or assignments
              where your school or teacher has told you AI help is not
              allowed.
            </li>
            <li>
              Try to reverse-engineer, scrape, or resell the product.
            </li>
            <li>
              Hammer the API with automated scripts beyond normal use.
            </li>
          </ul>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            4. Subscriptions and refunds
          </h2>
          <p>
            The free tier is free. The $9/month and $50/year Pro plans are
            charged via Stripe and renew automatically until you cancel.
            You can cancel any time from your Stripe receipt email.
          </p>
          <p>
            Refunds: if you're unhappy within 7 days of your first
            payment, email{" "}
            <a className="text-orange underline" href="mailto:finalsprephelp@gmail.com">
              finalsprephelp@gmail.com
            </a>{" "}
            and we will refund the last charge, no questions asked. After
            that, you can cancel to stop future charges but we don't
            refund partial months.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            5. Usage limits
          </h2>
          <p>
            The free tier has a 5-hour sliding token budget. The Pro tier
            has a much larger budget designed to be unlimited for any
            reasonable human usage, but we reserve the right to rate-limit
            individual accounts that appear to be abusing the system
            (e.g., running automated scripts, sharing across many people,
            or generating many thousands of messages per day).
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            6. Content you submit
          </h2>
          <p>
            You keep ownership of the problems you paste in. By submitting
            them you grant us a limited license to process them to
            generate a response and to store them in your chat history so
            you can access them later.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            7. No warranty
          </h2>
          <p>
            FinalsPrep is provided "as is". We make no warranty that it
            will be accurate, uninterrupted, or fit for a particular
            purpose. If the AI gets a problem wrong and you lose points
            because of it, that's unfortunate but not our liability.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">
            8. Termination
          </h2>
          <p>
            You can delete your account any time. We can terminate
            accounts that violate these terms; if we do, we will refund
            any unused portion of the current billing period pro rata.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">9. Changes</h2>
          <p>
            If we update these terms, the date at the top changes and
            accounts get notified. Continued use after the update means
            you accept the new terms.
          </p>

          <h2 className="mt-10 font-serif text-2xl text-ink">10. Contact</h2>
          <p>
            <a className="text-orange underline" href="mailto:finalsprephelp@gmail.com">
              finalsprephelp@gmail.com
            </a>
          </p>
        </div>
      </article>
    </main>
  );
}
