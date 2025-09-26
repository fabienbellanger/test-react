import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router';
import TasksProvider from '../providers/TasksProvider';
import { useRef } from 'react';
import { MdClose, MdGraphicEq, MdLockClock, MdPerson, MdRocket } from 'react-icons/md';

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
                <div className="drawer-side z-30">
                    <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>

                    <div className="pt-2 w-60 bg-base-200 min-h-full text-base-content">
                        <button
                            className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-2 mr-2 absolute xl:hidden"
                            onClick={() => close()}
                        >
                            <MdClose className="text-xl" />
                        </button>

                        <div className="mb-2 font-semibold text-xl">
                            <img className="mask mask-squircle w-12" src="/img/vite.svg" alt="DashWind Logo" />
                            My Appplication
                        </div>

                        <ul className="menu w-60 text-base-content">
                            <li>
                                <a>
                                    <MdRocket className="text-xl" />
                                    Roadmap
                                </a>
                            </li>
                            <li>
                                <a>
                                    <MdLockClock className="text-xl" />
                                    Periods
                                </a>
                            </li>
                            <li>
                                <a>
                                    <MdPerson className="text-xl" />
                                    Users
                                </a>
                            </li>
                            <li>
                                <a>
                                    <MdGraphicEq className="text-xl" />
                                    Statistics
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="drawer-content flex flex-col min-h-screen bg-base-100">
                    <NavBar title="My React App" />

                    <Outlet />

                    <Footer />
                </div>
            </div>
        </TasksProvider>
    );
}
