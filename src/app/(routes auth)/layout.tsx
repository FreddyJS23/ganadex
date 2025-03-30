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
      <div className=" grid grid-cols-12">
        <header className="col-span-2">
          <Sidebar android={false} />
        </header>
        <nav className="col-span-full z-50 sm:col-start-3 sm:col-end-12 lg:translate-x-6">
          <Navbar />
        </nav>
        <main className="mt-2 sm:col-start-2 lg:mt-0 lg:col-start-3 col-span-full ">
          {children}
          {modal}
        </main>
      </div>
    </>
  );
}
