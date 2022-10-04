import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Cloud, Stars } from '@icons/sky';

export interface ButtonToggleThemeProps {}

export default function ButtonToggleTheme({}: ButtonToggleThemeProps) {
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

	useEffect(() => {
		const defaultTheme = localStorage.getItem('theme');
		setTheme(defaultTheme ?? 'light');
	}, []);

	return (
		<motion.button
			type="button"
			className="rounded-lg p-2.5 items-center relative overflow-hidden"
			aria-label="Toggle Theme"
			onClick={() => toggleTheme()}
			animate={{
				backgroundColor: theme === 'dark' ? '#060614' : '#5297FF',
				transition: { duration: 0.1 },
			}}
		>
			<motion.div
				className="absolute w-full h-full top-0 left-0"
				initial={{ opacity: 0 }}
				animate={{
					opacity: theme === 'dark' ? 1 : 0,
				}}
			>
				<Stars className="absolute w-full h-full top-0 left-0" fillColor="white" />
			</motion.div>

			<motion.div className="w-6 h-6" key={theme} initial={{ scale: 0.2 }} animate={{ scale: 1 }}>
				{theme === 'dark' ? <Moon fillColor="silver" /> : <Sun fillColor="gold" />}
			</motion.div>

			<motion.div
				className="absolute w-full h-full top-0 left-0"
				initial={{ translateX: '1.5rem' }}
				animate={{
					translateX: theme === 'dark' ? '1.5rem' : '0rem',
				}}
			>
				<Cloud className="absolute w-5 h-5 bottom-2 right-1" fillColor="white" />
			</motion.div>
		</motion.button>
	);
}