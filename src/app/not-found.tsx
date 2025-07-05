import Link from "next/link";

import Navbar from "@/components/navbar";
import PlaceholderComponent from "@/components/placeholder-component";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <PlaceholderComponent heading="404" subHeading="Page not found">
        <p className="text-primary mt-1 w-full max-w-96 text-sm tracking-normal text-balance md:text-base">
          The page you are looking for is not found. It could be that you
          entered the wrong URL or the page you are looking for has changed.
        </p>
        <Link href={"/"}>
          <Button className="my-4">Take me home</Button>
        </Link>
      </PlaceholderComponent>
    </>
  );
}
