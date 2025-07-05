import Link from "next/link";

import { FaInstagram, FaYoutube } from "react-icons/fa";

import { cn } from "@/lib/utils";

import BrandLogo from "./brand-logo";
import { Separator } from "./ui/separator";

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer
      className={cn(
        "container-wrapper text-primary w-full space-y-4 px-0 font-sans",
        className
      )}
    >
      <Separator />
      <div className="container mx-auto grid grid-cols-12 items-start gap-4 md:grid-cols-3">
        <div className="col-span-full flex flex-col items-center gap-2 md:col-span-2 md:flex-row">
          <BrandLogo size={120} onFooter />
          <div>
            <h4 className="text-xl font-bold">Informasi Kontak:</h4>
            <p className="text-balance">
              Jl. Teuku Umar No.8, RT.1/RW.1, Gondangdia, Kec. Menteng, Kota
              Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10350
            </p>
            <p>021-3909176</p>
          </div>
        </div>
        <div className="col-span-full mt-3 space-y-2 justify-self-start md:col-span-1 md:mt-0 md:justify-self-end">
          <h4 className="text-xl font-bold">Ikuti kami di Media Sosial!</h4>
          <div className="flex items-center gap-4">
            <Link
              href={"https://www.instagram.com/kjsrindonesia"}
              passHref
              legacyBehavior
            >
              <a target="_blank">
                <FaInstagram size={30} />
              </a>
            </Link>
            <Link
              href={"https://youtube.com/@kjrindonesia4260"}
              passHref
              legacyBehavior
            >
              <a target="_blank">
                <FaYoutube size={30} />
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 text-center">
        Copyright &copy; {new Date().getFullYear()} KJSR Indonesia
      </div>
    </footer>
  );
}
