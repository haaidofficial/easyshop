import { Navigate } from 'react-router-dom';
import { useUserAuthContext } from '../../contexts/AuthProvider';

export function ProtectedRoute({ children }) {
    let { user } = useUserAuthContext();
    if (!user) {
        return <Navigate to='/' />;
    }

    return children;

}