import { createBrowserRouter, Navigate } from 'react-router';
import ChatbotPage from './pages/Chatbot';
import TodoListPage from './pages/TodoList';
import Layout from './components/layout/Layout';
import ErrorPage from './pages/Error';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        errorElement: <ErrorPage />,
        children: [
            { path: '', Component: () => <Navigate to="todo" replace /> }, // Redirection
            { path: 'todo', Component: TodoListPage },
            { path: 'chatbot', Component: ChatbotPage },
        ],
    },
]);
