import type { IconProps } from 'types/iconProps';

// Astro, Blender, Figma, Firebase, Flutter, Godot, JavaScript, Meta, Next.js, React, Three.js, TypeScript, Unity

export function Default({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='currentColor'
                d='M20 19V7H4v12zm0-16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-7 14v-2h5v2zm-3.42-4L5.57 9H8.4l3.3 3.3c.39.39.39 1.03 0 1.42L8.42 17H5.59z'
            />
        </svg>
    );
}

export function Astro({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='currentColor'
                d='M9.24 19.035c-.901-.826-1.164-2.561-.789-3.819c.65.793 1.552 1.044 2.486 1.186c1.44.218 2.856.137 4.195-.524c.153-.076.295-.177.462-.278c.126.365.159.734.115 1.11c-.107.915-.56 1.622-1.283 2.158c-.289.215-.594.406-.892.608c-.916.622-1.164 1.35-.82 2.41l.034.114a2.4 2.4 0 0 1-1.07-.918a2.6 2.6 0 0 1-.412-1.401c-.003-.248-.003-.497-.036-.74c-.081-.595-.36-.86-.883-.876a1.034 1.034 0 0 0-1.075.843q-.013.058-.033.126M4.1 15.007s2.666-1.303 5.34-1.303l2.016-6.26c.075-.304.296-.51.544-.51c.25 0 .47.206.545.51l2.016 6.26c3.167 0 5.34 1.303 5.34 1.303L15.363 2.602c-.13-.366-.35-.602-.645-.602H9.283c-.296 0-.506.236-.645.602c-.01.024-4.538 12.405-4.538 12.405'
            />
        </svg>
    );
}

export function Blender({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='currentColor'
                d='M12.58 3.12v.01c-.31 0-.62.09-.87.26c-.5.35-.56.93-.11 1.3L14.46 7l-8.73.03h-.01C5 7.03 4.3 7.5 4.16 8.1c-.16.61.34 1.12 1.1 1.12l4.43-.01l-7.93 6.09c-.76.57-.99 1.52-.52 2.12c.48.61 1.49.61 2.26 0l4.3-3.53s-.07.48-.06.76c0 .29.1.85.23 1.28c.29.93.78 1.78 1.46 2.53c.7.77 1.57 1.39 2.57 1.83c1.03.47 2.17.71 3.34.71c1.16 0 2.31-.25 3.35-.72c1-.44 1.86-1.07 2.56-1.84c.68-.75 1.17-1.61 1.46-2.53c.14-.47.23-.94.29-1.41c0-.47 0-.94-.06-1.41c-.13-.91-.44-1.77-.94-2.55c-.44-.71-1-1.34-1.69-1.87l-6.89-5.29a1.42 1.42 0 0 0-.84-.26m2.76 6.09c1.16 0 2.25.38 3.12 1.08c.44.36.79.78 1.04 1.25c.27.46.44 1.01.5 1.57c.04.56-.04 1.12-.23 1.66c-.2.54-.52 1.04-.95 1.49c-.89.9-2.13 1.42-3.48 1.42c-1.34 0-2.59-.51-3.48-1.41c-.43-.44-.75-.95-.95-1.49a3.9 3.9 0 0 1-.22-1.66c.05-.56.22-1.09.48-1.57c.26-.47.62-.89 1.06-1.25c.86-.71 1.96-1.09 3.11-1.09m.1 1.4c-.78 0-1.5.28-2.03.73c-.54.46-.91 1.1-.94 1.84c-.04.75.26 1.45.79 1.97c.54.53 1.32.85 2.18.85s1.63-.32 2.18-.85c.53-.52.83-1.22.79-1.97c-.04-.74-.41-1.38-.94-1.84c-.53-.45-1.25-.73-2.03-.73'
            />
        </svg>
    );
}

export function Bootstrap({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='currentColor'
                d='M11.79 11.5H9.72V8.19h2.47c1.26 0 1.96.56 1.96 1.59c0 1.12-.83 1.72-2.36 1.72m.37 1.13H9.72v3.64h2.56c1.56 0 2.38-.63 2.38-1.83s-.85-1.81-2.5-1.81M22 5.31v13.38C22 20.5 20.5 22 18.69 22H5.31C3.5 22 2 20.5 2 18.69V5.31C2 3.5 3.5 2 5.31 2h13.38C20.5 2 22 3.5 22 5.31m-6 9.19c0-1.38-.92-2.37-2.33-2.55v-.06c1-.18 1.79-1.18 1.79-2.26c0-1.55-1.2-2.58-2.96-2.58H8.43v10.36h4.04c2.21 0 3.53-1.09 3.53-2.91'
            />
        </svg>
    );
}

