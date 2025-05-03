import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Cloud, Stars } from '@icons/Theme';

import { cn } from '@lib/utils';
import { getInitialTheme, applyTheme } from '@lib/getInitialTheme';

export interface ButtonToggleThemeProps {
    className?: string;
}

export default function ButtonToggleTheme({ className = '', ...props }: ButtonToggleThemeProps) {
    const [theme, setTheme] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const currentTheme = getInitialTheme();
        applyTheme(currentTheme);
        setTheme(currentTheme);
        setIsMounted(true);
    }, []);

    const setMode = (newTheme: string) => {
        applyTheme(newTheme);
        window.localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    const toggleTheme = () => {
        if (theme === 'dark') setMode('light');
        else setMode('dark');
    };

    if (!isMounted || !theme) {
        return (
            <button
                {...props}
                type='button'
                className={cn('relative items-center overflow-hidden rounded-lg p-3 w-11 h-11', className)}
                aria-label='Alternar tema (claro/escuro)'
            >
                <div className='h-5 w-5'></div>
            </button>
        );
    }

    return (
        <motion.button
            type='button'
            className={cn('relative items-center overflow-hidden rounded-lg p-3', 'hover:scale-110 transition-all', className)}
            aria-label='Alternar tema (claro/escuro)'
            onClick={() => toggleTheme()}
        >
            <motion.div
                className='absolute left-0 top-0 h-full w-full'
                initial={{ opacity: 0 }}
                animate={{
                    opacity: theme === 'dark' ? 1 : 0,
                }}
            >
                <Stars className='absolute left-0 top-0 h-full w-full' fillColor='#E4E8EC' />
            </motion.div>

            <motion.div className='h-5 w-5' key={theme} initial={{ scale: 0.2 }} animate={{ scale: 1 }}>
                {theme === 'dark' ? <Moon fillColor='#E4E8EC' /> : <Sun fillColor='#f7ad02' />}
            </motion.div>

            <motion.div
                className='absolute left-0 top-0 h-full w-full'
                initial={{ translateX: '1.5rem' }}
                animate={{
                    translateX: theme === 'dark' ? '1.5rem' : '0rem',
                }}
            >
                <Cloud className='absolute bottom-2 right-1 h-5 w-5' fillColor='#B8D4FF' />
            </motion.div>
        </motion.button>
    );
}
