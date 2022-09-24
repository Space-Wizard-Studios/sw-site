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
			className="rounded-lg text-sm p-2.5 inline-flex items-center relative spacewiz-text"
			aria-label="Toggle"
			onClick={toggleTheme}
		>
			{theme === 'dark' ? iconDark : iconLight}
		</motion.button>
	);
}
