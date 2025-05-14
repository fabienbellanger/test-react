import { useState } from 'react';
import NavBar from './NavBar';
import TodoList from '../../pages/TodoList';
import Chatbot from '../../pages/Chatbot';
import { MenuLinks } from '../../models/MenuLinks';
import Footer from './Footer';

/**
 * Application layout component
 *
 */
export default function Layout() {
    const [menuLinks, setMenuLinks] = useState<MenuLinks>(MenuLinks.TODO_LIST);
    return (
        <div className="flex flex-col min-h-screen bg-base-100">
            <NavBar title="My App" onMenuChange={setMenuLinks} />

            <div>
                {menuLinks === MenuLinks.TODO_LIST && <TodoList />}
                {menuLinks === MenuLinks.CHATBOT && <Chatbot />}
            </div>

            <Footer />
        </div>
    );
}
