export function Plus({ strokeColor = 'black', ...props }) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<path
				fill="none"
				stroke={strokeColor}
				stroke-linecap="round"
				stroke-width="2"
				d="M12 20v-8m0 0V4m0 8h8m-8 0H4"
			/>
		</svg>
	);
}

export function Minus({ strokeColor = 'black', ...props }) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<path fill="none" stroke={strokeColor} stroke-linecap="round" stroke-width="2" d="M20 12H4" />
		</svg>
	);
}
