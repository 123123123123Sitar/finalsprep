"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";
import {
  listWrongBank,
  removeFromWrongBank,
  type WrongBankEntry,
} from "@/lib/wrongBank";
import WrongBankSrsMode from "@/app/components/WrongBankSrsMode";
import { ProblemCard } from "@/app/components/PracticeProblems";
import type { PracticeProblem } from "@/lib/practice/types";

function toPracticeProblem(entry: WrongBankEntry): PracticeProblem {
  const d = entry.difficulty;
  const difficulty: PracticeProblem["difficulty"] =
    d === "easy" || d === "medium" || d === "hard" ? d : "medium";
  return {
    difficulty,
    prompt: entry.prompt,
    answer: entry.answer,
    explanation: entry.explanation,
  };
}

export default function ReviewPanel() {
  const { user, plan, getIdToken } = useAuth();
  const [entries, setEntries] = useState<WrongBankEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const canAiGrade = plan === "hacker";

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

  return (
    <div>
      <p className="max-w-xl text-[15px] text-muted">
        Spaced repetition: these are the practice problems you saved while
        studying. Try each one again without peeking; use the whiteboard,
        hints, and walkthrough the same way you would in practice.
      </p>

      {plan === "learner" && (
        <div className="mt-6 rounded-md border border-orange/40 bg-orange-tint p-4 text-sm text-body">
          Saving problems to the review bank is a Pro feature. Upgrade to
          start building your wrong-answer library.
        </div>
      )}

      {loaded && entries.length === 0 && plan !== "learner" && (
        <div className="mt-8 rounded-md border border-dashed border-hair bg-offwhite p-8 text-center text-sm text-muted">
          You haven't saved any problems yet. On any practice problem, tap{" "}
          <strong className="text-ink">Save for review</strong> to add it
          here.
        </div>
      )}

      {loaded && plan !== "learner" && entries.length > 0 && (
        <div className="mt-6">
          <WrongBankSrsMode />
        </div>
      )}

      <div className="mt-6 space-y-5">
        {entries.map((entry, idx) => (
          <ProblemCard
            key={entry.id}
            problem={toPracticeProblem(entry)}
            index={idx}
            courseSlug={entry.courseSlug}
            unitNumber={entry.unitNumber}
            canWrongBank={false}
            canAiGrade={canAiGrade}
            getIdToken={getIdToken}
            labelOverride={`${entry.courseSlug} : unit ${entry.unitNumber}`}
            problemKey={`review:${entry.id}`}
            onRemove={() => remove(entry.id)}
          />
        ))}
      </div>
    </div>
  );
}
