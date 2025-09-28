import SidebarInsetComponent from "@/components/sidebar-inset-component";
import UnderConstructionPage from "@/components/under-construction-page";

export default function SettingsPage() {
  return (
    <SidebarInsetComponent header="Pengaturan">
      <div className="relative flex h-full w-full items-center justify-center">
        <UnderConstructionPage />
      </div>
    </SidebarInsetComponent>
  );
}
