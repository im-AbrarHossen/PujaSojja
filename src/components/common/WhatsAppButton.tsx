import React from 'react';
import { MessageCircle } from 'lucide-react';

/**
 * WhatsAppButton component - A floating button to contact the store via WhatsApp.
 * Positioned fixed at the bottom right of the screen.
 */
const WhatsAppButton: React.FC = () => {
    // Replace this with your actual WhatsApp number (including country code, e.g., 8801700000000)
    const whatsappNumber = "8801234567890";
    const message = "Hello PujaSojja! I would like to know more about your products.";

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
            aria-label="Contact us on WhatsApp"
        >
            {/* Tooltip Label */}
            <span className="absolute right-full mr-3 bg-white text-dark-text text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-gray-100">
                Need Help? Chat with us
            </span>

            {/* WhatsApp Icon */}
            <MessageCircle size={28} className="md:w-8 md:h-8" />

            {/* Pulse Animation Effect */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10"></span>
        </a>
    );
};

export default WhatsAppButton;