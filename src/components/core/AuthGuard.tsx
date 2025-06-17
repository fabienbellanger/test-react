import { Navigate, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';

interface AuthGuardProps {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated() && location.pathname !== '/login') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
