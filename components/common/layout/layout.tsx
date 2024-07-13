import React, { ReactNode } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-full ">
      <Header />
      <main className="min-h-[90vh] flex-1">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
