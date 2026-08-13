import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppFloatingButton } from '../common/WhatsAppFloatingButton';
import { DemoNoticeBanner } from '../common/DemoNoticeBanner';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F5] text-[#2C2422]">
      <DemoNoticeBanner />
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
