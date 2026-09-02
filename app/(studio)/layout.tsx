import { Background } from "@/components/Background";

/** The studio shell keeps the dark bio-scan backdrop. Product rooms do not. */
export default function StudioLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Background />
      {children}
    </>
  );
}
