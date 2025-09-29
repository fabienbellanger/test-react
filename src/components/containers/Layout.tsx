import NavBar from './NavBar';
import { Outlet } from 'react-router';
import TasksProvider from '../providers/TasksProvider';
import { useRef } from 'react';
import Drawer from './Drawer';

/**
 * Application layout component
 *
 */
export default function Layout() {
    const drawerRef = useRef<HTMLInputElement>(null);
    const close = () => {
        drawerRef.current?.click();
    };

    return (
        <TasksProvider>
            <div className="drawer xl:drawer-open">
                <input ref={drawerRef} id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />

                <Drawer onClose={() => close()} />

                <div className="drawer-content flex flex-col min-h-screen bg-base-100">
                    <NavBar title="My React App" />

                    <Outlet />
                </div>
            </div>
        </TasksProvider>
    );
}
