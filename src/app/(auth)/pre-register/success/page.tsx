"use client";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-5 px-4 text-center">
      <h1 className="text-primary text-2xl font-semibold lg:text-3xl">
        Permintaan Pengajuan Akun Sukses
      </h1>
      <div className="w-full max-w-2xl space-y-2 font-light text-balance">
        <p>
          Untuk menjaga keanggotaan dan aktivitas KJSR tetap aman, setiap
          pendaftaran akun perlu diajukan terlebih dahulu.
        </p>
        <p>
          Setelah kamu mengajukan email, tim admin akan meninjau dan
          memverifikasi apakah kamu layak untuk bergabung. Kalau pengajuan
          disetujui, kamu akan menerima email berisi link untuk melanjutkan
          proses pendaftaran akun.
        </p>
        <p>
          Proses ini bertujuan agar hanya anggota yang terverifikasi yang dapat
          mengakses fitur-fitur khusus dalam sistem KJSR.
        </p>

        <em className="text-xs">
          ⏳ Verifikasi pengajuan biasanya diproses dalam 1-2 hari kerja.
          Pastikan kamu menggunakan email aktif dan sesuai identitas.
        </em>
      </div>

      <Button variant={"link"} className="text-primary h-full p-0 underline">
        <Link href={"/"}>
          <span className="flex items-center gap-1 font-semibold">
            Kembali ke halaman awal <ArrowRight />
          </span>
        </Link>
      </Button>
    </div>
  );
}
