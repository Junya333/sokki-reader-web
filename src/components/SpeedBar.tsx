import React, { useRef, useState, useEffect } from 'react';
import { useSettingsContext } from '../context/SettingsContext';
import styles from './SpeedBar.module.css';

interface SpeedBarProps {
    elapsedTime: number;
    speed: number; // chars per minute
    isRunning: boolean;
}

export const SpeedBar: React.FC<SpeedBarProps> = ({ elapsedTime, speed, isRunning }) => {
    const { topMargin, bottomMargin, isSettingMode, setTopMargin, setBottomMargin } = useSettingsContext();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDraggingTop, setIsDraggingTop] = useState(false);
    const [isDraggingBottom, setIsDraggingBottom] = useState(false);

    // 1 line = 20 chars
    // lineDuration (ms) = 60000 * 20 / speed
    const lineDuration = (60000 * 20) / (speed || 1); // Avoid division by zero

    // Calculate progress (0 to 1)
    const progress = (elapsedTime % lineDuration) / lineDuration;

    // If not running and elapsed time is 0, bar should be at 0.
    // If paused, it stays at current progress.
    const heightPercentage = isRunning || elapsedTime > 0 ? progress * 100 : 0;

    useEffect(() => {
        if (!isSettingMode) return;

        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (!containerRef.current || !containerRef.current.parentElement) return;

            const parent = containerRef.current.parentElement;
            const parentRect = parent.getBoundingClientRect();
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

            if (isDraggingTop) {
                // Calculate new top margin relative to parent top
                const relativeY = clientY - parentRect.top;
                // Constrain: min 0, max (height - bottomMargin - minHeight)
                const newMargin = Math.max(0, Math.min(relativeY, parentRect.height - bottomMargin - 20));
                setTopMargin(newMargin);
            } else if (isDraggingBottom) {
                // Calculate new bottom margin relative to parent bottom
                const relativeYFromBottom = parentRect.bottom - clientY;
                // Constrain: min 0, max (height - topMargin - minHeight)
                const newMargin = Math.max(0, Math.min(relativeYFromBottom, parentRect.height - topMargin - 20));
                setBottomMargin(newMargin);
            }
        };

        const handleUp = () => {
            setIsDraggingTop(false);
            setIsDraggingBottom(false);
        };

        if (isDraggingTop || isDraggingBottom) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleUp);
            window.addEventListener('touchmove', handleMove);
            window.addEventListener('touchend', handleUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleUp);
        };
    }, [isSettingMode, isDraggingTop, isDraggingBottom, topMargin, bottomMargin, setTopMargin, setBottomMargin]);

    return (
        <div
            ref={containerRef}
            className={`${styles.container} ${isSettingMode ? styles.settingMode : ''}`}
            style={{
                top: `${topMargin}px`,
                bottom: `${bottomMargin}px`
            }}
        >
            <div
                className={styles.bar}
                style={{ height: `${heightPercentage}%` }}
            />

            {isSettingMode && (
                <>
                    <div
                        className={`${styles.dragHandle} ${styles.topHandle}`}
                        onMouseDown={(e) => { e.stopPropagation(); setIsDraggingTop(true); }}
                        onTouchStart={(e) => { e.stopPropagation(); setIsDraggingTop(true); }}
                    >
                        <span className={styles.handleLabel}>上端</span>
                    </div>
                    <div
                        className={`${styles.dragHandle} ${styles.bottomHandle}`}
                        onMouseDown={(e) => { e.stopPropagation(); setIsDraggingBottom(true); }}
                        onTouchStart={(e) => { e.stopPropagation(); setIsDraggingBottom(true); }}
                    >
                        <span className={styles.handleLabel}>下端</span>
                    </div>
                </>
            )}
        </div>
    );
};
