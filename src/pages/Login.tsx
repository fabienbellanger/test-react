import { VscKey } from 'react-icons/vsc';
import Footer from '../components/layout/Footer';
import { HiOutlineUser } from 'react-icons/hi';
import { useCallback, useEffect, useState } from 'react';
import { getToken, GetTokenRequest } from '../api/user';
import { AnimatePresence, motion } from 'motion/react';
import { MdErrorOutline } from 'react-icons/md';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const login = useCallback(async () => {
        const response = await getToken({
            username,
            password,
        } as GetTokenRequest);

        if (response === false) {
            setError(true);
        } else {
            setError(false);
            console.log('Login response:', response);
        }
    }, [username, password]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(false);
            }, 3_000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className="flex flex-col min-h-screen bg-base-100">
            <div className="flex justify-center items-center h-screen">
                <div className="card bg-base-200 w-96 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">Login Page</h2>
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
                            <button className="btn btn-primary" onClick={login}>
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        className="toast cursor-pointer"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        onClick={() => setError(false)}
                    >
                        <div className="alert alert-error">
                            <MdErrorOutline className="text-lg" />
                            <span>Login failed! Please try again...</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}
