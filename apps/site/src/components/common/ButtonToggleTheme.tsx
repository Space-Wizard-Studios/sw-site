import { useEffect, useLayoutEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Cloud, Stars } from '@icons/sky';

export interface ButtonToggleThemeProps {}

export default function ButtonToggleTheme(props: ButtonToggleThemeProps) {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        setShowButton(true);
    }, []);

    return showButton && <Button {...props} />;
}

function Button(props: ButtonToggleThemeProps) {
    const [theme, setTheme] = useState('light');

    const setMode = (theme: string) => {
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');

        window.localStorage.setItem('theme', theme);
        setTheme(theme);
    };

    const toggleTheme = () => {
        if (theme === 'dark') setMode('light');
        else setMode('dark');
    };

    useLayoutEffect(() => {
        const defaultTheme = localStorage.getItem('theme');
        setTheme(defaultTheme ?? 'light');
    }, []);

    return (
        <motion.button
            type='button'
            className='relative items-center overflow-hidden rounded-lg p-3'
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
