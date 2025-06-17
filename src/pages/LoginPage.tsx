import { VscKey } from 'react-icons/vsc';
import Footer from '../components/layout/Footer';
import { HiOutlineUser } from 'react-icons/hi';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import Toast from '../components/core/Toast';
import useAuth from '../hooks/useAuth';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, redirectToHomeIfAuthenticated } = useAuth();

    // Redirect to home page if already authenticated
    useEffect(() => {
        redirectToHomeIfAuthenticated();
    }, [redirectToHomeIfAuthenticated]);

    const loginCall = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            e.stopPropagation();

            try {
                await login(username, password);

                setError('');
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An unexpected error occurred');
            }
        },
        [username, password, login],
    );

    return (
        <div className="flex flex-col min-h-screen bg-base-100">
            <div className="flex justify-center items-center h-screen">
                <div className="card bg-base-200 w-96 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">Login Page</h2>
                        <form onSubmit={loginCall}>
                            <fieldset className="fieldset mr-0">
                                <legend className="fieldset-legend">Username</legend>
                                <label className="input w-full">
                                    <HiOutlineUser className="text-lg" />
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        autoFocus
                                    />
                                </label>

                                <legend className="fieldset-legend">Password</legend>
                                <label className="input w-full">
                                    <VscKey className="text-lg" />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </label>
                            </fieldset>
                            <div className="card-actions justify-end mt-4">
                                <button type="submit" className="btn btn-primary" disabled={!username || !password}>
                                    Connection
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Toast
                key="0"
                visible={error !== ''}
                duration={3_000}
                type="error"
                verticalPosition="bottom"
                horizontalPosition="end"
                onClose={() => setError('')}
            >
                {error}
            </Toast>

            <Footer />
        </div>
    );
}
