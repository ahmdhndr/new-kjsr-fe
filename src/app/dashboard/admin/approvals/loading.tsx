import SidebarInsetComponent from "@/components/sidebar-inset-component";
import SkeletonTable from "@/components/skeleton-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function PreapprovalLoader() {
  return (
    <SidebarInsetComponent header={<Skeleton className="h-4 w-20" />}>
      <section className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <div className="order-2 md:order-1">
          <Skeleton className="h-9 w-56" />
        </div>
        <div className="order-1 flex items-center gap-1 md:order-2">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="hidden h-9 w-16 lg:block" />
        </div>
      </section>
      <SkeletonTable columns={3} />
    </SidebarInsetComponent>
  );
}
