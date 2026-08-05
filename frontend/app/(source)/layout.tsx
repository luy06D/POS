
import ShoppingStore from "@/components/cart/shoppingStore";
import MainNav from "@/components/ui/MainNav";
import TostifyNotification from "@/components/ui/ToastNotification";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <MainNav/>
      <main className="lg:flex  lg:h-screen lg:overflow-y-hidden">
          <div className="md:flex-1 md:h-screen md:overflow-y-scroll pt-10  pb-32 px-10">
              {children}
          </div> 
          <aside className="md:w-96 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-5 bg-white ">
             <ShoppingStore/>
          </aside>
      </main>
      <TostifyNotification/>
    </>
  );
}