import React from 'react';
import styles from './Stopwatch.module.css';

interface StopwatchProps {
    elapsedTime: number;
    isRunning: boolean;
    onStartPause: () => void;
    onReset: () => void;
}

export const Stopwatch: React.FC<StopwatchProps> = ({
    elapsedTime,
    isRunning,
    onStartPause,
    onReset,
}) => {
    // Format time mm:ss.S
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const deciSeconds = Math.floor((elapsedTime % 1000) / 100); // 0-9

    const formatTime = (val: number) => val.toString().padStart(2, '0');

    return (
        <div className={styles.container}>
            <div className={styles.timer}>
                {formatTime(minutes)}:{formatTime(seconds)}.{deciSeconds}
            </div>

            <div className={styles.controls}>
                <button className={styles.button} onClick={onStartPause}>
                    {isRunning ? '一時停止' : '開始'}
                </button>
                <button className={`${styles.button} ${styles.reset}`} onClick={onReset}>
                    リセット
                </button>
            </div>
        </div>
    );
};
