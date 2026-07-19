import React from 'react';
import { Star, Quote } from 'lucide-react';

// Mock Data for Reviews (Future: Fetch from Firestore)
const reviews = [
    {
        id: '1',
        name: 'Ananya Sharma',
        location: 'Dhaka',
        rating: 5,
        comment: 'The quality of the Ganesha idol I purchased is exceptional. The craftsmanship is divine and it was delivered with great care. Highly recommended!',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
    },
    {
        id: '2',
        name: 'Rajesh Kumar',
        location: 'Chittagong',
        rating: 5,
        comment: 'I ordered a complete Puja Thali set for Diwali. The copper quality is premium and the gold finish looks very royal. It added elegance to our rituals.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    },
    {
        id: '3',
        name: 'Priya Das',
        location: 'Sylhet',
        rating: 4,
        comment: 'The incense sticks have such a calming fragrance. It truly creates a spiritual atmosphere at home. Fast delivery and beautiful packaging.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
    }
];

export default function Reviews() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-4">
                        <Quote className="text-secondary/30 h-12 w-12" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                        Voices of Devotion
                    </h2>
                    <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
                    <p className="text-dark-text/70 max-w-2xl mx-auto">
                        Our customers' satisfaction is our greatest blessing. Here is what our community has to say about their PujaSojja experience.
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-card p-8 rounded-2xl shadow-soft border border-primary/5 relative hover:-translate-y-2 transition-transform duration-300"
                        >
                            {/* Stars */}
                            <div className="flex items-center space-x-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={`${i < review.rating ? 'text-secondary fill-secondary' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-dark-text/80 italic leading-relaxed mb-8">
                                "{review.comment}"
                            </p>

                            {/* User Info */}
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary/50">
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary text-sm">{review.name}</h4>
                                    <p className="text-xs text-primary/50 font-medium">{review.location}</p>
                                </div>
                            </div>

                            {/* Background Accent */}
                            <div className="absolute top-4 right-8 opacity-[0.03] pointer-events-none">
                                <Quote size={80} className="text-primary" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Google Rating Summary (Optional/Static) */}
                <div className="mt-16 flex flex-col items-center justify-center border-t border-primary/5 pt-12">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="text-4xl font-bold text-primary">4.9</span>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={20} className="text-secondary fill-secondary" />
                            ))}
                        </div>
                    </div>
                    <p className="text-sm text-dark-text/50 font-medium">
                        Average customer rating based on 1,200+ reviews
                    </p>
                </div>

            </div>
        </section>
    );
}