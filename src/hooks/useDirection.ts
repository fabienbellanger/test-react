import { useState, useCallback } from 'react';

/**
 * Custom hook to manage text direction (RTL/LTR)
 *
 */
export default function useDirection() {
    const [isRTL, setIsRTL] = useState(false);

    /**
     * Toggle the text direction between RTL and LTR
     *
     */
    const toggleDirection = useCallback(() => {
        setIsRTL((prev) => !prev);
        document.documentElement.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
    }, [isRTL]);

    return { isRTL, toggleDirection };
}
