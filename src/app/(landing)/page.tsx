import Link from "next/link";

import BannerImage from "@/components/banner-image";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import ArticleList from "../articles/_components/article-list";
import EventList from "../events/_components/event-list";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="container mt-4 mb-4 space-y-4 md:mt-0">
        {/* Deskripsi singkat KJSR */}
        <section className="text-primary grid h-[calc(100vh-56px)] grid-cols-2 items-center gap-4">
          <div className="col-span-full flex h-full flex-col justify-center md:col-span-1">
            <div className="mb-4">
              <h2 className="text-3xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
                Remaja Sehat, Bangsa Kuat.
              </h2>
            </div>
            <p className="font-semibold">Salam Remaja!</p>
            <p className="text-balance">
              Klub Jantung Sehat Remaja Indonesia hadir untuk membentuk generasi
              muda yang{" "}
              <span className="font-semibold">
                sehat, produktif, dan inspiratif
              </span>
              . Mari pelajari gaya hidup sehat dan{" "}
              <span className="font-semibold">jadilah pelopor perubahan!</span>
            </p>
            <div className="mt-4">
              <Button>Gabung Sekarang</Button>
            </div>
          </div>
          <div className="col-span-full md:col-span-1">
            <BannerImage />
          </div>
        </section>

        {/* Event */}
        <section className="space-y-4">
          <div className="w-fit space-y-1">
            <h3 className="text-primary text-lg font-semibold capitalize md:text-2xl">
              Acara Mendatang
            </h3>
            <Separator className="bg-primary h-0.5" />
          </div>
          <EventList sliceStart={0} sliceEnd={3} />
          <Link href={"#"} className="inline-block">
            <Button>Lihat Semua</Button>
          </Link>
        </section>

        {/* Artikel */}
        <section className="space-y-4">
          <div className="w-fit space-y-1">
            <h3 className="text-primary text-lg font-semibold capitalize md:text-2xl">
              Artikel Terbaru
            </h3>
            <Separator className="bg-primary h-0.5" />
          </div>
          <ArticleList sliceStart={0} sliceEnd={3} />
          <Link href={"#"} className="inline-block">
            <Button>Lihat Semua</Button>
          </Link>
        </section>
      </div>

      <Footer />
    </>
  );
}
