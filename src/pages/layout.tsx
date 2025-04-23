import { useState } from 'react';
import AppBar from '../components/layout/AppBar';
import TodoList from './TodoList';
import Links from './Links';
import { MenuLinks } from '../models/MenuLinks';

export default function Layout() {
    const [menuLinks, setMenuLinks] = useState<MenuLinks>(MenuLinks.TODO_LIST);
    return (
        <>
            <AppBar title="My App" onMenuChange={setMenuLinks} />

            {menuLinks === MenuLinks.TODO_LIST && <TodoList />}
            {menuLinks === MenuLinks.LINKS && <Links />}
        </>
    );
}
