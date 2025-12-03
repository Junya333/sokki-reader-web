import React from 'react';
import styles from './SpeedInput.module.css';

interface SpeedInputProps {
    speed: number;
    setSpeed: (speed: number) => void;
}

export const SpeedInput: React.FC<SpeedInputProps> = ({ speed, setSpeed }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val)) {
            // Clamp value between 1 and 400
            if (val >= 1 && val <= 400) {
                setSpeed(val);
            } else if (val > 400) {
                setSpeed(400);
            } else if (val < 1) {
                setSpeed(1);
            }
        } else if (e.target.value === '') {
            // Allow empty string for typing, but maybe handle blur to reset or keep internal state
            // For now, strict number input
        }
    };

    return (
        <div className={styles.container}>
            <input
                type="number"
                value={speed}
                onChange={handleChange}
                className={styles.input}
                min={1}
                max={400}
            />
            <span className={styles.unit}>文字/分</span>
        </div>
    );
};
