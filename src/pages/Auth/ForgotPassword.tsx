import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { Mail, ArrowLeft, Loader2, Send } from 'lucide-react';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleResetPassword = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error('Please enter your email address.');
            return;
        }

        try {
            setLoading(true);
            await sendPasswordResetEmail(auth, email);
            setEmailSent(true);
            toast.success('Password reset email sent! Please check your inbox.');
        } catch (error: any) {
            console.error('Reset Password Error:', error);
            if (error.code === 'auth/user-not-found') {
                toast.error('No account found with this email.');
            } else {
                toast.error('Failed to send reset email. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Helmet>
                <title>Forgot Password | PujaSojja</title>
                <meta name="description" content="Reset your PujaSojja account password securely." />
            </Helmet>

            <div className="bg-card w-full max-w-md rounded-2xl shadow-soft p-8 md:p-10 border border-primary/10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">PujaSojja</h1>
                    <p className="text-dark-text/70">Reset your password</p>
                </div>

                {!emailSent ? (
                    <>
                        <p className="text-sm text-dark-text/60 mb-6 text-center">
                            Enter the email address associated with your account and we'll send you a link to reset your password.
                        </p>
                        <form onSubmit={handleResetPassword} className="space-y-6">
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

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center py-3 px-4 bg-secondary text-primary font-bold rounded-lg shadow-gold hover:bg-secondary-light transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        <Send className="h-4 w-4 mr-2" />
                                        Send Reset Link
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center">
                        <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6 text-sm">
                            If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.
                        </div>
                        <button
                            onClick={() => setEmailSent(false)}
                            className="text-primary font-medium hover:underline text-sm"
                        >
                            Didn't receive email? Try again
                        </button>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-light transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}