import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageSquare,
    Clock,
    Loader2,
    CheckCircle2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

/**
 * Premium Contact Page for PujaSojja.
 * Includes a functional contact form, contact information cards, and Google Maps.
 */
export default function Contact() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulating a form submission (Future: Integrate with Firebase or EmailJS)
        setTimeout(() => {
            toast.success('Your message has been sent successfully! We will get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setLoading(false);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: Phone,
            title: "Call Us",
            details: "+880 1234 567 890",
            subtext: "Mon-Sat, 9am - 8pm"
        },
        {
            icon: Mail,
            title: "Email Us",
            details: "support@pujasojja.com",
            subtext: "24/7 Support Response"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            details: "123 Temple Road, Spiritual Plaza",
            subtext: "Dhaka, Bangladesh"
        }
    ];

    return (
        <div className="min-h-screen bg-background pb-20 pt-24 md:pt-32">
            <Helmet>
                <title>Contact Us | PujaSojja - Get in Touch</title>
                <meta name="description" content="Contact PujaSojja for any inquiries about our premium religious and puja items. We are here to help." />
            </Helmet>

            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Let's <span className="text-secondary italic">Connect</span></h1>
                    <p className="text-dark-text/70 text-lg leading-relaxed">
                        Have questions about our sacred collections or need help with your order? Our team is dedicated to assisting you on your spiritual journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                    {/* Contact Details Cards */}
                    {contactInfo.map((info, idx) => (
                        <div key={idx} className="bg-card p-8 rounded-3xl shadow-soft border border-primary/5 text-center group hover:shadow-gold transition-all duration-300">
                            <div className="bg-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-secondary transition-all">
                                <info.icon size={32} className="text-primary group-hover:text-secondary" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-primary mb-2">{info.title}</h3>
                            <p className="text-primary font-bold mb-1">{info.details}</p>
                            <p className="text-sm text-dark-text/50">{info.subtext}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <div className="bg-card p-8 md:p-12 rounded-[2.5rem] shadow-soft border border-primary/5">
                        <div className="mb-8">
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary flex items-center gap-3">
                                <MessageSquare className="text-secondary" /> Send Message
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-primary/70 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-background border border-gray-100 rounded-xl focus:outline-none focus:border-secondary transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-primary/70 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-background border border-gray-100 rounded-xl focus:outline-none focus:border-secondary transition-colors"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-primary/70 mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-background border border-gray-100 rounded-xl focus:outline-none focus:border-secondary transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-primary/70 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full px-4 py-3 bg-background border border-gray-100 rounded-xl focus:outline-none focus:border-secondary transition-colors resize-none"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-secondary py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-primary-light transition-all shadow-gold disabled:opacity-70"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={24} />
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Map Section */}
                    <div className="h-full min-h-[450px] bg-card rounded-[2.5rem] shadow-soft border border-primary/5 overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-gray-50 flex items-center gap-3">
                            <Clock className="text-secondary" />
                            <div>
                                <h3 className="font-bold text-primary">Operational Hours</h3>
                                <p className="text-xs text-dark-text/50">Visit our store to experience the collection in person.</p>
                            </div>
                        </div>

                        {/* Google Maps Embed (Replace with your actual location embed link) */}
                        <div className="flex-grow">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.8318788931!2d90.3372879555355!3d23.780887457176508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa569fd24040974!2sDhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                                className="w-full h-full grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}