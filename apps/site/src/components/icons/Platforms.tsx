import type { IconProps } from 'types/iconProps';

// AR, Desktop, Mobile, VR, Web

export function Default({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='currentColor'
                d='M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.99.99 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88zM12 4.15L6.04 7.5L12 10.85l5.96-3.35zM5 15.91l6 3.38v-6.71L5 9.21zm14 0v-6.7l-6 3.37v6.71z'
            />
        </svg>
    );
}

export function AR({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='currentColor'
                d='M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm2 6h3c.6 0 1 .5 1 1v5H9.5v-1.5h-2V15H6v-5c0-.5.4-1 1-1m6 0h3.5c.85 0 1.5.65 1.5 1.5v1c0 .6-.4 1.15-.9 1.4L18 15h-1.5l-.85-2H14.5v2H13zm-5.5 1.5V12h2v-1.5zm7 0v1h2v-1z'
            />
        </svg>
    );
}

export function Desktop({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='none'
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M2 8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm4 4h4m-2-2v4m7-3v.01M18 13v.01'
            />
        </svg>
    );
}

export function Mobile({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='none'
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M6 5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zm5-1h2m-1 13v.01'
            />
        </svg>
    );
}

export function VR({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='currentColor'
                d='M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm1 6h1.5l1 3.43L9.5 9H11l-1.75 6h-1.5zm7 0h3.5c.85 0 1.5.65 1.5 1.5v1c0 .6-.4 1.15-.9 1.4L18 15h-1.5l-.85-2H14.5v2H13zm1.5 1.5v1h2v-1z'
            />
        </svg>
    );
}

export function Web({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='currentColor'
                d='M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm0-2h10.5v-3.5H4zm12.5 0H20V9h-3.5zM4 12.5h10.5V9H4z'
            />
        </svg>
    );
}
