import { IconBadge } from './IconBadge';
import { getIconComponent } from '@lib/getIconComponent';

import type { ResolvedProduct } from '@lib/resolveProjectCategories';

interface Props {
    products: ResolvedProduct[];
}

export function ProjectProducts({ products }: Props) {
    return (
        <>
            {products.map((product) => {
                const Icon = getIconComponent('product', product.id);
                return (
                    <IconBadge
                        key={product.id}
                        icon={Icon ? <Icon className='h-4 w-4' /> : null}
                        label={product.title || product.id}
                        showLabel={true}
                        variant='default'
                    />
                );
            })}
        </>
    );
}