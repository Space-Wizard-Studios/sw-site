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
		<button
			type="button"
			className="rounded-lg p-2.5 inline-flex items-center relative bg-sw-secondary-200 dark:bg-sw-primary-700"
			aria-label="Toggle Theme"
			onClick={() => toggleTheme()}
		>
			<motion.div
				key={theme}
				animate={{
					scale: [0.2, 1],
					transition: {
						duration: 0.2,
					},
				}}
			>
				{theme === 'dark' ? iconDark : iconLight}
			</motion.div>
		</button>
	);
}