export function CakePHP({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'>
            <path
                fill='currentColor'
                d='m255.96 216.098l200.252 49.715C491.062 252.211 512 234.867 512 216.098v-79.965c0-44.08-114.652-79.916-256.04-79.916C114.587 56.217 0 92.054 0 136.133v79.965c0 44.096 114.58 79.885 255.951 79.885zM0 295.983v79.916c0 44.112 114.587 79.884 255.96 79.884l-.009-79.892C114.58 375.89 0 340.095 0 295.983m456.196 49.763l-200.245-49.763v79.908l200.245 49.772C491.061 411.995 512 394.716 512 375.883v-79.9c.016 18.833-20.939 36.112-55.804 49.763'
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
export function Godot({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'>
            <path
                fill='currentColor'
                d='M52.203 9.61c-5.3 1.18-10.543 2.816-15.457 5.292c.113 4.34.395 8.496.961 12.72c-1.906 1.222-3.914 2.273-5.695 3.702c-1.813 1.395-3.66 2.727-5.301 4.36a102 102 0 0 0-10.316-6.004C12.543 33.824 8.94 38.297 6 43.305c2.313 3.629 4.793 7.273 7.086 10.117v30.723q.087 0 .168.007L32.09 85.97a2.03 2.03 0 0 1 1.828 1.875l.582 8.316l16.426 1.172l1.133-7.672a2.03 2.03 0 0 1 2.007-1.734h19.868a2.03 2.03 0 0 1 2.007 1.734l1.133 7.672l16.43-1.172l.578-8.316a2.03 2.03 0 0 1 1.828-1.875l18.828-1.817q.082-.007.168-.007V81.69h.008V53.42c2.652-3.335 5.16-7.019 7.086-10.116c-2.941-5.008-6.543-9.48-10.395-13.625a102 102 0 0 0-10.316 6.004c-1.64-1.633-3.488-2.965-5.3-4.36c-1.782-1.43-3.79-2.48-5.696-3.703c.566-4.223.848-8.379.96-12.719c-4.913-2.476-10.155-4.113-15.456-5.293c-2.117 3.559-4.055 7.41-5.738 11.176c-2-.332-4.008-.457-6.02-.48V20.3l-.039.004c-.016.002-.023-.004-.04-.004v.004c-2.01.023-4.019.148-6.019.48c-1.683-3.765-3.62-7.617-5.738-11.176zM37.301 54.55c6.27 0 11.351 5.079 11.351 11.345c0 6.27-5.082 11.351-11.351 11.351c-6.266 0-11.348-5.082-11.348-11.351c0-6.266 5.082-11.344 11.348-11.344zm53.398 0c6.266 0 11.348 5.079 11.348 11.345c0 6.27-5.082 11.351-11.348 11.351c-6.27 0-11.351-5.082-11.351-11.351c0-6.266 5.082-11.344 11.351-11.344zM64 61.189c2.016 0 3.656 1.488 3.656 3.32v10.449c0 1.832-1.64 3.32-3.656 3.32c-2.02 0-3.652-1.488-3.652-3.32v-10.45c0-1.831 1.632-3.32 3.652-3.32zm0 0'
            />
            <path
                fill='currentColor'
                d='m98.008 89.84l-.582 8.36a2.024 2.024 0 0 1-1.88 1.878l-20.062 1.434c-.046.004-.097.004-.144.004c-.996 0-1.86-.73-2.004-1.73l-1.152-7.806H55.816l-1.152 7.805a2.026 2.026 0 0 1-2.148 1.727l-20.063-1.434a2.024 2.024 0 0 1-1.879-1.879l-.582-8.36l-16.937-1.632c.008 1.82.03 3.816.03 4.211c0 17.887 22.692 26.484 50.88 26.582h.07c28.188-.098 50.871-8.695 50.871-26.582c0-.402.024-2.39.031-4.211zM45.922 66.566a7.53 7.53 0 0 1-7.535 7.532a7.534 7.534 0 0 1-7.535-7.532a7.534 7.534 0 0 1 7.535-7.53a7.53 7.53 0 0 1 7.535 7.53m36.156 0a7.53 7.53 0 0 0 7.531 7.532a7.531 7.531 0 1 0 0-15.063a7.53 7.53 0 0 0-7.53 7.531'
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

export function NextJS({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
                fill='currentColor'
                d='M17.664 17.65L10.26 8H8v8h2v-5.054l6.087 7.933a8 8 0 1 1 1.578-1.23M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m2-10V8h2v4z'
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

export function ThreeJS({ color = 'currentColor', ...props }: IconProps) {
    return (
        <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'>
                <path d='M8 22L3 3l19 5.5z' />
                <path d='m12.573 17.58l-6.152-1.576l8.796-9.466l1.914 6.64' />
                <path d='M12.573 17.58L11 11l6.13 2.179M9.527 4.893L11 11L4.69 9.436z' />
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
