import { useState, useEffect } from 'react';

interface Settings {
    topMargin: number;
    bottomMargin: number;
    theme: 'light' | 'dark';
    isSettingMode: boolean;
}

const DEFAULT_SETTINGS: Settings = {
    topMargin: 0,
    bottomMargin: 0,
    theme: 'light',
    isSettingMode: false,
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

    return {
        ...settings,
        setTopMargin,
        setBottomMargin,
        toggleTheme,
        isSettingMode,
        toggleSettingMode,
    };
};
