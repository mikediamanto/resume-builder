import React from "react";
import Navbar from "./navbar";

type Props = { children: React.ReactNode };

const MainLayout = ({ children }: Props) => {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      {children}
    </main>
  );
};

export default MainLayout;
