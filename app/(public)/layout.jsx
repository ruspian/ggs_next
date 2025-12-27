import { Header } from "@/components/ui/navbar";

export default function PublicLayout({ children }) {
  return (
    <div className="mx-auto w-full flex justify-center">
      <Header />
      {children}
    </div>
  );
}
