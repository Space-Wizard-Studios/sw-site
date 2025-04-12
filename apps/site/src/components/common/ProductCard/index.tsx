import { useState } from 'react';

import { ProductTitle } from './ProductTitle';
import { ProductDescription } from './ProductDescription';
import { ProductCanvas } from './ProductCanvas';
import { Toggle } from './Toggle';
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

export default function ProductCard({
    index,
    iconSrc,
    iconColor,
    title,
    subtitle,
    description,
    tooltip = false,
}: Props) {
    const [isOpen, setOpen] = useState(false);

    const openStyle = 'shadow-sw-navy/25 dark:shadow-sw-flamingo-700/10 shadow-xl';
    const closedStyle = 'shadow-sw-navy/10 dark:shadow-sw-flamingo-700/10 shadow-sm';

    return (
        <div className='relative flex min-h-[16rem]'>
            <div
                className={cn(
                    'grid h-full w-full grid-cols-1 content-between overflow-visible p-6',
                    isOpen ? openStyle : closedStyle,
                )}
            >
                <ProductTitle title={title} subtitle={subtitle} />
                <ProductDescription isOpen={isOpen} description={description} />
                <Toggle index={index} tooltip={tooltip} isOpen={isOpen} setOpen={setOpen} />
            </div>

            <div className='absolute left-0 right-0 top-0 z-10 mx-auto -mt-8 h-16 w-16 md:left-auto md:-mr-12 md:-mt-4 md:h-24 md:w-24'>
                <ProductCanvas isOpen={isOpen} modelPath={iconSrc} modelColor={iconColor} />
            </div>
        </div>
    );
}
