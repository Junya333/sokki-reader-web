import React from 'react';
import { useSettingsContext } from '../context/SettingsContext';
import styles from './LineNumber.module.css';

interface LineNumberProps {
    elapsedTime: number;
    speed: number;
}

export const LineNumber: React.FC<LineNumberProps> = ({ elapsedTime, speed }) => {
    const { topMargin } = useSettingsContext();

    // Calculate line number
    const lineDuration = (60000 * 20) / (speed || 1);
    const lineNumber = Math.floor(elapsedTime / lineDuration) + 1;

    return (
        <div
            className={styles.container}
            style={{ top: `${topMargin - 30}px` }} // Position just above the bar
        >
            <span className={styles.label}>No.</span>
            <span className={styles.value}>{lineNumber}</span>
        </div>
    );
};
