export default function Footer() {
    return (
        <footer className="footer fixed bottom-1 sm:footer-horizontal footer-center p-2 text-xs">
            <aside>
                <p>Copyright © {new Date().getFullYear()}</p>
            </aside>
        </footer>
    );
}
