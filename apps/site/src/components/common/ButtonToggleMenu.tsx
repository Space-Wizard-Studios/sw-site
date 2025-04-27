import React, { useState, useEffect } from 'react';
import { Menu } from '@icons/UI'; // Assuming this import works in React context

const ButtonToggleMenu: React.FC = () => {
	const [isToggled, setIsToggled] = useState(false);

	const handleClick = () => {
		setIsToggled((prev) => !prev);
	};

	useEffect(() => {
		const menuElement = document.getElementById('menu');

		if (isToggled) {
			menuElement?.classList.remove('hidden');
		} else {
			menuElement?.classList.add('hidden');
		}
	}, [isToggled]);

	// Reset state on page load (equivalent to window.onpageshow)
	useEffect(() => {
		const handlePageShow = () => {
			setIsToggled(false);
			document.body.classList.remove('overflow-hidden');
			document.getElementById('menu')?.classList.add('hidden');
		};

		window.addEventListener('pageshow', handlePageShow);

		handlePageShow();

		return () => {
			window.removeEventListener('pageshow', handlePageShow);
		};
	}, []);


	return (
		<button
			id='toggle-btn'
			type='button'
			className={`rounded-lg text-sm inline-flex items-center relative text-white ${
				isToggled ? 'toggled' : ''
			}`}
			onClick={handleClick}
			aria-expanded={isToggled} // Add aria-expanded for accessibility
      aria-controls="menu" // Add aria-controls if the menu has an id="menu"
		>
			<Menu className='w-6 h-6' />
			<span className="sr-only">Toggle Menu</span> {/* Accessibility improvement */}
		</button>
	);
};

export default ButtonToggleMenu;
