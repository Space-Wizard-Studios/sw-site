import { useState } from 'react';

import { ProductFront } from '../ProductFront';
import { ProductBack } from '../ProductBack';
import { ProductCanvas } from '../ProductCanvas';
import { Toggle } from './TrackToggle';
import { cn } from '@helpers/cn';

interface Props {
    index: number;
    iconSrc: string;
    iconColor: number;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    description?: React.ReactNode;
    tooltip?: boolean;
}

export default function FlashCard({ index, iconSrc, iconColor, title, subtitle, description, tooltip = false }: Props) {
    const [isActive, setOpen] = useState(false);

    const openStyle = '';
    const closedStyle = '';

    return (
        <div className='relative flex min-h-[16rem]'>
            <div
                className={cn(
                    'grid h-full w-full grid-cols-1 content-between overflow-visible rounded-2xl p-4',
                    'bg-radial-[at_15%_15%] shadow-xl',
                    'text-on-surface from-surface-container-low to-surface-container',
                    isActive ? openStyle : closedStyle,
                )}
            >
                <ProductFront title={title} subtitle={subtitle} />
                <ProductBack isActive={isActive} description={description} />
                <Toggle index={index} tooltip={tooltip} isActive={isActive} setOpen={setOpen} />
            </div>
            {/* 
            <div className='absolute left-0 right-0 top-0 z-10 mx-auto -mt-8 h-16 w-16 md:left-auto md:-mr-12 md:-mt-4 md:h-24 md:w-24'>
                <ProductCanvas isActive={isActive} modelPath={iconSrc} modelColor={iconColor} />
            </div> */}
        </div>
    );
}
