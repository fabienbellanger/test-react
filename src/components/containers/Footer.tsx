/**
 * Application footer
 *
 */
export default function Footer() {
    return (
        <footer className="footer fixed bottom-0 sm:footer-horizontal footer-center px-1 mt-2 mb-1 text-xs text-base-content/64">
            <aside>
                <p>Copyright © {new Date().getFullYear()}</p>
            </aside>
        </footer>
    );
}
