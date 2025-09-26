import { createBrowserRouter } from 'react-router';
import ChatbotPage from './pages/ChatbotPage';
import TodoListPage from './pages/TodoListPage';
import Layout from './components/containers/Layout';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import AuthGuard from './components/core/AuthGuard';
import HomePage from './pages/HomePage';

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
            { path: '', Component: HomePage },
            { path: 'todo', Component: TodoListPage },
            { path: 'chatbot', Component: ChatbotPage },
        ],
    },
]);
