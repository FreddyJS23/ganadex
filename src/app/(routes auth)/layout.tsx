import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export default function RootLayoutAuth({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen grid grid-cols-12 grid-rows-[6rem,1fr] md:grid-cols-[3rem,repeat(11,1fr)] lg:grid-cols-[11rem,repeat(11,1fr)]  ">
        <header className="col-span-1 row-span-full">
          <Sidebar android={false} />
        </header>
        <nav className="col-span-full row-span-1 z-50 sm:col-start-2  lg:mx-5  ">
          <Navbar />
        </nav>
        <main className="col-span-full row-start-2 sm:col-start-2 md:p-4 lg:mx-7  ">
          {children}
          {modal}
        </main>
      </div>
    </>
  );
}
