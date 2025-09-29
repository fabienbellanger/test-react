import { useEffect, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

interface RoadmapData {
    id: number;
    name: string;
    job: string;
    favoriteColor: string;
}

/**
 * Sample data for the roadmap table
 */
const DATA: RoadmapData[] = [
    { id: 1, name: 'Cy Ganderton', job: 'Quality Control Specialist', favoriteColor: 'Blue' },
    { id: 2, name: 'Hart Hagerty', job: 'Desktop Support Technician', favoriteColor: 'Purple' },
    { id: 3, name: 'Brice Swyre', job: 'Tax Accountant', favoriteColor: 'Red' },
    { id: 4, name: 'Katy Swyre', job: 'Tax', favoriteColor: 'Green' },
    { id: 5, name: 'Brice Willis', job: 'Test Accountant', favoriteColor: 'Yellow' },
    { id: 6, name: 'Toto Tutu', job: 'Developer', favoriteColor: 'White' },
];

/**
 * Delay in milliseconds for the debounce effect
 */
const DEBOUNCE_DELAY = 400;

export default function RoadmapPage() {
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(DATA);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isMac =
                navigator.userAgentData?.platform === 'macOS' || navigator.platform.toUpperCase().indexOf('MAC') >= 0;
            const isCmdOrCtrl = isMac ? event.metaKey : event.ctrlKey;

            if (isCmdOrCtrl && event.key === 'f') {
                event.preventDefault();
                searchInputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Debounce
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, DEBOUNCE_DELAY);

        return () => {
            clearTimeout(handler); // Nettoie le timeout précédent
        };
    }, [searchTerm]);

    // Filter data based on debounced search term
    useEffect(() => {
        if (debouncedSearchTerm.length >= 3) {
            setFilteredData(
                DATA.filter(
                    (item) =>
                        item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                        item.job.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                        item.favoriteColor.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
                ),
            );
        } else {
            setFilteredData(DATA);
        }
    }, [debouncedSearchTerm]);

    return (
        <div className="flex flex-col p-4">
            <h1 className="text-4xl font-bold mb-4">Roadmap</h1>

            <div className="flex justify-end mt-4">
                <label className="input">
                    <BiSearch className="text-2xl" />
                    <input
                        ref={searchInputRef}
                        type="search"
                        className="grow"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <kbd className="kbd kbd-sm">
                        <span className="text-lg">⌘</span>
                    </kbd>
                    <kbd className="kbd kbd-sm">F</kbd>
                </label>
            </div>

            <div className="mt-4 overflow-x-auto">
                <table className="table table-zebra table-sm">
                    <thead>
                        <tr className="border-y border-base-content/16">
                            <th className="w-4 border-x border-base-content/16 text-center">#</th>
                            <th className="w-46 border-x border-base-content/16">Name</th>
                            <th className="w-0 border-x border-base-content/16">Job</th>
                            <th className="w-20 border-x border-base-content/16">Favorite Color</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.id} className="border-y border-base-content/16 hover:bg-base-300">
                                <th className="border-x border-base-content/16 text-center">{item.id}</th>
                                <td className="border-x border-base-content/16">{item.name}</td>
                                <td className="border-x border-base-content/16">{item.job}</td>
                                <td className="border-x border-base-content/16">{item.favoriteColor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
