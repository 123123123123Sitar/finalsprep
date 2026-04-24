"use client";
import { useEffect } from "react";
import SiteNav from "@/app/components/SiteNav";
import PageLoader from "@/app/components/PageLoader";
import { useAuth } from "@/app/components/AuthProvider";

/**
 * Self-view shortcut: forwards the signed-in user to their canonical
 * public profile at /users/{uid}. Keeping this page tiny means there's
 * one source of truth for the rendered profile, while "/profile" stays
 * available as a share-friendly URL.
 */
export default function ProfilePage() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      window.location.replace("/signin?next=/profile");
      return;
    }
    window.location.replace(`/users/${user.uid}`);
  }, [user, loading]);

  return (
    <main className="bg-paper text-body">
      <SiteNav />
      <PageLoader />
    </main>
  );
}
