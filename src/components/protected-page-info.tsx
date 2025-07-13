import PlaceholderComponent from "./placeholder-component";

export default function ProtectedPageInfo() {
  return (
    <PlaceholderComponent heading="Oops!" subHeading="">
      <p className="text-primary mt-1 w-full max-w-96 text-sm tracking-normal text-balance md:text-base">
        Halaman ini hanya bisa diakses oleh pengguna yang sudah login.
      </p>
    </PlaceholderComponent>
  );
}
