import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { Mail, Lock, User, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';

export default function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

        // Basic Validations
        if (!fullName || !email || !password || !confirmPassword) {
            toast.error('Please fill in all fields.');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters.');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        try {
            setLoading(true);

            // 1. Create User in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Update Auth Profile with Display Name
            await updateProfile(user, {
                displayName: fullName,
            });

            // 3. Create User Document in Firestore
            // Role is 'user' by default. Admins will be assigned manually in DB.
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                displayName: fullName,
                email: email,
                role: 'user',
                createdAt: serverTimestamp(),
                photoURL: null,
                phoneNumber: null,
                addresses: [],
            });

            toast.success('Account created successfully! Welcome to PujaSojja.');
            navigate('/'); // Redirect to homepage
        } catch (error: any) {
            console.error('Registration Error:', error);
            if (error.code === 'auth/email-already-in-use') {
                toast.error('This email is already registered.');
            } else {
                toast.error('Failed to create account. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Helmet>
                <title>Register | PujaSojja - Join Our Spiritual Community</title>
                <meta name="description" content="Create a PujaSojja account to manage your orders, wishlist, and enjoy a premium shopping experience for religious items." />
            </Helmet>

            <div className="bg-card w-full max-w-md rounded-2xl shadow-soft p-8 md:p-10 border border-primary/10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">PujaSojja</h1>
                    <p className="text-dark-text/70">Create your account</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    {/* Full Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-primary mb-1.5" htmlFor="fullName">
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-primary/50" />
                            </div>
                            <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-gray-50/50 transition-colors"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-primary mb-1.5" htmlFor="email">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-primary/50" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-gray-50/50 transition-colors"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-primary mb-1.5" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-primary/50" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-gray-50/50 transition-colors"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary/50 hover:text-primary transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-primary mb-1.5" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <ShieldCheck className="h-5 w-5 text-primary/50" />
                            </div>
                            <input
                                id="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-gray-50/50 transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center py-3 px-4 bg-secondary text-primary font-bold rounded-lg shadow-gold hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                    >
                        {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                {/* Login Link */}
                <p className="mt-8 text-center text-sm text-dark-text/70">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-primary hover:text-primary-light transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}