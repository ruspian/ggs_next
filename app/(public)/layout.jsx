import Footer from "@/components/ui/footer-1";
import { Header } from "@/components/ui/navbar";

export default function PublicLayout({ children }) {
  return (
    <div className="mx-auto w-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
