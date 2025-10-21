import { useState, useEffect } from 'react';

export const useHelp = (helpConfig) => {
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'F1') {
                event.preventDefault();
                setIsHelpOpen(true);
            }
            if (event.key === 'Escape' && isHelpOpen) {
                setIsHelpOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isHelpOpen]);

    const openHelp = () => {
        setIsHelpOpen(true);
    };

    const closeHelp = () => setIsHelpOpen(false);

    return {
        isHelpOpen,
        openHelp,
        closeHelp,
        helpConfig
    };
};