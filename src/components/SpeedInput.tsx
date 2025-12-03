import React from 'react';
import styles from './SpeedInput.module.css';

interface SpeedInputProps {
    speed: number;
    setSpeed: (speed: number) => void;
}

export const SpeedInput: React.FC<SpeedInputProps> = ({ speed, setSpeed }) => {
    const [inputValue, setInputValue] = React.useState(speed.toString());

    React.useEffect(() => {
        // Only update local input if the parsed value differs from the prop
        // This preserves user input like "05" while keeping sync
        const parsed = parseInt(inputValue, 10);
        if (isNaN(parsed) || parsed !== speed) {
            setInputValue(speed.toString());
        }
    }, [speed]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valStr = e.target.value;
        setInputValue(valStr);

        if (valStr === '') return;

        const val = parseInt(valStr, 10);
        if (!isNaN(val) && val > 0) {
            setSpeed(val);
        }
    };

    const handleBlur = () => {
        // Reset to current valid speed on blur if input is invalid/empty
        setInputValue(speed.toString());
    };

    return (
        <div className={styles.container}>
            <input
                type="number"
                value={inputValue}
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.input}
            />
            <span className={styles.unit}>文字/分</span>
        </div>
    );
};
