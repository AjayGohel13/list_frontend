import { Navigate } from 'react-router-dom';
import React from 'react';
import { isAuthenticated } from '../lib/utils';

interface ProtectedRouteProps {
    children: React.ReactNode;
}
export const PublicOnlyRoute = ({ children }: ProtectedRouteProps) => {
    return isAuthenticated() ? <Navigate to="/" replace /> : children;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    return isAuthenticated() ? children : <Navigate to="/sign-in" replace />;
}