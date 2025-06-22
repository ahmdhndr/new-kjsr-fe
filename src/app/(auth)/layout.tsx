export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="relative flex min-h-screen flex-col">{children}</div>;
}
