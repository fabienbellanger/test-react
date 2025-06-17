import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router';
import TasksProvider from '../providers/TasksProvider';

/**
 * Application layout component
 *
 */
export default function Layout() {
    return (
        <TasksProvider>
            <div className="flex flex-col min-h-screen bg-base-100">
                <NavBar title="My App" />
                <Outlet />

                <Footer />
            </div>
        </TasksProvider>
    );
}
