import { createBrowserRouter } from 'react-router';
import Chatbot from './pages/Chatbot';
import TodoList from './pages/TodoList';
import Layout from './components/layout/Layout';
import ErrorPage from './pages/Error';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        errorElement: <ErrorPage />,
        children: [
            { path: '', Component: TodoList },
            { path: 'todo', Component: TodoList },
            { path: 'chatbot', Component: Chatbot },
        ],
    },
]);
