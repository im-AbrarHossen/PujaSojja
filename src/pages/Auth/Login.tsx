import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please enter both email and password.');
            return;
        }

        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login successful! Welcome back.');
            navigate('/'); // Redirect to homepage after login
        } catch (error: any) {
            console.error('Login Error:', error);
            // Customizing Firebase error messages for better UX
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                toast.error('Invalid email or password.');
            } else {
                toast.error('Failed to login. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Helmet>
                <title>Login | PujaSojja - Premium Religious Items</title>
                <meta name="description" content="Login to your PujaSojja account to explore and purchase premium Puja and religious items." />
            </Helmet>

            <div className="bg-card w-full max-w-md rounded-2xl shadow-soft p-8 md:p-10 border border-primary/10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">PujaSojja</h1>
                    <p className="text-dark-text/70">Sign in to your account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-primary mb-2" htmlFor="email">
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
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-primary" htmlFor="password">
                                Password
                            </label>
                            <Link to="/forgot-password" className="text-sm font-medium text-primary hover:text-primary-light transition-colors">
                                Forgot password?
                            </Link>
                        </div>
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

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center py-3 px-4 bg-secondary text-primary font-bold rounded-lg shadow-gold hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                {/* Sign Up Link */}
                <p className="mt-8 text-center text-sm text-dark-text/70">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-semibold text-primary hover:text-primary-light transition-colors">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}