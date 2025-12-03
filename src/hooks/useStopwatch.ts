import { useState, useRef, useEffect, useCallback } from 'react';

export const useStopwatch = () => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const startTimeRef = useRef<number>(0);
    const requestRef = useRef<number>(0);

    const animate = useCallback((time: number) => {
        if (startTimeRef.current > 0) {
            setElapsedTime(time - startTimeRef.current);
            requestRef.current = requestAnimationFrame(animate);
        }
    }, []);

    const start = useCallback(() => {
        if (!isRunning) {
            setIsRunning(true);
            // Adjust start time to account for already elapsed time
            startTimeRef.current = performance.now() - elapsedTime;
            requestRef.current = requestAnimationFrame(animate);
        }
    }, [elapsedTime, isRunning, animate]);

    const pause = useCallback(() => {
        if (isRunning) {
            setIsRunning(false);
            cancelAnimationFrame(requestRef.current);
        }
    }, [isRunning]);

    const reset = useCallback(() => {
        setIsRunning(false);
        cancelAnimationFrame(requestRef.current);
        setElapsedTime(0);
        startTimeRef.current = 0;
    }, []);

    useEffect(() => {
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    return { elapsedTime, isRunning, start, pause, reset };
};
