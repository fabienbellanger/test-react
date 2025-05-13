export default function Footer() {
    return (
        <footer className="footer fixed bottom-0 sm:footer-horizontal footer-center bg-base-300 text-base-content p-2 text-xs">
            <aside>
                <p>Copyright © {new Date().getFullYear()}</p>
            </aside>
        </footer>
    );
}
