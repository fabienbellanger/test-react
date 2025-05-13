import { MenuLinks } from '../../models/MenuLinks';

interface NavBarProps {
    title: string;
    onMenuChange: (menu: MenuLinks) => void;
}

export default function NavBar({ title, onMenuChange }: NavBarProps) {
    return (
        <div className="navbar bg-base-300 shadow-smflex items-center justify-between">
            <div className="flex items-center gap-4">
                <img src="/img/vite.svg" alt="Logo" className="h-6 w-6" />
                <h1 className="text-white text-2xl">{title}</h1>
            </div>
            <div className="flex items-center justify-end gap-4">
                <button
                    className="btn btn-accent"
                    onClick={() => onMenuChange(MenuLinks.TODO_LIST)}
                >
                    {MenuLinks.TODO_LIST}
                </button>

                <button
                    className="btn btn-accent"
                    onClick={() => onMenuChange(MenuLinks.CHATBOT)}
                >
                    {MenuLinks.CHATBOT}
                </button>
            </div>
        </div>
    );
}
