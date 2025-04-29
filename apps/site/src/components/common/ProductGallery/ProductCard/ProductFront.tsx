import { cn } from '@lib/utils';

interface Props {
    isActive: boolean;
    title?: string;
    summary?: string;
}

export function ProductFront({ isActive, title, summary }: Props) {
    return (
        <div
            className={cn(
                'absolute inset-0 flex flex-col gap-4 p-4',
                'transition-all duration-1000 ease-in-out',
                isActive ? 'pointer-events-auto' : 'pointer-events-none',
            )}
        >
            <h4 className='flex min-h-[2em] items-start leading-tight'>{title}</h4>
            <p className=''>{summary}</p>
        </div>
    );
}
