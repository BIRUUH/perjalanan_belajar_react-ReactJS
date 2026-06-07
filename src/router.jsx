import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import Home from "./pages/admin/home";
import Barang from "./pages/admin/barang";
import Kategori from "./pages/admin/kategori";
import Login from "./pages/login";
import NotFound from "./pages/not_found";
import { useAuth } from "./context/AuthContext";

// Komponen Protected Route
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default function AppRoutes() {
    return (
        <Routes>
            {/* Route Login */}
            <Route path="/login" element={<Login />} />

            {/* Nested Route yang dilindungi ProtectedRoute */}
            <Route
                // Protected Route
                path="/"
                element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }
            >
                {/* Route Anak */}
                <Route index element={<Home />} />

                {/* Route Redirect Dashboard */}
                <Route path="dashboard" element={<Navigate to="/" replace />} />

                {/* Route Dasar */}
                <Route path="barang" element={<Barang />} />
                <Route path="kategori" element={<Kategori />} />

                {/* Route Dynamic, Nested Route */}
                <Route path="barang/:id" element={<div>Halaman Detail Barang</div>} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}