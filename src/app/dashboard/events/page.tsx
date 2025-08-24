import UnderConstructionPage from "@/components/under-construction-page";

import SidebarInsetComponent from "../_components/sidebar-inset-component";

export default function SettingsPage() {
  return (
    <SidebarInsetComponent header="Acara">
      <div className="relative flex h-full w-full items-center justify-center">
        <UnderConstructionPage />
      </div>
    </SidebarInsetComponent>
  );
}
