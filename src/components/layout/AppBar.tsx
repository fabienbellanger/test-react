interface AppBarProps {
    title: string;
}

export default function AppBar({ title }: AppBarProps) {
    return (
        <div className="flex items-center justify-between bg-gray-900 p-2">
            <div className="flex items-center gap-4">
                <img src="/img/vite.svg" alt="Logo" className="h-6 w-6" />
                <h1 className="text-white text-2xl">{title}</h1>
            </div>

            <button className="bg-teal-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-teal-500 transition duration-500">
                To-Do List
            </button>
        </div>
    );
}
