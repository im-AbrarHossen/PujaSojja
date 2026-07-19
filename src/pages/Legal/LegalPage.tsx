import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import {
    ShieldAlert,
    FileText,
    RefreshCcw,
    Loader2,
    ChevronRight,
    Clock
} from 'lucide-react';

/**
 * Dynamic Legal Page Component.
 * Renders Privacy Policy, Terms & Conditions, and Refund Policy 
 * by fetching content from Firestore's 'legalPages' collection.
 */
export default function LegalPage() {
    const { slug } = useParams<{ slug: string }>();
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLegalPage = async () => {
            if (!slug) return;

            try {
                setLoading(true);
                // In Firestore, we expect a collection 'legalPages' with docs having ID like 'privacy-policy'
                const docRef = doc(db, 'legalPages', slug);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setContent(docSnap.data());
                } else {
                    setContent(null);
                }
            } catch (error) {
                console.error("Error fetching legal page:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLegalPage();
        window.scrollTo(0, 0); // Scroll to top on page change
    }, [slug]);

    // Helper to get icon based on slug
    const getIcon = () => {
        if (slug?.includes('privacy')) return <ShieldAlert className="text-secondary" size={40} />;
        if (slug?.includes('refund')) return <RefreshCcw className="text-secondary" size={40} />;
        return <FileText className="text-secondary" size={40} />;
    };

    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-primary mb-4" size={40} />
                <p className="text-primary/50 font-medium tracking-widest uppercase text-xs">Loading Document...</p>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">Document Not Found</h2>
                <p className="text-dark-text/60 mb-8">The legal page you are looking for does not exist.</p>
                <Link to="/" className="bg-primary text-secondary px-8 py-3 rounded-xl font-bold">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20 pt-24 md:pt-32">
            <Helmet>
                <title>{content.title} | PujaSojja</title>
                <meta name="description" content={`Official ${content.title} of PujaSojja Premium Religious Store.`} />
            </Helmet>

            <div className="container mx-auto px-4 max-w-4xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary/40 mb-8">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    <span className="text-primary/70">{content.title}</span>
                </nav>

                {/* Page Header */}
                <div className="bg-card rounded-[2.5rem] p-8 md:p-12 shadow-soft border border-primary/5 mb-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                        {getIcon()}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                        <div className="bg-primary/5 p-5 rounded-3xl w-fit">
                            {getIcon()}
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
                                {content.title}
                            </h1>
                            <div className="flex items-center text-sm text-dark-text/40">
                                <Clock size={14} className="mr-2" />
                                <span>Last Updated: {content.updatedAt?.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legal Content */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-soft border border-primary/5">
                    <div
                        className="prose prose-lg prose-primary max-w-none 
              prose-headings:font-serif prose-headings:text-primary 
              prose-p:text-dark-text/70 prose-p:leading-relaxed
              prose-li:text-dark-text/70"
                        dangerouslySetInnerHTML={{ __html: content.body }}
                    />
                </div>

                {/* Footer Note */}
                <div className="mt-12 text-center p-8 border-t border-primary/5">
                    <p className="text-sm text-dark-text/40 mb-4">
                        If you have any questions regarding our policies, please reach out to us.
                    </p>
                    <Link to="/contact" className="text-primary font-bold hover:underline">
                        Contact Support Team
                    </Link>
                </div>
            </div>
        </div>
    );
}