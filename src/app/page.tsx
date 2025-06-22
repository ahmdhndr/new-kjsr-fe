import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="prose mx-auto">
        <section className="mx-auto my-4 flex flex-col items-center justify-center">
          <h1 className="text-xl font-bold text-balance md:text-3xl">
            Next.js Starter
          </h1>
          <p className="text-muted-foreground !my-0 w-full max-w-lg">
            A basic starter for Next.js with Tailwind CSS, Shadcn
            (initialization) and Typescript. <br />
            Start by editing{" "}
            <code className="rounded bg-black/5 px-1 py-0.5 font-semibold dark:bg-white/6">
              src/app/page.tsx
            </code>
            .
          </p>
          <Button>Yow</Button>
          <p>
            See{" "}
            <Link
              href={"https://github.com/ahmdhndr/nextjs-starter-shadcn"}
              target="_blank"
              className="font-mono"
            >
              Github Repo
            </Link>{" "}
            for further information.
          </p>
        </section>
      </div>
    </div>
  );
}
