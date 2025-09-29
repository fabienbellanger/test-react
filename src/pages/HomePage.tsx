import { useCallback } from 'react';
import { Link } from 'react-router';
import useFetch from '../hooks/useFetch';
import { FetchAPI, FetchAPIMethod } from '../api/fetch';

export default function HomePage() {
    const { sendText } = useFetch();

    const test = useCallback(
        async (url: string) => {
            try {
                const res = await sendText(
                    new FetchAPI(url, FetchAPIMethod.GET, undefined, undefined, true),
                    'admin page',
                );
                console.log(res);
            } catch (error) {
                console.error(error);
            }
        },
        [sendText],
    );

    return (
        <div className="flex flex-col flex-1 items-center justify-center gap-8">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Home page</h1>

            <section className="flex items-center gap-4">
                <Link to="/todo" className="btn btn-soft btn-outline">
                    To-Do List
                </Link>

                <Link to="/chatbot" className="btn btn-soft btn-outline">
                    Chatbot
                </Link>

                <Link to="/roadmap" className="btn btn-soft btn-outline">
                    Roadmap
                </Link>
            </section>

            <div className="flex flex-row justify-center items-center gap-2 ">
                <button className="btn btn-dash btn-accent mb-4" onClick={() => test('http://localhost:4444/admin')}>
                    Admin route
                </button>
                <button className="btn btn-dash btn-primary mb-4" onClick={() => test('http://localhost:4444/204')}>
                    Trigger 204
                </button>
                <button className="btn btn-dash btn-warning mb-4" onClick={() => test('http://localhost:4444/401')}>
                    Trigger 401
                </button>
            </div>
        </div>
    );
}
