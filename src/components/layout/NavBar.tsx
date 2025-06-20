import { NavLink } from 'react-router';
import ThemeToggle from './ThemeToggle';
import DirectionToggle from './DirectionToggle';
import { BiLogOut } from 'react-icons/bi';
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';

/**
 * Navigation bar component properties
 *
 * @property {string} title Title of the application
 */
interface NavBarProps {
    title: string;
}

/**
 * Navigation bar component
 *
 * @param {NavBarProps} props Component properties
 */
export default function NavBar({ title }: NavBarProps) {
    const { logout } = useAuth();
    const { fullname } = useUser();
    const navLinkActiveClass = ({
        isPending,
        isActive,
        isTransitioning,
    }: {
        isPending: boolean;
        isActive: boolean;
        isTransitioning: boolean;
    }) => {
        if (isPending || isTransitioning) {
            return 'btn btn-soft btn-disabled';
        } else if (isActive) {
            return 'btn btn-soft btn-primary';
        }
        return 'btn btn-soft btn-outline';
    };

    return (
        <header>
            <nav className="navbar bg-base-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="/img/vite.svg" alt="Logo" className="h-6 w-6" />
                    <h1 className="text-2xl text-ellipsis whitespace-nowrap overflow-hidden">{title}</h1>
                </div>
                <div className="flex items-center justify-end gap-2">
                    <ThemeToggle />

                    <DirectionToggle />

                    <NavLink to="/todo" className={navLinkActiveClass}>
                        To-Do List
                    </NavLink>

                    <NavLink to="/chatbot" className={navLinkActiveClass}>
                        Chatbot
                    </NavLink>

                    <div className="flex items-center gap-0.5">
                        <span className="text-sm text-base-content">{fullname}</span>
                        <button className="btn px-2" onClick={logout}>
                            <BiLogOut className="text-lg" />
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
