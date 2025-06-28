import { Suspense } from "react";

import VerifyClientPage from "../../_components/verify-client-page";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyClientPage />
    </Suspense>
  );
}
