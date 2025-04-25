import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lib/utils';

const badgeVariants = cva(
    'flex items-center justify-center rounded-md border-2 px-2 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
    {
        variants: {
            variant: {
                default: 'border-on-primary/40 bg-primary text-on-primary shadow',
                primary: 'border-on-primary/40 bg-primary text-on-primary shadow',
                secondary: 'border-on-secondary/40 bg-secondary text-on-secondary shadow',
                outline: 'border-on-tertiary/40 bg-transparent shadow',
                ghost: 'border-transparent',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

function Badge({
    className,
    variant,
    asChild = false,
    ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : 'span';

    return <Comp data-slot='badge' className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
