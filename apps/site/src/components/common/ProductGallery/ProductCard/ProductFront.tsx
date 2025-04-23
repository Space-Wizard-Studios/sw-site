import { cn } from '@lib/utils';

interface Props {
    title?: string;
    summary?: string;
}

export function ProductFront({ title, summary }: Props) {
    return (
        <div className={cn('flex flex-col gap-4')}>
            <h4 className='flex min-h-[2em] items-start leading-tight'>{title}</h4>
            <p className=''>{summary}</p>
        </div>
    );
}
