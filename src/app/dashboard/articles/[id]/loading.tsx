import SidebarInsetComponent from "@/components/sidebar-inset-component";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SidebarInsetComponent header={<Skeleton className="h-10 w-1/2" />}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <section className="space-y-4 md:col-span-2">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <div className="mt-4 flex flex-col gap-2">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-40 w-full rounded-md" />
            <Skeleton className="h-40 w-full rounded-md" />
          </div>
        </section>
        <section className="space-y-4 md:col-span-1">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />

          {/* Buttons */}
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </section>
      </div>
    </SidebarInsetComponent>
  );
}
