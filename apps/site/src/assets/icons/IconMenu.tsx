import type { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

function IconMenu({ ...props }: Props) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'>
            <g fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'>
                <path d='M5 12H19'></path>
                <path d='M5 5L19 5'></path>
                <path d='M5 19L19 19'></path>
            </g>
        </svg>
    );
}

export { IconMenu };
