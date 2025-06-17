import { createBrowserRouter, Navigate } from 'react-router';
import ChatbotPage from './pages/ChatbotPage';
import TodoListPage from './pages/TodoListPage';
import Layout from './components/layout/Layout';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import AuthGuard from './components/core/AuthGuard';

export const HOMEPAGE = '/';

export const router = createBrowserRouter([
    {
        path: '/login',
        Component: LoginPage,
        errorElement: <ErrorPage />,
    },
    {
        // Protected routes
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
