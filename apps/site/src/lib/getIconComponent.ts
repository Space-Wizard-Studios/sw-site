import type React from 'react';
import { ProductIcons, PlatformIcons, FrameworkIcons } from '@common/Icons';
import type { IconProps } from 'types/iconProps';

export function getIconComponent(
    type: 'product' | 'platform' | 'framework',
    id: string,
): React.FunctionComponent<IconProps> | null {
    const normalizedId = id.toLowerCase();

    // console.log(`[getIconComponent] Normalized ID for ${type}:`, normalizedId);

    let IconComponent = null;

    try {
        switch (type) {
            case 'product':
                IconComponent = ProductIcons[normalizedId] || ProductIcons.Apps;
                break;
            case 'platform':
                IconComponent = PlatformIcons[normalizedId] || PlatformIcons.Default;
                break;
            case 'framework':
                IconComponent = FrameworkIcons[normalizedId] || null;
                break;
        }
    } catch (error) {
        console.error(`Error getting icon component for ${type} - ${id}:`, error);
    }

    if (!IconComponent) {
        console.warn(`[getIconComponent] IconComponent not found for ${type} id: ${id} (Normalized: ${normalizedId})`);
    }

    return IconComponent;
}