import { useState } from 'react';
import NavBar from '../components/layout/NavBar';
import TodoList from './TodoList';
import Chatbot from './Chatbot';
import { MenuLinks } from '../models/MenuLinks';
import Footer from '../components/layout/Footer';

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
