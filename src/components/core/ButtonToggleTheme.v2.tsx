import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import type { ReactNode } from 'react';

export interface ButtonToggleThemeProps {
	iconDark?: ReactNode;
	iconLight?: ReactNode;
}

export default function ButtonToggleTheme({ iconDark, iconLight }: ButtonToggleThemeProps) {
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
				<svg
					className="absolute w-full h-full"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 512 512"
				>
					<ellipse ry="10" rx="10" cy="302" cx="60" fill="white" />
					<ellipse ry="10" rx="10" cy="110" cx="138" fill="white" />
					<ellipse ry="14" rx="14" cy="186" cx="331" fill="white" />
					<ellipse ry="12" rx="12" cy="100" cx="392" fill="white" />
					<ellipse ry="10" rx="10" cy="409" cx="141" fill="white" />
					<ellipse ry="12" rx="12" cy="377" cx="451" fill="white" />
				</svg>
			</motion.div>

			<motion.div key={theme} initial={{ scale: 0.2 }} animate={{ scale: 1 }}>
				{theme === 'dark' ? iconDark : iconLight}
			</motion.div>

			<motion.div
				className="absolute w-full h-full top-0 left-0"
				initial={{ translateX: '1.5rem' }}
				animate={{
					translateX: theme === 'dark' ? '1.5rem' : '0rem',
				}}
			>
				<svg
					className="absolute bottom-2 right-1"
					xmlns="http://www.w3.org/2000/svg"
					width="1.25em"
					height="1.25em"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 1024 1024"
				>
					<path
						fill="white"
						d="M811.4 418.7C765.6 297.9 648.9 212 512.2 212S258.8 297.8 213 418.6C127.3 441.1 64 519.1 64 612c0 110.5 89.5 200 199.9 200h496.2C870.5 812 960 722.5 960 612c0-92.7-63.1-170.7-148.6-193.3z"
					/>
				</svg>
			</motion.div>
		</motion.button>
	);
}
