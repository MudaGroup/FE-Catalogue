import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken');

    // Jika tidak ada token, redirect ke halaman login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Jika ada token, tampilkan halaman admin
    return children;
};

export default ProtectedRoute;
