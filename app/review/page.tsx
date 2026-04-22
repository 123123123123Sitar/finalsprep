"use client";
import { useEffect } from "react";
import SiteNav from "@/app/components/SiteNav";
import PageLoader from "@/app/components/PageLoader";

export default function ReviewRedirectPage() {
  useEffect(() => {
    window.location.replace("/insights?tab=review");
  }, []);
  return (
    <main className="bg-paper">
      <SiteNav />
      <PageLoader />
    </main>
  );
}
