import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from '../common/WhatsAppButton';

/**
 * MainLayout component provides the common structure for public pages.
 * It includes the fixed Navbar at the top and a main content area.
 */
const MainLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Fixed Navigation Bar */}
            <Navbar />

            {/* Main Content Area */}
            {/* 
          Note: Added padding-top (pt-20 to pt-24) to ensure content 
          is not hidden behind the fixed navbar.
      */}
            <main className="flex-grow pt-20 md:pt-24">
                {/* 
            The Outlet component renders the specific page content 
            based on the current route.
        */}
                <Outlet />
            </main>

            {/* 
          Footer will be added here in the next step. 
          For now, we have a simple placeholder or empty space.
      */}
            {/* Premium Footer Section */}
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default MainLayout;