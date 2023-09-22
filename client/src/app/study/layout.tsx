'use client';

import Header from "@/components/Header/Header";
import "./globals.css";


export default function StudyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Content>
        {children}
      </Content>
      <Footer />
    </>
  );
}