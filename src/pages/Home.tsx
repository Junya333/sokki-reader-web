import React, { useState } from 'react';
import { SpeedBar } from '../components/SpeedBar';
import { Stopwatch } from '../components/Stopwatch';
import { LineNumber } from '../components/LineNumber';
import { SpeedInput } from '../components/SpeedInput';
import { useStopwatch } from '../hooks/useStopwatch';
import styles from './Home.module.css';

export const Home: React.FC = () => {
    const [speed, setSpeed] = useState(100); // Default speed
    const { elapsedTime, isRunning, start, pause, reset } = useStopwatch();

    const handleStartPause = () => {
        if (isRunning) {
            pause();
        } else {
            start();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.topArea}>
                <SpeedInput speed={speed} setSpeed={setSpeed} />
            </div>

            <div className={styles.contentArea}>
                <SpeedBar
                    elapsedTime={elapsedTime}
                    speed={speed}
                    isRunning={isRunning}
                />
                <LineNumber elapsedTime={elapsedTime} speed={speed} />
                <Stopwatch
                    elapsedTime={elapsedTime}
                    isRunning={isRunning}
                    onStartPause={handleStartPause}
                    onReset={reset}
                />
            </div>
        </div>
    );
};
