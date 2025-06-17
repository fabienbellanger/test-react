import { createBrowserRouter, Navigate } from 'react-router';
import ChatbotPage from './pages/Chatbot';
import TodoListPage from './pages/TodoList';
import Layout from './components/layout/Layout';
import ErrorPage from './pages/Error';
import LoginPage from './pages/Login';
import AuthGuard from './components/layout/AuthGuard';

export const HOMEPAGE = '/';

export const router = createBrowserRouter([
    {
        path: '/login',
        Component: LoginPage,
        errorElement: <ErrorPage />,
    },
    {
        path: '/',
        Component: () => (
            <AuthGuard>
                <Layout />
            </AuthGuard>
        ),
        errorElement: <ErrorPage />,
        children: [
            { path: '', Component: () => <Navigate to="/todo" replace /> },
            { path: 'todo', Component: TodoListPage },
            { path: 'chatbot', Component: ChatbotPage },
        ],
    },
]);
