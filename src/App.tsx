import { RouterProvider } from 'react-router';
import { router } from './Router';
import Loader from './components/core/Loader';

export default function App() {
    return (
        <>
            <RouterProvider router={router} />
            <Loader />
        </>
    );
}
