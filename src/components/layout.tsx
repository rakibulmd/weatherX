import type { PropsWithChildren } from "react";
import Header from "./header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header></Header>
      <main className="min-h-screen container mx-auto px-4 py-8">{children}</main>
      <footer className="border-t backdrop-blur supports-[backdrop-filter]:bg-opacity-40 bg-background">
        <div className="container mx-auto px-4 py-8 text-center">
          &copy;{new Date().getFullYear()}, All rights reserved
        </div>
      </footer>
    </div>
  );
};

export default Layout;
