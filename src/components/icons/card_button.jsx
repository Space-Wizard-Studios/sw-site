export function Plus({ color = 'currentColor', ...props }) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<path fill="none" stroke={color} strokeLinecap="round" strokeWidth="2" d="M12 20v-8m0 0V4m0 8h8m-8 0H4" />
		</svg>
	);
}

export function Minus({ color = 'currentColor', ...props }) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<path fill="none" stroke={color} strokeLinecap="round" strokeWidth="2" d="M20 12H4" />
		</svg>
	);
}

export function LockClosed({ color = 'currentColor', ...props }) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
			<g fill={color}>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M5 9V7a5 5 0 0 1 10 0v2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Zm8-2v2H7V7a3 3 0 0 1 6 0Z"
				/>
			</g>
		</svg>
	);
}

export function LockOpened({ color = 'currentColor', ...props }) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
			<g fill={color}>
				<path d="M10 2a5 5 0 0 0-5 5v2a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H7V7a3 3 0 0 1 5.905-.75a1 1 0 0 0 1.937-.5A5.002 5.002 0 0 0 10 2Z" />
			</g>
		</svg>
	);
}

export function Key({ color = 'currentColor', ...props }) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<g fill={color}>
				<path d="M7 17a5.007 5.007 0 0 0 4.898-4H14v2h2v-2h2v3h2v-3h1v-2h-9.102A5.007 5.007 0 0 0 7 7c-2.757 0-5 2.243-5 5s2.243 5 5 5zm0-8c1.654 0 3 1.346 3 3s-1.346 3-3 3s-3-1.346-3-3s1.346-3 3-3z" />
			</g>
		</svg>
	);
}

export function Rocket({ color = 'currentColor', flames = 1, ...props }) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
			<g fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
				<path d="m4.25 9.75l-2-.5s0-1.5.5-3s4-1.5 4-1.5m-.5 7l.5 2s1.5 0 3-.5s1.5-4 1.5-4m-7 .5l2 2s5-2 6.5-4.5s1.5-5.5 1.5-5.5s-3 0-5.5 1.5s-4.5 6.5-4.5 6.5z" />
				<path opacity={flames} d="m1.75 14.25l2-1l-1-1z" />
				<circle cx="10.25" cy="5.75" r=".5" />
			</g>
		</svg>
	);
}

export function Planet({ color = 'currentColor', ...props }) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<g fill="none" stroke={color} strokeLinejoin="round" strokeLinecap="round" strokeWidth="2">
				<circle cx="12" cy="12" r="8" />
				<path d="M8.399 4.849C5.372 2.582 2.972 1.489 2.23 2.23c-1.174 1.174 2.248 6.5 7.643 11.895c5.396 5.395 10.722 8.817 11.895 7.643c.431-.43.243-1.421-.435-2.769" />
			</g>
		</svg>
	);
}

export function ChevronRight({ color = 'currentColor', ...props }) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<g fill="none" stroke={color} strokeLinejoin="round" strokeLinecap="round" strokeWidth="6">
				<path d="m10.5 8l4 4l-4 4" />
			</g>
		</svg>
	);
}
