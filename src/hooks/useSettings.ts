import { useState, useEffect } from 'react';

interface Settings {
    topMargin: number;
    bottomMargin: number;
    theme: 'light' | 'dark';
    isSettingMode: boolean;
    speedBarPosition?: 'left' | 'right';
}

const DEFAULT_SETTINGS: Settings = {
    topMargin: 50,
    bottomMargin: 100,
    theme: 'light',
    isSettingMode: false,
    speedBarPosition: 'left',
};

export const useSettings = () => {
    const [settings, setSettings] = useState<Settings>(() => {
        const saved = localStorage.getItem('shorthand_settings');
        return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    });

    useEffect(() => {
        localStorage.setItem('shorthand_settings', JSON.stringify(settings));
        document.documentElement.setAttribute('data-theme', settings.theme);
    }, [settings]);

    const [isSettingMode, setIsSettingMode] = useState(false);
    const toggleSettingMode = () => setIsSettingMode(prev => !prev);

    const setTopMargin = (val: number) => setSettings(prev => ({ ...prev, topMargin: val }));
    const setBottomMargin = (val: number) => setSettings(prev => ({ ...prev, bottomMargin: val }));
    const toggleTheme = () => setSettings(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));

    const [speedBarPosition, setSpeedBarPosition] = useState<'left' | 'right'>(settings.speedBarPosition || 'left');

    const toggleSpeedBarPosition = () => {
        const newPos = speedBarPosition === 'left' ? 'right' : 'left';
        setSpeedBarPosition(newPos);
        setSettings(prev => ({ ...prev, speedBarPosition: newPos }));
    };

    return {
        ...settings,
        speedBarPosition, // Ensure this is returned
        setTopMargin,
        setBottomMargin,
        toggleTheme,
        isSettingMode,
        toggleSettingMode,
        toggleSpeedBarPosition,
    };
};
