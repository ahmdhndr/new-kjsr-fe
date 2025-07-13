import React from "react";

interface Props {
  heading?: string;
  subHeading?: string;
  children?: React.ReactNode;
}

export default function PlaceholderComponent({
  heading = "Heading",
  subHeading = "Sub Heading",
  children,
}: Props) {
  return (
    <div className="static md:absolute md:top-0 md:right-0 md:bottom-0 md:left-0">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center p-4">
        <div className="prose dark:prose-invert mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-primary my-0 self-center text-5xl font-extrabold tracking-tight uppercase md:text-7xl">
              {heading}
            </h1>
            <div className="self-center">
              <h2 className="text-destructive my-0 text-xl font-semibold uppercase md:text-2xl">
                {subHeading}
              </h2>
            </div>
            <div className="bg-destructive h-0.5 w-full" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
