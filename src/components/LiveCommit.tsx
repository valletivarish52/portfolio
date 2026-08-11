import { useEffect, useState } from "react";

// Real liveness for the in-development flagship: last commit date from the
// public GitHub API. Renders nothing on any failure. Cached for an hour so
// visitors never burn the unauthenticated rate limit.

function relative(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

export default function LiveCommit({ repo }: { repo: string }) {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    const key = `vv-commit-${repo}`;
    const cached = sessionStorage.getItem(key);
    if (cached) {
      const { at, iso } = JSON.parse(cached);
      if (Date.now() - at < 3600000) {
        setDate(iso);
        return;
      }
    }
    fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((commits) => {
        const iso = commits?.[0]?.commit?.committer?.date;
        if (!iso) return;
        sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), iso }));
        setDate(iso);
      })
      .catch(() => {});
  }, [repo]);

  if (!date) return null;
  return (
    <p className="work-live">
      <span className="work-live-dot" aria-hidden />
      last commit {relative(date)}
    </p>
  );
}
