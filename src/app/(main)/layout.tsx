import React from "react";
import Navbar from "./navbar";
import PremiumModal from "@/components/premium/premium-modal";

type Props = { children: React.ReactNode };

const MainLayout = ({ children }: Props) => {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      {children}
      <PremiumModal />
    </main>
  );
};

export default MainLayout;
