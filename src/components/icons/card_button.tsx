type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type Color = RGB | RGBA | HEX | 'currentColor';

export interface IconProps {
	color?: Color;
	[x: string]: any;
}

export function Plus({ color = 'currentColor', ...props }: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<path fill="none" stroke={color} strokeLinecap="round" strokeWidth="2" d="M12 20v-8m0 0V4m0 8h8m-8 0H4" />
		</svg>
	);
}

export function Minus({ color = 'currentColor', ...props }: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<path fill="none" stroke={color} strokeLinecap="round" strokeWidth="2" d="M20 12H4" />
		</svg>
	);
}

export function LockClosed({ color = 'currentColor', ...props }: IconProps) {
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

export function LockOpened({ color = 'currentColor', ...props }: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
			<g fill={color}>
				<path d="M10 2a5 5 0 0 0-5 5v2a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H7V7a3 3 0 0 1 5.905-.75a1 1 0 0 0 1.937-.5A5.002 5.002 0 0 0 10 2Z" />
			</g>
		</svg>
	);
}

export function Key({ color = 'currentColor', ...props }: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<g fill={color}>
				<path d="M7 17a5.007 5.007 0 0 0 4.898-4H14v2h2v-2h2v3h2v-3h1v-2h-9.102A5.007 5.007 0 0 0 7 7c-2.757 0-5 2.243-5 5s2.243 5 5 5zm0-8c1.654 0 3 1.346 3 3s-1.346 3-3 3s-3-1.346-3-3s1.346-3 3-3z" />
			</g>
		</svg>
	);
}

export function Rocket({ color = 'currentColor', flames = 1, ...props }: IconProps) {
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

export function Planet({ color = 'currentColor', ...props }: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<g fill="none" stroke={color} strokeLinejoin="round" strokeLinecap="round" strokeWidth="2">
				<circle cx="12" cy="12" r="8" />
				<path d="M8.399 4.849C5.372 2.582 2.972 1.489 2.23 2.23c-1.174 1.174 2.248 6.5 7.643 11.895c5.396 5.395 10.722 8.817 11.895 7.643c.431-.43.243-1.421-.435-2.769" />
			</g>
		</svg>
	);
}

export function ChevronRight({ color = 'currentColor', ...props }: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<g fill="none" stroke={color} strokeLinejoin="round" strokeLinecap="round" strokeWidth="6">
				<path d="m10.5 8l4 4l-4 4" />
			</g>
		</svg>
	);
}

export function ArtStation({ color = 'currentColor', ...props }: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<path
				fill={color}
				d="m1.77 16.88l1.73 2.98c.34.68 1.04 1.14 1.83 1.14h11.46l-2.36-4.12H1.77m20.46.02c0-.4-.12-.79-.33-1.12L15.17 4.1A2.04 2.04 0 0 0 13.35 3H9.8l10.38 18l1.64-2.86c.31-.54.41-.78.41-1.24m-9.5-2.96L8.1 5.92l-4.65 8.02h9.28Z"
			/>
		</svg>
	);
}

export function GitHub({ color = 'currentColor', ...props }: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<path
				fill={color}
				d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
			/>
		</svg>
	);
}

export function Instagram({ color = 'currentColor', ...props }: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<path
				fill={color}
				d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"
			/>
		</svg>
	);
}

export function IMDb({ color = 'currentColor', ...props }: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
			<path
				fill={color}
				d="M0 7v18h32V7zm2 2h28v14H2zm3 2.688v8.624h2v-8.625zm3.094 0v8.624H10V15.5l.906 4.813h1.281L13 15.5v4.813h1.813v-8.625H12l-.5 4.124l-.688-4.124zm7.812 0v8.5h2.406c1.301 0 1.79-.2 2.188-.5c.398-.2.594-.688.594-1.188v-5.188c0-.601-.196-1.113-.594-1.312c-.5-.2-.688-.313-2.188-.313zm6.188.124v8.5h1.812s.086-.601.188-.5c.199 0 1.008.375 1.406.375c.5 0 .7.008 1-.093c.398-.2.5-.48.5-.782v-5c0-.699-.71-1.218-1.313-1.218c-.601 0-1.175.394-1.375.594v-1.876zM18 13c.398 0 .813.008.813.406v5c0 .399-.512.407-.813.407zm6.594 1c.101 0 .218.105.218.406v4.281c0 .2-.019.407-.218.407c-.102 0-.188-.106-.188-.407v-4.28c0-.2-.011-.407.188-.407z"
			/>
		</svg>
	);
}

export function LinkedIn({ color = 'currentColor', ...props }: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<path
				fill={color}
				d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"
			/>
		</svg>
	);
}

export function LinkTree({ color = 'currentColor', ...props }: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<path
				fill="none"
				stroke={color}
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 3L2 15h3v5h5v-5H8l4-7zm6 0l7 12h-3v5h-5v-5h2l-4-7z"
			/>
		</svg>
	);
}

export function Portfolio({ color = 'currentColor', ...props }: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
			<path
				fill="none"
				stroke={color}
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M29 17v11H3V17M2 8h28v8s-6 4-14 4s-14-4-14-4V8Zm14 14v-4m4-10s0-4-4-4s-4 4-4 4"
			/>
		</svg>
	);
}

export function SoundCloud({ color = 'currentColor', ...props }: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<path
				fill={color}
				d="M11.56 8.87V17h8.76c1.85-.13 2.68-1.27 2.68-2.67c0-1.48-1.12-2.67-2.62-2.67c-.38 0-.7.08-1.03.22c-.24-2.34-2.23-4.17-4.68-4.17c-1.17 0-2.28.44-3.11 1.16m-.88 1.02c-.3-.18-.62-.32-.97-.39V17h1.39V9.34c-.15.16-.29.36-.42.55m-2.35-.54V17h.92V9.38c-.19-.03-.38-.04-.58-.04c-.12 0-.23 0-.34.01M6.5 10v7h.91V9.54c-.33.11-.64.27-.91.46m-1.67 2.5c-.06 0-.12-.06-.19-.09V17h.92v-6.14c-.37.48-.62 1.05-.73 1.64m-2.04-.28v4.69c.21.06.45.09.71.09h.22v-4.86c-.08-.01-.16-.02-.22-.02c-.26 0-.5.04-.71.1M1 14.56c0 .75.34 1.41.87 1.86v-3.71c-.53.44-.87 1.11-.87 1.85Z"
			/>
		</svg>
	);
}

export function YouTube({ color = 'currentColor', ...props }: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
			<path
				fill={color}
				d="m10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73Z"
			/>
		</svg>
	);
}
