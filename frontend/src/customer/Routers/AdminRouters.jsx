import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Admin from '../../Admin/Admin';
import { useSelector } from 'react-redux';

const AdminRoutes = () => {
    const { user } = useSelector(state => state.auth);
    const {currentState} = useSelector(state=>state.products);
    const isAdmin = user && user.role === 'ADMIN';
    console.log("admin routes page hai", isAdmin);
    console.log(currentState, 'current state');

    return (
        <Routes>
            {isAdmin ? (
                <Route path="/*" element={<Admin/>} />
            ) : (
                <Route path="/*" element={<Navigate to="/" replace />} />
            )}
        </Routes>
    );
};

export default AdminRoutes;