import "../globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

/** Case studies and service pages: the v30 studio shell around them. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-svh flex-col bg-bg font-sans text-fg antialiased">
      <Nav />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
