import { createBrowserRouter } from 'react-router';
import Chatbot from './pages/Chatbot';
import TodoList from './pages/TodoList';
import Layout from './components/layout/Layout';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            { path: '', Component: TodoList },
            { path: 'todo', Component: TodoList },
            { path: 'chatbot', Component: Chatbot },
        ],
    },
]);
