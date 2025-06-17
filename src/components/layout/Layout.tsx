import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router';
import TasksProvider from '../providers/TasksProvider';
import AuthGuard from './AuthGuard';

/**
 * Application layout component
 *
 */
export default function Layout() {
    return (
        <AuthGuard>
            <TasksProvider>
                <div className="flex flex-col min-h-screen bg-base-100">
                    <NavBar title="My App" />
                    <Outlet />

                    <Footer />
                </div>
            </TasksProvider>
        </AuthGuard>
    );
}
