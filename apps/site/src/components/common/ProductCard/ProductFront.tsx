import { cn } from '@helpers/cn';

interface Props {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
}

export function ProductFront({ title, subtitle }: Props) {
    return (
        <div className={cn('flex flex-col gap-4')}>
            <h4 className='flex min-h-[2em] items-start leading-tight'>{title}</h4>
            <p className=''>{subtitle}</p>
        </div>
    );
}
