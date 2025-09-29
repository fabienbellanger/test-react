import { MdClose, MdGraphicEq, MdLockClock, MdPerson, MdRocket } from 'react-icons/md';
import { NavLink } from 'react-router';
import Footer from './Footer';
import { BiChat, BiListUl } from 'react-icons/bi';

interface Link {
    to: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

interface DrawerProps {
    onClose: () => void;
}

const LINKS: Link[] = [
    { to: '/todo', label: 'Todo-List', icon: BiListUl },
    { to: '/chatbot', label: 'Chatbot', icon: BiChat },
    { to: '/roadmap', label: 'Roadmap', icon: MdRocket },
    { to: '', label: 'Periods', icon: MdLockClock },
    { to: '', label: 'Users', icon: MdPerson },
    { to: '', label: 'Statistics', icon: MdGraphicEq },
];

export default function Drawer({ onClose }: DrawerProps) {
    return (
        <div className="drawer-side z-30">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>

            <div className="pt-2 w-60 bg-base-200 min-h-full text-base-content">
                <div className="flex items-center gap-2 mb-2 mx-2 xl:hidden">
                    <img className="mask mask-squircle w-8" src="/img/vite.svg" alt="DashWind Logo" />
                    <span className=" flex-1 text-md font-semibold">My React App</span>
                    <button className="btn btn-ghost btn-circle xl:hidden" onClick={onClose}>
                        <MdClose className="text-xl" />
                    </button>
                </div>

                <ul className="menu w-60 text-base-content">
                    {LINKS.map((link) => (
                        <li key={link.label}>
                            <NavLink
                                end
                                to={link.to}
                                onClick={onClose}
                                className={({ isActive }) => (isActive ? 'text-primary' : '')}
                            >
                                <link.icon className="text-xl" />
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <Footer />
            </div>
        </div>
    );
}
