/**
 * Page to display when an error occurs
 *
 */
export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Oops!</h1>
            <p className="mt-4 text-lg">An error has occurred.</p>
            <p className="mt-2 text-sm">Please try again later.</p>
        </div>
    );
}
