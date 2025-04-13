import { motion } from 'motion/react';
import { Planet, Rocket } from '@icons/card_button';
import { forwardRef } from 'react';

interface Props {
    isActive?: boolean;
}

export const Target = forwardRef<HTMLDivElement, Props>(({ isActive = false }, ref) => {
    return <div className='h-6 w-6'>{isActive ? <Rocket flames={0} /> : <Planet />}</div>;
});

Target.displayName = 'Target';
