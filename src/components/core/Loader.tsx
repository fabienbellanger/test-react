import { useSelector } from 'react-redux';
import { GlobalState } from '../../stores';
import { useEffect, useRef } from 'react';

export default function Loader() {
    const loading = useSelector((state: GlobalState) => state.app.loading);
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (loading && ref.current) {
            ref.current.showModal();
        } else if (ref.current) {
            ref.current.close();
        }
    }, [loading]);

    return (
        <>
            {loading && (
                <dialog ref={ref} className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">
                            <span className="loading loading-ring loading-xl"></span>
                            &nbsp; Loading...
                        </h3>
                        <p className="py-4">Please wait while we process your request</p>
                    </div>
                </dialog>
            )}
        </>
    );
}
