export function Sun({ className = '', fillColor = 'black' }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="xMidYMid meet"
			viewBox="0 0 20 20"
		>
			<path
				fill={fillColor}
				d="M13.5 10a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0Zm-13 0a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1Zm15 0a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Zm-.086 4l1.414 1.414a1 1 0 0 1-1.414 1.414L14 15.414A1 1 0 0 1 15.414 14ZM3 3a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 1 1-1.414 1.414L3 4.414A1 1 0 0 1 3 3Zm7 12.5a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Zm0-15a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1ZM16.828 3a1 1 0 0 1 0 1.414l-1.414 1.414A1 1 0 1 1 14 4.414L15.414 3a1 1 0 0 1 1.414 0Zm-11 11a1 1 0 0 1 0 1.414l-1.414 1.414A1 1 0 0 1 3 15.414L4.414 14a1 1 0 0 1 1.414 0Z"
			/>
		</svg>
	);
}

export function Moon({ className = '', fillColor = 'black' }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="xMidYMid meet"
			viewBox="0 0 24 24"
		>
			<path
				fill={fillColor}
				d="M12.3 22h-.1a10.31 10.31 0 0 1-7.34-3.15a10.46 10.46 0 0 1-.26-14a10.13 10.13 0 0 1 4-2.74a1 1 0 0 1 1.06.22a1 1 0 0 1 .24 1a8.4 8.4 0 0 0 1.94 8.81a8.47 8.47 0 0 0 8.83 1.94a1 1 0 0 1 1.27 1.29A10.16 10.16 0 0 1 19.6 19a10.28 10.28 0 0 1-7.3 3Z"
			/>
		</svg>
	);
}

export function Cloud({ className = '', fillColor = 'black' }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="xMidYMid meet"
			viewBox="0 0 1024 1024"
		>
			<path
				fill={fillColor}
				d="M811.4 418.7C765.6 297.9 648.9 212 512.2 212S258.8 297.8 213 418.6C127.3 441.1 64 519.1 64 612c0 110.5 89.5 200 199.9 200h496.2C870.5 812 960 722.5 960 612c0-92.7-63.1-170.7-148.6-193.3z"
			/>
		</svg>
	);
}

export function Stars({ className = '', fillColor = 'black' }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="xMidYMid meet"
			viewBox="0 0 512 512"
		>
			<ellipse ry="10" rx="10" cy="302" cx="60" fill={fillColor} />
			<ellipse ry="10" rx="10" cy="110" cx="138" fill={fillColor} />
			<ellipse ry="14" rx="14" cy="186" cx="331" fill={fillColor} />
			<ellipse ry="12" rx="12" cy="100" cx="392" fill={fillColor} />
			<ellipse ry="10" rx="10" cy="409" cx="141" fill={fillColor} />
			<ellipse ry="12" rx="12" cy="377" cx="451" fill={fillColor} />
		</svg>
	);
}
