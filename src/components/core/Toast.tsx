import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { GrStatusWarning } from 'react-icons/gr';
import { MdCheckCircleOutline, MdErrorOutline } from 'react-icons/md';
import { VscError } from 'react-icons/vsc';

const DEFAULT_DURATION: number = 3_000;

/**
 *  Toast component properties
 *
 *  @param {boolean} visible Controls the visibility of the toast.
 *  @param {number} duration Duration in milliseconds before the toast disappears.
 *  @param {string} type Type of toast, can be 'error', 'success', or 'info'.
 *  @param {string} verticalPosition Vertical position of the toast, can be 'top', 'bottom', or 'middle'.
 *  @param {string} horizontalPosition Horizontal position of the toast, can be 'start', 'end', or 'center'.
 */
interface ToastProps {
    visible?: boolean;
    duration?: number;
    type?: 'error' | 'success' | 'info' | 'warning';
    verticalPosition?: 'top' | 'bottom' | 'middle';
    horizontalPosition?: 'start' | 'end' | 'center';
    children: React.ReactNode;
    onClose: () => void;
}

export default function Toast({
    visible,
    duration,
    type,
    verticalPosition,
    horizontalPosition,
    onClose,
    children,
}: ToastProps) {
    const [isVisible, setVisible] = useState(visible || false);

    // Classes
    const toastClass = `toast toast-${verticalPosition || 'bottom'} toast-${horizontalPosition || 'end'} cursor-pointer`;
    const alertClass = `alert alert-${type || 'error'}`;

    useEffect(() => {
        setVisible(visible || false);
    }, [visible]);

    const close = useCallback(() => {
        setVisible(false);
        onClose();
    }, [onClose]);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                close();
            }, duration || DEFAULT_DURATION);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, close]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={toastClass}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    onClick={close}
                >
                    <div className={alertClass}>
                        {type === 'error' && <VscError className="text-lg" />}
                        {type === 'warning' && <GrStatusWarning className="text-lg" />}
                        {type === 'info' && <MdErrorOutline className="text-lg" />}
                        {type === 'success' && <MdCheckCircleOutline className="text-lg" />}
                        <span>{children}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export function ToastAlert() {}
