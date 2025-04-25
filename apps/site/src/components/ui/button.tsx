import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex border-2 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-on-surface',
    {
        variants: {
            variant: {
                default:
                    'border-on-primary/40 bg-primary text-on-primary shadow hover:bg-primary-container hover:text-inverse-on-primary',
                primary:
                    'border-on-primary/40 bg-primary text-on-primary shadow hover:bg-primary-container hover:text-inverse-on-primary',
                secondary:
                    'border-on-secondary/40 bg-secondary text-on-secondary shadow hover:bg-secondary-container hover:text-on-secondary',
                outline: 'border-on-tertiary/40 bg-tertiary/10 shadow hover:bg-tertiary hover:text-on-tertiary',
                ghost: 'border-transparent hover:bg-tertiary hover:text-on-tertiary',
            },
            size: {
                sm: 'h-6 rounded-md px-2 text-xs',
                default: 'h-9 px-4 py-2',
                lg: 'h-10 rounded-md px-8',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
