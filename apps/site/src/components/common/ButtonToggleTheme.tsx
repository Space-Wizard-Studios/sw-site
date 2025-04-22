import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Cloud, Stars } from '@icons/Theme';

import { cn } from '@helpers/cn';
import { getInitialTheme, applyTheme } from '@helpers/getInitialTheme';

export interface ButtonToggleThemeProps {
    className?: string;
}

export default function ButtonToggleTheme({ className = '', ...props }: ButtonToggleThemeProps) {
    // Use a placeholder initial state that will be updated after mount
    const [isMounted, setIsMounted] = useState(false);
    const [theme, setTheme] = useState('light'); // Always start with light for SSR

    // Apply the theme after component mounts
    useEffect(() => {
        const initialTheme = getInitialTheme();
        setTheme(initialTheme);
        setIsMounted(true);
        applyTheme(initialTheme);
    }, []);

    const setMode = (theme: string) => {
        applyTheme(theme);
        window.localStorage.setItem('theme', theme);
        setTheme(theme);
    };

    const toggleTheme = () => {
        if (theme === 'dark') setMode('light');
        else setMode('dark');
    };

    // Render a simplified version during SSR and first render
    if (!isMounted) {
        return (
            <button
                {...props}
                type='button'
                className={cn('relative items-center overflow-hidden rounded-lg p-3', className)}
                aria-label='Alternar tema (claro/escuro)'
            >
                <div className='h-5 w-5'>
                    <Sun fillColor='#F0F6FF' />
                </div>
            </button>
        );
    }

    // Full interactive version after hydration
    return (
        <motion.button
            type='button'
            className={cn('relative items-center overflow-hidden rounded-lg p-3', className)}
            aria-label='Alternar tema (claro/escuro)'
            onClick={() => toggleTheme()}
            animate={{
                backgroundColor: theme === 'dark' ? '#060614' : '#8AB9FF',
                transition: { duration: 0.1 },
            }}
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
                {theme === 'dark' ? <Moon fillColor='#E4E8EC' /> : <Sun fillColor='#F0F6FF' />}
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
