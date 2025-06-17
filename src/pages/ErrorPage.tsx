import { useRouteError, isRouteErrorResponse } from 'react-router';

/**
 * Page to display when an error occurs
 *
 */
export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Oops!</h1>
            <p className="mt-4 text-xl">An error has occurred.</p>

            <p className="mt-2 text-lg text-error/80">
                {isRouteErrorResponse(error) ? (
                    <span>
                        {error.status} - {error.statusText}
                    </span>
                ) : (
                    <span>{error instanceof Error ? error.message : 'Unknown error'}</span>
                )}
            </p>

            <button
                className="mt-4 btn"
                onClick={() => {
                    window.history.back();
                }}
            >
                Back
            </button>
        </div>
    );
}
