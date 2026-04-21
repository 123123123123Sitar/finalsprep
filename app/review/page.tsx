"use client";
import { useEffect, useState } from "react";
import SiteNav from "@/app/components/SiteNav";
import MathRender from "@/app/components/Math";
import { useAuth } from "@/app/components/AuthProvider";
import {
  listWrongBank,
  removeFromWrongBank,
  type WrongBankEntry,
} from "@/lib/wrongBank";
import PageLoader from "@/app/components/PageLoader";
import WrongBankSrsMode from "@/app/components/WrongBankSrsMode";

export default function ReviewPage() {
  const { user, loading, plan } = useAuth();
  const [entries, setEntries] = useState<WrongBankEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/signin?next=/review";
    }
  }, [loading, user]);

  useEffect(() => {
    if (!user) return;
    listWrongBank(user.uid)
      .then(setEntries)
      .finally(() => setLoaded(true));
  }, [user]);

  async function remove(id: string) {
    if (!user) return;
    const ok = await removeFromWrongBank(user.uid, id);
    if (ok) setEntries((e) => e.filter((x) => x.id !== id));
  }

  if (loading || !user) {
    return (
      <main className="bg-paper">
        <SiteNav>
        </SiteNav>
        <PageLoader />
      </main>
    );
  }

  return (
    <main className="bg-paper text-body">
      <SiteNav>
      </SiteNav>
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="label mb-3">Review</div>
        <h1 className="font-serif text-4xl font-normal text-ink">
          Problems you got wrong.
        </h1>
        <p className="mt-3 max-w-xl text-[15px] text-muted">
          Spaced repetition: these are the practice problems you saved while
          studying. Come back to them in a day or two and try to solve them
          without peeking at the answer.
        </p>

        {plan === "learner" && (
          <div className="mt-8 rounded-md border border-orange/40 bg-orange-tint p-4 text-sm text-body">
            Saving problems to the review bank is a Pro feature. Upgrade
            to start building your wrong-answer library.
          </div>
        )}

        {loaded && entries.length === 0 && plan !== "learner" && (
          <div className="mt-10 rounded-md border border-dashed border-hair bg-offwhite p-8 text-center text-sm text-muted">
            You haven't saved any problems yet. On any practice problem, tap{" "}
            <strong className="text-ink">Save for review</strong> to add it
            here.
          </div>
        )}

        {loaded && plan !== "learner" && (
          <div className="mt-8">
            <WrongBankSrsMode />
          </div>
        )}

        <div className="mt-8 space-y-5">
          {entries.map((e) => (
            <ReviewCard key={e.id} entry={e} onRemove={() => remove(e.id)} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ReviewCard({
  entry,
  onRemove,
}: {
  entry: WrongBankEntry;
  onRemove: () => void;
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="rounded-lg border border-hair bg-paper p-5">
      <div className="flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-wider text-muted">
          {entry.courseSlug} · unit {entry.unitNumber} · {entry.difficulty}
        </div>
        <button
          onClick={onRemove}
          className="text-xs text-muted hover:text-red-600"
          title="Remove from review bank"
        >
          Remove
        </button>
      </div>
      <div className="mt-2 whitespace-pre-wrap text-[15px] text-ink">
        <MathRender auto>{entry.prompt}</MathRender>
      </div>
      <button
        onClick={() => setShowAnswer((x) => !x)}
        className="mt-4 rounded-md border border-hair bg-offwhite px-3 py-1 text-xs text-ink hover:border-orange"
      >
        {showAnswer ? "Hide answer" : "Show answer"}
      </button>
      {showAnswer && (
        <>
          <div className="mt-3 rounded-md border border-hair bg-offwhite p-3 text-[13px] text-ink">
            <strong className="font-semibold">Answer: </strong>
            <MathRender auto>{entry.answer}</MathRender>
          </div>
          <div className="mt-3 border-l-2 border-orange pl-4 text-[13.5px] text-body">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
              Walkthrough
            </div>
            <div className="whitespace-pre-wrap font-sans">
              <MathRender auto>{entry.explanation}</MathRender>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
