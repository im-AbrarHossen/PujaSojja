import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminRoute() {
    const { user, loading: authLoading } = useAuth();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [roleLoading, setRoleLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAdminRole = async () => {
            if (!user) {
                setRoleLoading(false);
                return;
            }

            try {
                // Fetch user document from Firestore to check their role
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists() && userDocSnap.data().role === 'admin') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error("Error verifying admin role:", error);
                setIsAdmin(false);
            } finally {
                setRoleLoading(false);
            }
        };

        // Only check role when auth state is resolved
        if (!authLoading) {
            checkAdminRole();
        }
    }, [user, authLoading]);

    // 1. Show elegant loader while checking authentication and role
    if (authLoading || roleLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-primary font-medium uppercase tracking-widest text-sm">
                    Verifying Access...
                </p>
            </div>
        );
    }

    // 2. Redirect to login if user is not authenticated at all
    if (!user) {
        toast.error('Please login to access this page.');
        return <Navigate to="/login" replace />;
    }

    // 3. Redirect to home if authenticated user is not an admin
    if (isAdmin === false) {
        toast.error('Access Denied: You do not have admin privileges.');
        return <Navigate to="/" replace />;
    }

    // 4. Render the protected admin nested routes if user is admin
    return <Outlet />;
}