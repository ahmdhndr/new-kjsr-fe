import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useRedirectCountdown(seconds: number, redirectTo: string) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(seconds);

  useEffect(() => {
    if (countdown === 0) {
      router.push(redirectTo);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }); // hanya observe countdown

  return formatTime(countdown);
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
