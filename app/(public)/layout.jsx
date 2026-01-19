import Footer from "@/components/ui/footer-1";
import { Header } from "@/components/ui/navbar";

export const metadata = {
  title: "Gorontalo Green School",
  description: "Website Gorontalo Green School",
};
export default function PublicLayout({ children }) {
  return (
    <div className="mx-auto w-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
