import { useState } from 'react';
import AppBar from '../components/layout/AppBar';
import TodoList from './TodoList';
import Links from './Links';

enum MenuLinks {
    TODO_LIST = 'To-Do List',
    LINKS = 'Links',
}

function Layout() {
    const [menuLinks, setMenuLinks] = useState<MenuLinks>(MenuLinks.TODO_LIST);
    return (
        <>
            <AppBar title="My App" onMenuChange={setMenuLinks} />

            {menuLinks === MenuLinks.TODO_LIST && <TodoList />}
            {menuLinks === MenuLinks.LINKS && <Links />}
        </>
    );
}

export { Layout, MenuLinks };
