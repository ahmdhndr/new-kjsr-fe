import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { blurDataURL } from "@/lib/blur-data-image-url";
import { getTimeDifference } from "@/lib/get-time-difference";

import { EventDTO } from "../_dtos/event.dto";

export default function EventItemCard({
  title,
  slug,
  excerpt,
  author,
  image_url,
  category,
  events_date,
}: EventDTO) {
  const imageUrl = image_url ? image_url : "/images/og.jpg";
  return (
    <Card className="text-primary hover:bg-primary/10 relative overflow-hidden p-0 shadow-lg">
      <CardHeader className="p-0">
        <Image
          src={imageUrl}
          alt={title}
          width={1280}
          height={720}
          quality={90}
          placeholder="blur"
          blurDataURL={blurDataURL}
          className="block aspect-video h-full object-cover object-center"
        />
        <div className="!mt-0 p-4">
          <CardTitle className="line-clamp-2">
            <Link href={`/events/${slug}`}>
              <span className="absolute inset-0"></span>
              {title}
            </Link>
          </CardTitle>
          <CardDescription className="mt-1">
            <span className="text-muted-foreground">oleh: </span>
            {author}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <p className="line-clamp-3 min-h-[72px] text-balance">{excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between px-4 pt-0 pb-4 text-sm">
        <p className="capitalize">{category}</p>
        {getTimeDifference(events_date)}
      </CardFooter>
    </Card>
  );
}
