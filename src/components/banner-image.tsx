import Image from "next/image";

import { blurDataURL } from "@/lib/blur-data-image-url";
import { cn } from "@/lib/utils";

export default function BannerImage(props: { className: string }) {
  const { className } = props;
  return (
    <div className={cn("grid grid-cols-7 gap-1", className)}>
      {/* Row 1 */}
      <div className="aspect-square overflow-hidden rounded-md"></div>
      <div className="aspect-square overflow-hidden rounded-md">
        <Image
          src={"/images/banner/banner-19.jpg"}
          alt="Logo"
          width={200}
          height={200}
          quality={90}
          className="h-full object-cover object-center"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      <div className="aspect-square overflow-hidden rounded-md">
        <Image
          src={"/images/banner/banner-4.jpg"}
          alt="Logo"
          width={200}
          height={200}
          quality={90}
          className="h-full object-cover object-center"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      <div className="aspect-square overflow-hidden rounded-md"></div>
      <div className="aspect-square overflow-hidden rounded-md">
        <Image
          src={"/images/banner/banner-1.jpg"}
          alt="Logo"
          width={200}
          height={200}
          quality={90}
          className="h-full object-cover object-center"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      <div className="aspect-square overflow-hidden rounded-md">
        <Image
          src={"/images/banner/banner-6.jpg"}
          alt="Logo"
          width={200}
          height={200}
          quality={90}
          className="h-full object-cover object-center"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      <div className="aspect-square overflow-hidden rounded-md"></div>

      {/* Row 2 */}
      <div className="aspect-square overflow-hidden rounded-md">
        <Image
          src={"/images/banner/banner-7.jpg"}
          alt="Logo"
          width={200}
          height={200}
          quality={90}
          className="h-full object-cover object-center"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      <div className="col-span-5 row-span-3 aspect-auto overflow-hidden rounded-md">
        <Image
          src={"/images/banner/banner-5.jpg"}
          alt="Banner 1"
          width={1920}
          height={1080}
          quality={90}
          className="h-full object-cover object-center"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      <div className="aspect-square overflow-hidden rounded-md">
        <Image
          src={"/images/banner/banner-8.jpg"}
          alt="Logo"
          width={200}
          height={200}
          quality={90}
          className="h-full object-cover object-center"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>

      {/* Row 3 */}
      <div className="aspect-square overflow-hidden rounded-md">
        <Image
          src={"/images/banner/banner-9.jpg"}
          alt="Logo"
          width={200}
          height={200}
          quality={90}
          className="h-full object-cover object-center"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>

      {/* Row 4 */}
      <div className="aspect-square overflow-hidden rounded-md">
        <Image
          src={"/images/banner/banner-10.jpg"}
          alt="Logo"
          width={200}
          height={200}
          quality={90}
          className="h-full object-cover object-center"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      <div className="aspect-square overflow-hidden rounded-md"></div>

      {/* Row 5 */}
      <div className="aspect-square overflow-hidden rounded-md"></div>
      <div className="aspect-square overflow-hidden rounded-md"></div>
      <div className="aspect-square overflow-hidden rounded-md"></div>
      <div className="aspect-square overflow-hidden rounded-md">
        <Image
          src={"/images/banner/banner-11.jpg"}
          alt="Logo"
          width={200}
          height={200}
          quality={90}
          className="h-full object-cover object-center"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      <div className="aspect-square overflow-hidden rounded-md">
        <Image
          src={"/images/banner/banner-12.jpg"}
          alt="Logo"
          width={200}
          height={200}
          quality={90}
          className="h-full object-cover object-center"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      <div className="aspect-square overflow-hidden rounded-md">
        <Image
          src={"/images/banner/banner-13.jpg"}
          alt="Logo"
          width={200}
          height={200}
          quality={90}
          className="h-full object-cover object-center"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      <div className="aspect-square overflow-hidden rounded-md"></div>
      <div className="aspect-square overflow-hidden rounded-md"></div>

      {/* Row 6 */}
      <div className="aspect-square overflow-hidden rounded-md"></div>
      <div className="aspect-square overflow-hidden rounded-md"></div>
      <div className="aspect-square overflow-hidden rounded-md"></div>
      <div className="aspect-square overflow-hidden rounded-md">
        <Image
          src={"/images/banner/banner-14.jpg"}
          alt="Logo"
          width={200}
          height={200}
          quality={90}
          className="h-full object-cover object-center"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      <div className="aspect-square overflow-hidden rounded-md"></div>
      <div className="aspect-square overflow-hidden rounded-md"></div>
      <div className="aspect-square overflow-hidden rounded-md"></div>
    </div>
  );
}
