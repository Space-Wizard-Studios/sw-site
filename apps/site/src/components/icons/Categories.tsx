import type { IconProps } from 'types/iconProps';

// export function Icon({ color = 'currentColor', ...props }: IconProps) {
//     return ();
// }

export function Apps({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='currentColor'
                d='M10 9a1 1 0 0 1 1-1a1 1 0 0 1 1 1v4.47l1.21.13l4.94 2.19c.53.24.85.77.85 1.35v4.36c-.03.82-.68 1.47-1.5 1.5H11c-.38 0-.74-.15-1-.43l-4.9-4.2l.74-.77c.19-.21.46-.32.74-.32h.22L10 19zm1-4a4 4 0 0 1 4 4c0 1.5-.8 2.77-2 3.46v-1.22c.61-.55 1-1.35 1-2.24a3 3 0 0 0-3-3a3 3 0 0 0-3 3c0 .89.39 1.69 1 2.24v1.22C7.8 11.77 7 10.5 7 9a4 4 0 0 1 4-4'
            />
        </svg>
    );
}

export function Games({ color = 'currentColor', ...props }: IconProps) {
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

export function Music({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'>
                <path d='M3 17a3 3 0 1 0 6 0a3 3 0 0 0-6 0m10 0a3 3 0 1 0 6 0a3 3 0 0 0-6 0' />
                <path d='M9 17V4h10v13M9 8h10' />
            </g>
        </svg>
    );
}

export function Systems({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='none'
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='m7 8l-4 4l4 4m10-8l4 4l-4 4M14 4l-4 16'
            />
        </svg>
    );
}