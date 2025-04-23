import { MenuLinks } from '../../pages/layout';

interface AppBarProps {
    title: string;
    onMenuChange: (menu: MenuLinks) => void;
}

export default function AppBar({ title, onMenuChange }: AppBarProps) {
    return (
        <div className="flex items-center justify-between bg-gray-900 p-2">
            <div className="flex items-center gap-4">
                <img src="/img/vite.svg" alt="Logo" className="h-6 w-6" />
                <h1 className="text-white text-2xl">{title}</h1>
            </div>

            <div className="flex items-center justify-end gap-4">
                <button
                    className="layout_menu_button"
                    onClick={() => onMenuChange(MenuLinks.TODO_LIST)}
                >
                    To-Do List
                </button>

                <button
                    className="layout_menu_button"
                    onClick={() => onMenuChange(MenuLinks.LINKS)}
                >
                    Links
                </button>
            </div>
        </div>
    );
}
