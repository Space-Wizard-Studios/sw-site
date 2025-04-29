import React from 'react';
import { cn } from '@lib/utils';

interface ColorBoxProps {
    bg: string;
    text: string;
    className?: string;
}

export const ColorBox: React.FC<ColorBoxProps> = ({ bg, text, className }) => {
    const style = cn('flex flex-row w-full p-4 rounded-lg justify-between items-center', bg, text, className);
    return (
        <div className={`${style} p-2`}>
            <p>{bg}</p>
            <p>{text}</p>
        </div>
    );
};

interface BoxProps {
    className?: string;
}

export const PrimaryBox: React.FC<BoxProps> = ({ className = '' }) => {
    return <ColorBox bg='bg-primary' text='text-on-primary' className={className} />;
};

export const SecondaryBox: React.FC<BoxProps> = ({ className = '' }) => {
    return <ColorBox bg='bg-secondary' text='text-on-secondary' className={className} />;
};

export const TertiaryBox: React.FC<BoxProps> = ({ className = '' }) => {
    return <ColorBox bg='bg-tertiary' text='text-on-tertiary' className={className} />;
};
