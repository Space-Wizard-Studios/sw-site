import type { IconProps } from 'types/iconProps';

// export function Icon({ color = 'currentColor', ...props }: IconProps) {
//     return ();
// }

export function Astro({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='none'
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M14.972 3.483c.163.196.247.46.413.987L19.025 16a15.5 15.5 0 0 0-4.352-1.42l-2.37-7.723a.31.31 0 0 0-.296-.213a.31.31 0 0 0-.295.214L9.37 14.576A15.5 15.5 0 0 0 5 15.998l3.657-11.53c.168-.527.251-.79.415-.986c.144-.172.331-.306.544-.388C9.858 3 10.143 3 10.715 3h2.612c.572 0 .858 0 1.1.094c.213.082.4.217.545.39M9 18c0 1.5 2 3 3 4c1-1 3-3 3-4q-3 1.5-6 0'
            />
        </svg>
    );
}

export function Bootstrap({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'>
                <path d='M2 12a2 2 0 0 0 2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2M2 12a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2' />
                <path d='M9 16V8h3.5a2 2 0 1 1 0 4H9h4a2 2 0 1 1 0 4z' />
            </g>
        </svg>
    );
}

export function CakePHP({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='none'
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='m12 11l8 2c1.361-.545 2-1.248 2-2V7.2C22 5.435 17.521 4 11.998 4C6.476 4 2 5.435 2 7.2V10c0 1.766 4.478 4 10 4zm0 3v3l8 2c1.362-.547 2-1.246 2-2v-3c0 .754-.638 1.453-2 2zM2 17c0 1.766 4.476 3 9.998 3L12 17c-5.522 0-10-1.734-10-3.5zm0-7v4m20-4v4'
            />
        </svg>
    );
}

export function Figma({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'>
                <path d='M12 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0' />
                <path d='M6 6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3' />
                <path d='M9 9a3 3 0 0 0 0 6h3m-3 0a3 3 0 1 0 3 3V3' />
            </g>
        </svg>
    );
}

export function Firebase({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'>
                <path d='m4.53 17.05l6.15-11.72h-.02c.38-.74 1.28-1.02 2.01-.63c.26.14.48.36.62.62l1.06 2.01' />
                <path d='M15.47 6.45c.58-.59 1.53-.59 2.11-.01c.22.22.36.5.41.81l1.5 9.11c.1.62-.2 1.24-.76 1.54l-6.07 2.9c-.46.25-1.01.26-1.46 0l-6.02-2.92c-.55-.31-.85-.92-.75-1.54L6.39 4.3c.12-.82.89-1.38 1.7-1.25c.46.07.87.36 1.09.77l1.24 1.76m-5.85 11.6L15.5 6.5' />
            </g>
        </svg>
    );
}

export function Flutter({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='none'
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='m7 14l-3-3l8-8h6zm7 7l-5-5l5-5h5l-5 5l5 5z'
            />
        </svg>
    );
}

export function Meta({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='none'
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M12 10.174Q14.649 5.999 16.648 6c2 0 3.263 2.213 4 5.217c.704 2.869.5 6.783-2 6.783c-1.114 0-2.648-1.565-4.148-3.652a27.6 27.6 0 0 1-2.5-4.174m0 0Q9.351 5.999 7.352 6c-2 0-3.263 2.213-4 5.217c-.704 2.869-.5 6.783 2 6.783C6.466 18 8 16.435 9.5 14.348q1.5-2.087 2.5-4.174'
            />
        </svg>
    );
}
export function MySQL({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='none'
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M13 21c-1.427-1.026-3.59-3.854-4-6c-.486.77-1.501 2-2 2c-1.499-.888-.574-3.973 0-6c-1.596-1.433-2.468-2.458-2.5-4C1.15 3.56 4.056 1.73 7 4h1c8.482.5 6.421 8.07 9 11.5c2.295.522 3.665 2.254 5 3.5c-2.086-.2-2.784-.344-3.5 0c.478 1.64 2.123 2.2 3.5 3M9 7h.01'
            />
        </svg>
    );
}

export function JavaScript({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'>
                <path d='m20 4l-2 14.5l-6 2l-6-2L4 4z' />
                <path d='M7.5 8h3v8l-2-1m8-7H14a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1.423a.5.5 0 0 1 .495.57L15.5 15.5l-2 .5' />
            </g>
        </svg>
    );
}

export function JQuery({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='currentColor'
                d='M22.88 10.41a5.005 5.005 0 0 1-7.04-.62c-1.78-2.12-1.5-5.29.61-7.04l.51-.38A5.024 5.024 0 0 0 16.8 9c1.63 1.94 4.45 2.32 6.54.97zM21.1 14.5a7.48 7.48 0 0 1-10.56-.92c-2.67-3.17-2.25-7.9.92-10.58l.92-.64a7.494 7.494 0 0 0-.12 9.78c2.42 2.86 6.54 3.49 9.65 1.58zm-1.13 4.88c-4.44 3.73-11.07 3.15-14.8-1.3C1.45 13.64 2.03 7 6.47 3.29l1.11-.79c-3.51 3.8-3.73 9.73-.3 13.82c3.43 4.08 9.31 4.9 13.68 2.11z'
            />
        </svg>
    );
}

export function React({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'>
                <path d='M6.306 8.711C3.704 9.434 2 10.637 2 12c0 2.21 4.477 4 10 4c.773 0 1.526-.035 2.248-.102m3.444-.609C20.295 14.567 22 13.363 22 12c0-2.21-4.477-4-10-4c-.773 0-1.526.035-2.25.102' />
                <path d='M6.305 15.287C5.629 17.902 5.82 19.98 7 20.66c1.913 1.105 5.703-1.877 8.464-6.66q.581-1.007 1.036-2m1.194-3.284C18.371 6.1 18.181 4.02 17 3.34C15.087 2.235 11.297 5.217 8.536 10c-.387.67-.733 1.34-1.037 2' />
                <path d='M12 5.424C10.075 3.532 8.18 2.658 7 3.34C5.087 4.444 5.774 9.217 8.536 14c.386.67.793 1.304 1.212 1.896M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913-1.104 1.226-5.877-1.536-10.66q-.563-.976-1.212-1.897M11.5 12.866a1 1 0 1 0 1-1.732a1 1 0 0 0-1 1.732' />
            </g>
        </svg>
    );
}

export function TypeScript({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'>
                <path d='M15 17.5c.32.32.754.5 1.207.5h.543c.69 0 1.25-.56 1.25-1.25v-.25a1.5 1.5 0 0 0-1.5-1.5a1.5 1.5 0 0 1-1.5-1.5v-.25c0-.69.56-1.25 1.25-1.25h.543c.453 0 .887.18 1.207.5M9 12h4m-2 0v6' />
                <path d='M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2' />
            </g>
        </svg>
    );
}

export function Unity({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'>
                <path d='m14 3l6 4v7m-2 3l-6 4l-6-4m-2-3V7l6-4' />
                <path d='m4 7l8 5v9m8-14l-8 5' />
            </g>
        </svg>
    );
}

export function Wordpress({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'>
                <path d='M9.5 9h3M4 9h2.5M11 9l3 11l4-9M5.5 9L9 20l3-7m6-2c.177-.528 1-1.364 1-2.5c0-1.78-.776-2.5-1.875-2.5C16.227 6 16 6.812 16 7.429c0 1.83 2 2.058 2 3.571' />
                <path d='M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0' />
            </g>
        </svg>
    );
}
