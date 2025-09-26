import { useNavigate } from 'react-router';
import ThemeToggle from './ThemeToggle';
import DirectionToggle from './DirectionToggle';
import { BiLogOut, BiMenu } from 'react-icons/bi';
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
    const navigate = useNavigate();

    return (
        <header>
            <nav className="navbar bg-base-200 shadow-sm flex items-center justify-between">
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate('/', { replace: true })}
                >
                    {/* Menu toogle for mobile view or small screen */}
                    <label htmlFor="left-sidebar-drawer" className="btn btn-circle xl:hidden">
                        <BiMenu className="inline-block h-7 w-7" />
                    </label>
                    <img src="/img/vite.svg" alt="Logo" className="h-6 w-6" />
                    <h1 className="text-2xl text-ellipsis whitespace-nowrap overflow-hidden">{title}</h1>
                </div>
                <div className="flex items-center justify-end gap-2">
                    <ThemeToggle />

                    <DirectionToggle />

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
