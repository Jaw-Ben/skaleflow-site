import Navbar from "@/components/Navbar";

export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar home="dev" />
      {children}
    </>
  );
}