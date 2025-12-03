import React from 'react';
import { Settings, Moon, Sun, Check } from 'lucide-react';
import { useSettingsContext } from '../context/SettingsContext';
import styles from './Header.module.css';

export const Header: React.FC = () => {
    const { isSettingMode, toggleSettingMode, theme, toggleTheme } = useSettingsContext();

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>速記練習</h1>

            <div className={styles.actions}>
                <button
                    className={`${styles.iconButton} ${isSettingMode ? styles.active : ''}`}
                    onClick={toggleSettingMode}
                    title={isSettingMode ? "設定終了" : "設定モード"}
                >
                    {isSettingMode ? <Check size={20} /> : <Settings size={20} />}
                </button>

                <button
                    className={styles.iconButton}
                    onClick={toggleTheme}
                    title="テーマ切り替え"
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
            </div>
        </header>
    );
};
