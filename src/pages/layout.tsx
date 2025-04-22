import AppBar from '../components/layout/AppBar';
import TodoList from './TodoList';

export default function Layout() {
    return (
        <>
            <AppBar title="My App" />

            <TodoList />
        </>
    );
}
