import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const roles = JSON.parse(localStorage.getItem('roles'));

    if (!roles || !roles.includes('admin')) {
        return window.location.href='/';
    }

    return children;
};

export default AdminRoute;
